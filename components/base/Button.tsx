import { memo, useEffect, useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
}

// function BaseButton({ onClick, text }: ButtonProps) {
//   return (
//     <button
//       type="submit"
//       className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
// }

function BaseButton({ onClick, text }: ButtonProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const buttonClass = isMobile ? "w-auto" : "w-full sm:w-auto";

  return (
    <button
      type="submit"
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ${buttonClass} px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export const Button = memo(BaseButton);
