import Image from 'next/image'
import React from 'react'

export default function StickyCard() {
  return (
    <div className="container">
      <Image src='/prj.png' width={100} height={50} alt='Course-img' className="rounded-lg mx-auto items-center sm:w-[17rem] sm:mb-0  xl:w-96" />
    </div>
  )
}
