/*

This file explores the basics of Node and Express.



NODE.JS: Node.js is a JavaScript tool that allows developers to write backend (server-side) programs in
JavaScript. Node.js comes with built-in modules (small, independent programs) that help facilitate this
purpose.

Core built-in modules:

http: a module that acts as a server.

fs (File System): a module that reads and modifies files.

path: a module for working with directory and file paths.

assert (Assertion Testing): a module that checks code against prescribed constraints.


Node.js Global Objects: objects that are available in all modules.

__dirname: The direstory name of the current module.
NOTE: this is used similarly to process.cwd() but is slightly different.

process: provides information about, and control over the current Node.js process.

process properties:

process.env: The process.env property returns an object containing the user environment.

process methods:

process.cwd(): returns the current working directory of the Node.js process.
NOTE: this is used similarly to __dirname but is slightly different.



---
IncomingMessage object:

message.headers: The request/response headers object containing key-value pairs of header names and values.




EXPRESS: Express is a popular module/library/framework that runs between the server created by Node.js and the
frontend pages of a web application. Express also handles an application's routing. Routing directs users to the
correct page based on their interaction with the application.


Express middleware: Express middleware are functions that execute during the lifecycle of a request to the
Express server. Each middleware has access to the HTTP request and response for each route (or path) it's
attached to. Express middleware can either terminate the HTTP request or pass it on to another middleware
function using next. This is called chaining middleware.
Syntax: function(req, res, next) {...};

Chaning middleware: Express middleware can be chained (also called creating a middleware sub-stack) when
being mounted. This is useful to split server operations into smaller units for better app structure and
the possibility to reuse code indifferent places. This process, known as the request-response cycle, can
be stopped by a middlware responding to a request or passing the request with next(). In the case of
middleware mounted using app.METHOD(), next("route") can be called to terminate the call stack and pass
the request on to the next route.
NOTE: There is at least 1 other way to terminate the request-response cycle (pass to error handler).
EX:
app.use((req, res, next) => {...; next()}, (req, res, next) {...; next()});


Built in middleware methods:

express.static: Serves static files.
Syntax: express.static(root, [options])
EX:
//This serves assets in the /public directory. These assets will appear mounted to the root directory.
app.use(express.static(__dirname + "/public"))

express.json: Parses incoming reqests with JSON payloads and is based on body-parser.
Syntax: express.json([options]);

express.urlencoded: Parses incoming requests with urlencoded payloads and is based on body-parser.
Syntax: express.urlencoded([options]);

express.Router: Creates a new router object.
Syntax: express.Router([options]);



APP OBJECT: The app object conventionally denotes the Express application.

App Methods:

app.listen: The app.listen() method tells your server to listen on a given port, putting it in a running state.
NOTE: This method is identical to Node's http.Server.listen().
Syntax: app.listen([port[, host[, backlog]]][, callback])
EX:
//This tells the server to listen to port 3000 and includes a callback function that logs a message to the console.
app.listen(3000, () => {console.log('app is listening on port 3000')});

app.use(): The app.use() method mounts middleware function(s) at a specified path.
NOTE: If path is omitted, it defaults to root.
Syntax: app.use([path,] callback [, callback...])
EX:
//This calls a function that logs a meggage before passing on to next whenever an HTTP request is made
//on the root path.
app.use((req, res, next) => {
  console.log("middleware called");
  next();
});

app.METHOD(): Routs an HTTP Routes an HTTP request, where METHOD is the HTTP method of the request, such as GET,
PUT, POST, etc., in lowercase. Thus, the actual methods are app.get(), app.post(), app.put(), etc.
Syntax: app.METHOD(path, callback [, callback ...]);

app.route(): Returns an instance of a single route, which can then be used to handle HTTP verbs with optional
middleware. app.route() can avoid duplicate route names (and thus typo errors).
Syntax: app.route(path);



ROUTING: Routing refers to how an application's endpoints (URIs) respond to client requests.


Routing Methods: Routing methods route http requests. There are many, but the most common are get and post.
These routing methods specify a callback (handler functions) called when the application recieves a request
to the specified route (endpoint) and HTTP method.
Syntax: app.METHOD(PATH, HANDLER) or app.METHOD(path, callback [, callback ...])
METHOD is an http method in lowercase, PATH is a relative path on the server, and HANDLER is a route handler
function that Express calls when the route is matched.

app.get(): Routes HTTP GET requests to the specified path with the specified callback functions.
Syntax: app.get(PATH, HANDLER) or app.get(path, callback)

app.post(): Routes HTTP POST requests to the specified path with the specified callback functions.
Syntax: app.post(path, callback [, callback ...]);


Route Paths: Route paths, in combination with a request method, define the endpoints at which requests can
be made.


Route handlers: Route handler functions are middleware called when a route method's PATH is matched and take
a request object and response object as parameters.


Route Parameters: Route parameters are named URL segments that are used to capture the value specified at their
positon in the URL. The captured values are populated in the req.params object, with the name of the route
parameter specified in the path as their respective keys.
EX:
Route path: /users/:userId/names/:name
Request URL: http://localhost:3000/users/1/names/oscar
req.params: {"userId": "1", "name": "oscar"}



REQUEST OBJECT (req): the req object represents the HTTP request and has properties for the request query
string, parameters, body, HTTP headers, etc.


Request object properties:

req.body: Contains key-value pairs of data submitted in the request nody. By default, it is undefined,
and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().

req.params: An object containing properties mapped to the named route parameters.

req.query: An object containing a property for each query string parameter in the route. If there is no query
string it is an empt object ({}).
NOTE: Query strings (or query components) are a URi standard outside the scope of Node and Express. These begin
with a ? and, by convention, include field=value couples seperated by an ampersand (&).
EX:
Route path: '/name'
Request URL: '/name?first=oscar&last=f' 
req.query: {first: 'oscar', last: 'f'}

req.ip: Contains the remote IP address of the request.

req.method: Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, etc.

req.path: Contains the path part of the request URL.



RESPONSE OBJECT (res): The res object represents the HTTP response that an Express app sends when it gets an
HTTP request.


Response object methods:

res.send: Sends the HTTP response.
Syntax: res.send(body);

res.sendFile: Transfers the file at the given path. The path argument must be an absolute path to the file.
Syntax: res.sendFile(path [, options] [, fn])

res.json: Sends a JSON response. This method converts the parameter to a JSON string using JSON.stringify().
Syntax: res.json(body);

res.end: Ends the response process without any data.
NOTE: this method comes from Node core (response.end() method fo http.ServerResponse).




BODY PARSER: Body parser is a middleware that parses incoming request bodies before handlers, and makes them 
available under the req.body property. This packaage has 4 middlewares which parse JSON, raw, text, and
URL-encoded form. Body parser basically intercepts these types of request bodies and parses them before
populating the req.body property with the result for access within routes. The req.body property would not
be accessible without parsing the raw content of an HTTP post request.
NOTE: WHILE BODY PARSER WAS REMOVES FROM CORE EXPRESS, IT HAS SINCE BEEN RE-ADDED. THIS ELIMINATES THE NEED
TO INSTALL IT AS A SEPERATE PACKAGE.
EX1:
//This example shows how to incorporate body parser when it was removed from core Express.
const bodyParser = require('body-parser');
//This parses application/x-www-form-urlencoded body types for all requests.
//NOTE: extend: false is an option that defaults to true but has been deprecated as JSON does it better.
app.use(bodyParser.urlencoded({ extended: false }))
//This parses application/json body types for all requests.
app.use(bodyParser.json())
EX2:
//This example shows how to use body-parser with body-parser included in core Express.
//This parses application/x-www-form-urlencoded body types for all requests.
//NOTE: extend: false is an option that defaults to true but has been deprecated as JSON does it better.
app.use(express.urlencoded({ extended: false }))
//This parses application/json body types for all requests.
app.use(express.json())




COMMON TASKS:

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
//This sets an environment variable, then mounts middleware on the "/json" route that checks if
//the environment variable is set to "true" and serves "test" if so, otherwise calls next.
process.env.TEST = "true";
app.get("/json", (req, res, next) => {
  if (process.env.TEST == "true") {
    res.send("test");
  } else {
    next();
  }
})

Get query parameter input from client:
//Assumes ?first=<firstname>&last=<lastname>
app.get('/name', (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  res.send(first + ' ' + last);
})






*/

