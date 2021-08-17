const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
    operation: {type: String, required: true},
    result: {type: String, required: true}
}, {timestamps: true});

const Calculation = mongoose.model('calculation', CalculationSchema);
module.exports = Calculation;