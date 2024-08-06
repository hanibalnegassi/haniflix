import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { CloseIcon } from "../../Assets/svgs/tsSvgs";
import { addClassNames } from "../../store/utils/functions";
import SidebarAccount from "./sidebar_account/index";
import SidebarChangePass from "./sidebar_changepass/index";
import SidebarSub from "./sidebar_subscription/index";

import styles from "./sidebar.module.scss";
import Icon from "../icon";

const SettingsSidebar = ({ show, onClose, variantGroup }) => {
  const [activeTab, setActiveTab] = useState(0); // Initial active tab index

  const closeButtonRef = useRef();

  const tabs = [
    {
      id:1,
      title: "Account",
      content: "Unique Account content",
      component: <SidebarAccount variantGroup={variantGroup} />,
      icon:"User"
    },
    {
      id:2,
      title: "Password",
      content: "Unique Password content",
      component: <SidebarChangePass variantGroup={variantGroup} />,
      icon:"Password"
    },
    {
      id:3,
      title: "Subscription",
      content: "Unique Subscription content",
      component: <SidebarSub variantGroup={variantGroup} />,
      icon:"Form"
    },
  ];

  // Close on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleClose = () => {
    onClose(); // Pass closure to ensure correct state update
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (false)
    return (
      <Transition className={styles["sidebar"]} show={show}>
        <div className="fixed inset-0 overflow-hidden z-[1000] bg-transparent">
          <div
            className="absolute inset-0 backdrop-filter backdrop-brightness-[0.3]"
            onClick={handleClose}
          ></div>

          <Transition.Child
            enter="transition duration-150 ease-out transform translateX-[100%]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-in-out transform translateX-[100%]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={styles["setting-modal-container"]}
          >
            <div
              className={addClassNames(
                // "border relative shadow-xl rounded-lg p-4 text-left overflow-auto scrollbar-thin scrollbar-thumb-gray-200 sm:scrollbar-thumb-gray-300",
                "fixed border border-[#4B4B4B] inset-y-0 right-[32px] top-[32px] bg-[#FFFFFF1A] rounded-[20px] bottom-[32px] p-[37px] ",
                "overflow-auto scrollbar-thin scrollbar-thumb-gray-200 sm:scrollbar-thumb-gray-300 flex-colunmn",
                "backdrop-blur-[13px]",
                styles["setting-modal"]
              )}
            >
              {/* Top section with heading and close button */}
              <div className="flex items-center justify-between mb-[35px]">
                <h3 className="text-[32px] font-medium leading-6 text-white">
                  Settings
                </h3>
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Divider */}
              <div className="mb-6 border-b border-[#4B4B4B]" />

              {/* Horizontal tabs */}
              <div className="flex justify-evenly">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    type="button"
                    className={addClassNames(
                      "px-4 py-2 text-left leading-6 border-b-[1px]  cursor-pointer box-border",
                      `${
                        index === activeTab
                          ? "text-white font-[500]  border-[#B8B4B4]"
                          : "text-[#B8B4B4] font-[400] border-[transparent]"
                      }`
                    )}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="mt-8">{tabs[activeTab].component}</div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    );

  return (
    <div className="mt-3 flex flex-col gap-5">
      <div className="flex gap-10 flex-wrap" style={{rowGap:"20px"}}>
        {tabs.map((item, index) => {
          let isActiveTab = (index === activeTab);
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(index)}
              className="bg-transparent flex items-center gap-2 group cursor-pointer"
            >
              <Icon name={item.icon} hovered={isActiveTab} />
              <p
                className={`${
                  isActiveTab ? "text-white" : "text-muted"
                } text-base xl:text-xl transition-all duration-500 group-hover:text-white whitespace-nowrap`}
              >
                {item.title}
              </p>
            </button>
          );
        })}
      </div>

      <div>
      {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default SettingsSidebar;
