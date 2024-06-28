const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./config/connect')
const cors = require('cors')


const dotenv = require('dotenv')

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: '30mb', extended: true }));

app.use('/contact', contactRoute);
app.use('/leaderboard', leaderboardRoute);
app.use('/users', userRoute);
app.use('/event', eventRoute);
app.use('/admin', adminRoute);

app.use('/', (req, res) => {
    res.send("Server is running 🤯")
})

app.listen(5000, () => {
    console.log('server is running at port 5000');
})