import { motion, AnimatePresence } from "framer-motion"
import SettingsSidebar from "../../components/SettingsSideBar"
import './settings.scss'
import { Box } from "@mui/material";
import { useNavigate } from "react-router";


const tabVariant = {
    hidden: {},
    visible: {},
    exit: {},
};

const tabChildVariant = {
    hidden: {
        opacity: 0,
        x: -40,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
        opacity: 0,
        x: 40,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
};
const parentTransition = { staggerChildren: 0.1 };



const Settings = () => {

    const navigate = useNavigate()
    const variantGroup = { tabVariant, tabChildVariant, parentTransition };
    return (<>
        <div className="settingshome relative !bg-black">

            <div className="rightBlob1" style={{
                left: '-20%',
                top: '0',
                width: '25vw',
                height: '25vw',
                filter: "blur(150px)",
                opacity: "0.5"
            }}></div>
            <div className="rightBlob1" style={{
                left: '10%',
                top: '15%',
                width: '25vw',
                height: '25vw',
                filter: "blur(150px)",
                opacity: "0.5"
            }}></div>

            <div className="centerBlob2" style={{
                top: '90%',
                right: "10%",
                height: "40vw",
                width: "40vw",
                opacity: ".60"
            }}></div>
            <div className="centerBlob3" style={{
                top: '85%',
                right: "90%",
                height: "40vw",
                width: "40vw",
                opacity: ".60"
            }}></div>
            <div className="settingshomedarkbg fixed left-0 top-0 right-0 bottom-0">
                <Box
                    className={"top  mr-[40px]"}

                >
                    <div
                        className={"wrapper flex items-center justify-between "}
                    >
                        <button
                            className={"theme_button_danger"}
                            style={{
                                borderColor: '#14f59e',
                                background: '#14f59e1f',
                                color: '#14f59e',
                            }}
                            onClick={()=> navigate('/')}
                        >
                            Go Back
                        </button>

                    </div>
                </Box>
                <div className={"section"}>
                    <div className={"intro-section"}>
                        <AnimatePresence>
                            <motion.div
                                key="SettingPanel"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={"relative z-10"}
                            >
                                <SettingsSidebar
                                    variantGroup={variantGroup}
                                    show={true}
                                    onClose={() => { }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div >
    </>)
}

export default Settings;