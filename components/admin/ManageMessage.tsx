import { useEffect, useRef, useState } from "react";

import CommentsCard from "./CommentsCard";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";

import { Menu } from "../base/Icons";
import useSWR from "swr";
import { Button } from "../base/Button";
import { supabase } from "@/lib/supabaseClient";

function ManageMessage({ session }: { session: Session }) {
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const supabase = useSupabaseClient();

  const sidebarRef = useRef<HTMLDivElement>(null);

  async function fetcher(url: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    return data;
  }

  const { data: messages, error: messagesError } = useSWR("messages", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
  });

  const subMenus = [
    {
      title: "Comments",
      content: (
        <>
          {messagesError ? (
            <div>Error loading messages</div>
          ) : !messages ? (
            <div>Loading...</div>
          ) : (
            <CommentsCard messages={messages} />
          )}
        </>
      ),
    },
    {
      title: (
        <Button
          text={"Logout"}
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log("Error logging out:", error.message);
          }}
        />
      ),
    },
  ];

  const handleSubMenuClick = (index: number) => {
    setSelectedSubMenuIndex(index);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleOutsideClick = (event: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMobileSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileSidebarOpen]);
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

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black opacity-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
        ref={sidebarRef}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <p className="text-white">Dashboard</p>
            {subMenus.map((subMenu, index) => (
              <li key={index}>
                <div
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
                </div>
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

export default ManageMessage;
