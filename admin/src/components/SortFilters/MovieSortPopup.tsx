import * as React from 'react'

import { Menu, Transition } from "@headlessui/react";
import { FiFilter, FiChevronUp, FiChevronDown } from 'react-icons/fi'

import { FormikProvider } from 'formik';


const popularity = [
    {
        id: 'default',
        label: 'Default'
    },
    {
        id: 'descAlpha',
        label: 'Descending Alphabetical'
    },
    {
        id: "ascAlpha",
        label: 'Ascending Alphabetical'
    },
    {
        id: 'dateAddedAsc',
        label: "Date Added Ascending"
    },
    {
        id: 'dateAddedDesc',
        label: "Date Added Descending"
    },
    {
        id: 'failedDuringScrape',
        label: "Failed During Web Scrape"
    },
];

let input_class = 'text-[#03042499] bg-[#fff] focus:text-[#030424] border-2 p-2 px-[20px] font-[400] rounded-[11px] text-[18px] flex items-center h-[44px] min-w-[150px] justify-between'

type TriggerEnum = 'click' | 'hover'

interface MovieSortPopupProps {
    initialValues: DashboadFilterFormValues;
    isLoading?: boolean;
    formik: FormikProps<DashboadFilterFormValues>;
    open: boolean;
    onClick: any;
}

const MovieSortPopup = (props: MovieSortPopupProps) => {
    const { open, onClick } = props

    let timeout: NodeJS.Timeout
    const timeoutDuration = 250

    const initialValues = props.initialValues;
    const formik = props.formik


    const [trigger, setTrigger] = React.useState<undefined | TriggerEnum>(undefined)

    const { activeSort } = formik.values

    const menuContainerRef = React.useRef<HTMLDivElement | null>(null)

    const handleClickOutside = (event: any) => {

        /**
         * determine if clicked element is in the popover dom tree
         */
        if (!menuContainerRef.current?.contains(event.target)) {
            //close Tooltip if its not in the dom tree

            //if its open then close
            if (open) {
                onClick()
            }
        }
    }

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("mousemove", handleMouseMove);
        }
    })

    const handleMouseMove = (event: any) => {
        const isInsideMenuContainer = menuContainerRef.current?.contains(event.target);

        // If the mouse is inside the menu container, trigger the onClick() function
        if (isInsideMenuContainer && !open) {
            onClick();
            setTrigger("hover")
        }
        if (!isInsideMenuContainer && open) {
            onClick();
            setTrigger(undefined)
        }
    };


    return (
        <Menu
            ref={menuContainerRef}
            as="div" className='relative z-20'>
            <Menu.Button as={React.Fragment}>
                <div
                    onClick={() => {
                        onClick();
                        setTrigger('click')
                    }}
                    className={`${input_class} cursor-pointer hidden sm:flex `}>
                    <div
                        className='w-full h-full text-[#03042499]' >
                        Sort
                    </div>
                    <div className='flex flex-col justify-center text-[#B3B3B3]'>
                        <FiChevronUp className=' mb-[-4px]' />
                        <FiChevronDown className=' mt-[-4px]' />
                    </div>
                </div>
            </Menu.Button>
            <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                show={open}
            >
                <Menu.Items static as='ul' className="" >
                    <FormikProvider value={formik}>
                        <div className="absolute z-20 mt-3 bg-white p-3 rounded-md space-y-5 min-w-[282px] border">
                            {popularity.map((item, index) => {
                                const selected = activeSort == item.id
                                return <Menu.Item
                                    key={item.id}
                                >
                                    <li
                                        onClick={() => {
                                            formik.setFieldValue(
                                                'activeSort',
                                                item.id
                                            );
                                        }}
                                        style={{
                                            backgroundColor: selected ? '#F3F0FF' : 'unset',
                                            fontWeight: selected ? '600' : 'unset',
                                        }}
                                        className='h-[30px] rounded-lg flex items-center pl-2 cursor-pointer'
                                    >
                                        {item.label}
                                    </li>
                                </Menu.Item>
                            })}
                        </div>
                    </FormikProvider>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default MovieSortPopup