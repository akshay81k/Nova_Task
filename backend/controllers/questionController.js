const Question = require('../models/Question');
const User = require('../models/User');

exports.createQuestion = async (req, res) => {
  try {
    const { title, body } = req.body;
    const question = new Question({
      title,
      body,
      author: req.user.id
    });
    await question.save();
    await question.populate('author', 'name');

    // we expect server.js to emit socket event when this controller is used (we pass io via req.app)
    const io = req.app.get('io');
    if (io) {
      io.emit('newQuestion', {
        _id: question._id,
        title: question.title,
        body: question.body,
        author: question.author,
        createdAt: question.createdAt,
        answersCount: question.answersCount
      });
    }

    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.listQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('author', 'name');
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
