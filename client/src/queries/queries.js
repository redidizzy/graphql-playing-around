import { gql } from '@apollo/client'


const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

export {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
}