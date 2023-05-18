import { useState } from "react";
import { Button } from "../base/Button";
import { supabase } from "@/lib/supabaseClient";

function CommentsCard({ messages }: { messages: any[] }) {
  const [loadingMessageId, setLoadingMessageId] = useState<number | null>(null);

  async function deleteMessage(messageId: number) {
    setLoadingMessageId(messageId);

    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      setLoadingMessageId(null);
      return { error };
    }

    setLoadingMessageId(null);

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
            </p>
            <div className="flex-shrink-0 ml-4">
              <Button
                text={
                  loadingMessageId === message.id ? "Deleting..." : "Delete"
                }
                variant="delete"
                onClick={() => deleteMessage(message.id)}
              />
            </div>
          </div>

          <div className="font-thin text-sm mt-2">
            {new Date(message.created_at).toLocaleDateString()}
            {" - "}
            {new Date(message.created_at).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </>
  );
}

export default CommentsCard;
