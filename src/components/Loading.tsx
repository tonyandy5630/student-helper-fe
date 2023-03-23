import React from "react"

export default function LoadingCircle() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ margin: "auto", background: " rgba(241, 242, 243, 0)", display: "block", shapeRendering: "auto" }}
      width='200px'
      height='200px'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <circle
        cx='50'
        cy='50'
        fill='none'
        stroke='#3be8b0'
        strokeWidth='5'
        r='42'
        strokeDasharray='197.92033717615698 67.97344572538566'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </circle>
    </svg>
  )
}
