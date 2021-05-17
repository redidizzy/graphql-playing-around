import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'
import { useState } from 'react'


function BookList() {

  const {loading, error, data} = useQuery(getBooksQuery)

  const [selected, setSelected ] = useState(null)
  
  if(loading) return <p>Loading book...</p>
  if(error) return <p>Error :(</p>
  
  const displayBooks = data.books.map(book => (
    <li key={book.id} onClick= { (e) => setSelected(book.id) } >{book.name}</li>
  ))
  return (
    <div>
      <ul id="book-list">
        {displayBooks}
      </ul>
      <BookDetails bookid={selected}/>
    </div>
  );
}

export default BookList

