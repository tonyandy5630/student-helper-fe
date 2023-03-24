import React from "react"
import Image from "next/image"

type LogoProps = {
  className?: string
}

export default function LogoComponent({ className }: LogoProps) {
  return (
    <div className={`mx-auto h-32 flex justify-center items-center ${className}`}>
      <Image src='/logo.png' width='200' height='200' className='h-48' alt="RESME's logo" />
    </div>
  )
}
