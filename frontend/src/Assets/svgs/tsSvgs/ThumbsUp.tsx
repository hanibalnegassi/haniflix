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
            d="m9.973 24.467 4.134 3.2c.533.533 1.733.8 2.533.8h5.067c1.6 0 3.333-1.2 3.733-2.8l3.2-9.734c.667-1.866-.533-3.466-2.533-3.466h-5.334c-.8 0-1.466-.667-1.333-1.6l.667-4.267c.266-1.2-.534-2.533-1.734-2.933-1.066-.4-2.4.133-2.933.933l-5.467 8.133"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.173 24.467V11.4c0-1.867.8-2.533 2.667-2.533h1.333c1.867 0 2.667.666 2.667 2.533v13.067c0 1.866-.8 2.533-2.667 2.533H5.84c-1.867 0-2.667-.667-2.667-2.533Z"
        />
    </svg>
)
export default SvgComponent
