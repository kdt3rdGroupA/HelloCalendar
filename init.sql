-- 이 코드는 프로젝트 시작시에만 한번 실행해주시면 됩니다

CREATE DATABASE hello_calendar DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
-- database 생성

USE hello_calendar;


CREATE TABLE user_login_key (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userid VARCHAR(20) NOT NULL,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  salt VARCHAR(200) NOT NULL,
  hash_pw VARCHAR(200) NOT NULL
);
  -- salt, hash_pw -> 각각 유저 암호화된 id, pw라고 이해

CREATE TABLE todo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  key_id INT NOT NULL,
  text VARCHAR(50),
  priority VARCHAR(10),
  deadline VARCHAR(20),
  INDEX key_id (key_id)
);
  -- id -> user_login_key.id
  -- 데이터가 많을시 검색성능 저하방지를 위해 INDEX설정

CREATE TABLE todoex (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  key_id INT NOT NULL,
  task VARCHAR(50),
  priority INT,
  startline VARCHAR(20),
  deadline VARCHAR(20),
  INDEX key_id (key_id)
);
-- 일단 이대로 

CREATE USER 'user1'@'%' IDENTIFIED BY '$user1*';

GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;

DESC user_login_key;
DESC todo;
SHOW tables;