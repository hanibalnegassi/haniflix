import { motion } from "framer-motion";
import './modalPopUp.scss'
export default function ModelPopup({ children }) {
  const modelVariant = {
    hidden: {
      scale: 0,
      opacity: 0.2,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };
  const modelParentVariant = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  };


  return (
    <motion.div
      key={"LogoutConfirm"}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modelParentVariant}
      className="fixed left-0 top-0 bottom-0 right-0 bg-[#00000080] z-[100]"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={modelVariant}
        className="modalpopbg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:min-w-96 p-10 text-center flex flex-col justify-center min-h-52 backdrop-blur-lg rounded-xl max-w-[95vw]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
