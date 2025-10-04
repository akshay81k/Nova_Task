const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.createAnswer = async (req, res) => {
  try {
    const { questionId, body } = req.body;
    if (!questionId || !body) return res.status(400).json({ message: 'Missing fields' });

    const answer = new Answer({
      question: questionId,
      body,
      author: req.user.id
    });
    await answer.save();
    await answer.populate('author', 'name');

    // increment answer count in question
    await Question.findByIdAndUpdate(questionId, { $inc: { answersCount: 1 } });

    // emit realtime event
    const io = req.app.get('io');
    if (io) {
      io.emit('newAnswer', {
        _id: answer._id,
        question: questionId,
        body: answer.body,
        author: answer.author,
        votes: answer.votes,
        createdAt: answer.createdAt
      });
    }

    res.status(201).json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.listAnswers = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ question: questionId })
      .sort({ createdAt: -1 })
      .populate('author', 'name');
    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// exports.voteAnswer = async (req, res) => {
//   try {
//     const { answerId } = req.params;
//     const { type } = req.body; // 'up' or 'down'
//     if (!['up', 'down'].includes(type)) return res.status(400).json({ message: 'Invalid vote type' });

//     const answer = await Answer.findById(answerId);
//     if (!answer) return res.status(404).json({ message: 'Answer not found' });

//     answer.votes += type === 'up' ? 1 : -1;
//     await answer.save();
//     await answer.populate('author', 'name');

//     const io = req.app.get('io');
//     if (io) {
//       io.emit('voteUpdated', {
//         _id: answer._id,
//         question: answer.question,
//         votes: answer.votes
//       });
//     }

//     res.json(answer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };


exports.voteAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const { type } = req.body; // 'up' or 'down'
    const userId = req.user.id;

    if (!['up', 'down'].includes(type))
      return res.status(400).json({ message: 'Invalid vote type' });

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    // Remove user from both arrays first
    answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId);
    answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId);

    // Add to the selected vote type
    if (type === 'up') answer.upvotes.push(userId);
    if (type === 'down') answer.downvotes.push(userId);

    await answer.save();
    await answer.populate('author', 'name');

    // Emit updated vote arrays to all clients
    const io = req.app.get('io');
    if (io) {
      io.emit('voteUpdated', {
        _id: answer._id,
        question: answer.question,
        upvotes: answer.upvotes,       // send array, not length
        downvotes: answer.downvotes    // send array, not length
      });
    }

    // Send arrays to frontend
    res.json({
      _id: answer._id,
      upvotes: answer.upvotes,
      downvotes: answer.downvotes
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


