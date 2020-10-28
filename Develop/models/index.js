
//this enables "strict made" that makes your coding more seucre and changes simple syntax problems into real errors.
'use strict';
//this connects to fs so that you can have access to the file system.
var fs        = require('fs');
//this connects to path so that you can have access to using file paths.
var path      = require('path');
//this calls up Sequelize so that we can utilize their orm system.
var Sequelize = require('sequelize');
//this returns the name of a file in the file path
var basename  = path.basename(module.filename);
//this enables development mode for Express and changes the way they handle errors.
var env       = process.env.NODE_ENV || 'development';
//this changes what aspects of the logins for config.json to use and the [env] changes to decide which one to use.
var config    = require(__dirname + '/../config/config.json')[env];
// this is where the database is stored.
var db        = {};

//if the enviroment variable for config.json is true or one provided by JAWSDB for example.
if (config.use_env_variable) {
 // then the sequelize variable will be the new given enviroment
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  //otherwise
} else {
  //this will be used to get the database name, username, password from config.json for the current enviroment.
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}
//this enables you to access/manipulate the file system.
fs
//This reads from directories in a synchronys way for the variable defined in _dirname.
  .readdirSync(__dirname)
  //this is a function that filters out a specific file with certain set parameters.
  .filter(function(file) {
    //This is the parameters for the file being chosen. What it means is the "." is essentially open parameters that don't equal zero
    //AND the file cannot equal the model.filename AND the third element from the end of the array of files is a  ".js" file.
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  //this will iterate through each element in the file array
  .forEach(function(file) {
    // this creates a  variable of "model" that is defined by sequelize importing the correct model name.
    var model = sequelize['import'](path.join(__dirname, file));
    //this defines the db model that has the element of the name of the model and defines it as just model
    db[model.name] = model;
  });
//this creates an array of keys of the model objects and iterates betweem each one.
Object.keys(db).forEach(function(modelName) {
  //if the model name is associae is true
  if (db[modelName].associate) {
    //associate the model name with the database model.
    db[modelName].associate(db);
  }
});

//this defines lowercase db.sequelize as being just lowercase sequelize when being used on other files
db.sequelize = sequelize;
//this defines uppercase db.Sequelize as being just uppercase sequelize when being used on other files.
db.Sequelize = Sequelize;

//this exports this a db
module.exports = db;
