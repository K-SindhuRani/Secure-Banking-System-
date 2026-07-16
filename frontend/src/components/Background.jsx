import { motion } from "framer-motion";

function Background() {

    return (

        <>

            <motion.div
                className="floating-circle circle1"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8
                }}
            />

            <motion.div
                className="floating-circle circle2"
                animate={{
                    y: [0, 25, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 10
                }}
            />

            <motion.div
                className="floating-circle circle3"
                animate={{
                    x: [0, -20, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 7
                }}
            />

        </>

    );

}

export default Background;