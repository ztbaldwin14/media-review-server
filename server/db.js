const  Sequelize  = require('sequelize');

const sequelize = new Sequelize("movie-review", "postgres", "password", {
    host: "localhost",
    dialect: "postgres",
  });

  sequelize.authenticate().then(
    
    function () {

       console.log('Connection has been established successfully.');    
    },
    
    function (err) {
      console.log('Unable to connect to the database:', err);

    }
  );

  module.exports = sequelize;