export type Book = {
  id: number
  title: string
  body: string
  user_id: number
  createdAt: string
  comments: Comment[]
  favorites: Favorite[]
}

export type CreateBook = {
  body: string
  title: string
}

export type UpdateBook = CreateBook & {
  id: number
}

export type Comment = {
  id: number
  comment: string
  user_id: number
  book_id: number
  created_at?: Date
  updated_at?: Date
}

export type CreateComment = {
  bookId: string
  comment: string
}

export type Favorite = {
  id: number
  user_id: number
  book_id: number
  created_at?: Date
  updated_at?: Date
}

export type CreateAndDestroyFavorite = {
  bookId: string
}

export type MenuType = {
  name: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
  onClick?: () => void
}[]
