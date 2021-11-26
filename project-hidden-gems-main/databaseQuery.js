const mysql = require('mysql');
const auth = require('./auth.js');
const crypto = require('crypto');
const connectionPool = mysql.createPool({
	host : '34.138.222.54',
	user : 'nodeuser',
	password : 'csc3302021',
	database : 'csc330_calendar',
	connection_limit : 10})

const groupsQuery = ' LEFT JOIN userGroups ON scsuID = userGroups.userID LEFT JOIN groups on userGroups.groupID = groups.groupID';
const eventsQuery = groupsQuery + ' LEFT JOIN groupEvents ON groups.groupID = groupEvents.groupID LEFT JOIN events ON groupEvents.eventID = events.EventID';

exports.getUserInfo = (sessionID, res, callback) =>
{
	connectionPool.query('SELECT * FROM sessions LEFT JOIN users ON sessions.scsuID = users.scsuID WHERE sessionID = ?', [sessionID], (error, queryResults, fields) =>
	{
		console.log(JSON.stringify(queryResults));
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.end(JSON.stringify(queryResults));
		if (error)
		{
			console.log("Error retrieving user info");
			console.log(error);
			return;
		}

		callback(queryResults);
	});
}

exports.getUserEvents = (sessionID, res, callback) =>
{
	connectionPool.query('SELECT groups.name, groups.category, groups.color, events.name, events.type, events.location, events.shortDescription, events.description, events.startTime, events.endTime FROM sessions LEFT JOIN users ON sessions.scsuID = users.scsuID' + eventsQuery + ' WHERE sessionID = ?', [sessionID], (error, queryResults, fields) =>
	{
		console.log(JSON.stringify(queryResults));
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.end(JSON.stringify(queryResults));

		if (error)
		{
			console.log("Error retrieving user events");
			console.log(error);
			return;
		}
		callback();
	});
}

exports.getGroupEvents = (groupID, res, callback) =>
{
	connectionPool.query('SELECT * FROM groups LEFT JOIN groupEvents ON groups.groupID = groupEvents.groupID LEFT JOIN events ON groupEvents.eventID = events.EventID WHERE groups.groupID = ?', [groupID], (error, queryResults, fields) =>
	{
		console.log(JSON.stringify(queryResults));
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.end(JSON.stringify(queryResults));

		if (error)
		{
			console.log("Unable to retrieve events for group");
			console.log(error);
		}
		callback();
	});
}

exports.deleteUser = (userID, callback) =>
{
	connectionPool.query('DELETE FROM users WHERE scsuID = ?', [userID], (error, queryResults, fields) =>
	{
		console.log("User ", userID, " deleted.");
		if (error)
		{
			console.log(error);
			console.log("User does not exist.");
			return;
		}
		callback();
	});
}

exports.addUser = (userInfo, callback) =>
{
	accessLevel = 'Student';
	auth.hash(userInfo.password, (hashedPassword) =>
	{
		connectionPool.query('INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
		[userInfo.scsuID, userInfo.username, hashedPassword, userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.uClass, accessLevel], (error, queryResults, fields) =>
		{
			if (error)
			{
				console.log("Error adding user.");
				console.log(error);
				return;
			}
			console.log(JSON.stringify(queryResults));
			callback();
		});
	});
}

exports.joinGroup = (queryObj, res, callback) =>
{
	var sessionID = queryObj.sessionID;
	var groupID = queryObj.groupID;

	connectionPool.query('SELECT scsuID, accessLevel FROM sessions WHERE sessionID = ?', [sessionID], (error, queryResults, fields) =>
	{
		var userID = queryResults[0].scsuID;
		connectionPool.query('INSERT INTO userGroups (userID, groupID) VALUES (?, ?)', [userID, groupID], (error, insertResults, fields) =>
		{
			if (error)
			{
				console.log(error);
				return;
			}

			res.writeHead(201);
			res.end();

			callback();
		});
	});
}

