import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const InviteTeammatesCard = () => (
  <Card className="glass-effect border-slate-700">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Send className="w-6 h-6 text-emerald-400" />
        Invite Teammates
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2">
        <Input placeholder="colleague@company.com" className="bg-slate-800/50 border-slate-600"/>
        <Button className="gradient-button text-white">Send Invite</Button>
      </div>
    </CardContent>
  </Card>
);

export default InviteTeammatesCard;