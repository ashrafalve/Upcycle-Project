'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minus, Maximize2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm the UpCycle assistant. How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const getBotResponse = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('hello') || t.includes('hi')) return "Hello! Looking for something specific to upcycle?";
    if (t.includes('price') || t.includes('cost')) return "Our prices vary by item. You can see the price on each product card!";
    if (t.includes('designer')) return "You can find talented designers in our 'Find Designers' section!";
    if (t.includes('shipping')) return "Shipping depends on the seller's location and your own.";
    return "That's a great question! Let me find someone who can help you with that, or you can check our FAQ.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">UpCycle Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-100">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <Minus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-2", msg.sender === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.sender === 'bot' ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-600"
                  )}>
                    {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[75%] p-3 rounded-2xl text-sm shadow-sm",
                    msg.sender === 'bot' 
                      ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none" 
                      : "bg-emerald-600 text-white rounded-tr-none"
                  )}>
                    {msg.text}
                    <div className={cn("text-[10px] mt-1 opacity-70", msg.sender === 'user' ? "text-right" : "text-left")}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-none focus-visible:ring-emerald-500"
                />
                <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700 rounded-full shrink-0 h-10 w-10">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-2">
                Typically responds in a few seconds
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-colors duration-300",
          isOpen ? "bg-gray-900 text-white" : "bg-emerald-600 text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>
    </div>
  );
}
