"use client";
import { useEffect, useState } from "react";
import { useNotifications } from "../../../hooks/useNotifications";
import useHelper from "../../../../../Helper/helper";
import moment from "moment";

const NotificationBell = ({ accessToken }: { accessToken: string }) => {
  const realtimeNotifications = useNotifications(accessToken);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const helper = useHelper();

  const fetchNotifications = () => {
    helper.xhr
      .Get("/Notification/GetAllNotifications")
      .then((res) => {
        const fetched = res.notifications.map((note: any) => ({
          id: note.id,
          message: note?.notification?.message || note?.message,
          timeStamp: note?.notification?.timeSpan || note?.timeStamp,
          isRead: note?.notification?.isRead ?? note?.isRead,
        }));
        setNotifications(fetched);
      })
      .catch(console.error);
  };

  const markAllNotificationsAsRead = async () => {
    await helper.xhr.Get("/Notification/MarkAllNotificationsAsRead");
    fetchNotifications();
  };

  useEffect(() => {
    if (realtimeNotifications.length === 0) return;

    setNotifications((prev) => {
      const merged = [...prev];
      for (const rt of realtimeNotifications) {
        const exists = merged.some((n) => n.message === rt.message);
        if (!exists) {
          merged.push({
            id: rt.id,
            message: rt?.notification?.message || rt?.message,
            timeStamp:
              rt?.notification?.timeSpan || rt?.timeStamp || new Date(),
            isRead: false,
          });
        }
      }
      return merged;
    });
  }, [realtimeNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) markAllNotificationsAsRead();
        }}
        className="relative p-2 text-lg"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-[2px] right-[2px] min-w-[14px] h-[14px] px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center leading-none"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border shadow-lg rounded-lg p-2 max-h-60 overflow-auto z-50">
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No notifications
            </p>
          ) : (
            notifications.map((note, i) => (
              <div
                key={i}
                className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition duration-200"
              >
                <p className="text-sm text-gray-800 font-medium">
                  {note?.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
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
