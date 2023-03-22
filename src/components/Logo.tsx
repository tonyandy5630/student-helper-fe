import React from "react"
import logo from "assets/images/logo.png"

type LogoProps = {
  className?: string
}

export default function LogoComponent({ className }: LogoProps) {
  return (
    <div className={`mx-auto h-32 flex justify-center items-center ${className}`}>
      <img src={logo.src} className='h-48' />
    </div>
  )
}
