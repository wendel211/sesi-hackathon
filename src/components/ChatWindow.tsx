import { useState, useRef, useEffect } from "react";
import { X, FileText, HelpCircle, Calendar, Send } from "lucide-react";

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Olá! Sou o assistente virtual. Como posso ajudar você hoje?",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático sempre que novas mensagens chegarem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enviar mensagem digitada
  const sendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: messageText }]);
    setInput("");

    // resposta automática
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Recebi sua solicitação: "${messageText}". Em breve estarei conectado com os serviços reais.`,
        },
      ]);
    }, 800);
  };

  // QUANDO O USUÁRIO CLICA EM UMA QUICK ACTION
  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="bg-blue-600 text-white px-4 py-4 flex items-center justify-between border-b border-blue-700/30">
        <div>
          <p className="font-semibold text-sm">SESI Assistente</p>
          <p className="text-xs opacity-80 mt-0.5">Como podemos ajudar?</p>
        </div>

        <button
          onClick={onClose}
          className="rounded-md p-1 hover:bg-blue-700/40 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex items-center gap-3 overflow-x-auto px-4 py-3 bg-gray-50 border-b border-gray-200">

        <button
          className="qa-btn"
          onClick={() => handleQuickAction("Quero acompanhar o status do meu contrato")}
        >
          <FileText size={16} className="text-blue-600" />
          <span>Acompanhar contrato</span>
        </button>

        <button
          className="qa-btn"
          onClick={() => handleQuickAction("Preciso corrigir o M1")}
        >
          <HelpCircle size={16} className="text-blue-600" />
          <span>Corrigir M1</span>
        </button>

        <button
          className="qa-btn"
          onClick={() => handleQuickAction("Quero ver minha agenda")}
        >
          <Calendar size={16} className="text-blue-600" />
          <span>Agenda</span>
        </button>

      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`
              max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.from === "bot"
                ? "bg-white text-gray-800 border border-gray-200"
                : "bg-blue-600 text-white ml-auto"
              }
            `}
          >
            {msg.text}
          </div>
        ))}

        {/* marcador invisível para autoscroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => sendMessage()}
          className="w-11 h-11 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition shadow-md"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
