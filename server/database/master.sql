CREATE DATABASE eviweb;
USE eviweb;

CREATE TABLE  student(
  int id default 0,
  FOREIGN KEY(id) REFERENCES users(id),
  varchar(50) ime NOT NULL default "Dijak",
  varchar(50) priimek NOT NULL default "Penger",
  varchar(50) email NOT NULL default "dijak@eviweb.org",
  int razred default 0,
);

CREATE TABLE  teacher(
  int id default 0,
  FOREIGN KEY(id) REFERENCES users(id),
  varchar(50) ime NOT NULL default "Učitelj",
  varchar(50) priimek NOT NULL default "Penger",
  varchar(50) email NOT NULL default "učitelj@eviweb.org",

  boolean isR default false,
  int razred default 0,

);

CREATE TABLE  parents(
  int id default 0,
  FOREIGN KEY(id) REFERENCES users(id),
  varchar(50) ime NOT NULL default "Starš",
  varchar(50) priimek NOT NULL default "Penger",
  varchar(50) email NOT NULL default "starš@eviweb.org",

  int idOtroka default 0,
);

CREATE TABLE  grades(
  int id default 0,
  int grade default -1,
  int student,
  int teacher,
  int subject,
  datetime dateAssigned,

  FOREIGN KEY(student) REFERENCES student(id)
  FOREIGN KEY(teacher) REFERENCES teacher(id)
  FOREIGN KEY(subject) REFERENCES subjects(id)
);
CREATE TABLE  timetables();

CREATE TABLE  exams();
CREATE TABLE  subjects();
CREATE TABLE  absences();
CREATE TABLE  users(
  int id AUTO INCREMENT,
  PRIMARY KEY(id),
  boolean isAdmin default  false,
  datetime createdOn default TODAY()
);

-- Sample student
INSERT INTO users(isAdmin) VALUES(false);
INSERT INTO student(id, ime, priimek, razred) VALUES(0, "Jan", "Novak", 0);
