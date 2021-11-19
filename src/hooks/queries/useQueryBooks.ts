import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Book } from 'types/bookTypes'

const getAllBooks = async () => {
  const { data } = await client.get<Book[]>('books', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryBooks = () => {
  return useQuery<Book[],Error>({
    queryKey: 'books',
    queryFn: getAllBooks,
    staleTime: 600000
  })
}
