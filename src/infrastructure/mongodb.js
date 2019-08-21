
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// todo it can be read from config but avoid over Engineering

exports.CreateMongoConnection = () => {
  mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => console.log('mongo connected')).catch(error => console.log(error))
}
