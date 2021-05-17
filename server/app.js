const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')

const schema = require('./schema/schema')

const app = express()


// MongoDB connection, don't forget to create a mongodb cluster first and get the credentials at https://cloud.mongodb.com/
mongoose.connect('mongodb+srv://rediane:sploosh@graphql-playing-around.wksok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('connected to mongodb')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true  
}))

app.listen(4000, () => {
  console.log("Listening on port 3000")
})