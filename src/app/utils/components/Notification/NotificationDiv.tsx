import React from "react";
import { changeDateFormatWithTime } from "../../../../../Helper/DateFormats";

interface NotificationDivProps {
  key: number;
  notifMessage: string;
  notifDate: string;
}

function NotificationDiv({
  key,
  notifMessage,
  notifDate,
}: NotificationDivProps) {
  return (
    <div
      key={key}
      className="p-2 mb-2 bg-[#EEF3FF] rounded-md shadow-sm text-xs font-barlow"
    >
      <p className="">{notifMessage}</p>
      <p className="text-[10px] text-gray-400 flex items-end justify-end">
        {changeDateFormatWithTime(notifDate)}
      </p>
    </div>
  );
}

export default NotificationDiv;
