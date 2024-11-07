DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS book;

CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  course Text NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE book (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  is_borrowed INTEGER NOT NULL,
  pages INTEGER NOT NULL,
  borrower_id INTEGER,
  cover TEXT,
  rating REAL,
  FOREIGN KEY (borrower_id) REFERENCES user (id)
);

