const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController'); // Assurez-vous que le chemin est correct

// Route pour créer un restaurant
router.post('/create', RestaurantController.createRestaurant);


// Route pour obtenir tous les restaurants
router.get('/getAll', RestaurantController.getAllRestaurants);

// Route pour obtenir un restaurant par ID
// How to use /:id in the frontend:  axios.get(`http://localhost:80/api/themes/${id}`)s
router.get('/:id', RestaurantController.getRestaurantById);

// Route pour mettre à jour un restaurant
router.put('/:id', RestaurantController.updateRestaurant);

// Route pour supprimer un restaurant
router.delete('/:id', RestaurantController.deleteRestaurant);

module.exports = router;
