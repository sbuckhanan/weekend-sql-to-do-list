-- CREATE A DATABASE NAMED 'weekend-to-do-app'


CREATE TABLE todos (
    "id" serial PRIMARY KEY,
    "name" varchar(60) NOT NULL,
    "complete" boolean
);

INSERT INTO todos (name, complete) VALUES ('Take out the trash', false), ('Walk the dog', false), ('Do the dishes', false);