'use client';
import React, { useState } from 'react';
import { Send, Code, FileText, Play, User, Bot } from 'lucide-react';

export default function AICanvas() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Halo! Saya AI Assistant Anda. Apa yang ingin kita bangun hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [canvasContent, setCanvasContent] = useState('// Tulis kode Anda di sini...\n\nfunction helloWorld() {\n  console.log("Hello from AI Canvas!");\n}');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulasi AI Response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'bot', 
        content: 'Saya telah memperbarui kode di Canvas untuk Anda.' 
      }]);
      setCanvasContent(`// Update otomatis oleh AI\n\nfunction helloWorld() {\n  console.log("Update: ${input}");\n}`);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Sidebar: Chat */}
      <div className="w-1/3 border-r border-zinc-800 flex flex-col bg-[#0f0f0f]">
        <div className="p-4 border-b border-zinc-800 font-bold flex items-center gap-2">
          <Bot size={20} className="text-blue-400" />
          AI Agent Chat
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && <User size={24} className="text-zinc-500 shrink-0" />}
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                {msg.content}
              </div>
              {msg.role === 'user' && <User size={24} className="text-blue-400 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-700">
            <input 
              className="flex-1 bg-transparent outline-none px-2" 
              placeholder="Tanya AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Canvas */}
      <div className="flex-1 flex flex-col bg-[#050505]">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Code size={16} />
              <span>main.js</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-500 transition">
            <Play size={14} /> Run
          </button>
        </div>
        
        <div className="flex-1 p-6 font-mono text-sm">
          <textarea 
            className="w-full h-full bg-transparent outline-none resize-none text-zinc-300" 
            value={canvasContent}
            onChange={(e) => setCanvasContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
