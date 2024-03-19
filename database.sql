-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- create my user's table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);

INSERT INTO "user" ("email", "password")
VALUES ('gpak86@gmail.com', 'yuppers123');

-- create cards table
CREATE TABLE "cards" (
    "id" SERIAL PRIMARY KEY,
    "cc_name" VARCHAR (80),
    "date_start" DATE NOT NULL,
    "date_promo_end" DATE NOT NULL,
    "spend_goal" INTEGER,
    "credit_limit" INTEGER,
    "rewards_value" INTEGER,
    "bankcard_name" VARCHAR (80)
);

INSERT INTO "cards" ("cc_name", "date_start", "date_promo_end", "spend_goal", "credit_limit", "rewards_value", "bankcard_name")
VALUES ('Citi Double Cash Card', '2024-04-01', '2024-09-30', 1500, 5000, 300, 'Citi');

-- create transaction table
CREATE TABLE "transactions" (
    "id" SERIAL PRIMARY KEY,
    "day_of_spend" INTEGER,
    "date_spend_added" DATE NOT NULL,
    "category_spend" VARCHAR(80),
    "card_id" INTEGER
);

INSERT INTO "transactions" ("day_of_spend", "date_spend_added", "category_spend", "card_id")
VALUES (225, '2024-04-01', 'Grocery', 1);