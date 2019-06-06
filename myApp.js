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


Express: Express is a popular module/library/framework that runs between the server created by Node.js and the
frontend pages of a web application. Express also handles an application's routing. Routing directs users to the
correct page based on their interaction with the application.


Express methods: Some common Express methods are listen(), get(), and post().


App object: The app object conventionally denotes the Express application.

App Methods:

Listen method: The listen() method tells your server to listen on a given port, putting it in a running state.
NOTE: This method is identical to Node's http.Server.listen().
Syntax: app.listen([port[, host[, backlog]]][, callback])
EX:
//This tells the server to listen to port 3000 and includes a callback function that logs a message to the console.
app.listen(3000, () => {console.log('app is listening on port 3000')});


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


Express middleware: Express middleware are functions that execute during the lifecycle of a request to the
Express server. Each middleware has access to the HTTP request and response for each route (or path) it's
attached to. Express middleware can either terminate the HTTP request or pass it on to another middleware
function using next. This is called chaining middleware.
Syntax: 





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





*/

//import express from 'express';
const express = require('express')
const app = express()

//This is an example of middleware which doesn't set a path (which defaults to root) and calls a function
//that logs the time before passing the HTTP request on the the next function.
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

//app.get('/', function (req, res) {
  //res.send('Hello World')
//})

//app.get("/",(req, res) => {res.send("Hello Express")});

let indexPath = __dirname + "/index.html";
app.get("/", (req, res) => {res.sendFile(indexPath)});

let publicPath = __dirname + "/public"
app.use(express.static(publicPath));

let data = {
  name: "Oscar"
}

//app.get("/json", (req, res) => {res.json(data)});

process.env.MESSAGE_STYLE = "uppercase";
console.log(process.env.MESSAGE_STYLE);

let jsonHandler = (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    data.name = data.name.toUpperCase();
  }
  res.json(data);
}

app.get("/json", jsonHandler);




app.listen(3000, () => {console.log('app is listening on port 3000')});