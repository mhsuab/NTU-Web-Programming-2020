const Message = require('../models/message')

const Query = {
  async messages(parent, args, { db }, info) {
    if(!args.name) return await Message.find().limit(100).sort({ _id: 1 })
    else return await Message.find({'name': args.name}).limit(100).sort({ _id: 1 })
  }
}

export { Query as default }
