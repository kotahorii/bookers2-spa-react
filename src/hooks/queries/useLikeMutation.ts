import axios from 'axios'
import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Favorite, CreateFavorite, DeleteFavorite } from 'types/bookTypes'

export const useLikeMutation = () => {
  const queryClient = useQueryClient()
  const createLikeMutation = useMutation(
    (data: CreateFavorite) =>
      client.post<Favorite>('favorites', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res, variable) => {
        const previousFavorites =
          queryClient.getQueryData<Favorite[]>('favorites')
        if (previousFavorites) {
          queryClient.setQueryData<Favorite[]>('favorites', [
            ...previousFavorites,
            res.data,
          ])
        }
      },
    }
  )
  const deleteLikeMutation = useMutation(
    (data: DeleteFavorite) =>
      axios.request({
        method: 'delete',
        url: `http://localhost:8000/api/v1/favorites/${data.id}`,
        data: { book_id: data.bookId },
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res, variable) => {
        const previousFavorites =
          queryClient.getQueryData<Favorite[]>('favorites')
        if (previousFavorites) {
          queryClient.setQueryData<Favorite[]>(
            'favorites',
            previousFavorites.filter((fav) => fav.id !== variable.id)
          )
        }
      },
    }
  )

  return { createLikeMutation, deleteLikeMutation }
}
