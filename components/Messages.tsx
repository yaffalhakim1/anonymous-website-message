import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import useSWR from "swr";

function Messages({ messages }: { messages: any[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col px-8 lg:px-96">
          <div className="mt-5">{message.message}</div>
          <form>
            <div className="flex items-center py-2 rounded-lg">
              <textarea
                id="chat"
                rows={1}
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Write your comment"
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
          <p className="bg-blue-50 p-2 rounded-md text-gray-500">
            some replies
          </p>
        </div>
      ))}
    </>
  );
}

export default Messages;
