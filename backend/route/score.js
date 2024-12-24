// routes/post.js
// const express = require('express');
import express from "express"
const router = express.Router();

// Dummy data for demonstration
let scores = [
    { user_id: 1, ip: '1:1:1:1', score: 2, questions_attempted:5, level: 1},
    { user_id: 2, ip: '1:1:1:1', score: 3, questions_attempted:10, level: 1}
];

// Get all scores
router.get('/', (req, res) => {
    res.json(scores);
});

// Get a specific post by id
router.get('/:user_id', (req, res) => {
    const userid = parseInt(req.params.user_id);
    const score = scores.find(s => s.user_id === userid);
    if (score) {
        res.json(score);
    } else {
        res.status(404).json({ message: 'User score not found' });
    }
});


// Create a new post
router.post('/', (req, res) => {
    const newScore = {
        user_id: scores.length + 1,
        ip: req.body.ip,
        score: req.body.score,
        questions_attempted: req.body.questions_attempted,
        level: Math.floor(parseInt(req.body.questions_attempted)/20)
    };
    scores.push(newScore);
    res.status(201).json(newScore);
});

// Update a post by id
router.put('/:user_id', (req, res) => {
    const userid = parseInt(req.params.user_id);
    const score = scores.find(s => s.user_id === userid);
    if (score) {
        score.ip = req.body.ip || score.ip;
        score.score = req.body.score || score.score;
        res.json(score);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

// Delete a post by id
router.delete('/:user_id', (req, res) => {
    const userid = parseInt(req.params.user_id);
    score = scores.filter(s => s.id !== userid);
    res.status(204).end();
});

// module.exports = router; /type=commonjs expression
export default router; //type=module ESM expressoin
