import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare, Link as LinkIcon, PenSquare, ArrowLeft, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const mockPostsData = {
    1: {
        id: 1,
        title: "Get Calls API Route's Page Size Too Small",
        author: 'schreng',
        role: 'Developer',
        avatar: 'S',
        category: 'Developers',
        time: '10 hours ago',
        replies: 2,
        likes: 0,
        content: `Hi, I am hitting the POST /v2/calls/intensive API route and I noticed that the response has the currentPageSize set to 50. I thought I remember this value being set to at least 100 previously. I also noticed that there's a lot of data in each response and I'm not able to increase the page size.

Has anyone else experienced this issue? Looking for workarounds or if there's a way to configure this.`,
        responses: [
            {
                author: 'Alex Kim',
                role: 'Senior Developer',
                avatar: 'A',
                time: '8 hours ago',
                content: 'I ran into the same issue last week. The API team reduced the default page size due to performance concerns. You can still request up to 200 records by adding ?pageSize=200 to your query parameters.'
            },
            {
                author: 'Maria Santos',
                role: 'DevOps Engineer', 
                avatar: 'M',
                time: '6 hours ago',
                content: 'Also worth mentioning - if you need more than 200 records, consider using the cursor-based pagination. The API returns a nextCursor field that you can use for subsequent requests.'
            }
        ]
    },
    2: {
        id: 2,
        title: "AI Briefer - Need help to automate",
        author: 'Elizabeth Courtland',
        role: 'Community Newbie',
        avatar: 'E',
        category: 'Support',
        time: '12 hours ago',
        replies: 31,
        likes: 1,
        content: `Hey team! When setting up my automation, I would like to:

1. Isolate calls that turn a prospect into a customer (done)
2. Automatically trigger an AI briefer to screen the entire account and catch a brief type
3. Send this brief type result via a webhook.

How can I do that please?

I'm trying to set up automation that will help scale our sales process, but I'm getting stuck on step 2. Any guidance would be much appreciated!`,
        responses: [
            {
                author: 'Michael Chen',
                role: 'Sales Operations',
                avatar: 'M',
                time: '10 hours ago',
                content: 'For step 2, you\'ll want to use the AI Briefer API. Create a new rule in your automation that triggers when a call meets your criteria from step 1. The API endpoint is /v2/ai-briefer/analyze with the account ID as a parameter.'
            },
            {
                author: 'Sarah Wilson',
                role: 'Implementation Specialist',
                avatar: 'S',
                time: '8 hours ago',
                content: 'Make sure you set up proper error handling! The AI briefer can take 30-60 seconds to process, so use async processing. I\'d recommend using a webhook to get notified when the analysis is complete rather than polling.'
            }
        ]
    },
    3: {
        id: 3,
        title: "Whispers - Not Enough Team Members",
        author: 'Caroline Johnson',
        role: 'Community Newbie',
        avatar: 'C',
        category: 'Coaching',
        time: '1 day ago',
        replies: 22,
        likes: 2,
        content: `I'm trying to set up Whispers for Topics, and no matter how small I set my filters, I still see "Not enough team members found." Does anyone know why this is the case?

Our team has grown to 25 people now, but we're still getting this error when trying to enable coaching features. This is blocking our ability to implement systematic coaching across the sales team.`,
        responses: [
            {
                author: 'David Park',
                role: 'Sales Manager',
                avatar: 'D',
                time: '20 hours ago',
                content: 'I had this exact issue! The problem is that Whispers requires at least 5 active users in the same role/team to generate meaningful insights. Check your user roles and make sure they\'re properly configured in Settings > Team Management.'
            },
            {
                author: 'Lisa Rodriguez',
                role: 'Customer Success',
                avatar: 'L',
                time: '18 hours ago',
                content: 'Also make sure your team members have had at least 10 recorded calls in the last 30 days. The system needs enough data to generate coaching insights. You can check this in the Analytics dashboard.'
            }
        ]
    },
    4: {
        id: 4,
        title: "Export Smart Tracker 'Phrase' to CRM",
        author: 'Rena Pena',
        role: 'Community Newbie',
        avatar: 'R',
        category: 'Integrations',
        time: '1 day ago',
        replies: 2,
        likes: 0,
        content: `In Salesforce if a tracker is present on a Gong recording, a record is created on the Call/Conversation object in our each KeyWord trackers. For KeyWord trackers, you are allowed to populate a field.

However, I don't see this functionality for Smart Trackers. Is there a way to export Smart Tracker results, specifically the 'phrase' that was detected, to our CRM?

This would be incredibly valuable for our sales analytics and follow-up processes.`,
        responses: [
            {
                author: 'James Wilson',
                role: 'Integration Specialist',
                avatar: 'J',
                time: '22 hours ago',
                content: 'Smart Tracker phrases can be exported through the API, but not directly through the standard CRM sync. You\'ll need to use the /v2/calls/{callId}/trackers endpoint and then push that data to Salesforce using their REST API.'
            },
            {
                author: 'Amanda Foster',
                role: 'Sales Ops Manager',
                avatar: 'A',
                time: '20 hours ago',
                content: 'We built a custom integration using Zapier that pulls Smart Tracker data hourly and creates custom fields in Salesforce. Happy to share the setup if you\'re interested! It\'s been a game-changer for our follow-up process.'
            }
        ]
    }
};

