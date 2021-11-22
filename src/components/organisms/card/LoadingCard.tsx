import { memo } from 'react'

export const LoadingCard = memo(() => {
  return (
    <div className="flex flex-col m-2 cursor-pointer px-2 py-2 shadow-md rounded-lg space-y-3">
      <div className="animate-pulse flex flex-col space-y-1">
        <div className="w-48 h-36 bg-gray-300 rounded-lg"></div>
        <div className=" bg-gray-300 h-6 w-full rounded-lg"></div>
        <div className="flex flex-row mt-5 w-48 justify-between items-center px-2">
          <div className="w-10 h-8 mt-2 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-28 mt-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
})
