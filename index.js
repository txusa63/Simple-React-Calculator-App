const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/calculations', require('./routes/calculations'));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) {
        return console.error(err);
    }
    console.log('Connected to MongoDB...')
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
