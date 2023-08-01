SELECT * FROM test1.user_info;

SELECT * FROM test1.user_info
WHERE gender = 'female';

SELECT * FROM test1.user_info
WHERE age <= 26;

SELECT * FROM test1.user_info
where email LIKE '%.com';

SELECT * FROM test1.user_info
WHERE id > 100 AND name LIKE '%e%' AND age > 40;

INSERT INTO user_info (id, name, email, gender, age) VALUES (501, 'hyein', 'hyein@gamil.com', 'Femail', 22);

UPDATE user_info SET  name = 'Taylor Swift', age = 22 WHERE id = 1;

DELETE FROM user_info WHERE gender NOT IN ('Male', 'Female');