# AudioSphere Data Schema

## **User**

| attribute name | data type  |               details |
| -------------- | :--------: | --------------------: |
| id             |  integer   | not null, primary key |
| email          |   string   |      not null, unique |
| username       | string(50) |      not null, unique |

-Associations: User has many songs (one-to-many)

## **Song**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| title          |  string   |              not null |
| genre          |  string   |              not null |
| description    |   text    |              optional |
| user_id        |  integer  | not null, foreign key |
| createdAt      | timestamp |              not null |

-Associations: Song belongs to one user (one-to-many)

## **Favorite**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| song_id        |  integer  | not null, foreign key |
| user_id        |  integer  | not null, foreign key |
