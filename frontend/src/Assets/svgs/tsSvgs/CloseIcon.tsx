import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="m10.12 8 4.6-4.6c.58-.58.58-1.54 0-2.12-.58-.58-1.54-.58-2.12 0L8 5.88l-4.6-4.6C2.82.7 1.86.7 1.28 1.28c-.58.58-.58 1.54 0 2.12L5.88 8l-4.6 4.6c-.58.58-.58 1.54 0 2.12.3.3.68.44 1.06.44s.76-.14 1.06-.44l4.6-4.6 4.6 4.6c.3.3.68.44 1.06.44s.76-.14 1.06-.44c.58-.58.58-1.54 0-2.12L10.12 8Z"
        />
    </svg>
)
export default SvgComponent
