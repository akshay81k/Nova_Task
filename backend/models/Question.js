const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answersCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
