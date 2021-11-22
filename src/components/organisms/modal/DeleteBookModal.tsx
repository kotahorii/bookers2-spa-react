import { XIcon, TrashIcon } from '@heroicons/react/outline'
import { useBooks } from 'hooks/useBooks'
import { useMyPage } from 'hooks/useMyPage'
import { memo } from 'react'

export const DeleteBookModal = memo(() => {
  const { closeDeleteBookModal, deleteBook } = useMyPage()
  const { detailBook } = useBooks()
  return (
    <div className="flex flex-col mt-5 space-y-4 w-80">
      <p>Are you sure delete ?</p>
      <div className="flex flex-row justify-between">
        <div></div>
        <div className="flex flex-row">
          <div
            onClick={closeDeleteBookModal}
            className="flex flex-row hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <XIcon className="w-5" />
            <p>Cancel</p>
          </div>
          <div
            onClick={deleteBook(detailBook.id)}
            className="flex flex-row hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
          >
            <TrashIcon className="w-5" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
})
