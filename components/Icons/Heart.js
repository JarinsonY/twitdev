import * as React from "react"

export default function Heart(props) {
  return (
    <>
      <svg height={21} viewBox="0 0 21 21" width={21} {...props} className={props.fill !== 'transparent' ? 'like' : 'noLike'}>
        <g
          fill={props.fill}
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.5 6.5c.5-2.5 4.343-2.657 6-1 1.603 1.603 1.5 4.334 0 6l-6 6-6-6a4.243 4.243 0 010-6c1.55-1.55 5.5-1.5 6 1z" />
        </g>
      </svg>
      <style jsx>{`
        .like:hover path {
          d: path("m13.929 14.07-3.43 3.43-6-6a4.243 4.243 0 0 1 0-6 2.96 2.96 0 0 1 .567-.438m2.453-.605c1.388.034 2.706.668 2.98 2.043.5-2.5 4.344-2.657 6-1 1.604 1.603 1.5 4.334 0 6l-.937.937M4 4l13 13.071")
          }
        `}
      </style>
    </>
  )
}
