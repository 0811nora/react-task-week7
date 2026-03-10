// components/PageTransition.jsx
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const animations = {
	initial: { opacity: 0, y: -20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

const PageTransition = ({ children }) => {
	return (
		<MotionDiv
			variants={animations}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			{children}
		</MotionDiv>
	);
};

export default PageTransition;
