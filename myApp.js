/*

This file explores the basics of Node and Express.



Node.js: Node.js is a JavaScript tool that allows developers to write backend (server-side) programs in
JavaScript. Node.js comes with built-in modules (small, independent programs) that help facilitate this
purpose.
Some of the core built-in modules are:

http: a module that acts as a server.

fs (File System): a module that reads and modifies files.

path: a module for working with directory and file paths.

assert (Assertion Testing): a module that checks code against prescribed constraints.


Node.js Global Objects: objects that are available in all modules.

__dirname: The direstory name of the current module.

process: provides information about, and control over the current Node.js process.


process.env: The process.env property returns an object containing the user environment.




Express: Express is a popular module/library/framework that runs between the server created by Node.js and the
frontend pages of a web application. Express also handles an application's routing. Routing directs users to the
correct page based on their interaction with the application.


Express methods: Some common Express methods are listen(), get(), and post().


App object: The app object conventionally denotes the Express application.

App Methods:

Listen method: The app.listen() method tells your server to listen on a given port, putting it in a running state.
NOTE: This method is identical to Node's http.Server.listen().
Syntax: app.listen([port[, host[, backlog]]][, callback])
EX:
//This tells the server to listen to port 3000 and includes a callback function that logs a message to the console.
app.listen(3000, () => {console.log('app is listening on port 3000')});

Use method: The app.use() method mounts middleware function(s) at a specified path.
NOTE: If path is omitted, it defaults to root.
Syntax: app.use([path,] callback [, callback...])
EX:
//This calls a function that logs a meggage before passing on to next whenever an HTTP request is made
//on the root path.
app.use((req, res, next) => {
  console.log("middleware called");
  next();
});


Routing Methods: Routing methods route http requests There are many, but the most common are get and post.
Syntax: app.METHOD(PATH, HANDLER) or app.METHOD(path, callback [, callback ...])
METHOD is an http method in lowercase, PATH is a relative path on the server, and HANDLER is a route handler
function that Express calls when the route is matched.

Get Method: Routes HTTP GET requests to the specified path with the specified callback functions.
Syntax: app.get(PATH, HANDLER) or app.get(path, callback)


Route handlers: Route handler functions are called when a route method's PATH is matched and take a request
object and response object as parameters.
Syntax: function (req, res) {...}


Response Object (res): The res object represents the HTTP response that an Express app sends when it gets an
HTTP request.

Response Object Methods:

res.send: Sends the HTTP response.
Syntax: res.send(body);

res.sendFile: Transfers the file at the given path. The path argument must be an absolute path to the file.
Syntax: res.sendFile(path [, options] [, fn])

res.json: Sends a JSON response. This method converts the parameter to a JSON string using JSON.stringify().
Syntax: res.json(body);


Express middleware: Express middleware are functions that execute during the lifecycle of a request to the
Express server. Each middleware has access to the HTTP request and response for each route (or path) it's
attached to. Express middleware can either terminate the HTTP request or pass it on to another middleware
function using next. This is called chaining middleware.
Syntax: function(req, res, next) {...};

Express built in middleware:

express.static: Serves static files.
Syntax: express.static(root, [options])
EX:
//This serves assets in the /public directory. These assets will appear mounted to the root directory.
app.use(express.static(__dirname + "/public"))





Creating an Express app object: After requiring or importing express, an Express app object can be created
by setting a variable to an instance of express().
EX:
const express = require('express');
const app = express();

Serving a response string to GET requests matching the root "/" path:
EX:
//This serves a string response when an HTTP request is made on the root path.
app.get("/",(req, res) => {res.send("Hello Express")});

Serving a response HTML file to GET requests matching the root "/" path.
EX:
//This serves an HTML file at the specifies path when an HTTP request is made on the root path.
NOTE: This assumes there is an index.html file at the root path of the project.
app.get("/",(req, res) => {res.sendFile(__dirname + "/index.html")});

Serving JSON data as a response to a GET request:
EX:
//This serves the object passed to res.json as a JSON string when a get request is sent to /json.
app.get("/json", (req, res) => {res.json({name: "oscar"})});

Adding an environment variable for use as a configuration:
EX:
//This sets an environment variable, then loads(?) middleware that checks if the environment variable
//is set to "true" and serves "test" if so, otherwise calls next.
process.env.TEST = "true";
app.get("/json", (req, res, next) => {
  if (process.env.TEST == "true") {
    res.send("test");
  } else {
    next();
  }
})






*/

//import express from 'express';
const express = require('express')
const app = express()

//This is an example of middleware which doesn't set a path (which defaults to root) and calls a function
//that logs the time before passing the HTTP request on the the next function.
//NOTE: This needs to be before the next app.get middleware since that function responds to the request
//ending the chain.
app.use((req, res, next) => {
  console.log('test middleware called');
  next();
});

//app.get('/', function (req, res) {
  //res.send('Hello World')
//})

//app.get("/",(req, res) => {res.send("Hello Express")});

let indexPath = __dirname + "/index.html";
app.get("/", (req, res) => {res.sendFile(indexPath)});

let publicPath = __dirname + "/public"
app.use(express.static(publicPath));

let data1 = { name: "Oscar" };
let data2 = { name: "Jess" };
let data3 = { name: "Tofu" };

//app.get("/json", (req, res) => {res.json(data)});

process.env.MESSAGE_STYLE = "uppercase";

let jsonHandler = (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    data1.name = data1.name.toUpperCase();
  }
  res.json(data1);
}

app.get("/json1", jsonHandler);

app.get("/json2", (req, res) => {res.json(data2)});

process.env.TOFU = "true"; //the value assigned must be a string
//NOTE: While this version of NODE (10.13) would convert a boolean to a string, future versions of Node
//may throw an error. 
app.get("/json3", (req, res) => {
  if (process.env.TOFU == "true") { //true must be a string in this case
    console.log('its true');
    res.json(data3);
  } else {
    res.json(data1);
  }
});


process.env.TEST = "true";
app.get("/json", (req, res, next) => {
  if (process.env.TEST == "true") {
    res.send("test");
  } else {
    next();
  }
})

app.get("/json", (req, res) => {
  res.send("not a test");
})





app.listen(3000, () => {console.log('app is listening on port 3000')});