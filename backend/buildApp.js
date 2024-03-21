const mongoose = require('mongoose');
const faker = require('faker');
// const User = require('./models/userModel');
// const restaurantTheme = require('./models/RestaurantModel');
// const Word = require('./models/wordModel');
// const Connection = require('./models/connectionModel');

const userController = require('./controllers/userController');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const NUM_USERS = 1;
const NUM_RESTAURANTS = 1;

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
  await createRestaurants();

  mongoose.connection.close();
}

generateData();
