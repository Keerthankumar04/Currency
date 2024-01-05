const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'currencyConverterDB';

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
    const { amount, fromCurrency, toCurrency, convertedAmount } = req.body;

    try {
        const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        const collection = db.collection('conversions');
        const result = await collection.insertOne({
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            convertedAmount: convertedAmount,
            timestamp: new Date()
        });

        client.close();

        res.json({ message: 'Conversion data stored successfully', insertedId: result.insertedId });
    } catch (error) {
        console.error('Error inserting into MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
