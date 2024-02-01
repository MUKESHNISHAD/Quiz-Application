const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/Quiz';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  type:String
},{ versionKey: false });

// Create model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



async function createUser(name, email, pass,type='user') {
    const user = new User({ name, email, pass,type });
    const result = await user.save();
    return result;
}



async function findUsers(email) {
    const users = await User.find({email:email});
    return users;
}

async function readUsers(email,pass) {
    const users = await User.find({email:email,pass:pass});
    return users;
}

module.exports ={
    createUser,
    findUsers,
    readUsers
}