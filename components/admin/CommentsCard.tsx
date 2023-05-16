import { useState } from "react";
import { Button } from "../base/Button";
import { supabase } from "@/lib/supabaseClient";

function CommentsCard({ messages }: { messages: any[] }) {
  const [loading, setLoading] = useState(false);

  async function deleteMessage(messageId: number) {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.log({ error });
      return { error };
    }
    setLoading(false);
    console.log({ data });
    return { data };
  }

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-2"
        >
          <div className="flex justify-between items-center">
            <p className="w-full overflow-wrap break-words">
              {message.message}
              {message.id}
            </p>
            <div className="flex-shrink-0 ml-4">
              <Button
                text={loading ? "Deleting..." : "Delete"}
                variant="delete"
                onClick={() => deleteMessage(message.id)}
              />
            </div>
          </div>

          <p className="font-thin text-sm mt-2">{message.created_at}</p>
        </div>
      ))}
    </>
  );
}

export default CommentsCard;
