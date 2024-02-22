const express = require('express');
const roueController = require('../controllers/roueController');
const authenticateToken = require('../controllers/functionNeeded');
const Restaurant = require('../models/RestaurantModel');
const router = express.Router();

router.get('/hello', (req, res) => {
    res.send('hello');
});
router.get('/spin', async (req, res) => {
    try {
      // Compter le nombre total de restaurants
      const count = await Restaurant.countDocuments();
      // Générer un index aléatoire
      const random = Math.floor(Math.random() * count);
      // Sélectionner un restaurant aléatoirement
      const randomRestaurant = await Restaurant.findOne().skip(random);
      res.json(randomRestaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Route pour créer une nouvelle roue
router.post('/wheels', roueController.createWheel);

// Route pour ajouter un restaurant à une roue
router.put('/wheels/:wheelId/restaurants/:restaurantId', roueController.addRestaurantToWheel);

router.put('/wheels/restaurantsName', roueController.addRestaurantToWheelByName);


// Route pour retirer un restaurant d'une roue
router.delete('/wheels/:wheelId/restaurants/:name', roueController.removeRestaurantFromWheel);

//

module.exports = router;
