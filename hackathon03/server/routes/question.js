import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  Question.find()
        .sort({questionID: 1})
        .select({created_at: 0, updated_at: 0, _id: 0, __v: 0})
        .exec((err, data) => {
          if (err || data.length === 0) {
            res.status(403).send({message: 'error', contents: []});
          }
          else {
            res.status(200).send({message: 'success', contents: data});
          }
        })
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  Answer.find()
      .sort({questionID: 1})
      .select({created_at: 0, updated_at: 0, __v : 0, _id: 0})
      .exec((err, data) => {
        if (err || data.length === 0) {
          res.status(403).send({message: 'error', score: -1});
        }
        else {
          const score = data.reduce((accumulator, currentValue, currentIndex, array) => {
            return accumulator + (currentValue.answer === req.body[currentValue.questionID - 1]);
          }, 0);
          res.status(200).send({message: 'success', score: score});
        }
      })
}
