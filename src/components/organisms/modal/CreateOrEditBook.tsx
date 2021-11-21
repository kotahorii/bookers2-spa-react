import { CustomButton } from 'components/atom/CustomButton'
import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { useMutateBooks } from 'hooks/queries/useMutateBooks'
import { useHeader } from 'hooks/useHeader'

export const CreateOrEditBook = () => {
  const { changeBook, editedBook, submitBook } = useHeader()
  const { createBookMutation } = useMutateBooks()
  return (
    <>
      <form onSubmit={submitBook} className="mt-2 flex flex-col">
        <CustomLabel title="Title:" />
        <CustomInput
          name="title"
          value={editedBook.title}
          placeholder="Name"
          onChange={changeBook}
        />
        <CustomLabel title="Body:" />
        <CustomInput
          name="body"
          value={editedBook.body}
          placeholder="Body"
          onChange={changeBook}
        />
        <CustomButton
          disabled={!editedBook.title}
          type="submit"
          text="Create"
        />
      </form>
    </>
  )
}
