import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.166 16.667a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM15.775 17.241c.442 1.334 1.45 1.467 2.225.3.708-1.066.242-1.941-1.042-1.941-.95-.008-1.483.733-1.183 1.641Z"
        />
    </svg>
)
export default SvgComponent
