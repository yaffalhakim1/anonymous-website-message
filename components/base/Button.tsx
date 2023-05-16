import { memo, useEffect, useState } from "react";

type ButtonVariant = "submit" | "delete";

interface ButtonProps {
  onClick?: () => {};
  text: string;
  variant?: ButtonVariant;
}

function BaseButton({ onClick, text, variant = "submit" }: ButtonProps) {
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
  const buttonColor =
    variant === "delete"
      ? "bg-red-600 hover:bg-red-700 focus:ring-red-400"
      : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-500";
  const buttonText = variant === "delete" ? text : text;

  return (
    <button
      type="submit"
      className={`text-white ${buttonColor} hover:${
        variant === "delete" ? "bg-red-800" : "bg-blue-800"
      } focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm ${buttonClass} px-5 py-2.5 text-center `}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export const Button = memo(BaseButton);

//dark mode added
{
  /* <button
      type="submit"
      className={`text-white ${buttonColor} hover:${
        variant === "delete" ? "bg-red-800" : "bg-blue-800"
      } focus:ring-4 focus:outline-none focus:${
        variant === "delete" ? "ring-red-300" : "ring-blue-300"
      } font-medium rounded-lg text-sm ${buttonClass} px-5 py-2.5 text-center dark:${
        buttonColor === "bg-blue-700" ? "bg-blue-600" : "bg-red-600"
      } dark:hover:${
        variant === "delete" ? "bg-red-700" : "bg-blue-700"
      } dark:focus:${variant === "delete" ? "ring-red-800" : "ring-blue-800"}`}
      onClick={onClick}
    >
      {buttonText}
    </button> */
}
