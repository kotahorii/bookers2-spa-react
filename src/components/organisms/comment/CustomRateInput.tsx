import { StarIcon as SolidStar } from '@heroicons/react/solid'
import { StarIcon as OutLineStar } from '@heroicons/react/outline'
import { useBooks } from 'hooks/useBooks'

export const CustomRateInput = () => {
  const { rate, rateCreate, rateUpdate } = useBooks()
  return (
    <div className="flex flex-row">
      {rate === undefined ? (
        [...Array(5)]
          .map((_, i) => i)
          .map((i) => (
            <OutLineStar
              onClick={rateCreate(i + 1)}
              className="w-6 h-6 text-yellow-400 rounded-full hover:bg-gray-100 cursor-pointer"
              key={i}
            />
          ))
      ) : (
        <>
          {[...Array(rate)]
            .map((_, i) => i)
            .map((i) => (
              <SolidStar
                onClick={rateUpdate(i + 1)}
                className="w-6 h-6 text-yellow-400 rounded-full hover:bg-gray-100 cursor-pointer"
                key={i}
              />
            ))}
          {[...Array(5 - rate)]
            .map((_, i) => i)
            .map((i) => (
              <OutLineStar
                onClick={rateUpdate(i + rate + 1)}
                className="w-6 h-6 text-yellow-400 rounded-full hover:bg-gray-100 cursor-pointer"
                key={i}
              />
            ))}
        </>
      )}
    </div>
  )
}
