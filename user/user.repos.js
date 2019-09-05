import { getDb } from '../db.js'

const DEFAULT_BUDGET = 100;
const DEFAULT_PASSWORD = "password";

export const insertMany = async() => {
  const connection = await getDb()
  const collection = connection.collection('users')

  collection.insertMany([
    {
      username: "username1",
      email: "username1@example.com",
      budget: DEFAULT_BUDGET,
      password: DEFAULT_PASSWORD
    },
    {
      username: "username2",
      email: "username2@example.com",
      budget: DEFAULT_BUDGET,
      password: DEFAULT_PASSWORD
    },
    {
      username: "username3",
      email: "username3@example.com",
      budget: DEFAULT_BUDGET,
      password: DEFAULT_PASSWORD
    }
  ], function (err, result) {
    console.log("Users were inserted.");
  });
};

export const insert = function (params, callback) {
  const collection = getDb().collection('users');

  params.each
  collection.insert([
    {
      username: "username1",
      email: "username1@example.com",
      budget: DEFAULT_BUDGET,
      password: DEFAULT_PASSWORD
    }
  ], function (err, result) {
    console.log("User was inserted.");
    callback(result);
  });
};

export const findAll = function () {
  const collection = getDb().collection('users');
  collection.find({}).toArray(function (err, users) {
    console.log("Found the following user records");
    console.log(users)
  });
};

export const find = function (params, callback) {
  const collection = getDb().collection('users');
  collection.find({}).toArray(function (err, user) {
    console.log("Found the following user");
    console.log(user)
    callback(users);
  });
};