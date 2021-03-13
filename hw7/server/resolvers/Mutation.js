const Message = require('../models/message')

const Mutation = {
  async createMessage(parent, args, { db, pubsub }, info) {
    const newMsg =  await Message.create([args.data])
    pubsub.publish('message', {
      message: {
        mutation: 'CREATED',
        newMsg: newMsg[0]
      }
    })

    return newMsg[0]
  },
  async deleteMessage(parent, args, { db, pubsub }, info) {
    const delMsg = await Message.deleteMany({ 'name': args.name })
    pubsub.publish('message', {
      message: {
        mutation: 'DELETED',
        deletedCnt: delMsg.deletedCount
      }
    })
    if(delMsg.deletedCount == '0') return "Nothing deleted."
    else return "Done, deleted count = " + delMsg.deletedCount + "."
  }
}

export { Mutation as default }
