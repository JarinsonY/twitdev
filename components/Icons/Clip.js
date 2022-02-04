import * as React from "react"

export default function Clip(props) {
  return (
    <svg height={21} viewBox="0 0 21 21" width={21} {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m16.5 11.5-5 5c-2.521 2.763-4.854 3.096-7 1-2.146-2.097-1.813-4.43 1-7l5-5c1.919-2.081 3.585-2.415 5-1s1.08 3.08-1 5l-5 5C8.555 15.555 7.72 15.72 7 15s-.555-1.555.5-2.5l5-5" />
      </g>
    </svg>
  )
}