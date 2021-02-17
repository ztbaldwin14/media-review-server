require("dotenv").config()
let express = require('express');
let app = express();
let sequelize = require("./db");

let movies = require("./controllers/moviescontroller");
// let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(require("./middleware/headers"))
app.use(express.json());


app.use("/movies", movies);

// app.use("/user", user);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});
