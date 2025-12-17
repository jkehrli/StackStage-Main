import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion'; // Added motion import
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  X,
  Send,
  CheckCircle,
  Briefcase, // Added Briefcase import
  BookOpen,
  Gift,
  MapPin, // Added MapPin import
  Clock // Added Clock import
} from "lucide-react";

const jobOpenings = [
{ id: 1, title: 'Senior Backend Engineer', department: 'Engineering', office: 'Remote', location: 'USA', isNew: true, type: 'Full-time', experience: 'Senior', description: 'Design, develop, and maintain robust backend systems for our core platform using modern technologies, ensuring high performance and scalability.' },
{ id: 2, title: 'Product Marketing Manager', department: 'Marketing', office: 'New York', location: 'New York, NY', isNew: true, type: 'Full-time', experience: 'Mid-level', description: 'Lead product positioning, messaging, and go-to-market strategies for new features and products, collaborating closely with product and sales teams.' },
{ id: 3, title: 'Enterprise Account Executive', department: 'Sales', office: 'Remote', location: 'USA', isNew: false, type: 'Full-time', experience: 'Senior', description: 'Drive revenue growth by acquiring new enterprise clients and managing the full sales cycle from prospecting to close.' },
{ id: 4, title: 'DevOps Engineer', department: 'Engineering', office: 'Remote', location: 'Canada', isNew: false, type: 'Full-time', experience: 'Mid-level', description: 'Build and maintain scalable and reliable infrastructure, automating deployment and operations processes to ensure system uptime and efficiency.' },
{ id: 5, title: 'Content Strategist', department: 'Marketing', office: 'Remote', location: 'USA', isNew: false, type: 'Full-time', experience: 'Entry-level', description: 'Develop engaging content strategies and create compelling marketing materials across various channels to attract and convert our target audience.' },
{ id: 6, title: 'Customer Success Manager', department: 'Customer Success', office: 'New York', location: 'New York, NY', isNew: true, type: 'Full-time', experience: 'Mid-level', description: 'Build strong relationships with our customers, ensuring their success, driving product adoption, and identifying opportunities for expansion.' },
{ id: 7, title: 'Frontend Engineer', department: 'Engineering', office: 'Remote', location: 'USA', isNew: false, type: 'Full-time', experience: 'Mid-level', description: 'Develop responsive and intuitive user interfaces for our web application using React and modern web technologies, focusing on user experience.' },
{ id: 8, title: 'Sales Development Representative', department: 'Sales', office: 'Austin', location: 'Austin, TX', isNew: true, type: 'Full-time', experience: 'Entry-level', description: 'Generate qualified leads and support the sales team in identifying new business opportunities through outbound prospecting efforts.' }];


const OpeningsModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedOffice, setSelectedOffice] = useState('All');
  const [showBlog, setShowBlog] = useState(false);
  const [showLifeAtStackStage, setShowLifeAtStackStage] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [showGeneralAppModal, setShowGeneralAppModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = useMemo(() => ['All', ...new Set(jobOpenings.map((j) => j.department))], []);
  const offices = useMemo(() => ['All', ...new Set(jobOpenings.map((j) => j.office))], []);

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter((job) => {
      return (selectedDept === 'All' || job.department === selectedDept) && (
      selectedOffice === 'All' || job.office === selectedOffice) && (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.department.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm, selectedDept, selectedOffice]);

  const groupedJobs = useMemo(() => {
    return filteredJobs.reduce((acc, job) => {
      (acc[job.department] = acc[job.department] || []).push(job);
      return acc;
    }, {});
  }, [filteredJobs]);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplyModal(true);
  };

  const handleLearnMoreClick = (job) => {
    setSelectedJob(job);
    setShowLearnMoreModal(true);
  };

  const ApplyModal = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      resume: null,
      coverLetter: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Application submitted for', job.title, formData);
      onClose();
    };

    const handleFileChange = (e) => {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Apply for {job.title}</h2>
                <p className="text-slate-400">{job.department} • {job.office}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6 text-slate-400" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white font-semibold">Full Name *</Label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label className="text-white font-semibold">Email *</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white font-semibold">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label className="text-white font-semibold">LinkedIn Profile</Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white font-semibold">Resume *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload-apply" // Unique ID for this modal's input
                    required
                  />
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => document.getElementById('resume-upload-apply').click()}
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      Choose File
                    </Button>
                    <span className="text-slate-400 text-sm">
                      {formData.resume ? formData.resume.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white font-semibold">Cover Letter</Label>
                <Textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white min-h-[120px] mt-1"
                  placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gradient-button text-white px-6"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  const LearnMoreModal = ({ job, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{job.title}</h2>
                            <div className="flex items-center gap-4 text-slate-300">
                                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.experience}</span>
                                {job.isNew && <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/50">New</Badge>}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">About This Role</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-slate-300">
                                    <p>{job?.description}</p>
                                    <p>
                                        As a {job?.title}, you'll be at the forefront of innovation, working with cutting-edge technologies 
                                        and collaborating with some of the brightest minds in the industry. This role offers exceptional 
                                        growth opportunities and the chance to make a real impact on how organizations make software decisions.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Key Responsibilities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>Drive strategic initiatives that directly impact company growth and customer success</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>Collaborate cross-functionally with product, engineering, and customer success teams</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>Mentor junior team members and contribute to our culture of continuous learning</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>Lead projects from conception to delivery, ensuring high-quality outcomes</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            <span>Stay current with industry trends and bring innovative solutions to the team</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">What We're Looking For</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">Required Experience:</h4>
                                            <ul className="space-y-2 text-slate-300">
                                                <li>• 5+ years of relevant experience in {job?.department.toLowerCase()}</li>
                                                <li>• Strong track record of delivering results in fast-paced environments</li>
                                                <li>• Excellent communication and collaboration skills</li>
                                                <li>• Bachelor's degree or equivalent practical experience</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-2">Preferred Qualifications:</h4>
                                            <ul className="space-y-2 text-slate-300">
                                                <li>• Experience with B2B SaaS products</li>
                                                <li>• Previous startup or high-growth company experience</li>
                                                <li>• Advanced degree in relevant field</li>
                                                <li>• Experience with remote-first teams</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-800 border-t border-slate-700 p-6">
                              <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                  <CardTitle className="text-white">Apply Now</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <Button
                                    className="w-full gradient-button text-white font-medium"
                                    onClick={() => {
                                      onClose(); // Close learn more modal
                                      handleApplyClick(job); // Open apply modal
                                    }}
                                  >
                                    Apply for This Role
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>

                            <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Benefits & Perks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-slate-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                                            <span className="text-sm">Competitive salary + equity</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                            <span className="text-sm">$3K learning budget</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            <span className="text-sm">Remote-first culture</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                            <span className="text-sm">Health, dental, vision</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                            <span className="text-sm">Annual team retreats</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-slate-900/50 border-slate-700">
                                <CardHeader>
                                    <CardTitle className="text-white text-sm">Hiring Process</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 text-sm text-slate-300">
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-sky-400">1</span>
                                            </div>
                                            <span>Application Review (3-5 days)</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-sky-400">2</span>
                                            </div>
                                            <span>Initial Phone Screen (30 min)</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-sky-400">3</span> {/* Corrected className */}
                                            </div>
                                            <span>Technical/Case Interview (1 hour)</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs text-sky-400">4</span>
                                            </div>
                                            <span>Final Team Interview (45 min)</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            <span>Offer & Reference Check</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
  );


  const GeneralApplicationModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      linkedin: '',
      areaOfInterest: '',
      resume: null,
      coverLetter: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('General application submitted:', formData);
      onClose();
    };

    const handleFileChange = (e) => {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    };

    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Submit General Application</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6 text-slate-400" />
              </Button>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4 mb-6">
              <p className="text-sky-300 text-sm">
                Don't see a role that fits? We're always looking for exceptional talent. Tell us about yourself and we'll keep you in mind for future opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white font-semibold">Full Name *</Label>
                  <Input
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label className="text-white font-semibold">Email *</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white font-semibold">Phone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label className="text-white font-semibold">LinkedIn Profile</Label>
                  <Input
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white font-semibold">Area of Interest</Label>
                <Input
                  value={formData.areaOfInterest}
                  onChange={(e) => setFormData(prev => ({ ...prev, areaOfInterest: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  placeholder="e.g. Engineering, Sales, Marketing, Operations"
                />
              </div>

              <div>
                <Label className="text-white font-semibold">Resume *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    required
                  />
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => document.getElementById('resume-upload').click()}
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      Choose File
                    </Button>
                    <span className="text-slate-400 text-sm">
                      {formData.resume ? formData.resume.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white font-semibold">Tell Us About Yourself *</Label>
                <Textarea
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white min-h-[120px] mt-1"
                  placeholder="What type of role interests you? What unique skills and experience would you bring to StackStage?"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600 px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gradient-button text-white px-6"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };

  const BlogModal = ({ onClose }) =>
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl font-bold text-white">StackStage Blog</h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="glass-effect border-slate-700 hover:border-sky-400 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-full h-32 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg mb-4"></div>
                                <h4 className="text-lg font-bold text-white mb-2">The Future of Software Procurement</h4>
                                <p className="text-slate-300 text-sm mb-4">How AI and data-driven insights are transforming how companies buy software...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Dec 15, 2024</span>
                                    <Button size="sm" className="gradient-button text-white">Read More</Button>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="glass-effect border-slate-700 hover:border-sky-400 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-full h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg mb-4"></div>
                                <h4 className="text-lg font-bold text-white mb-2">Stack Maturity: Beyond the Basics</h4>
                                <p className="text-slate-300 text-sm mb-4">Understanding the five stages of technology stack evolution and what they mean for your business...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Dec 10, 2024</span>
                                    <Button size="sm" className="gradient-button text-white">Read More</Button>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="glass-effect border-slate-700 hover:border-sky-400 transition-colors">
                            <CardContent className="p-6">
                                <div className="w-full h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-4"></div>
                                <h4 className="text-lg font-bold text-white mb-2">Vendor Selection in 2024</h4>
                                <p className="text-slate-300 text-sm mb-4">Best practices for evaluating software vendors in an increasingly complex market...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Dec 5, 2024</span>
                                    <Button size="sm" className="gradient-button text-white">Read More</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>;


  const LifeAtStackStageModal = ({ onClose }) =>
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl font-bold text-white">Life at StackStage</h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5 text-slate-400" />
                        </Button>
                    </div>
                    
                    <div className="space-y-8">
                        <Card className="glass-effect border-slate-700">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-4">Remote-First Culture</h4>
                                        <p className="text-slate-300 mb-4">We believe the best talent is everywhere. Our fully remote team spans across 15+ countries, bringing diverse perspectives to everything we build.</p>
                                        <ul className="space-y-2 text-slate-300">
                                            <li>• Flexible working hours across all time zones</li>
                                            <li>• Annual team retreats in amazing locations</li>
                                            <li>• $2,000 home office setup budget</li>
                                        </ul>
                                    </div>
                                    <div className="w-full h-48 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl flex items-center justify-center">
                                        <Users className="w-16 h-16 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="glass-effect border-slate-700">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                                        <Target className="w-16 h-16 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-4">Growth & Learning</h4>
                                        <p className="text-slate-300 mb-4">We invest heavily in our team's professional development because your growth is our growth.</p>
                                        <ul className="space-y-2 text-slate-300">
                                            <li>• $3,000 annual learning & development budget</li>
                                            <li>• Conference attendance and speaking opportunities</li>
                                            <li>• Internal mentorship programs</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="glass-effect border-slate-700">
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-4">Impact & Innovation</h4>
                                        <p className="text-slate-300 mb-4">Every team member has the opportunity to shape the future of software procurement and make a real impact on how companies make technology decisions.</p>
                                        <ul className="space-y-2 text-slate-300">
                                            <li>• Direct access to leadership and decision-making</li>
                                            <li>• Ownership of projects from day one</li>
                                            <li>• Customer feedback drives product development</li>
                                        </ul>
                                    </div>
                                    <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                                        <BookOpen className="w-16 h-16 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>;


  return (
    <>
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div
          className="bg-slate-800 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col glass-effect"
          onClick={(e) => e.stopPropagation()}>

                    <header className="p-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
                        <h2 className="text-xl font-bold text-white">Open Roles at StackStage</h2>
                        <Button variant="ghost" size="icon" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white">
                            <X className="w-5 h-5" />
                        </Button>
                    </header>
                    <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-3">
                        {/* Main content */}
                        <main className="md:col-span-2 p-6 overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />

                                <Select value={selectedDept} onValueChange={setSelectedDept}>
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                        <SelectValue placeholder="All Departments" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                                        {departments.map((dept) => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                        <SelectValue placeholder="All Offices" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                                        {offices.map((office) => <SelectItem key={office} value={office}>{office}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {Object.entries(groupedJobs).map(([department, jobs]) =>
              <div key={department} className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-4">{department}</h3>
                                    <div className="grid gap-4">
                                        {jobs.map((job) =>
                  <Card key={job.id} className="glass-effect border-slate-700 hover:border-sky-400 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-white mb-2">{job.title}</h4>
                                                            <div className="flex gap-4 text-sm text-slate-400">
                                                                <span>📍 {job.office}</span>
                                                                <span>💼 {job.type}</span>
                                                                <span>⏰ {job.experience}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-300 mb-4">{job.description}</p>
                                                    <div className="flex gap-3">
                                                        <Button className="bg-slate-700 text-slate-900 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 hover:bg-slate-100"

                        onClick={() => handleApplyClick(job)}>

                                                            Apply Now
                                                        </Button>
                                                        <Button
                          className="bg-slate-700 text-white hover:bg-slate-600 font-medium border border-slate-600"
                          onClick={() => handleLearnMoreClick(job)}>

                                                            Learn More
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                  )}
                                    </div>
                                </div>
              )}
                            {Object.keys(groupedJobs).length === 0 &&
              <div className="text-center py-12 text-slate-400">
                                    <p>No openings match your criteria.</p>
                                </div>
              }
                        </main>
                        
                        {/* Sidebar */}
                        <aside className="hidden md:block bg-slate-800/50 p-6 border-l border-slate-700 overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">Why StackStage?</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Target className="w-4 h-4 text-sky-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">Impact-First</p>
                                                <p className="text-sm text-slate-400">Shape the future of software procurement</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Users className="w-4 h-4 text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">Remote-First</p>
                                                <p className="text-sm text-slate-400">Work from anywhere in the world</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Lightbulb className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">Growth-Oriented</p>
                                                <p className="text-sm text-slate-400">$3K learning budget per person</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">Can't find your role?</h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
                                    </p>
                                    <Button className="bg-sky-400 text-slate-900 mb-4 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full hover:bg-slate-100"

                  onClick={() => setShowGeneralAppModal(true)}>

                                        Submit General Application
                                    </Button>

                                    <div className="space-y-3">
                                        <button
                      onClick={() => setShowBlog(true)}
                      className="text-sm text-sky-400 hover:text-sky-300 flex items-center gap-2 w-full text-left">

                                            <BookOpen className="w-4 h-4" />
                                            Read Our Blog
                                        </button>
                                        <button
                      onClick={() => setShowLifeAtStackStage(true)}
                      className="text-sm text-sky-400 hover:text-sky-300 flex items-center gap-2 w-full text-left">

                                            <Users className="w-4 h-4" />
                                            Life at StackStage
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {showBlog && <BlogModal onClose={() => setShowBlog(false)} />}
            {showLifeAtStackStage && <LifeAtStackStageModal onClose={() => setShowLifeAtStackStage(false)} />}
            {showApplyModal && <ApplyModal job={selectedJob} onClose={() => setShowApplyModal(false)} />}
            {showLearnMoreModal && <LearnMoreModal job={selectedJob} onClose={() => setShowLearnMoreModal(false)} />}
            {showGeneralAppModal && <GeneralApplicationModal onClose={() => setShowGeneralAppModal(false)} />}
        </>);

};

export default function Company() {
  const [showOpenings, setShowOpenings] = useState(false);
  const [showLifeAtStackStage, setShowLifeAtStackStage] = useState(false); // State for the Life at StackStage modal

  const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at Salesforce. Led digital transformation initiatives for Fortune 500 companies.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Ex-Google Principal Engineer. Built scalable systems serving millions of users across multiple verticals.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emily Watson",
    role: "VP of Product",
    bio: "Product leader from Stripe and Square. Expert in B2B SaaS user experience and enterprise workflows.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }];


  const values = [
  {
    icon: <Users className="w-8 h-8 text-sky-400" />,
    title: "Customer-Obsessed",
    description: "Every decision starts with understanding our customers' real challenges and delivering meaningful solutions."
  },
  {
    icon: <Target className="w-8 h-8 text-emerald-400" />,
    title: "Radically Transparent",
    description: "We believe in open communication, honest feedback, and building trust through transparency."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-purple-400" />,
    title: "Continuous Innovation",
    description: "We're always pushing boundaries, experimenting with new ideas, and improving our platform."
  }];


  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Team Behind <span className="gradient-text">StackStage</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how organizations make software decisions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Every year, organizations waste billions on software that doesn't fit their needs, stage, or goals.
              We believe there's a better way - one that combines AI insights, peer validation, and collaborative
              decision-making to help teams make confident software choices.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) =>
            <Card key={index} className="glass-effect border-slate-700 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-xl flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {value.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-slate-300">
              Experienced leaders from top tech companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) =>
            <Card key={index} className="glass-effect border-slate-700 text-center">
                <CardContent className="p-8">
                  <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover" />

                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {member.name}
                  </h3>
                  <p className="text-sky-400 mb-4 font-medium">
                    {member.role}
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Join Our <span className="gradient-text">Mission?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Help us transform how companies make software decisions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowOpenings(true)} className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200">
              View Open Positions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button onClick={() => setShowLifeAtStackStage(true)} className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
              Learn About Our Culture
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showOpenings &&
      <OpeningsModal
        onClose={() => setShowOpenings(false)} />

      }
      {showLifeAtStackStage &&
        <LifeAtStackStageModal onClose={() => setShowLifeAtStackStage(false)} />
      }
    </div>);

}