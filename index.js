const express = require("express");
const path = require("path");
const todolist = require("./todolist");
const app = express();
const bodyParser = require("body-parser");

let tasks = todolist.userTasks();

//Setting bodyParser extensions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setting dynamic files
app.engine("html", require("ejs").renderFile); // Rendering HTML files and setting the EJS
app.set('view engine', "html");
app.use('/public/', express.static(path.join(__dirname, 'public'))); // Setting static directory
app.set("/view", path.join(__dirname, 'views')); // Setting views directory

// Post method of website
app.post('/', (req, res) => {
    var newTask = req.body.newTask;
    tasks.push(newTask);
    res.redirect("/");
})

// Get methods from webwsite
app.get("/", (req, res) => {
    res.render('index', {
        tasks: tasks,
    }); // The parameters will interact with the html file
});

app.get("/delete/:id", (req, res) => {
    tasks = tasks.filter(function (val, index){
        if (index != req.params.id){
            return val;
        }
    })

    res.redirect("/");

});

app.listen(3300, ()=> console.log("Initializing"));




