USE csc330_calendar;
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions
(
sessionID VARCHAR(32) NOT NULL,
scsuID INT NOT NULL,
accessLevel CHAR(30) NOT NULL,
PRIMARY KEY (sessionID)
);
