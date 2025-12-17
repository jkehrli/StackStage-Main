import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  ThumbsUp, 
  Search, 
  Plus, 
  Star, 
  Award, 
  Users, 
  TrendingUp,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Textarea } from '@/components/ui/textarea';

const mockPosts = [
  {
    id: 1,
    title: "Best CRM for Series A startup with 20+ sales team?",
    author: "Sarah Chen",
    authorTitle: "VP Sales, TechFlow Inc",
    avatarSeed: "Sarah Chen",
    tags: ["CRM", "Sales", "Series-A"],
    upvotes: 24,
    comments: 8,
    timeAgo: "2h ago"
  },
  {
    id: 2,
    title: "Security compliance tools for healthcare SaaS - SOC2 + HIPAA",
    author: "Mike Lee",
    authorTitle: "CTO, HealthData.io",
    avatarSeed: "Mike Lee",
    tags: ["Security", "Compliance", "Healthcare"],
    upvotes: 45,
    comments: 12,
    timeAgo: "1d ago"
  },
    {
    id: 3,
    title: "Consolidating marketing automation platforms - Marketo vs HubSpot?",
    author: "Emily White",
    authorTitle: "RevOps Lead, Innovate Corp",
    avatarSeed: "Emily White",
    tags: ["Marketing", "RevOps", "Consolidation"],
    upvotes: 31,
    comments: 15,
    timeAgo: "3d ago"
  }
];

const topMembers = [
  { name: "Johnathan Doe", title: "IT Director, Global Fin", avatarSeed: "Johnathan Doe", points: 12840 },
  { name: "Samantha Ray", title: "Procurement Lead, Retail Inc", avatarSeed: "Samantha Ray", points: 11230 },
  { name: "Alex Chen", title: "CTO, Innovate Corp", avatarSeed: "Alex Chen", points: 9850 },
  { name: "Priya Singh", title: "CIO, Enterprise Solutions", avatarSeed: "Priya Singh", points: 9500 },
];

const trendingTopics = ["BI Tools", "Data Warehouse", "AI-native", "Cloud Spend", "Vendor Negotiation"];

const AskQuestionModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="glass-effect border-slate-700 rounded-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <CardHeader>
                <CardTitle className="text-white flex justify-between items-center">
                    Ask the Community
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
                </CardTitle>
                <CardDescription>Get answers from a network of verified peers and experts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Question Title (e.g., Best BI tool for e-commerce?)" className="bg-slate-800 border-slate-600 text-white" />
                <Textarea placeholder="Provide more details about your question..." className="bg-slate-800 border-slate-600 text-white min-h-[150px]" />
                <Input placeholder="Add tags (e.g., BI, Analytics, E-commerce)" className="bg-slate-800 border-slate-600 text-white" />
                <div className="flex justify-end">
                    <Button className="gradient-button" onClick={() => { alert('Question submitted!'); onClose(); }}>Submit Question</Button>
                </div>
            </CardContent>
        </div>
    </div>
);

export default function Community() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
            <Card className="glass-effect border-slate-700">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">Community Feed</h2>
                        <p className="text-slate-300">Ask questions, share insights, and learn from your peers.</p>
                    </div>
                    <Button className="gradient-button" onClick={() => setShowModal(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Ask a Question
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {mockPosts.map(post => (
                    <Card key={post.id} className="glass-effect border-slate-700 hover:border-slate-600 transition-all">
                        <CardContent className="p-4 flex items-start gap-4">
                            <Avatar className="w-10 h-10 border-2 border-slate-600">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.avatarSeed}`} />
                                <AvatarFallback>{post.author.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <Link to={createPageUrl(`CommunityPost?id=${post.id}`)} className="hover:text-sky-400">
                                    <h3 className="font-semibold text-lg text-white">{post.title}</h3>
                                </Link>
                                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                    <span>{post.author}</span> • <span>{post.authorTitle}</span> • <span>{post.timeAgo}</span>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2">
                                        {post.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">{tag}</Badge>)}
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                                        <button className="flex items-center gap-1 hover:text-white" onClick={() => alert('Upvoted!')}>
                                            <ThumbsUp className="w-4 h-4" /> {post.upvotes}
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-white" onClick={() => alert('Comment action!')}>
                                            <MessageSquare className="w-4 h-4" /> {post.comments}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <Card className="glass-effect border-slate-700">
                <CardHeader><CardTitle className="text-white">Top Members</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {topMembers.map(member => (
                        <div key={member.name} className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2 border-slate-600">
                                <AvatarImage src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${member.avatarSeed}`} />
                                <AvatarFallback>{member.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-white">{member.name}</p>
                                <p className="text-xs text-slate-400">{member.title}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="font-bold text-sky-400">{member.points.toLocaleString()}</p>
                                <p className="text-xs text-slate-500">rep</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card className="glass-effect border-slate-700">
                <CardHeader><CardTitle className="text-white">Trending Topics</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {trendingTopics.map(topic => (
                        <Badge key={topic} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer" onClick={() => alert(`Filtering by ${topic}`)}>{topic}</Badge>
                    ))}
                </CardContent>
            </Card>
        </div>
        {showModal && <AskQuestionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}