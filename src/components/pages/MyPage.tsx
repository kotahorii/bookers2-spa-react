import { SelectModeButton } from 'components/atom/SelectModeButton'
import { BookCard } from 'components/organisms/card/BookCard'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
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
  const { myBook, likedBook, changeBooksMode, booksMode } = useMyPage()
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
        <SelectModeButton
          booksMode={booksMode}
          onClick={changeBooksMode('myBooks')}
          mode="myBooks"
        >
          My books
        </SelectModeButton>
        <SelectModeButton
          booksMode={booksMode}
          onClick={changeBooksMode('likedBooks')}
          mode="likedBooks"
        >
          Liked books
        </SelectModeButton>
      </div>

      <div className="md:flex md:flex-wrap md:items-center justify-center block">
        {booksMode === 'likedBooks' &&
          likedBook()?.map((book) => <BookCard key={book.id} book={book} />)}
        {booksMode === 'myBooks' &&
          myBook()?.map((book) => <BookCard key={book.id} book={book} />)}
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
