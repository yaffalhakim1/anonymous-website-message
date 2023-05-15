import React from "react";
import { Button } from "../base/Button";

function CommentsCard() {
  return (
    <>
      <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-2">
        <div className="flex justify-between items-center">
          <p className="w-full overflow-wrap break-words">
            {
              "some long comments that will wrap to multiple lines if necessary to show the full content of the comments that is being made by the user"
            }
          </p>
          <div className="flex-shrink-0 ml-4">
            <Button text={"Hapus"} variant="delete" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
