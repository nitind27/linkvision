import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = false, onClick, animate = true }) {
  if (!animate) {
    return (
      <div onClick={onClick} className={`card ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      className={`card ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
