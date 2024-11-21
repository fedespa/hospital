"use client";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  message?: string;
  onClose?: () => void; // Callback opcional si necesitas manejar cuando se cierra
}

function AlertError({ message, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      // Configura un temporizador para ocultar el mensaje después de 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose(); // Llama al callback si está definido
      }, 3000);

      // Limpia el temporizador si el componente se desmonta o si el mensaje cambia
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 20 }} 
          transition={{ duration: 0.3, ease: "easeOut" }} 
          className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive fixed bottom-6 right-6"
        >
          <ExclamationTriangleIcon />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AlertError;
