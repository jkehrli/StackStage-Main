import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Added Input import
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "The Future of Software Stack Management",
      excerpt: "How AI is revolutionizing the way organizations evaluate and manage their technology stacks.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology"
    },
    {
      title: "5 Common Mistakes in Software Procurement",
      excerpt: "Learn how to avoid costly pitfalls when evaluating and purchasing enterprise software.",
      author: "Mike Chen",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Best Practices"
    },
    {
      title: "Building Consensus in IT Decision-Making",
      excerpt: "Strategies for aligning stakeholders across IT, finance, and operations teams.",
      author: "Emily Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Leadership"
    }
  ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.1),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">StackStage</span> Blog
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Insights, trends, and best practices for modern software decision-making
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardHeader>
                  <div className="text-sky-400 text-sm font-medium mb-2">
                    {post.category}
                  </div>
                  <CardTitle className="text-xl font-bold text-white hover:text-sky-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="ghost" className="text-sky-400 hover:text-sky-300 p-0">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Stay Updated with <span className="gradient-text">StackStage Insights</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get the latest trends, tips, and insights delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
            />
            <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-6 py-2 font-semibold transition-all">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            More Content <span className="gradient-text">Coming Soon</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Stay tuned for more insights on software evaluation, procurement best practices, and industry trends
          </p>
          
          <Link to={createPageUrl("index")}>
            <Button className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl">
              Back to Home
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}