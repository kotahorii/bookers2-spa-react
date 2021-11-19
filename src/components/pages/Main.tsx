import { BookCard } from 'components/organisms/books/BookCard'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import React from 'react'

export const Main = () => {
  const { books } = useBooks()
  return (
    <Layout>
      <div className="flex flex-wrap space-x-5">
        {books?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </Layout>
  )
}
