import { BookCard } from 'components/organisms/card/BookCard'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { DetailBookText } from 'components/organisms/modal/DetailBookText'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import { useRates } from 'hooks/useRates'
import { memo } from 'react'

export const Main = memo(() => {
  const {
    books,
    isOpenDetailBook,
    closeDetailBook,
    detailBook,
    isLoadingUser,
    isLoadingBooks,
  } = useBooks()

  const { isLoadingRates } = useRates()
  if (isLoadingBooks || isLoadingUser || isLoadingRates)
    return (
      <Layout>
        <div className="md:flex md:flex-wrap md:items-center justify-center block">
          {[...Array(18)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingCard key={i} />
            ))}
        </div>
      </Layout>
    )
  return (
    <Layout>
      <div className="md:flex md:flex-wrap md:items-center justify-center block">
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <CustomModal
        title={detailBook.title}
        isOpen={isOpenDetailBook}
        closeModal={closeDetailBook}
      >
        <DetailBookText />
      </CustomModal>
    </Layout>
  )
})
