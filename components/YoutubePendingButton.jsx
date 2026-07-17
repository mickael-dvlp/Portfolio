"use client";

import { FaYoutube } from "react-icons/fa";
import { toast } from "sonner";

export default function YoutubePendingButton() {
  return (
    <button
      type="button"
      aria-label="YouTube"
      onClick={() =>
        toast.info(
          "Chaîne en cours de création, mais soyez patient, de nombreux tutos arriveront prochainement !"
        )
      }
      className="text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-125 cursor-pointer"
    >
      <FaYoutube size={22} />
    </button>
  );
}
