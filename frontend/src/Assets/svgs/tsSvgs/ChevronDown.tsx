import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={9}
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M16.92.95 10.4 7.47c-.77.77-2.03.77-2.8 0L1.08.95"
        />
    </svg>
)
export default SvgComponent
