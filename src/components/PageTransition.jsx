// components/PageTransition.jsx
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: -20 }, // 初始狀態：透明且往下位移 20px
  animate: { opacity: 1, y: 0 },  // 進入狀態：不透明且回到原位
  exit: { opacity: 0, y: 20 },   // 離開狀態：透明且往上位移 -20px
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeOut" }} // 設定動畫長度與曲線
        >
        {children}
        </motion.div>
    );
};

export default PageTransition;