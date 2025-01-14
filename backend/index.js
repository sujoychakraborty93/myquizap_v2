import express, { json } from "express";
import {PORT, mongodbURL, SESSION_SECRET_KEY, JWT_SECRET_KEY, ORIGIN, NODE_ENV} from "./config.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import cors from "cors";
// import scoreRoutes from "./route/score.js"
import session from "express-session";
// import {quizQuestionModel} from "./models/QuizQuestionModel.js";
import {userModel} from "./models/UserModel.js";
import { quesLogModel } from "./models/QuesLogModel.js";
import { topicModel } from "./models/TopicModel.js";
import { regionModel } from "./models/RegionModel.js";
import questionsRouter from './route/questions.js';
// import {} from "../frontend/frontendui/build"


const app = express();
const COOKIE_NAME = 'auth_token';

// -- use for prod build start
import path from "path"; 
const _dirname = path.dirname("");
const buildpath = path.join(_dirname, "/frontendui/build")
if (NODE_ENV == "PROD") {
    app.use(express.static(buildpath))
}
// -- use for prod build end

app.use(express.json());
// app.use(cors({credentials: true, origin: true}))
app.use(cors({
    origin: ORIGIN,
    // origin: "http://localhost:3000", // 3000 for dev
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
// Set up session middleware
app.use(session({
    secret: SESSION_SECRET_KEY,   // Replace with a strong secret key
    resave: false,               // Do not save session if unmodified
    saveUninitialized: true,     // Save uninitialized sessions
    cookie: { maxAge: 60000 }    // Session cookie will expire in 1 minute for demonstration purposes
}));

// app.use('/score', scoreRoutes);
var skip = 0;
const limit = 20;
var ct = 0;

mongoose
    // .connect(mongodbURL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .connect(mongodbURL)
    .then(() => {
        console.log('mongodb connection successful')
    })
    .catch((err) => {
        console.log(err)
    })

// app.use(express.static(buildpath))
// app.get('/', (req, res)=>{
//     var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     console.log(ip)
//     // return res.status(200).send('welcome')
//     res.status(200).send(`you ip is: ${ip}`)
// });

// Route to start a new game for a guest
app.get('/start', (req, res) => {
    if (!req.session.score) {
        req.session.score = 0;
    }

    res.send(`Welcome Guest! Your game has started. Your current score is ${req.session.score}.`);
});


app.use('/api/questions', questionsRouter);

// Registration Route
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if user exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log("register: - ", name, email, password)

        // Create a new user
        user = new userModel({name,email,password: hashedPassword,});

        await user.save();

        // Return JWT token
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false });

        // res.status(201).json({ token });
        res.json({ id: user._id, name: user.name, email: user.email, message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login Route
// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log("login: email & p: ", email, password)
    try {
        // Check if user exists
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // console.log("logiin 1")
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // console.log("logiin 2")
        // Return JWT token
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
        // const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 });
        // var dateCookie = new Date();
        // dateCookie.setTime(dateCookie.getTime() + (60 * 1000));
        // const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: dateCookie });
        res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'strict', secure: false }); // set secure: true if you're using https 
        // console.log('Logged in successfully')
        // res.json({ token });
        res.json({ userId: user._id, name: user.name, email: user.email, message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

app.put('/api/profile', async (req, res) => {
    const { name, email  } = req.body;
    try {
        // Check if user exists
        // let user = await userModel.findOneAndUpdate({ email: email}, {name: name, email: email}, {new: true});
        let user = await userModel.updateOne({ email: email}, {name: name, email: email}, {new: true});
        return res.status(200).json(user);
    }
    catch(error) {
        console.error("/api/profile -> catch error: ",error);
        res.status(500).json({ message: 'Server error during profile update' });
    }
});

// Check if the user is logged in
app.get('/api/check-auth', (req, res) => {
    // console.log("check-auth token body: ", req.cookies)
    // const token = req.cookies.token;
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET_KEY);
        // console.log("in check-auth, got user: ", user)
        res.json({ loggedIn: true, user });
    } catch (error) {
        res.status(500).json({ loggedIn: false });
    }
});

// Logout Route
app.post('/api/logout', async (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    const userId = req.body.userId;
    // await quesLogModel.findOneAndDelete({ userId: userId });
    await quesLogModel.deleteMany({ userId: userId });
    res.clearCookie(COOKIE_NAME, {httpOnly: true, secure: true, sameSite: 'strict'}); // set secure: false if you're using http and not https
    res.cookie(COOKIE_NAME, "", {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res.cookie('token', "", {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    req.session.destroy(err => {
        if (err) return res.status(500).send('Error logging out');
        // res.status(200).send('Logout successful');
        // console.log("logout - cookie: ", req.cookies)
        res.status(200).json({ message: 'Logout successful' });
    })
});

// Forgot Password Route (simplified, should send an email in real scenarios)
app.post('/api/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Simulate sending a reset link
        // res.json({ message: 'Reset link sent to email (simulated)' });
        res.json({ message: 'Reset link sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error in forgot password', error });
    }
});


// Middleware to verify token
const verifyToken = (req, res, next) => {
    // const token = req.cookies.token;
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(403).json({ message: 'Token is required' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.user = decoded;
      next();
    });
  };


// User endpoint
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during user search' });
    }
});

// Insert Log Question & User Route
app.post('/api/queslog', async (req, res) => {
    const { userId, quesId } = req.body;
    
    try {
        // Create a new user log document 
        let queslog = new quesLogModel({userId, questionId:quesId});
        await queslog.save();
        res.status(201).json({ message: 'Ques_Log_Collection udpated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during Ques_Log_Collection update' });
    }
});

// get all topics from topic table
app.get('/api/topics', async (req, res) => {
    try {
        const topics = await topicModel.find({});
        // console.log("/api/topics checking count of execution: ", ct)
        ct += 1
        res.status(200).json(topics)
    }
    catch(error) {
        res.json("error in /api/topic/s: ", error)
    }
});

// get all regions from region table
app.get('/api/regions', async (req, res) => {
    try {
        const regions = await regionModel.find({});
        res.status(200).json(regions)
    }
    catch(error) {
        res.json("error in /api/regions/: ", error)
    }
});

// validation of correct result will happen at front end. React code will check if the answer is correct 
// and then call this api with score i.e. add a 'question attempt' and 'add/not-add 1 score'. 
// Route to update the score 
app.post('/api/updatescore', async (req, res) => {
    const { additionalscore, questionsattempted } = req.body;
    const userId = req.user.id; // Assuming user ID is obtained from session/auth middleware
    
    try {
        const user = await userModel.findOne({ userId });
        if (user) {
            user.score += additionalscore;
            user.questions_attempted += questionsattempted;
            await user.save();
        } else {
            const newUser = new userModel({ userId, name: 'NAME', email: 'EMAIL', 
            password: 'PASSWORD', score: totalScore, questions_attempted: questionsattempted });
            await newUser.save();
        }

        res.status(200).send('Scores updated successfully');
    } catch (error) {
        console.error('Error updating scores:', error);
        res.status(500).send('Error updating scores');
    }
    
    
    
    
    if (typeof points === 'number' && typeof questionsattempted === 'number') {
        // req.session.score = (req.session.score || 0) + points;
        const updateScore = await 
        res.send(`Your score has been updated. Your new score is ${req.session.score}.`);
    } else {
        res.status(400).send('Invalid points value');
    }
});

// Route to get the current score
app.get('/score', (req, res) => {
    res.send(`Your current score is ${req.session.score}.`);
});

// Route to reset the score
app.get('/reset', (req, res) => {
    req.session.score = 0;
    res.send('Your score has been reset.');
});

// example of different query
// const q = await quizQuestionModel.find({
//     $and: [{$or: [{topic: {$in: [topic] }}, {qty :{$gt: 50}}]},
//       {$or: [{region: region}, {price: {$lt: 5 }}]}]})

app.listen(PORT, () => {
    console.log(`listening to Port: ${PORT}`);
});
