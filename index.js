/*

This file explores the basics of MongoDB

MONGODB: MongoDB is a database that stores data records (documents) for use by an application.
Mongo is a non-relational, "NoSQL" database. This means Mongo stores all data associated within
one record, instead of storing it across many preset tables as in a SQL database.


MONGOOSE: Mongoose.js is an npm module for Node.js that allows you to write objects for Mongo as
you would in JavaScript. This can make it easier to construct documents for storage in Mongo.


Mongoose vs pure MongoDB:


For:

-Mongoose schemas resemble RDBMS restrictions which can be easier than working with dynamic that have
no defined structure.

-Mongoose Model abstraction make it easier to work with since they look like objects.

-Mongoose has data validation built into it (what data can be added to or updated to) while Mondgo
doesn't.

-Usefully abstraacts Mongo code.


Against:

-Node and pure Mongo syntax are similar so Mongo is easier to learn.

-Models are only useful when you are scaling into a big application with a large API that needs to be
broken up into a MVC system(mongoose being your models).

-Schemas defeat the purpose of NoSQL and make it hard to learn the benefits of a loosely structured
data system.

-Mongoose is more complex to learn.


*/

const mongoose = require('mongoose');


process.env.MONGO_URI = 'mongodb+srv://spartan539:popcorn1@cluster0-m1tag.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGO_URI);



//This creates a Schema.
var personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});



//This creates a Model with a name 'Person' and uses the personSchema schema.
var Person = mongoose.model('Person', personSchema);



//This creates an instance of the Person model (document).
var oscar = new Person({
  name: 'Oscar',
  age: 31,
  favoriteFoods: ['eggs', 'beans']
})



//This uses Document.save() to save the previously defined oscar document.
var createAndSavePerson = function(done) {
  oscar.save(function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.create() to create many documents (instances of Person) by passing an array of
//objects as the first argument.
var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data)
  })
};



//This uses Model.find() to find all documents with a specific name property.
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.findOne() to find one document with a favoriteFoods property that contains a
//specific item (string).
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: [food]}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.findById to find a document with a specific _id property.
var findPersonById = function(personId, done) {
  Person.findById({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.findById to find a document matching a specific _id, then pushes a new item to that
//documents favoriteFoods array property, then uses Document.save() to save the updated document.
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



//This uses Model.findOneAndUpdate() to change the age property of the first document with a specific
//name property and sets an option (new) to true to return the modified document.
var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.findOneAndRemove() to find a document with a specific _id property and removes it.
var removeById = function(personId, done) {
  Person.findOneAndRemove({_id: personId}, function(err, data) {
    if (err) {
      return done(err);
    }
    return done(null, data);
  })
};



//This uses Model.remove() to remove any Person document with a name property set to 'Mary' from the
//database (collection).
//NOTE: This method has an option to remove only the first document that matches the first argument.
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


//SET UP LOCAL ENVIRONMENT FOR TESTING, WRITE PERSONAL DOCUMENTATION FOR MONGOOSE, EXPLORE MONGO WITHOUT MONGOOSE.