import mongoose from 'mongoose'

const Schema = mongoose.Schema

const QuestionSchema = Schema({
  questionID: { type: Number, required: true, unique: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }]
}, {
  collection: 'Question',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Question', QuestionSchema)

export default exportSchema
