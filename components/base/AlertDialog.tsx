import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./Button";

const AlertDialogDelete = ({
  onClick,
  onClose,
}: {
  onClick: () => void;
  onClose: () => void;
}) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <Button text={"Delete"} variant="delete" />
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50">
        <AlertDialog.Title className="text-black m-0 text-[17px] font-medium">
          Are your sure you want to delete this message?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-black mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete the message
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button
              onClick={onClose}
              className="text-black hover:bg-gray-200 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
            >
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button
              className="text-red-500 bg-red-100 hover:bg-red-300 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              onClick={onClick}
            >
              Yes, delete message
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default AlertDialogDelete;
