const Restaurant = require('../models/RestaurantModel'); // Assurez-vous que le chemin vers votre modèle est correct
const bcrypt = require('bcrypt'); // Used for password comparison
const crypto = require('crypto');
const { stringify } = require('querystring');
// const bcrypt = require('bcrypt'); // Used for password comparison
// const crypto = require('crypto');
// const{ decryptField, encryptField} = require('../controllers/functionNeeded');
// const { stringify } = require('querystring');
const BASE_ERROR = "BACK ERROR"



const RestaurantController = {
  // Créer un nouveau restaurant
  createRestaurant: async (req, res) => {
    const { name, cuisine, address, rating } = req.body;
    try {
      const newRestaurant = new Restaurant({
        name,
        cuisine,
        address,
        rating,
        added_by: req.user.id, // Assurez-vous d'avoir une manière d'identifier l'utilisateur, par exemple via l'authentification
      });
      const savedRestaurant = await newRestaurant.save();
      res.status(201).json(savedRestaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createRestaurantJSON: async(restaurantData) => {
    const { name, cuisine, address, rating, added_by, approved } = restaurantData;
    try {
      const newRestaurant = new Restaurant({
        name,
        cuisine,
        address,
        rating,
        added_by,
        approved
      });
      const savedRestaurant = await newRestaurant.save();
      console.log(savedRestaurant);
      return savedRestaurant;
    } catch (error) {
      throw error; // Or send an HTTP response if called in an Express route
    }
  },

  // Lire tous les restaurants
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lire un seul restaurant par ID
  getRestaurantById: async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (restaurant) {
        res.json(restaurant);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Mettre à jour un restaurant
  updateRestaurant: async (req, res) => {
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedRestaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Supprimer un restaurant
  deleteRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
      if (restaurant) {
        res.json({ message: 'Restaurant deleted successfully' });
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = RestaurantController;





