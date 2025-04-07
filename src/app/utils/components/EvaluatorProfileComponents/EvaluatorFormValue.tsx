import React from "react";
import {
  changeDateFormat,
  changeDateFormatWithTime,
} from "../../../../../Helper/DateFormats";

interface EvaluatorFormValueProps {
  allotedDate: string;
  allotedAmount: number;
  checkedAmount: number;
  balance: number | string;
  deadline: string;
}

function EvaluatorFormValue({
  allotedDate,
  allotedAmount,
  checkedAmount,
  balance,
  deadline,
}: EvaluatorFormValueProps) {
  return (
    <tr className="text-[#8D8D8D] text-xs bg-white">
      <td className="p-1">{allotedDate}</td>
      <td className="p-1">{allotedAmount}</td>
      <td className="p-1">{checkedAmount}</td>
      <td className="p-1">{balance}</td>
      <td className="p-1">{changeDateFormatWithTime(deadline)}</td>
    </tr>
  );
}

export default EvaluatorFormValue;