const relatedTopics = [
    {
      title: 'Tips from "Race to Embrace Gen AI: How to close productivity gaps and improve the buyer experience"',
      category: 'SHARE REVENUE HACKS & TIPS'
    },
    {
      title: 'ICYMI: You Asked, Amit Answered!',
      category: 'SHARE REVENUE HACKS & TIPS'
    },
    {
      title: 'Can you Please Help Me Test the AI Briefs Capability for Customer Success or Acct Mgmt Teams?',
      category: 'Sales Enablement'
    },
    {
      title: 'Happy holid-AI-ys! Share your Gong AI success story for a chance to win $500!',
      category: 'SHARE REVENUE HACKS & TIPS'
    },
    {
      title: 'Tips from "Customer Insider Event: Integrate, Automate, and Measure!"',
      category: 'INTEGRATIONS'
    }
];

export default function CommunityPost() {
    const [newReply, setNewReply] = useState('');
    const [post, setPost] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        
        if (mockPostsData[postId]) {
            setPost(mockPostsData[postId]);
        }
    }, []);

    const handleReplySubmit = () => {
        if (newReply.trim()) {
            // In a real app, this would submit to an API
            setNewReply('');
            // Could add the reply to the post's responses array
        }
    };

    if (!post) return <div className="text-white">Loading...</div>;

    return (
        <div>
             <Link to={createPageUrl('Community')} className="flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6 transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" />
                Back to Community
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Post Content */}
                <div className="lg:col-span-2">
                    <Card className="glass-effect border-slate-700 mb-6">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {post.avatar}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white mb-2">{post.title}</h1>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="font-medium text-slate-300">{post.author}</span>
                                            <Badge className="bg-sky-100 text-sky-800">{post.category}</Badge>
                                            <span>{post.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-200 whitespace-pre-line leading-relaxed">{post.content}</p>
                            </div>
                            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-700">
                                <Button variant="ghost" className="text-slate-400 hover:text-white p-0">
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    {post.likes} Likes
                                </Button>
                                <Button variant="ghost" className="text-slate-400 hover:text-white p-0">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    {post.replies} Replies
                                </Button>
                                <Button variant="ghost" className="text-slate-400 hover:text-white p-0">
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Responses */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-xl font-semibold text-white">{post.responses.length} Responses</h3>
                        {post.responses.map((response, index) => (
                            <Card key={index} className="glass-effect border-slate-700">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                            {response.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-slate-200">{response.author}</span>
                                                <span className="text-sm text-slate-400">{response.role}</span>
                                                <span className="text-sm text-slate-500">{response.time}</span>
                                            </div>
                                            <p className="text-slate-300 leading-relaxed">{response.content}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Reply Form */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Add your response</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Share your thoughts..."
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[120px] mb-4"
                            />
                            <Button 
                                className="gradient-button text-white"
                                onClick={handleReplySubmit}
                                disabled={!newReply.trim()}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Post Response
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Related Topics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {relatedTopics.map((topic, index) => (
                                <div key={index} className="border-b border-slate-700 pb-3 last:border-b-0">
                                    <h4 className="font-medium text-sky-400 hover:text-sky-300 cursor-pointer transition-colors">
                                        {topic.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-1">{topic.category}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white">Popular Tags</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {['automation', 'api', 'coaching', 'salesforce', 'integrations', 'ai-briefer'].map(tag => (
                                    <Badge key={tag} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}