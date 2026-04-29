import { useState } from "react";
import { FeedbackType } from "../../interfaces/feedback";
import { ChevronDown } from "lucide-react";

interface Props {
  value: FeedbackType;
  onChange: (value: FeedbackType) => void;
}

export default function Dropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const options = Object.values(FeedbackType);

  return <div className="relative w-full mt-2">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border rounded-xl px-4 py-3 bg-white text-sm font-medium text-black/70 hover:border-black/30 transition">
        {value || "Select feedback type..."}
        <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`}/>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
          {options.map((type) => (
            <button key={type} type="button" onClick={() => {
                onChange(type);
                setOpen(false);
              }} className={`w-full text-left px-4 py-3 text-sm transition ${value === type ? "bg-primary text-white"
                    : "text-black/70 hover:bg-primary3/50"}`}>{type}</button>
          ))}
        </div>
      )}
    </div>
}
