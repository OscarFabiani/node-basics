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



//This creates a Schema
var personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});



//This creates a Model.
var Person = mongoose.model('Person', personSchema);



//This is an instance of a model (document).
var oscar = new Person({
  name: 'Oscar',
  age: 31,
  favoriteFoods: ['eggs', 'beans']
})



//Uses Document.save()
var createAndSavePerson = function(done) {
  oscar.save(function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.create()
var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};



//Uses Model.find()
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.findOne()
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: [food]}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.fildById()
var findPersonById = function(personId, done) {
  Person.findById({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.findById and Document.save()
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



//Uses Model.findOneAndUpdate()
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.findOneAndRemove()
var removeById = function(personId, done) {
  Person.findOneAndRemove({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//Uses Model.remove()
var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This chains the Model.find() method with multiple Query methods by ommitting a callback for the find()
//method which returns the query to be used. The Model.find() method filters documents that have a
//favoriteFoods property that includes 'burrito' (in this case, the property is an array of strings
//and filtering 'burrito' checks if the array contains 'burrito' as one of its items). The Query.sort()
//method sorts the documents the query will return by name in ascending order. The Query.limit() method
//limits the number of documents the query will return to 2. The Query.select() method excludes the age
//field from the documents the query will return. Finally, the Query.exec() executes the query and is
//passed a callback like the initial Model.find() method could have included as a second parameter.
var queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select({age: 0})
    .exec(function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};


//WRITE NOTES FOR ALL EXAMPLES,  SET UP LOCAL ENVIRONMENT FOR TESTING, WRITE PERSONAL DOCUMENTATION FOR MONGOOSE,
//EXPLORE MONGO WITHOUT MONGOOSE.