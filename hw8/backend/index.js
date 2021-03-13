// const { ApolloServer, PubSub, makeExecutableSchema, GraphQLServer } = require('apollo-server-express');
import { GraphQLServer, PubSub } from 'graphql-yoga'
const mongoose = require("mongoose");
// const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolver');
require('dotenv-defaults').config();

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const startServer = async () => {
    if (!process.env.MONGO_URL) {
        console.error('Missing MONGO_URL!!!')
        process.exit(1)
    }

    mongoose.connect(process.env.MONGO_URL, options);
    console.log(`Connect to MONGO_URL: ${process.env.MONGO_URL}`);

    const pubsub = new PubSub()
    const server = new GraphQLServer({
        typeDefs: './graphql/typeDef.graphql',
        resolvers,
        context: ({ req }) => ({ req, pubsub }),
    });
    
    const db = mongoose.connection
    db.on('error', (error) => {
        console.error(error)
    })

    db.once('open', () => {
        console.log('MongoDB connected!')
        server.start({ port: process.env.PORT | 4000 }, () => {
            console.log(`🚀 Server ready at http://localhost:${process.env.PORT | 4000}`)
        })
    })

};

startServer();