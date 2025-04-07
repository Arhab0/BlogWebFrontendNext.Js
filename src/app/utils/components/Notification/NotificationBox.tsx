import React from "react";
import NotificationDiv from "./NotificationDiv";
import BackgroundOverlay from "./BackgroundOverlay";

interface Props {
  setIsOpen: (open: boolean) => void;
  notifications: any[];
}

const NotificationBox = ({ setIsOpen, notifications }: Props) => {
  return (
    <>
      <BackgroundOverlay setIsOpen={setIsOpen} />

      {/* Modal */}
      <div className="absolute top-[150px] md:top-[100px] right-[20px] md:right-[25px] w-[332px] h-[404px] bg-white shadow-lg rounded-md p-4 pr-0 z-20">
        <div className="flex justify-between items-center mb-4 pr-4">
          <h3 className="text-sm font-medium">Notifications Messages</h3>
          <button
            className="text-black hover:text-gray-500"
            onClick={() => setIsOpen(false)}
          >
            &#x2715;
          </button>
        </div>
        <div className="max-h-[340px] pr-2 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <NotificationDiv
                key={index}
                notifMessage={notif.message}
                notifDate={notif.date}
              />
            ))
          ) : (
            <p className="text-gray-500">No notifications available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
