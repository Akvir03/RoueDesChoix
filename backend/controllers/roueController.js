const Wheel = require('../models/roueModel'); // Assurez-vous que le chemin est correct
const Restaurant = require('../models/RestaurantModel'); // Assurez-vous que le chemin est correct

const wheelController = {
  // Créer une nouvelle roue
  createWheel: async (req, res) => {
    try {
      const { name } = req.body;
      const newWheel = new Wheel({
        name,
        restaurants: [] // Initialiser avec un tableau vide de restaurants
      });
      await newWheel.save();
      res.status(201).json(newWheel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Ajouter un restaurant à la roue
  addRestaurantToWheel: async (req, res) => {
    try {
      const wheelId = req.params.wheelId
      const restaurantId = req.params.restaurantId; // Ids passés via l'URL
      const wheel = await Wheel.findById(wheelId);
      if (!wheel) {
        return res.status(404).json({ message: 'Wheel not found' });
      }
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      // Ajouter le restaurant s'il n'est pas déjà dans la roue
      if (!wheel.restaurants.includes(restaurantId)) {
        wheel.restaurants.push(restaurantId);
        await wheel.save();
      }
      res.json(wheel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addRestaurantToWheelByName: async (req, res) => {
    try {
      const { wheelId, name } = req.body; // Récupération depuis le corps de la requête
      console.log(wheelId, name);
      // Trouver la roue par son ID
      const wheel = await Wheel.findById(wheelId);
      console.log(wheel);
      if (!wheel) {
        return res.status(404).json({ message: 'Wheel not found' });
      }
  
      // Trouver le restaurant par son nom
      const restaurant = await Restaurant.findOne({ name: name });
      console.log(restaurant);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Vérifier si l'ID du restaurant est déjà dans la roue avant de tenter d'ajouter
      const isRestaurantAlreadyInWheel = wheel.restaurants.includes(restaurant._id);
      console.log(isRestaurantAlreadyInWheel);
      if (!isRestaurantAlreadyInWheel) {
        wheel.restaurants.push(restaurant._id); // Ajouter l'ID du restaurant
        await wheel.save();
      }
      else{
        return res.status(400).json({ message: 'Restaurant Already exist' });

      }
  
      res.json(wheel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  // Retirer un restaurant de la roue
  removeRestaurantFromWheel: async (req, res) => {
    try {
      const { wheelId, restaurantId } = req.params;
      const wheel = await Wheel.findById(wheelId);
      if (!wheel) {
        return res.status(404).json({ message: 'Wheel not found' });
      }
      // Retirer le restaurant du tableau
      wheel.restaurants = wheel.restaurants.filter(id => id.toString() !== restaurantId);
      await wheel.save();
      res.json(wheel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  removeRestaurantFromWheelByName: async (req, res) => {
    try {
      const { wheelId, name } = req.params;
      const wheel = await Wheel.findById(wheelId);
      if (!wheel) {
        return res.status(404).json({ message: 'Wheel not found' });
      }
      // Retirer le restaurant du tableau
      wheel.restaurants = wheel.restaurants.filter(id => id.toString() !== name);
      await wheel.save();
      res.json(wheel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Sélectionner un restaurant aléatoirement dans la roue
  spinWheel: async (req, res) => {
    try {
      const { wheelId } = req.params;
      const wheel = await Wheel.findById(wheelId).populate('restaurants');
      if (!wheel || wheel.restaurants.length === 0) {
        return res.status(404).json({ message: 'Wheel not found or no restaurants in the wheel' });
      }
      const randomIndex = Math.floor(Math.random() * wheel.restaurants.length);
      const selectedRestaurant = wheel.restaurants[randomIndex];
      res.json(selectedRestaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = wheelController;
