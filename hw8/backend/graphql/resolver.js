const messageResolver = require('./resolvers/message');

module.exports = {
    Query: {
        ...messageResolver.Query,
    },
    Mutation: {
        ...messageResolver.Mutation,
    },
    Subscription: {
        ...messageResolver.Subscription,
    }
}