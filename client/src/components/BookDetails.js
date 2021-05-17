import { useQuery } from '@apollo/client'
import { getBookQuery } from '../queries/queries'

function BookDetails({ bookid }) {
  const {loading, error, data} = useQuery(getBookQuery, {
    variables: {
      id: bookid
    }
  })

  if(loading) return <div>loading details...</div>
  if(error) return <div> error :( </div>
  
  const displayBookDetails = () => {
    const { book } = data
    if(book){
      const { author } = book
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {
              author.books.map(item => <li key={item.id}>{item.name}</li>)
            }
          </ul>
        </div>
      )
    }else{
      return (
        <div>
          No book selected...
        </div>
      )
    }
  }

  return (
    <div id="book-details">
      { displayBookDetails() }
    </div>
  );
}

export default BookDetails