//import express from 'express';
const express = require('express');
const app = express();



//This is an example of middleware which doesn't set a path (which defaults to root) and calls a function
//that logs the time before passing the HTTP request on the the next function.
//NOTE: This needs to be before the next app.get middleware since that function responds to the request
//ending the chain.
app.use((req, res, next) => {
  console.log('test middleware called');
  next();
});

//This is used to parse instead of body-parser
app.use(express.urlencoded({extended: false}));


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


//This is an example of chaining middleware.
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res, next) => {
  res.json({time: req.time});
});

//This mounts a chain of middleware to '/user/:id' that ckecks if id is 0 and passes the request to the
//next route if so, otherwise passes to the next middleware in the chain which sends 'regular'.
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})
// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})


//This uses a route parameter (:param) and serves it by accessing req.params.
app.get("/:word/echo/", (req, res) => {
  res.send(req.params.word);
})

/*
//The following example makes these examples redundant. 

//This uses query parameters (?param=value&param=value) and serves their values.
//NOTE: A working query would be: /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  res.send(first + ' ' + last);
})


//This mounts a post handler to the "/name" path that serves parameters from req.body (which is
//parsed by body-parser).
app.post("/name", (req, res) => {
  console.log(req.body);
  let first = req.body.first;
  let last = req.body.last;
  res.send(first + " " + last);
})
*/

//This example uses app.route() to handle get and post for '/name', replicating the functionlaity of the
//examples above with the exception of changing the res to json.
app.route('/name')
  .get((req, res) => {
    res.json({first: req.query.first, last: req.query.last});
  })
  .post((req, res) => {
    res.json({first: req.body.first, last: req.body.last});
  })



//This route uses a request parameter to eventually respond with a JSON. The handler tests the parameter before
//assigning an in-scope variable to a new Date object that is either the current date or a date set from the
//parameter which may be parsed as an integer depending on if it contained any non-number characters to begin
//with. Finally, the hadler responds with JSON that is set according to the value of the in-scope variable.
app.get("/api/timestamp/:date?", (req, res) => {
  let date;
  if (req.params.date !== undefined) {
    if (isNaN(req.params.date)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(parseInt(req.params.date));
    }
  } else {
    date = new Date(Date.now());
  }
  var response = date == "Invalid Date" ?
      { error: "Invalid Date" } :
      {
        "unix": date.getTime(),
        "utc": date.toUTCString()
      };
  res.json(response);
});


//This responds with a JSON object containing an ip address and information from the Node core property headers.
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,
    languege: req.headers["accept-language"],
    software: req.headers["user-agent"]
  })
})


app.listen(3000, () => {console.log('app is listening on port 3000')});