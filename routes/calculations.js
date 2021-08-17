const express = require('express');
const router = express();
const Calculation = require('../models/Calculation');

router.get('/', async (req, res) => {
    try {
        const calculations = await Calculation.find();
        res.status(200).json(calculations);
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

router.post('/save', async (req, res) => {
    try {
        const {operation, result} = req.body;

        const newCalculation = new Calculation({operation, result});

        const savedCalculation = await newCalculation.save();
        res.json(savedCalculation);
     } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message})
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await Calculation.deleteMany({});
        res.json();
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message})
    }
})

module.exports = router;