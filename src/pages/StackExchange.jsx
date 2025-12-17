
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Plus,
  Star,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  Clock,
  X,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const mockQuestions = [
  {
    id: 1,
    title: "Best CRM for Series A startup with 20+ person sales team?",
    content: "We're evaluating Salesforce, HubSpot, and Pipedrive. Looking for something that scales but isn't overly complex for our current size.",
    author: {
      name: "Sarah Chen",
      title: "VP Sales",
      company: "TechFlow Inc",
      verified: true,
      reputation: 2840
    },
    tags: ["CRM", "Sales", "Series-A", "Scaling"],
    stats: {
      upvotes: 24,
      answers: 8,
      views: 156,
      timeAgo: "2 hours ago"
    },
    status: "answered",
    bounty: 50
  },
  {
    id: 2,
    title: "Security compliance tools for healthcare SaaS - SOC2 + HIPAA",
    content: "Need recommendations for compliance automation. Currently manual process is taking 40+ hours/month.",
    author: {
      name: "Michael Rodriguez",
      title: "CTO",
      company: "HealthTech Solutions",
      verified: true,
      reputation: 1920
    },
    tags: ["Security", "Compliance", "Healthcare", "SOC2", "HIPAA"],
    stats: {
      upvotes: 18,
      answers: 12,
      views: 234,
      timeAgo: "4 hours ago"
    },
    status: "bounty",
    bounty: 100
  },
  {
    id: 3,
    title: "Marketing automation platform comparison - HubSpot vs Marketo vs Pardot",
    content: "Enterprise B2B company (500+ employees) looking to upgrade from basic email marketing to full automation.",
    author: {
      name: "Lisa Park",
      title: "Marketing Director",
      company: "Global Solutions Ltd",
      verified: false,
      reputation: 680
    },
    tags: ["Marketing", "Automation", "Enterprise", "B2B"],
    stats: {
      upvotes: 15,
      answers: 6,
      views: 89,
      timeAgo: "6 hours ago"
    },
    status: "active"
  },
  {
    id: 4,
    title: "Project management tool for remote development team of 30+",
    content: "Currently using Jira but team finds it too complex. Looking for something more intuitive while still having robust reporting.",
    author: {
      name: "Alex Johnson",
      title: "Engineering Manager",
      company: "DevCorp",
      verified: true,
      reputation: 3200
    },
    tags: ["Project-Management", "Development", "Remote", "Team-Collaboration"],
    stats: {
      upvotes: 31,
      answers: 14,
      views: 287,
      timeAgo: "8 hours ago"
    },
    status: "answered"
  },
  {
    id: 5,
    title: "Customer support platform for SaaS - Zendesk alternatives?",
    content: "Zendesk pricing is getting out of hand. Need something with good integrations, reporting, and knowledge base functionality.",
    author: {
      name: "Emma Thompson",
      title: "Head of Customer Success",
      company: "CloudServices Pro",
      verified: true,
      reputation: 1540
    },
    tags: ["Customer-Support", "SaaS", "Help-Desk", "Knowledge-Base"],
    stats: {
      upvotes: 22,
      answers: 9,
      views: 143,
      timeAgo: "12 hours ago"
    },
    status: "active"
  }
];

