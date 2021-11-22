import { CustomButton } from 'components/atom/CustomButton'
import { CustomInput } from 'components/atom/CustomInput'
import { CustomLabel } from 'components/atom/CustomLabel'
import { useHeader } from 'hooks/useHeader'
import { memo } from 'react'

export const CreateOrEditBook = memo(() => {
  const { changeBook, editedBook, submitBook } = useHeader()
  return (
    <>
      <form onSubmit={submitBook} className=" w-72 mt-2 flex flex-col">
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
})
