"use client"
import { useEffect, useState } from "react";
import { createConnection } from "../utils/Signalr";
import useHelper from "../../../Helper/helper";

export const useNotifications = (accessToken: string) => {
    const helper = useHelper()
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    helper.xhr
      .Get(
        "/Notification/GetAllNotifications"
      )
      .then((res) => {
        setNotifications(res.notifications);
      })
      .catch(console.error);

    const connection = createConnection(accessToken);

    connection.on("ReceiveNotification", (msg: string) => {
      setNotifications((prev) => [msg, ...prev]);
    });

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((error) => console.error("SignalR connection error", error));

    return () => {
      connection.stop();
    };
  }, [accessToken]);

  return notifications;
};