import { BookCard } from 'components/organisms/card/BookCard'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import React from 'react'

export const Main = () => {
  const { books } = useBooks()
  return (
    <Layout>
      <div className="md:flex md:flex-wrap items-start block md:space-x-5 space-y-3">
        {books?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
    </Layout>
  )
}
