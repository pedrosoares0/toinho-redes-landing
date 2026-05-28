import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  wordDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  once = true,
  delay = 0,
  wordDelay = 0.04
}) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: wordDelay, 
        delayChildren: delay 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 90,
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
      rotate: 1.5,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap overflow-hidden py-1 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] pb-1">
          <motion.span
            variants={child}
            className="inline-block origin-bottom-left"
            style={{ display: "inline-block" }}
          >
            {word === "" ? "\u00A0" : word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
