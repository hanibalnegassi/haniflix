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
            stroke="#fff"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="m22.027 7.533-4.134-3.2c-.533-.533-1.733-.8-2.533-.8h-5.067c-1.6 0-3.333 1.2-3.733 2.8l-3.2 9.734c-.667 1.866.533 3.466 2.533 3.466h5.334c.8 0 1.466.667 1.333 1.6l-.667 4.267c-.266 1.2.534 2.533 1.734 2.933 1.066.4 2.4-.133 2.933-.933l5.467-8.133"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M28.827 7.533V20.6c0 1.867-.8 2.533-2.667 2.533h-1.333c-1.867 0-2.667-.666-2.667-2.533V7.533c0-1.866.8-2.533 2.667-2.533h1.333c1.867 0 2.667.667 2.667 2.533Z"
        />
    </svg>
)
export default SvgComponent
