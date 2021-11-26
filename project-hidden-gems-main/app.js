// imports
'use strict';
var http = require('http');
var url = require('url');
var fileServer = require('./fileServer.js');
var dq = require('./databaseQuery.js');
var qs = require('querystring');
var port = process.env.PORT || 80;

// close database connection before exiting program
process.on("SIGINT", () => dq.closeConnection(() => process.exit(0)));

// create server
http.createServer(function (req, res)
{
    // variables
    let pathName = "./public_html";
    let link = url.parse(req.url, "true");
    let queryObj = link.query

    switch (link.pathname)
    {
	// after user login create session id
	case "/saveForm" :
            dq.login(queryObj, (result) =>
	    {
		if (result)
		{
			console.log(result);
			console.log(pathName);
			dq.addSession(queryObj, (sessionID) => fileServer.sendSession(res, sessionID, () => {}));
		}
		else
		{
			fileServer.sendSession(res, 0, () => {});
			console.log(result);
		}
	    });
            break;
	case "/logout":
	    console.log("Logout request received");
            dq.logout(queryObj.sessionID, () => {fileServer.serveStatic(res, pathName + "/html/login.html")});
	    break;
	// user creates a new account send user to login
	case "/createAccount":
	    dq.addUser(queryObj, () => {fileServer.serveStatic(res, pathName + "/html/login.html")});
	    break;
        case "/html/dashboard.html":
	    console.log("here");
	    fileServer.serveStatic(res, pathName + link.pathname);
	    break;
	case "/createGroup":
	    var data = "";
	    var body = "";
	    req.on('data', (data) => {body += data;});
	    req.on('end', () =>
	    {
		data = qs.parse(body);
		console.log(data);
		dq.addGroup(data, res, () => {});
	    });
	    break;
	case "/joinGroup":
	    dq.joinGroup(queryObj, res, () => {});
	    break;
	case "/getGroups":
	    dq.getGroupList(queryObj, res, () => {});
	    break;
	case "/getUserInfo":
	    dq.getUserInfo(queryObj.sessionID, res, () => {});
	    break;
	// default send user to login page
	case "/":
            pathName += "/html/login.html";
            fileServer.serveStatic(res, pathName);
            break;
        default:
            pathName += req.url;
	    console.log(pathName);
            fileServer.serveStatic(res, pathName);
            break;
    }
}).listen(port, console.log("Server on Port 80"));
