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

-- CREATE TABLE todo (
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   key_id INT NOT NULL,
--   text VARCHAR(50),
--   priority VARCHAR(10),
--   deadline VARCHAR(20),
--   INDEX key_id (key_id)
-- );
  -- 예전버전의 todo테이블

CREATE TABLE todo (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  key_id INT NOT NULL,
  task VARCHAR(50),
  priority INT,
  startline VARCHAR(20),
  deadline VARCHAR(20),
  complete BOOLEAN,
  business BOOLEAN,
  INDEX key_id (key_id)
);
  -- id -> user_login_key.id
  -- 데이터가 많을시 검색성능 저하방지를 위해 INDEX설정
  -- mysql은 boolean 타입 지원 안함 -> TYNYINT(1) 로 사용 근데 BOOLEA이라 써도 저거로 인식해줌

CREATE TABLE calendar (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  key_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  detail VARCHAR(200),
  startDate VARCHAR(20),
  endDate VARCHAR(20),
  INDEX key_id (key_id)
);
  -- id -> user_login_key.id
  -- 데이터가 많을시 검색성능 저하방지를 위해 INDEX설정


CREATE TABLE shortcut (
  
)

CREATE USER 'user1'@'%' IDENTIFIED BY '$user1*';
GRANT ALL PRIVILEGES ON *.* TO 'user1'@'%' WITH GRANT OPTION;
  -- 유저 생성, 권한부여

FLUSH PRIVILEGES;
  -- 유저생성, 권한 작업하고 해주는것을 권장

INSERT INTO todo(key_id, task, priority) VALUES (3, "충분히 멍때리기", 3);
INSERT INTO todo(key_id, task, priority, startline, deadline) VALUES (4, "충분히 잠자기", 2, "2022-11-11", "2022-12-12");
INSERT INTO todo(key_id, task, priority, startline, deadline, complete, business) VALUES (4, "출근", 2, "2022-11-11", "2022-12-12", 1, 1);
-- 테스트를 위한 데이터 추가

DESC user_login_key;
DESC todo;

SELECT * FROM todo;
DELETE FROM todo WHERE id > 2;

DROP TABLE todo;
SHOW tables;
  -- 테이블 확인코드

