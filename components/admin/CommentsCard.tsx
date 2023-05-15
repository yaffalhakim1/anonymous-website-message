import React from "react";
import { Button } from "../base/Button";

function CommentsCard() {
  return (
    <>
      <div className="p-4 border border-gray-200  rounded-lg dark:border-gray-700">
        <div className="flex justify-between items-center">
          <p>{"some comments"}</p>
          <Button text={"Hapus"} />
        </div>
      </div>
    </>
  );
}

export default CommentsCard;
