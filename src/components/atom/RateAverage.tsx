import { StarIcon as SolidStar } from '@heroicons/react/solid'
import { StarIcon as OutLineStar } from '@heroicons/react/outline'
import { Book } from 'types/bookTypes'
import { memo, VFC } from 'react'
import { useRates } from 'hooks/useRates'

type Props = {
  book: Book
}
export const RateAverage: VFC<Props> = memo(({ book }) => {
  const { averageRate } = useRates()
  const roundedRate =
    averageRate(book) && Math.round(averageRate(book) as number)

  return (
    <div className="flex flex-row">
      {roundedRate?.toString() === 'NaN' ? (
        [...Array(5)]
          .map((_, i) => i)
          .map((i) => <OutLineStar className="w-5 text-yellow-400" key={i} />)
      ) : (
        <>
          {[...Array(roundedRate)]
            .map((_, i) => i)
            .map((i) => (
              <SolidStar className="w-5 text-yellow-400" key={i} />
            ))}
          {[...Array(5 - roundedRate!)]
            .map((_, i) => i)
            .map((i) => (
              <OutLineStar className="w-5 text-yellow-400" key={i} />
            ))}
        </>
      )}
    </div>
  )
})
