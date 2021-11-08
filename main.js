require('dotenv').config()
// App
const express = require('express')
const app = express()
const port = process.env.PORT || 80

// GraphQL
const { graphqlHTTP } = require('express-graphql')
const { graphqlUploadExpress } = require('graphql-upload')
const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql')

// Handlers
const businessCategoryHandler = require('./handlers/businessCategory')
const businessHandler = require('./handlers/business')

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...businessCategoryHandler().queries,
    ...businessHandler().queries,
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...businessCategoryHandler().mutations,
    ...businessHandler().mutations,
  })
})

app.use('/graphql', 
graphqlUploadExpress({ maxFileSize: 1000000 }),
graphqlHTTP({
  graphiql: true,
  schema: new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
  }),
}))

app.listen(port, async () => {
  console.log(`Server is running at port : ${port}`)
})