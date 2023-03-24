import React from "react"
import Image from "next/image"

type ImageProps = {
  src: string
  width: number
  height: number
  alt: string
  className?: string
  priority?: boolean
}

export default function DynamicImage({ src, width, height, alt, className, priority = false }: ImageProps) {
  return <Image src={src} width={width} height={height} alt={alt} className={className} priority={priority} />
}
