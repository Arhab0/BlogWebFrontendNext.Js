"use client";
import { useEffect, useState } from "react";
import { useNotifications } from "../../../hooks/useNotifications";
import useHelper from "../../../../../Helper/helper";
import moment from "moment";

const NotificationBell = ({ accessToken }: { accessToken: string }) => {
  const notifications = useNotifications(accessToken);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [mappedNotif, setMappedNotif] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const helper = useHelper();

  const markAllNotificationsAsRead = async () => {
    helper.xhr
      .Get("/Notification/MarkAllNotificationsAsRead")
      .then((res) => {})
      .catch(console.error)
      .finally(() => {
        GetNotification();
      });
  };

  function GetNotification() {
    helper.xhr
      .Get("/Notification/GetAllNotifications")
      .then((res) => {
        setMappedNotif(res.notifications);
        setUnreadNotifications([]);
      })
      .catch(console.error);
  }
  useEffect(() => {
    let arr = notifications.map((e: any) => ({
      message: e?.notification?.message || e?.message,
      timeStamp: e?.notification?.timeSpan || e?.timeStamp,
      isRead: e?.notification?.isRead ?? e?.isRead,
    }));
    setMappedNotif(arr);
  }, [notifications]);

  useEffect(() => {
    setUnreadNotifications(mappedNotif.filter((note: any) => !note.isRead));
  }, [mappedNotif]);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          markAllNotificationsAsRead();
        }}
        className="relative p-2 text-lg"
      >
        🔔
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg rounded-lg p-2 max-h-60 overflow-auto z-50">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            mappedNotif.map((note: any, i: number) => (
              <div
                key={i}
                className="text-sm p-2 border-b last:border-b-0 font-semibold"
              >
                <p>{note?.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {moment(note.timeStamp).fromNow()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
