import { memo, useState } from "react";
import { LogoIcon, IconInfo } from "./base/Icons";
import { Button } from "./base/Button";
import { supabase } from "../lib/supabaseClient";

function PublicForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")

      .insert([{ message }]);

    console.log(data, error);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="flex justify-center mt-5">
        <LogoIcon width="24px" height="24px" className="text-blue-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-900">
          Anonymous message
        </h2>
      </div>

      <div className="flex flex-col mt-10">
        <h1 className="block text-2xl font-normal text-gray-900 mb-2 text-center">
          Send your secret message to
        </h1>
        <span className="block text-2xl font-semibold text-gray-900 mb-5 text-center">
          {"someone"}
        </span>
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
            placeholder="Write your thoughts here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <Button
          onClick={() => sendMessage(message)}
          text={loading ? "Sending..." : "Submit"}
          variant="submit"
        />
        <div className="flex mt-3">
          <IconInfo className="mt-0.5 text-blue-500" />
          <p className="md:text-md text-sm text-gray-500 ml-1">
            {"someone"} will never know who you are.
          </p>
        </div>
      </div>

      <div className="px-8 md:px-96 text-center">Timeline</div>
    </>
  );
}

export default PublicForm;
