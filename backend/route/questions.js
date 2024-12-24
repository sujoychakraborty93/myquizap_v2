// routes/questions.js
// const express = require('express');
import express from "express";
import {quizQuestionModel} from "../models/QuizQuestionModel.js";
// const Question = require('../models/Question'); // Import your Question model
const router = express.Router();
var skip = 0;
const limit = 20;

// Endpoint to get the first question by topic and region
// router.get('/all', async (req, res) => {
//     try {
//         const qs = await quizQuestionModel.find({})
//         if (qs){
//             console.log('first question is here', qs.length)
//             res.status(200).setHeader("count",qs.length).json(qs);
//         } 
//     }
//     catch (error) {
//         res.status(500).json({ message: 'An error occurred while fetching the question.', error });
//     }
// });

// router.get('/', async (req, res) => {
//     try {
//         const { topic, region } = req.query;
//         console.log(topic, region)
//         const question = await quizQuestionModel.find({
//             topic: { $in: [topic] },
//             region: region
//         }).skip(skip).limit(limit);
//         // const question = await quizQuestionModel.findOne({})
//         skip += limit;
        
//         if (question.length === 0) {
//             question = await quizQuestionModel.find({ 
//                 topic: { $in: [topic] },
//                 region: region
//              }).limit(limit);
//         }
        
//         if (question) {
//             console.log('question is here')
//             // res.status(200).json(question);
//             res.status(200).setHeader("count",question.length).json(question);
//             // res.status(200).setHeader("count",qs.length).json(qs);
//         } else {
//             console.log('no question')
//             res.status(404).json({ message: 'select a different topic or region' });
//         }
//     } 
//     catch (error) {
//         res.status(500).json({ message: 'An error occurred while fetching the question.', error });
//     }
// });

// Fetch questions based on topics and regions
router.post('/', async (req, res) => {
    const { topics, regions } = req.body;
    // console.log("backend-> questions.js 0: ", req.body)
    // console.log("backend-> questions.js 0: ", topics, regions)
    try {
        // Construct the query based on topics and regions
        var query = {};
        // if (topics && topics.length > 0) query.topic = { $in: topics };
        // if (regions && regions.length > 0) query.region = { $in: regions };

        var q1 = {}; 
        var q2 = {};
        var q = []
        if (topics && topics.length > 0) {
            q1.topic = { $in: topics };
            q.push(q1)
        };
        if (regions && regions.length > 0) {
            q2.region = { $in: regions };
            q.push(q2)
        };
        if (q.length > 0) {
            query['$or'] = q;
        }
        

        // Fetch 5 questions from the database based on the query
        // console.log("backend-> questions.js 1: ", query)
        var questions = await quizQuestionModel.find(query).skip(skip).limit(limit);
        // console.log("backend-> questions.js 2: ", questions)
        if (questions.length === 0) {
            questions = await quizQuestionModel.find(query).limit(limit);
        }
        skip += limit;
        res.setHeader("count",questions.length).json(questions);
    } 
    catch (error) {
        res.status(500).json({'error while fetching /api/questions: ': error});
    }
});
router.post('/allfiltered', async (req, res) => {
    const { topics, regions } = req.body;
    try {
        // Construct the query based on topics and regions
        const query = {};
        // if (topics && topics.length > 0) query.topic = { $in: topics };
        // if (regions && regions.length > 0) query.region = { $in: regions };
        var q1 = {}; 
        var q2 = {};
        var q = []
        if (topics && topics.length > 0) {
            q1.topic = { $in: topics };
            q.push(q1)
        };
        if (regions && regions.length > 0) {
            q2.region = { $in: regions };
            q.push(q2)
        };
        query['$or'] = q;

        // Fetch 5 questions from the database based on the query
        const questions = await quizQuestionModel.find(query);
        res.setHeader("count",questions.length).json(questions);
    } 
    catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the question /api/questions/allfiltered: ', error });
    }
});
  

// module.exports = router;
export default router;
