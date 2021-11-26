var fs = require('fs');
var path = require('path');

exports.sendSession = (res, sessionID, callback) =>
{
	res.writeHead(200, { 'Content-Type' : 'text/plain' });
	res.end(sessionID.toString());
	callback(sessionID);
}

exports.serveStatic = (res, pathName) =>
{
	let contentType = getContentType(pathName);

	fs.readFile(pathName, (err, content) =>
	{
        if (contentType == "")
        {
            return console.log("Invalid file type");
        }

        if (err)
        {
            return console.log(err);
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
	});
}

function getContentType(pathName)
{
	let ext = path.extname(pathName);
	switch (ext)
	{
		case ".bmp":
        	case ".gif":
        	case ".jpg":
	        case ".png":
        		return ("image/" + ext.slice(1));
	        case ".css":
        	case ".html":
	        	return ("text/" + ext.slice(1));
	        case ".txt":
        		return "text/plain";
	        case ".js":
        		return "text/javascript";
        	default:
        		return "";
	}
}
