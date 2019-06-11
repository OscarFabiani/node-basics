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
  favoriteFoods: [String]
});


var Person = mongoose.model('Person', personSchema);

//console.log(Person);


var oscar = new Person({
  name: 'Oscar',
  age: 31,
  favoriteFoods: ['eggs', 'beans']
})


var createAndSavePerson = function(done) {
  oscar.save(function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};

console.log(oscar);



var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};



var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: [food]}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



var findPersonById = function(personId, done) {
  Person.findById({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, data) {
      if (err) {
        return done(err);
      }
      return done(null, data);
    })
  })
};