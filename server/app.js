let express = require('express');
const app = express();
const sequelize = require("./db");
let movies = require("./controllers/moviescontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();

app.use("/movies", movies);

app.use("/user", user);

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});
//develop