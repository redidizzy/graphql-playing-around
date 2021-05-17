import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'


function BookList() {

  const {loading, error, data} = useQuery(getBooksQuery)
  
  if(loading) return <p>Loading book...</p>
  if(error) return <p>Error :(</p>
  
  const displayBooks = data.books.map(book => (
    <li key={book.id} >{book.name}</li>
  ))
  return (
    <div>
      <ul id="book-list">
        {displayBooks}
      </ul>
    </div>
  );
}

export default BookList

