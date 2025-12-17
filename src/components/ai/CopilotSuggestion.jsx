
import React from 'react';
import { Lightbulb } from 'lucide-react';

const CopilotSuggestion = ({ text }) => (
  <div className="bg-sky-500/10 border border-sky-500/30 text-sky-300 p-4 rounded-lg flex items-start gap-3 mb-8">
    <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0" />
    <div>
        <h4 className="font-bold text-white">Stax Suggests…</h4>
        <p className="text-sm">{text}</p>
    </div>
  </div>
);

export default CopilotSuggestion;
