/*

This file explores the basics of MongoDB

MONGODB: MongoDB is a database that stores data records (documents) for use by an application.
Mongo is a non-relational, "NoSQL" database. This means Mongo stores all data associated within
one record, instead of storing it across many preset tables as in a SQL database.


MONGOOSE: Mongoose.js is an npm module for Node.js that allows you to write objects for Mongo as
you would in JavaScript. This can make it easier to construct documents for storage in Mongo.


*/

const mongoose = require('mongoose');


process.env.MONGO_URI = 'mongodb+srv://spartan539:popcorn1@cluster0-m1tag.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URI);



var personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: Array
});

var Person = mongoose.model('Person', personSchema);

console.log(Person);