import backgroundImage from './background-images/maxresdefault.jpg';
import './background.css';
import { AnimatePresence, motion } from 'framer-motion';
export default function Background(props: any) {
  const key = props.picture;
  return (
    <AnimatePresence>
      <motion.div
        className="background-image"
        style={{
          backgroundImage: `url(${props.picture})`,
        }}
        initial={{ opacity: 0.2 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
        key={props.picture}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
