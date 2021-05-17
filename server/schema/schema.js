const graphql = require('graphql')

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList
 } = graphql

const books = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '3' },
  { name: 'The long earth', genre: 'Sci-Fi', id: '3', authorId: '2' }
] 

const authors = [
  { name: 'Rediane Zemmouri', age: 24, id: '1' },
  { name: 'Amine Azizi', age:28, id: '2' },
  { name: 'Redi dizzy', age: 40, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return authors.find(author => parent.authorId === author.id)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLString
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books.filter(book => parent.id === book.authorId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { 
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args){
        return books.find( book => book.id === args.id )
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args){
        return authors.find(author => author.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})