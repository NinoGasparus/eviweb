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
CREATE TABLE  timetables(
  int id default 0,
  int week,
);

CREATE TABLE week(
  int id default 0,
  int table default 0,
  datetime start default TODAY(),
  datetime end default TODAY(),

  PRIMARY KEY(id)
  FOREIGN KEY(table) REFERENCES timetables(week)
);

CREATE TABLE day(
  int id default 0,
  int week default 0,
  PRIMARY KEY(id)
  FOREIGN KEY(week) REFERENCES week(id)
)
CREATE TABLE  hour(
  int id default 0,
  int dan,
  int ucitelj,
  int subject,
  varchar opis,
  
  FOREIGN KEY(subject) REFERENCES subject(id)
  FOREIGN KEY(dan) REFERENCES day(id)
  FOREIGN KEY(ucitelj) REFERENCES teacher(id)
  PRIMARY KEY(id)
);
CREATE TABLE  exams(
  int id default 0,
  int subject,
  int teacher,
  int hour, 

  PRIMARY KEY(id)
  FOREIGN KEY(subjects) REFERENCES subjects(id)
  FOREIGN KEY(teacher) REFERENCES teacher(id)
  FOREIGN KEY(hour) REFERENCES hour(id)
);
CREATE TABLE  subjects(
  int id default 0,
  varchar title,

  PRIMARY KEY(id)
);
CREATE TABLE  absences(
  int id default 0,
  int ura,
  int student,
  PRIMARY KEY(id)
  FOREIGN KEY(ura) REFERENCES hour(id)
  FOREIGN KEY(student) REFERENCES student(id)
);
CREATE TABLE  users(
  int id AUTO INCREMENT,
  PRIMARY KEY(id),
  boolean isAdmin default  false,
  datetime createdOn default TODAY()
);

-- Sample student
INSERT INTO users(isAdmin) VALUES(false);
INSERT INTO student(id, ime, priimek, razred) VALUES(0, "Jan", "Novak", 0);
