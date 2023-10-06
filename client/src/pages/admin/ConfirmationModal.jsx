import React from "react";

function ConfirmationModal({
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="  bg-white p-4   rounded-3xl shadow-lg m-6">
        <p className="text-lg  text-pgray-700 m-6">{message}</p>
        <div className="mt-4 flex justify-start space-x-2  mx-6 my-3">
          <button
            className="px-4 py-2 rounded-3xl bg-pred-100  text-pred-600  hover:bg-red-600  "
            onClick={onConfirm}
          >
            {confirmLabel || "Confirm"}
          </button>
          <button
            className="px-4 py-2  rounded-3xl bg-pred-500 text-white  hover:bg-gray-400"
            onClick={onCancel}
          >
            {cancelLabel || "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
