const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAnswer, listAnswers, voteAnswer } = require('../controllers/answerController');

router.get('/:questionId', listAnswers);          // list answers for a question
router.post('/', auth, createAnswer);            // post new answer
router.post('/vote/:answerId', auth, voteAnswer); // upvote/downvote

module.exports = router;
