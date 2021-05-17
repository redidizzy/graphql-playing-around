import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'
import { useState } from 'react'

function AddBook() {

  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')


  const {loading, error, data} = useQuery(getAuthorsQuery)
  const [addBook, { addBookData }] = useMutation(addBookMutation)
  
  const displayAuthors = () => {
    if(loading) return <option disabled>Loading authors...</option>
    if(error) return <option disabled>An error occured while fetching the authors !</option>

    return data.authors.map(author => <option value={author.id} key={author.id}>{author.name}</option>)
  }

  const submitForm = (e) => {
    e.preventDefault()
    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [
        { query: getBooksQuery }
      ]
    })
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={ (e) => setName(e.target.value) }/>  
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={ (e) => setGenre(e.target.value) } />
      </div> 
      <div className="field">
        <label>Author:</label>
        <select onChange={ (e) => setAuthorId(e.target.value) }>
          <option>Select author</option>
          { displayAuthors() }
        </select>
      </div> 
      <button>+</button>
    </form>
  );
}

export default AddBook