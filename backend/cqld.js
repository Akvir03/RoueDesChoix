const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/userModel');
// const Connection = require('./models/connectionModel');
const{ decryptField} = require('./controllers/functionNeeded');
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

const userController = require('./controllers/userController');
const themeController = require('./controllers/restaurantController');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const NUM_USERS = 100;
const NUM_THEMES = 100;
const NUM_WORDS = 100;
const NUM_CONNECTIONS = 100;

async function createUsers() {
  const users = Array.from({ length: NUM_USERS }).map(() => ({
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    role: faker.random.arrayElement(['admin', 'user']),
    created_at: faker.date.past(),
    last_login: faker.date.recent(), 
    otp_number : '0'
  }));

  for(let user of users){
    await userController.createUser(user);
  }


}

async function generateData() {
  await createUsers();
  await createThemes();

  mongoose.connection.close();
}

generateData();
