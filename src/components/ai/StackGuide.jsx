
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bot, X, CornerDownLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

const StackGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sampleQuestions = [
    "Where can we consolidate?",
    "What’s holding us back from Stage 3?",
    "Who should we loop into this decision?",
  ];

  const handleSend = (question) => {
    const userMessage = { sender: 'user', text: question };
    let botResponseText = "";

    if (question.includes("consolidate")) {
        botResponseText = "Based on your stack, consolidating your three separate analytics tools into a single platform like Mixpanel could save an estimated $45,000 annually and reduce data silos.";
    } else if (question.includes("Stage 3")) {
        botResponseText = "To reach Stage 3 (Optimized), your focus should be on integrating your CRM and Marketing Automation tools. This will improve lead-to-close velocity by an estimated 15%.";
    } else if (question.includes("decision")) {
        botResponseText = "For a decision of this size, I recommend including a representative from Finance (to assess budget impact) and a key end-user from the Sales team (to ensure adoption).";
    } else {
        botResponseText = "I can help with questions about stack optimization, vendor comparisons, and stakeholder alignment. Try one of the suggestions!";
    }
    
    const botMessage = { sender: 'bot', text: botResponseText };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 gradient-button shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8"/> : <Bot className="w-8 h-8"/>}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 glass-effect border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 bg-slate-800/50 border-b border-slate-700">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-sky-400" />
                Ask Stax
              </h3>
              <p className="text-sm text-slate-400">Your AI software buying assistant.</p>
            </div>
            <div className="p-4 h-80 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-200'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                 {messages.length === 0 && (
                    <div className="text-center text-slate-400 space-y-3">
                        <p className="text-sm">Need help deciding? Ask a question or try a suggestion.</p>
                        {sampleQuestions.map(q => (
                            <Button key={q} size="sm" variant="outline" className="w-full text-xs h-auto py-2 justify-start text-left border-slate-600" onClick={() => handleSend(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                )}
              </div>
            </div>
            <div className="p-3 border-t border-slate-700 flex items-center gap-2">
              <Input
                placeholder="Ask a question..."
                className="bg-slate-800/50 border-slate-600"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              />
              <Button size="icon" className="gradient-button flex-shrink-0" onClick={() => handleSend(input)}>
                <CornerDownLeft className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StackGuide;
