import { BookCard } from 'components/organisms/card/BookCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { DetailBookText } from 'components/organisms/modal/DetailBookText'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'

export const Main = () => {
  const { books, isOpenDetailBook, closeDetailBook } = useBooks()
  return (
    <Layout>
      <div className="md:flex md:flex-wrap items-start block md:space-x-5 space-y-3">
        {books?.map((book) => (
          <BookCard book={book} />
        ))}
      </div>
      <CustomModal
        title="Detail Book"
        isOpen={isOpenDetailBook}
        closeModal={closeDetailBook}
      >
        <DetailBookText />
      </CustomModal>
    </Layout>
  )
}
