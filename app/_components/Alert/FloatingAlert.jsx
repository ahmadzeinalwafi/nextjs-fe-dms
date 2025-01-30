import { useState, useEffect } from "react";

const FloatingAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="alert alert-warning fixed bottom-5 left-1/2 transform -translate-x-1/2 w-auto shadow-lg flex items-center justify-center px-4 py-2 z-50 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current mr-2"
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>This is a prototype system and still experimental, do not use in production and please recheck the information first</span>
    </div>
  );
};

export default FloatingAlert;
