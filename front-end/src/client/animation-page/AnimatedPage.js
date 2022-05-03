import { motion} from "framer-motion";

const animations = {
    initial: {opacity: 0, y: 0},
    animate: {opacity: 1, y: 20},
    exit: {opacity: 0, y: -20},
}

const AnimatedPage = ({children}) => {
    return(
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.25}}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPage;