const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./envVariables');

exports.initDatabases = () => {

mongoose.connection.on('open', () => console.log(`Database connected!`));
return mongoose.connect(DB_CONNECTION);

};