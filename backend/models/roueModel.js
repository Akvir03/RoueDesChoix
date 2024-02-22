const mongoose = require('mongoose');

const WheelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants'
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour gérer la mise à jour de `updated_at` lors d'une modification
WheelSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Wheel', WheelSchema);
