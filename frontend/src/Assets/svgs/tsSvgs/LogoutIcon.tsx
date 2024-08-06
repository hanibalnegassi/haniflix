import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M17.44 14.62 20 12.06 17.44 9.5M9.76 12.06h10.17M11.76 20c-4.42 0-8-3-8-8s3.58-8 8-8"
        />
    </svg>
)
export default SvgComponent
