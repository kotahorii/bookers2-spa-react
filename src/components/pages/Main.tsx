import { BookCard } from 'components/organisms/card/BookCard'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { DetailBookText } from 'components/organisms/modal/DetailBookText'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'

export const Main = () => {
  const {
    books,
    isOpenDetailBook,
    closeDetailBook,
    detailBook,
    isLoadingUser,
    isLoadingBooks,
    isLoadingRates,
  } = useBooks()
  if (isLoadingBooks || isLoadingUser || isLoadingRates)
    return (
      <Layout>
        {[...Array(10)]
          .map((_, i) => i)
          ?.map((i) => (
            <LoadingCard key={i} />
          ))}
      </Layout>
    )
  return (
    <Layout>
      <div className="md:flex md:flex-wrap items-start block md:space-x-5 space-y-3">
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
}