const mockAnswers = {
  1: [
    { id: 1, author: { name: "David Lee", title: "Sales Ops Lead", company: "ScaleFast", verified: true, reputation: 1250 }, content: "We went with HubSpot at Series A. It was a great choice for us because it scaled well into our Series B without needing a major rip-and-replace. Salesforce felt too heavy at that stage.", upvotes: 15, timeAgo: "1 hour ago" },
    { id: 2, author: { name: "Jessica Brown", title: "Founder", company: "ConnectCo", verified: false, reputation: 800 }, content: "Pipedrive is fantastic if your primary goal is pure pipeline management and you want something incredibly intuitive for the reps. If you need marketing automation built-in, HubSpot is the better bet.", upvotes: 8, timeAgo: "45 minutes ago" },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
);

const QuestionDetailModal = ({ question, onClose }) => {
    const [answers, setAnswers] = useState(mockAnswers[question.id] || []);
    const [newAnswer, setNewAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;

        const submission = {
            id: answers.length + 1,
            author: { name: "You", title: "Current User", company: "Your Company", verified: true, reputation: 0 },
            content: newAnswer,
            upvotes: 0,
            timeAgo: "Just now"
        };
        setAnswers(prev => [...prev, submission]);
        setNewAnswer('');
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 2500);
    };

    return (
        <Modal onClose={onClose}>
            <CardHeader className="flex flex-row items-start justify-between sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{question.title}</h3>
                    <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${question.author.name}`} />
                            <AvatarFallback>{question.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <span className="font-semibold text-white">{question.author.name}</span>
                            <p className="text-sm text-slate-400">{question.author.title} at {question.author.company}</p>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <p className="text-slate-300 whitespace-pre-wrap">{question.content}</p>
                <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-slate-800 border-slate-600 text-slate-300">{tag}</Badge>
                    ))}
                </div>

                <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">{answers.length} Answers</h4>
                    <div className="space-y-6">
                        {answers.map(answer => (
                            <div key={answer.id} className="flex items-start gap-4">
                                <Avatar className="w-8 h-8 mt-1">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${answer.author.name}`} />
                                    <AvatarFallback>{answer.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-semibold text-white">{answer.author.name}</span>
                                            <span className="text-sm text-slate-400 ml-2">{answer.author.title}</span>
                                        </div>
                                        <span className="text-xs text-slate-500">{answer.timeAgo}</span>
                                    </div>
                                    <p className="text-slate-300 mt-1">{answer.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-slate-400 hover:text-white px-2 h-auto py-1">
                                            <ThumbsUp className="w-4 h-4" /> {answer.upvotes}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Your Answer</h4>
                    <form onSubmit={handleAnswerSubmit} className="space-y-4">
                        <Textarea
                            value={newAnswer}
                            onChange={e => setNewAnswer(e.target.value)}
                            placeholder="Share your experience and insights..."
                            className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                        />
                        <div className="flex justify-between items-center">
                            {isSubmitted ? (
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Answer Submitted!</span>
                                </div>
                            ) : <div></div>}
                            <Button type="submit" className="gradient-button text-white">
                                <Send className="w-4 h-4 mr-2" />
                                Post Your Answer
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Modal>
    );
};


const QuestionCard = ({ question, onSelect }) => {
  const statusColors = {
    answered: 'bg-emerald-500/20 text-emerald-400',
    active: 'bg-sky-500/20 text-sky-400',
    bounty: 'bg-yellow-500/20 text-yellow-400'
  };

  return (
    <Card className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {question.bounty && (
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                  <Award className="w-3 h-3 mr-1" />
                  {question.bounty} points
                </Badge>
              )}
              <Badge className={statusColors[question.status]}>
                {question.status === 'answered' && <CheckCircle className="w-3 h-3 mr-1" />}
                {question.status === 'bounty' && <Award className="w-3 h-3 mr-1" />}
                {question.status === 'active' && <MessageSquare className="w-3 h-3 mr-1" />}
                {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
              </Badge>
            </div>
            <div onClick={() => onSelect(question)} className="cursor-pointer hover:text-sky-400 transition-colors">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {question.title}
              </h3>
            </div>
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">
              {question.content}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-slate-800 border-slate-600 text-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${question.author.name}`} />
                <AvatarFallback>{question.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{question.author.name}</span>
                  {question.author.verified && (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  {question.author.title} at {question.author.company} • Rep: {question.author.reputation}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{question.stats.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{question.stats.answers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{question.stats.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{question.stats.timeAgo}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AskQuestionModal = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Ask the Community</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Question Title</label>
                <Input
                  placeholder="e.g., Best CRM for Series A startup with 20+ person sales team?"
                  className="bg-slate-800 border-slate-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Detailed Description</label>
                <Textarea
                  placeholder="Provide context about your company stage, team size, specific requirements, and what you've already considered..."
                  className="bg-slate-800 border-slate-700 text-white min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Tags (comma separated)</label>
                <Input
                  placeholder="e.g., CRM, Sales, Series-A, Scaling"
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div className="bg-sky-900/30 p-4 rounded-lg border border-sky-700">
                <h4 className="font-semibold text-white mb-2">Community Guidelines</h4>
                <ul className="space-y-1 text-sm text-sky-200">
                  <li>• Be specific about your company stage and requirements</li>
                  <li>• Include context about what you've already evaluated</li>
                  <li>• Use relevant tags to help others find your question</li>
                  <li>• Be respectful and professional in all interactions</li>
                </ul>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onClose} className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700">
                  Cancel
                </Button>
                <Button type="submit" className="gradient-button text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Post Question
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Question Posted!</h4>
              <p className="text-slate-300">Your question has been posted to the community and you'll be notified when someone responds.</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default function StackExchange() {
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stats = [
    { label: 'Active Questions', value: '2,847', icon: <MessageSquare className="w-5 h-5 text-sky-400" /> },
    { label: 'Community Members', value: '12,493', icon: <Users className="w-5 h-5 text-emerald-400" /> },
    { label: 'Solutions Shared', value: '8,234', icon: <CheckCircle className="w-5 h-5 text-purple-400" /> },
    { label: 'This Week', value: '+156', icon: <TrendingUp className="w-5 h-5 text-yellow-400" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">StackExchange</h1>
          <p className="text-slate-300 mt-2 max-w-2xl">
            Get answers from verified industry professionals. Ask questions, share insights, and learn from the community.
          </p>
        </div>
        <Button className="gradient-button text-white" onClick={() => setShowAskModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-effect border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  className={selectedFilter === 'all' ? 'gradient-button text-white' : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'}
                  onClick={() => setSelectedFilter('all')}>
            All Questions
          </Button>
          <Button variant={selectedFilter === 'bounty' ? 'default' : 'outline'}
                  className={selectedFilter === 'bounty' ? 'gradient-button text-white' : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'}
                  onClick={() => setSelectedFilter('bounty')}>
            <Award className="w-4 h-4 mr-2" />
            Bounty
          </Button>
          <Button variant={selectedFilter === 'unanswered' ? 'default' : 'outline'}
                  className={selectedFilter === 'unanswered' ? 'gradient-button text-white' : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'}
                  onClick={() => setSelectedFilter('unanswered')}>
            Unanswered
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {mockQuestions
          .filter(q => selectedFilter === 'all' ||
                      (selectedFilter === 'bounty' && q.bounty) ||
                      (selectedFilter === 'unanswered' && q.stats.answers === 0))
          .map((question) => (
            <QuestionCard key={question.id} question={question} onSelect={setSelectedQuestion} />
          ))}
      </div>

      {/* Modals */}
      {showAskModal && (
        <AskQuestionModal onClose={() => setShowAskModal(false)} />
      )}
      {selectedQuestion && (
        <QuestionDetailModal question={selectedQuestion} onClose={() => setSelectedQuestion(null)} />
      )}
    </div>
  );
}
