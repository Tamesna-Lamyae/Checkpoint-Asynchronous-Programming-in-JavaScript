// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};
connectDB();

// Task 01: Iterating with Async/Await
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const iterateWithAsyncAwait = async (values) => {
    for (const value of values) {
        await delay(1000); // Delay of 1 second
        console.log(value);
    }
};

// Example usage for Task 01
app.get('/task01', async (req, res) => {
    const values = ['A', 'B', 'C', 'D'];
    await iterateWithAsyncAwait(values);
    res.send('Task 01 completed: Values logged with a 1-second delay');
});

// Task 02: Awaiting a Call
const awaitCall = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1'); // Simulate API call
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data from API');
    }
};

// Example usage for Task 02
app.get('/task02', async (req, res) => {
    try {
        const data = await awaitCall();
        res.send({ message: 'Task 02 completed', data });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Task 05: Awaiting Parallel Calls
const parallelCalls = async (urls) => {
    try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        return responses.map(response => response.data);
    } catch (error) {
        throw new Error('Error fetching data from one or more URLs');
    }
};

// Example usage for Task 05
app.get('/task05', async (req, res) => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];
    try {
        const data = await parallelCalls(urls);
        res.send({ message: 'Task 05 completed', data });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
