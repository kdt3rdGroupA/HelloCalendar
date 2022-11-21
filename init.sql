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

