USE csc330_calendar;

#Users
INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel)
VALUES (11237149, 'dsmith1998', '64ythtbrdg5t64', 'Dave', 'Smith', 'davesmith@email.com', 'Senior', 'Student');

INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel)
VALUES (41715853, 'annar12', '32&1q8%19fvf', 'Anna', 'Roberts', 'aroberts2001@email.com', 'Freshman', 'Student');

INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel)
VALUES (18763438, 'miller123', 'O*MD5~!tgfd643', 'Luke', 'Miller', 'lmiller@email.com', 'Junior', 'Group Leader');

INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel)
VALUES (32831978, 'admin', '&IKJMfds54RETS3', 'Jeff', 'Davis', 'jdavis@email.com', 'Faculty', 'Admin');

INSERT INTO users (scsuID, username, hashedPassword, firstName, lastName, email, class, accessLevel)
VALUES (01234567, 'User001', 'KMJG^%YGHBDF4$@', 'Greg', 'Edwards', 'gedwards1001@email.com', 'Senior', 'Group Leader');

#Groups
INSERT INTO groups (leaderID, name, category, color, isPublic)
VALUES (00000001, 'SCSU Events', 'Official Events', '0055a5', 1);

INSERT INTO groups (leaderID, name, category, color, isPublic)
VALUES (01234567, 'Art Club', 'Club Events', 'aa0066', 0);

INSERT INTO groups (leaderID, name, category, color, isPublic)
VALUES (18763438, 'Baseball Team', 'Athletics Events', '55cc00', 1);


#Events
INSERT INTO events (name, type, location, shortDescription, startTime, endTime)
VALUES ('Practice', 'Meeting', 'Baseball Field', 'Weekly practice', '2021-11-05 14:30:00', '2021-11-05 16:30:00');

INSERT INTO events (name, type, location, shortDescription, startTime, endTime)
VALUES ('Club Meeting', 'Meeting', 'Library', 'The first club meeting for the art club', '2021-11-01 10:00:00', '2021-11-01 11:00:00');

INSERT INTO events (name, type, location, shortDescription, startTime, endTime)
VALUES ('Practice', 'Meeting', 'Baseball Field', 'Weekly practice', '2021-11-12 14:30:00', '2021-11-12 16:30:00');

INSERT INTO events (name, type, location, shortDescription, startTime, endTime)
VALUES ('Guest Speaker', 'Campus Event', 'Outside Hilton C. Buley Library', 'Guest Speaker will give a speech about topic.', '2021-11-11 12:00:00', '2021-11-11 13:00:00');

#Relationships

INSERT INTO userGroups (userID, groupID) VALUES (11237149, 1);
INSERT INTO userGroups (userID, groupID) VALUES (41715853, 1);
INSERT INTO userGroups (userID, groupID) VALUES (18763438, 1);
INSERT INTO userGroups (userID, groupID) VALUES (32831978, 1);
INSERT INTO userGroups (userID, groupID) VALUES (01234567, 1);

INSERT INTO userGroups (userID, groupID) VALUES (18763438, 3);
INSERT INTO userGroups (userID, groupID) VALUES (01234567, 2);
INSERT INTO userGroups (userID, groupID) VALUES (41715853, 2);

INSERT INTO groupEvents (groupID, eventID) VALUES (1, 4);
INSERT INTO groupEvents (groupID, eventID) VALUES (2, 2);
INSERT INTO groupEvents (groupID, eventID) VALUES (3, 1);
INSERT INTO groupEvents (groupID, eventID) VALUES (3, 3);

