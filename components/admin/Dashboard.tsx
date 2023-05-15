import { useState } from "react";
import { Button } from "../base/Button";
import { Comme } from "next/font/google";
import CommentsCard from "./CommentsCard";
import { Menu } from "../base/Icons";

export function Dashboard() {
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const subMenus = [
    {
      title: "Dashboard",
      content: <CommentsCard />,
    },
    {
      title: "Test",
      content: "",
    },
  ];

  const handleSubMenuClick = (index: number) => {
    setSelectedSubMenuIndex(index);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="hidden sm:inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <div className="sm:hidden">
        <button
          className="inline-flex items-center justify-center p-2 ml-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={handleMobileSidebarToggle}
        >
          <Menu />
        </button>
      </div>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {subMenus.map((subMenu, index) => (
              <li key={index}>
                <button
                  className={`flex items-center justify-between w-full px-2 py-2 text-sm font-medium leading-5 text-gray-900 rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 ${
                    selectedSubMenuIndex === index
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                  onClick={() => {
                    handleSubMenuClick(index);
                    setIsMobileSidebarOpen(false);
                  }}
                >
                  <span className="flex items-center truncate">
                    <span className="truncate">{subMenu.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 ">
        <div> {subMenus[selectedSubMenuIndex].content}</div>
      </div>
    </>
  );
}
