import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCardSkeleton = () => {
  return (
    <div className="w-full max-w-[260px] bg-white rounded-xl shadow-md p-3 flex flex-col gap-2 mx-auto">
      <Skeleton height={150} className="rounded-lg" />
      <Skeleton height={20} width="80%" />
      <Skeleton height={16} width="60%" />
      <div className="flex justify-between items-center mt-auto">
        <Skeleton width={60} height={24} />
        <Skeleton circle width={36} height={36} />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
