import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AnswerSchema = Schema({
  questionID: { type: Number, required: true, unique: true },
  answer: { type: Number, required: true }
}, {
  collection: 'Answer',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Answer', AnswerSchema)

export default exportSchema
