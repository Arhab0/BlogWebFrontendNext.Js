import Dropdown from "../Dropdown/Dropdown";

interface Props {
    label: string;
    value: string;
    setTime: (value: string) => void;
    disabled?: boolean;
}

export default function CustomTimeTag({ label, value = "12:00 AM", setTime, disabled }: Props) {
    const [time, meridian] = value.split(" ");
    const [hours, minutes] = time.split(":") ?? ["12", "00"];

    const handleTimeChange = (type: "hour" | "minute", newValue: string) => {
        let numValue = parseInt(newValue, 10) || 0;
        if (type === "hour") numValue = Math.min(12, Math.max(1, numValue)); // 1-12 range
        if (type === "minute") numValue = Math.min(59, Math.max(0, numValue));

        const updatedTime = type === "hour"
            ? `${numValue.toString().padStart(2, "0")}:${minutes} ${meridian}`
            : `${hours}:${numValue.toString().padStart(2, "0")} ${meridian}`;

        setTime(updatedTime);
    };

    const toggleMeridian = () => {
        const newMeridian = meridian === "AM" ? "PM" : "AM";
        setTime(`${hours}:${minutes} ${newMeridian}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <label className="text-xs" htmlFor={label}>{label}</label>
            <div className="flex gap-x-2 items-center border h-10 rounded justify-between bg-[#f6f8fc] px-2">
                <input
                    type="number"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => handleTimeChange("hour", e.target.value)}
                    disabled={disabled}
                    className={`w-full text-center bg-transparent py-[2%] ${disabled ? "bg-[#f6f8fcc5] cursor-not-allowed" : "bg-[#f6f8fc]"}`}
                />
                <span className="font-semibold">:</span>
                <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => handleTimeChange("minute", e.target.value)}
                    disabled={disabled}
                    className={`w-full text-center bg-transparent py-[2%] ${disabled ? "bg-[#f6f8fcc5] cursor-not-allowed" : "bg-[#f6f8fc]"}`}
                />
                <select
                onChange={toggleMeridian}
                className={`px-2 border-2 border-black/60 rounded py-1 text-sm ${disabled ? "bg-[#f6f8fcc5] cursor-not-allowed" : "bg-[#f6f8fc]"} rounded`}>
                    <option value="AM" selected={meridian === "AM"}>AM</option>
                    <option value="PM" selected={meridian === "PM"}>PM</option>
                </select>
            </div>
        </div>
    );
}
