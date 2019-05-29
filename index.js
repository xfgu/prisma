const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolves/Query')
const Mutation = require('./resolves/Mutation')
const User = require('./resolves/User')
const Post = require('./resolves/Post')
const Cart = require('./resolves/Cart')
const Item = require('./resolves/Item')


const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Cart,
  Item
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))
