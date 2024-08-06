import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <path
            fill="#E93F3F"
            d="M16.827 27.747c-.454.16-1.2.16-1.654 0-3.866-1.32-12.506-6.827-12.506-16.16 0-4.12 3.32-7.454 7.413-7.454A7.354 7.354 0 0 1 16 7.12a7.373 7.373 0 0 1 5.92-2.987c4.093 0 7.413 3.334 7.413 7.454 0 9.333-8.64 14.84-12.506 16.16Z"
        />
    </svg>
)
export default SvgComponent
