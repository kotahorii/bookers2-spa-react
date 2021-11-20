import { useAppDispatch } from 'app/hooks'
import { useLikeMutation } from 'hooks/queries/useLikeMutation'
import { useQueryFavorites } from 'hooks/queries/useQueryFavarites'
import { useBooks } from 'hooks/useBooks'
import { VFC } from 'react'
import { setDetailBook, setIsOpenDetailBookModal } from 'slices/bookSlice'
import { Book } from 'types/bookTypes'
import { HeartIcon as SolidLike } from '@heroicons/react/solid'
import { HeartIcon as OutLineLike } from '@heroicons/react/outline'

type Props = {
  book: Book
}

export const BookCard: VFC<Props> = ({ book }) => {
  const dispatch = useAppDispatch()
  const openDetailBook = () => {
    dispatch(setDetailBook(book))
    dispatch(setIsOpenDetailBookModal(true))
  }
  const { data: favorites } = useQueryFavorites()
  const { currentUser } = useBooks()
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()

  const booksFavorites = () =>
    favorites?.filter((fav) => fav.bookId === book.id)

  const isLiked = () => {
    if (booksFavorites() !== undefined) {
      return (
        booksFavorites()!.filter((fav) => fav.userId === currentUser?.id)
          .length > 0
      )
    }
  }

  const toggleLike = () => {
    if (isLiked()) {
      const fav = booksFavorites()!.filter(
        (fav) => fav.userId === currentUser?.id
      )[0]
      deleteLikeMutation.mutate({ id: fav.id, bookId: book.id })
    } else {
      createLikeMutation.mutate({ bookId: book.id })
    }
  }

  return (
    <div className="flex flex-col cursor-pointer px-2 py-2 shadow-md hover:shadow-lg rounded-lg space-y-3">
      <div onClick={openDetailBook}>
        <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
        <p className="text-lg text-center">{book.title}</p>
      </div>
      <div className="flex flex-row items-center">
        {isLiked() ? (
          <SolidLike
            onClick={toggleLike}
            className="w-8 p-1 text-red-400 rounded-full hover:bg-gray-200 cursor-pointer"
          />
        ) : (
          <OutLineLike
            onClick={toggleLike}
            className="w-8 p-1 text-gray-400 rounded-full hover:bg-gray-200 cursor-pointer"
          />
        )}
        <span>{booksFavorites()?.length}</span>
      </div>
    </div>
  )
}
