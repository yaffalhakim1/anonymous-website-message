import { useState } from "react";
import { LogoIcon, IconInfo, Github } from "./base/Icons";
import { Button } from "./base/Button";
import { supabase } from "../lib/supabaseClient";
import useSWR from "swr";
import Messages from "./Messages";

function PublicForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .insert([{ message }]);

    if (error) {
      return { error };
    }

    setLoading(false);
  }

  async function fetcher(url: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data;
  }

  const { data: messages, error: messagesError } = useSWR("messages", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 1000,
  });

  return (
    <>
      <div className="flex justify-center mt-5">
        <LogoIcon width="24px" height="24px" className="text-blue-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-900">
          <span>
            <a href="https://github.com/yaffalhakim1/anonymous-website-message">
              Anonymous message
            </a>
          </span>
        </h2>
      </div>

      <div className="flex flex-col mt-10">
        <h1 className="block text-2xl font-normal text-gray-900 mb-5 text-center">
          Send your secret message here
        </h1>
        {/* <span className="block text-2xl font-semibold text-gray-900 mb-5 text-center">
          {"Me"}
        </span> */}
      </div>
      <div className="mb-6 flex flex-col px-8 lg:px-96">
        <label className="block mb-2 text-sm font-medium text-black ">
          Your message
        </label>

        <div className="mb-6">
          <textarea
            id="message"
            rows={5}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="If you have opinions, suggestions, or anything else about me please write here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <Button
          onClick={() => sendMessage(message)}
          text={loading ? "Submitting..." : "Submit"}
          variant={loading ? "disabled" : "submit"}
        />
        <div className="flex mt-3">
          <IconInfo className="mt-0.5 text-blue-500" />
          <p className="md:text-md text-sm text-gray-500 ml-1">
            I will never know who you are.
          </p>
        </div>
      </div>

      <div className="px-8 md:px-96 text-center">Timeline</div>
      <div>
        {messagesError ? (
          <div className="text-center flex justify-center items-center">
            Failed to load messages, please try again later.
          </div>
        ) : !messages ? (
          <div className="text-center flex justify-center items-center">
            Loading...
          </div>
        ) : (
          <Messages messages={messages} />
        )}
      </div>
    </>
  );
}

export default PublicForm;
