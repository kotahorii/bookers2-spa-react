import { BookCard } from 'components/organisms/card/BookCard'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { MyBookCard } from 'components/organisms/card/MyBookCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { DeleteBookModal } from 'components/organisms/modal/DeleteBookModal'
import { DetailBookText } from 'components/organisms/modal/DetailBookText'
import { Layout } from 'components/templates/Layout'
import { useBooks } from 'hooks/useBooks'
import { useMyPage } from 'hooks/useMyPage'
import { useRates } from 'hooks/useRates'
import { memo } from 'react'

export const MyPage = memo(() => {
  const {
    isOpenDetailBook,
    closeDetailBook,
    detailBook,
    isLoadingUser,
    isLoadingBooks,
  } = useBooks()
  const { isLoadingRates } = useRates()
  const {
    myBook,
    likedBook,
    changeBooksMode,
    booksMode,
    isOpenDeleteBookModal,
    closeDeleteBookModal,
  } = useMyPage()
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
      <div className="flex flex-row space-x-1">
        <button
          className="hover:bg-gray-200 p-2 rounded-lg"
          onClick={changeBooksMode('myBooks')}
        >
          my books
        </button>
        <button
          className="hover:bg-gray-200 p-2 rounded-lg"
          onClick={changeBooksMode('likedBooks')}
        >
          liked books
        </button>
      </div>

      <div className="md:flex md:flex-wrap md:items-center justify-center block">
        {booksMode === 'likedBooks' &&
          likedBook()?.map((book) => <BookCard key={book.id} book={book} />)}
        {booksMode === 'myBooks' &&
          myBook()?.map((book) => <MyBookCard key={book.id} book={book} />)}
      </div>
      <CustomModal
        title={detailBook.title}
        isOpen={isOpenDetailBook}
        closeModal={closeDetailBook}
      >
        <DetailBookText />
      </CustomModal>
      <CustomModal
        isOpen={isOpenDeleteBookModal}
        closeModal={closeDeleteBookModal}
        title={detailBook.title}
      >
        <DeleteBookModal />
      </CustomModal>
    </Layout>
  )
})
