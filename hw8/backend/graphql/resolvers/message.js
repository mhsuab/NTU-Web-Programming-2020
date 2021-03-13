const Message = require('./../../model/Message');

module.exports = {
    Query: {
        allMessages: async () => {
            const messages = await Message.find().sort({ createdAt: 1 })
            return messages;
        },
        getUserMessage: async (_, { username }) => {
            const messages = await Message.find({ "$or": [{ "receiver": username }, { "sender": username }] })
                .sort({ createdAt: 1 })
                .limit(100)
            return messages;
        }
    },
    Mutation: {
        sendMessage: async (_, { message }, { pubsub }) => {
            const newMessage = await Message.create([{
                ...message,
                createdAt: new Date().toISOString()
            }]);
            
            await (pubsub.publish('Message', {
                updateMessage: {
                    type: 'UPDATED',
                    info: newMessage
                }
            }));

            return newMessage;
        },
        deleteMessage: async (_, { username }, { pubsub }) => {
            const removeResponse = await Message.deleteMany({ "$or": [{ "receiver": username }, { "sender": username }] }, (err, res) => {
                if (err) throw new Error(err);
                return res;
            });

            const messages = await Message.find({ "$or": [{ "receiver": username }, { "sender": username }] })
                .sort({ createdAt: 1 })
                .limit(100)

            await (pubsub.publish('Message', {
                updateMessage: {
                    type: 'DELETED',
                }
            }));

            return `Delete all message sent by/addressed to ${username}`;
        }
    },
    Subscription: {
        updateMessage: {
            subscribe(_, __, { pubsub }) {
                return pubsub.asyncIterator('Message')
            }
        }
    },
}