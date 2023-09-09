CREATE DATABASE notes_app;
USE notes_app

CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT Not NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title,contents)
VALUES
('My First Note', 'a note about something'),
('My Second Note', 'a note about something else');
