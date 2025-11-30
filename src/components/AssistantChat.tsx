import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function AssistantChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 shadow-xl flex items-center justify-center hover:bg-blue-700 transition"
        >
          <MessageCircle size={28} className="text-white" />
        </button>
      )}

      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </div>
  );
}
