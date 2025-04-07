import RejectBtn from "@/app/utils/components/RejectBtn/RejectBtn";
import React from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";

interface Props {
  show: boolean;
  closeModal: () => void;
  activeTabIndex: string;
  message: string;
  confirm: () => void;
}

const UserDetailsProceedModal = ({
  show,
  closeModal,
  activeTabIndex,
  message,
  confirm,
}: Props) => {
  function close() {
    closeModal();
  }

  function handleSubmit() {
    confirm();
  }
  return (
    <div>
      <div
        id="crud-modal"
        tabIndex={1}
        aria-hidden="true"
        className={`${
          !show && "hidden"
        } bg-[#00000050] modalDisplay text-black overflow-y-auto flex overflow-x-hidden font-alata font-normal fixed top-5 left-0 z-[100000] justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full `}
      >
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative flex flex-col items-center bg-white rounded-lg shadow ">
            <div className="flex items-center justify-end w-full p-4">
              <button
                type="button"
                onClick={close}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 pt-0 w-[80%] flex flex-col items-center h-full text-center space-y-3">
              <p className="text-3xl">Confirmation</p>
              <p className="text-sm">{message}</p>
            </div>
            <div className="flex justify-center space-x-2 p-4 w-full">
              <div className="w-1/2 md:w-1/3">
                <button
                  onClick={close}
                  type="button"
                  className="py-2 text-xs px-3 font-medium text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
                >
                  No, cancel
                </button>
              </div>
              <div className="w-1/2 md:w-1/3">
                <SubmitBtn
                  text={`Yes${activeTabIndex != "" ? ", Move Forward" : ""}`}
                  clickEvent={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsProceedModal;
