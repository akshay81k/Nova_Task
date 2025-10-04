const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createQuestion, listQuestions } = require('../controllers/questionController');

router.get('/', listQuestions);
router.post('/', auth, createQuestion);

module.exports = router;
