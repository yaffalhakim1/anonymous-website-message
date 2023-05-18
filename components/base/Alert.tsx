import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { IconInfo } from "./Icons";

function Alert({ error }: { error: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true); // Show the alert when a new error occurs

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []); // Add 'error' as a dependency

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 w-72 p-4 text-sm text-red-500 font-medium rounded-lg bg-red-100 flex"
        >
          <IconInfo className="flex-shrink-0 inline w-5 h-5 mr-1" />

          <div className="flex">{error}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Alert;
