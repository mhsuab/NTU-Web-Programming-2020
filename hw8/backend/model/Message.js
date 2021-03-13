const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	sender: {
		type: String,
		required: [true, 'Sender field is required.']
	},
	receiver: {
		type: String,
		required: [true, 'Receiver field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
    },
    createdAt: {
        type: String,
        required: [true, 'Created Time is required.']
    }
})


// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