exports.addGroup = (groupInfo, res, callback) =>
{
	console.log(groupInfo.sessionID);
	sessionID = groupInfo.sessionID;
	connectionPool.query('SELECT scsuID, accessLevel FROM sessions WHERE sessionID = ?', [sessionID], (error, queryResults, fields) =>
	{
		if (error)
		{
			console.log("User session has expired");
			return;
		}
		console.log(queryResults);
		console.log(queryResults[0].scsuID);

		if (queryResults[0].accessLevel == "Student")
		{
			//Should return an error message once roles are setup.
		}

		connectionPool.query('INSERT INTO groups (leaderID, name, category, description, color, isPublic) VALUES (?, ?, ?, ?, ?, ?)', [queryResults[0].scsuID, groupInfo.name, groupInfo.category, groupInfo.description, groupInfo.color, groupInfo.isPublic], (error, insertResults, fields) =>
		{
			if (error)
			{
				console.log("Error adding group.", error);
				return;
			}
			console.log(JSON.stringify(queryResults));
			res.writeHead(201);
			res.end();
			callback();
		});
	});
}

exports.login = (query, callback) =>
{
	connectionPool.query('SELECT hashedPassword FROM users WHERE username = ?', [query.username], (error, queryResults, fields) =>
	{
		console.log(JSON.stringify(queryResults));
		let hashedPass = queryResults[0].hashedPassword;
		console.log(hashedPass.toString(), query.username);
		auth.authenticate(query.password, queryResults[0].hashedPassword.toString(), (result) =>
		{
			if (result == true)
			{
				console.log("User Authenticated");
			}
			else
			{
				console.log("Invalid Username or Password");
			}
			callback(result);
		});
	});
}

exports.logout = (sessionID, callback) =>
{
	connectionPool.query('DELETE FROM sessions WHERE sessionID = ?', [sessionID], (error, deleteResults, fields) =>
	{
		if (error)
		{
			console.log(error);
			return;
		}

		console.log(`Session ${sessionID} removed successfully`);

		callback();
	});
}

exports.addSession = (query, callback) =>
{
	connectionPool.query('SELECT scsuID, accessLevel FROM users WHERE username = ?', [query.username], (error, queryResults, fields) =>
	{
		if (error)
		{
			console.log(error);
			return;
		}
		let buf = crypto.randomBytes(16);
		sessionID = buf.toString('hex');

		console.log(sessionID);
		scsuID = queryResults[0].scsuID;
		accessLevel = queryResults[0].accessLevel;

		connectionPool.query('INSERT INTO sessions VALUES (?, ?, ?)', [sessionID, scsuID, accessLevel], (error, insertResults, fields) =>
		{
			if (error)
			{
				console.log(error);
				return;
			}
			callback(sessionID);
		});
	});
}

exports.getGroupList = (queryObj, res, callback) =>
{
	var sessionID = queryObj.sessionID;

	var search = queryObj.search == undefined ? "" : queryObj.search.toUpperCase();
	var category = queryObj.category == undefined ? "category" : queryObj.category;
	var accessibility = queryObj.access == undefined ? "true" : queryObj.access;

	console.log(search + category + accessibility);

	//Check if access level is admin. Admins should be shown public and private groups.
	connectionPool.query('SELECT accessLevel FROM sessions WHERE sessionID = ?', [sessionID], (error, selectResults, fields) =>
	{
		var searchQuery = "SELECT groupID, leaderID, name, category, description, isPublic FROM groups WHERE ";
		searchQuery += "name = " + (search == "" ? "UPPER(name)" : mysql.escape(search));
		searchQuery += " AND category = " + (category == "category" ? "category" : mysql.escape(category));
		searchQuery += " AND isPublic = " + (accessibility == "isPublic" ? "isPublic" : mysql.escape(accessibility));

		if (error)
		{
			console.log(error);
			return;
		}

		//connectionPool.query('SELECT groupID, leaderID, name, category, description, isPublic FROM groups WHERE name = ? AND category = ? AND isPublic = ?', [search, category, accessibility], (error, queryResults, fields) =>
		connectionPool.query(searchQuery, (error, queryResults, fields) => 
		{
			if (error)
			{
				console.log(error);
				return;
			}

			res.writeHead(200, {'Content-Type' : 'application/json'});
			res.end(JSON.stringify(queryResults));

			callback();
		});
	});
}

exports.closeConnection = (callback) =>
{
	connectionPool.query('DELETE FROM sessions', (error, deleteResults, fields) =>
        {
		connectionPool.end();
		console.log("\nDatabase connection terminated");
		console.log("Session Data cleared");
		callback();
	});
}
