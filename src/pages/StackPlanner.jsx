
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit, X, CheckCircle, Package } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { createPageUrl } from '@/utils';
import CopilotSuggestion from '@/components/ai/CopilotSuggestion';

// Renamed initialStack to sampleTools for consistency with outline's implied structure,
// and updated 'logoUrl' to 'logo' and 'problems' to 'description'.
const initialStack = {
  "Collaboration Tools": [
  { id: 1, name: 'Slack', logo: 'https://logo.clearbit.com/slack.com', status: 'Keep', description: 'Usage down 20% in last 90 days. Multiple teams report channel fatigue.' },
  { id: 2, name: 'Microsoft Teams', logo: 'https://logo.clearbit.com/teams.microsoft.com', status: 'Keep', description: 'Primary tool for Engineering dept.' },
  { id: 3, name: 'GAP: Project Management', logo: null, status: 'Must Have', description: 'No centralized project tracking. Tasks are missed in chat.' }],

  "Sales & CRM": [
  { id: 4, name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com', status: 'Keep', description: 'Source of truth, but complex reporting.' },
  { id: 5, name: 'Gong', logo: 'https://logo.clearbit.com/gong.io', status: 'Replace', description: 'High cost, overlapping features with new tools.' },
  { id: 6, name: 'ZoomInfo', logo: 'https://logo.clearbit.com/zoominfo.com', status: 'Nice to Have', description: 'Data accuracy has been declining.' }],

  "AI Tools": [
  { id: 7, name: 'GAP: Conversational AI', logo: null, status: 'Must Have', description: 'Support team overwhelmed with repetitive questions.' }]

};

// Renamed priorityColors to badgeColors for consistency with outline
const badgeColors = {
  'Keep': 'bg-slate-500/20 text-slate-300', // Changed this line
  'Must Have': 'bg-emerald-500/20 text-emerald-300',
  'Nice to Have': 'bg-sky-500/20 text-sky-300',
  'Replace': 'bg-amber-500/20 text-amber-300',
  'Consolidate': 'bg-purple-500/20 text-purple-300'
};

// Updated ToolCard component based on outline's styling and added 'onAction' while preserving existing functionality
const ToolCard = ({ tool, onEdit, onDelete, onAction }) =>
<div className="bg-slate-900/50 p-4 rounded-lg flex items-center justify-between hover:bg-slate-800/50 transition-colors duration-200">
    <div className="flex items-center gap-4">
      {tool.logo ?
    <img src={tool.logo} alt={`${tool.name} logo`} className="w-10 h-10 rounded-lg bg-white p-1 flex-shrink-0" /> :

    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
          <Package className="w-5 h-5 text-slate-400" />
        </div>
    }
      <div className="flex-1">
        <h4 className="font-semibold text-white">{tool.name}</h4>
        <p className="text-sm text-slate-400">{tool.description}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Badge className={`border-none ${badgeColors[tool.status]}`}>{tool.status}</Badge>
      <Button
      variant="outline"
      size="sm"
      onClick={() => onAction(tool, tool.status === 'Keep' ? 'view' : 'evaluate')}
      className="bg-sky-600 hover:bg-sky-700 text-white border-sky-600">

        {tool.status === 'Keep' ? 'View' : 'Evaluate'}
      </Button>
      <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-white" onClick={() => onEdit(tool)}><Edit /></Button>
      <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-400" onClick={() => onDelete(tool.id)}><Trash2 /></Button>
    </div>
  </div>;


// New CategorySection component to encapsulate category rendering
const CategorySection = ({
  categoryName,
  tools,
  onEditTool,
  onDeleteTool,
  onAddTool,
  onEditCategory,
  onDeleteCategory,
  onToolAction
}) =>
<Card className="glass-effect border-slate-700 w-full overflow-hidden">
    <CardHeader className="bg-slate-800/30">
      <div className="flex justify-between items-center">
        <CardTitle className="text-white text-xl">{categoryName}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/10 border-slate-600 text-slate-200 hover:bg-white/20 hover:text-white h-9" onClick={() => onEditCategory(categoryName)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Category
          </Button>
          <Button variant="ghost" size="icon" className="w-9 h-9 text-slate-400 hover:text-red-400" onClick={() => onDeleteCategory(categoryName)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6 space-y-4">
      {tools.map((tool) =>
    <ToolCard
      key={tool.id}
      tool={tool}
      onEdit={onEditTool}
      onDelete={onDeleteTool}
      onAction={onToolAction} />

    )}
      <Button variant="outline" className="bg-sky-600 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent w-full border-dashed border-slate-600 hover:text-white hover:border-slate-500 h-12" onClick={() => onAddTool(categoryName)}>
        <Plus className="w-4 h-4 mr-2" />
        Add Tool or Define Gap
      </Button>
    </CardContent>
  </Card>;


const Modal = ({ children, onClose, maxWidth = 'max-w-lg' }) =>
<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className={`glass-effect border-slate-700 rounded-xl w-full ${maxWidth}`} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>;


const AddCategoryModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(name);
  };
  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-white">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="category-name" className="text-slate-300">Category Name</Label>
          <Input id="category-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Customer Support" className="bg-slate-800 border-slate-700 text-white" required />
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="gradient-button text-white">Add Category</Button>
        </CardFooter>
      </form>
    </Modal>);

};

const EditCategoryModal = ({ categoryName, onClose, onSave }) => {
  const [name, setName] = useState(categoryName);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name);
  };
  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-white">Edit Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="category-name-edit" className="text-slate-300">Category Name</Label>
          <Input id="category-name-edit" value={name} onChange={(e) => setName(e.target.value)} className="bg-slate-800 border-slate-700 text-white" required />
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button type="button" variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="gradient-button text-white">Save Changes</Button>
        </CardFooter>
      </form>
    </Modal>);

};

const DeleteCategoryModal = ({ categoryName, onClose, onConfirm }) =>
<Modal onClose={onClose} maxWidth="max-w-md">
    <CardHeader>
      <CardTitle className="text-white">Confirm Deletion</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-slate-300">Are you sure you want to delete the category "<strong>{categoryName}</strong>" and all tools within it? This action cannot be undone.</p>
    </CardContent>
    <CardFooter className="flex justify-end gap-3">
      <Button variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
      <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={onConfirm}>Delete</Button>
    </CardFooter>
  </Modal>;


export default function StackPlanner() {
  const [stack, setStack] = useState(initialStack);
  const [showAddToolModal, setShowAddToolModal] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [showToolDetailsModal, setShowToolDetailsModal] = useState({ isOpen: false, tool: null });
  const [showEvaluationModal, setShowEvaluationModal] = useState({ isOpen: false, tool: null });

  // State for the tool form (controlled inputs)
  const [toolForm, setToolForm] = useState({
    name: '',
    logo: '',
    status: 'Keep',
    description: ''
  });

  // Effect to populate tool form when editingTool changes
  useEffect(() => {
    if (editingTool) {
      setToolForm({
        name: editingTool.name,
        logo: editingTool.logo || '', // Handle null logo
        status: editingTool.status,
        description: editingTool.description
      });
    } else {
      setToolForm({
        name: '',
        logo: '',
        status: 'Keep',
        description: ''
      });
    }
  }, [editingTool, showAddToolModal]); // Reset form when modal opens or editingTool changes

  const handleToolFormChange = (e) => {
    const { id, value } = e.target;
    // Remove 'tool-' prefix for state keys like 'name', 'logo', 'description'
    setToolForm((prev) => ({ ...prev, [id.replace('tool-', '')]: value }));
  };

  const handleStatusChange = (value) => {
    setToolForm((prev) => ({ ...prev, status: value }));
  };

  const handleOpenAddToolModal = (category) => {
    setEditingTool(null);
    setActiveCategory(category);
    setIsSubmitted(false);
    setShowAddToolModal(true);
  };

  const handleEditTool = (tool) => {
    setEditingTool(tool);
    // Find the category of the tool being edited
    const categoryName = Object.keys(stack).find((cat) =>
    stack[cat].some((t) => t.id === tool.id)
    );
    setActiveCategory(categoryName);
    setIsSubmitted(false);
    setShowAddToolModal(true);
  };

  const handleDeleteTool = (toolId) => {
    setStack((prevStack) => {
      const newStack = {};
      for (const category in prevStack) {
        newStack[category] = prevStack[category].filter((tool) => tool.id !== toolId);
      }
      return newStack;
    });
  };

  // Modified handleSubmitTool to actually add/update tools
  const handleSubmitTool = (e) => {
    e.preventDefault();
    const newToolData = { ...toolForm };

    setStack((prevStack) => {
      const newStack = { ...prevStack };
      if (editingTool) {
        // Update existing tool
        newStack[activeCategory] = newStack[activeCategory].map((tool) =>
        tool.id === editingTool.id ? { ...tool, ...newToolData } : tool
        );
      } else {
        // Add new tool
        // Generate a new ID (simple approach, should be more robust in production)
        const allToolIds = Object.values(newStack).flat().map((t) => t.id);
        const newId = allToolIds.length > 0 ? Math.max(...allToolIds) + 1 : 1;
        newStack[activeCategory] = [...(newStack[activeCategory] || []), { id: newId, ...newToolData }];
      }
      return newStack;
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setShowAddToolModal(false);
      setIsSubmitted(false); // Reset for next time
      setEditingTool(null);
      setActiveCategory(null);
      setToolForm({ name: '', logo: '', status: 'Keep', description: '' }); // Clear form
    }, 1000); // Shorter timeout for better UX
  };

  const handleAddCategory = (name) => {
    if (name && !stack[name]) {
      setStack((prev) => ({ ...prev, [name]: [] }));
    }
    setShowAddCategoryModal(false);
  };

  const handleSaveCategory = (newName) => {
    if (newName && newName !== editingCategory && !stack[newName]) {
      setStack((prev) => {
        const newStack = { ...prev };
        const tools = newStack[editingCategory];
        delete newStack[editingCategory];
        newStack[newName] = tools;
        return newStack;
      });
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = () => {
    setStack((prev) => {
      const newStack = { ...prev };
      delete newStack[deletingCategory];
      return newStack;
    });
    setDeletingCategory(null);
  };

  // Implementation for the new onAction prop from the outline
  const handleAction = (tool, action) => {
    if (action === 'view') {
      // Show tool details modal
      setShowToolDetailsModal({ isOpen: true, tool });
    } else if (action === 'evaluate') {
      // Show evaluation modal
      setShowEvaluationModal({ isOpen: true, tool });
    }
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">My Stack Planner</h1>
          <p className="text-slate-300 mt-2 max-w-3xl">
            Define your needs, evaluate tools, and optimize your software spend—all before engaging with vendors.
          </p>
        </div>

        <CopilotSuggestion
          text="Your Slack usage is down 30% and you have a plan in Project Management. Consider replacing Slack with a unified tool like Asana or Monday.com to solve both issues." />

        <div className="space-y-8">
          {Object.entries(stack).map(([category, tools]) =>
          <CategorySection
            key={category}
            categoryName={category}
            tools={tools}
            onEditTool={handleEditTool}
            onDeleteTool={handleDeleteTool}
            onAddTool={handleOpenAddToolModal}
            onEditCategory={setEditingCategory}
            onDeleteCategory={setDeletingCategory}
            onToolAction={handleAction} />

          )}
        </div>

        {/* Moved Add Category button to the bottom and applied new styles */}
        <div className="sticky bottom-8 flex justify-center mt-8">
          <Button
            onClick={() => setShowAddCategoryModal(true)}
            className="gradient-button text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">

            <Plus className="w-5 h-5 mr-2" />
            Add New Category
          </Button>
        </div>
      </div>

      {/* New Interactive Modals */}
      {showToolDetailsModal.isOpen &&
      <Modal onClose={() => setShowToolDetailsModal({ isOpen: false, tool: null })}>
          <CardHeader>
            <CardTitle className="text-white">Tool Details: {showToolDetailsModal.tool?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {showToolDetailsModal.tool?.logo &&
              <img src={showToolDetailsModal.tool.logo} alt="Logo" className="w-12 h-12 bg-white p-2 rounded-lg" />
              }
                <div>
                  <h3 className="text-white font-semibold">{showToolDetailsModal.tool?.name}</h3>
                  <Badge className={`${badgeColors[showToolDetailsModal.tool?.status]} mt-1`}>
                    {showToolDetailsModal.tool?.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Current Assessment</h4>
                <p className="text-slate-300">{showToolDetailsModal.tool?.description}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Recommendation</h4>
                <p className="text-slate-300 text-sm">
                  This tool is performing well and aligns with your current needs. Continue monitoring usage and user satisfaction.
                </p>
              </div>
            </div>
            <Button
            onClick={() => setShowToolDetailsModal({ isOpen: false, tool: null })}
            className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white">

              Close
            </Button>
          </CardContent>
        </Modal>
      }

      {showEvaluationModal.isOpen &&
      <Modal onClose={() => setShowEvaluationModal({ isOpen: false, tool: null })}>
          <CardHeader>
            <CardTitle className="text-white">Evaluate: {showEvaluationModal.tool?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {showEvaluationModal.tool?.logo ?
              <img src={showEvaluationModal.tool.logo} alt="Logo" className="w-12 h-12 bg-white p-2 rounded-lg" /> :

              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-slate-400" />
                  </div>
              }
                <div>
                  <h3 className="text-white font-semibold">{showEvaluationModal.tool?.name}</h3>
                  <Badge className={`${badgeColors[showEvaluationModal.tool?.status]} mt-1`}>
                    {showEvaluationModal.tool?.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Identified Issues</h4>
                <p className="text-slate-300">{showEvaluationModal.tool?.description}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Next Steps</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Research alternative solutions</li>
                  <li>• Get stakeholder input on requirements</li>
                  <li>• Create evaluation timeline</li>
                  <li>• Identify integration requirements</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white">
                Start Evaluation
              </Button>
              <Button
              variant="outline"
              className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              onClick={() => setShowEvaluationModal({ isOpen: false, tool: null })}>

                Cancel
              </Button>
            </div>
          </CardContent>
        </Modal>
      }

      {showAddToolModal &&
      <Modal onClose={() => setShowAddToolModal(false)}>
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle className="text-white">{editingTool ? 'Edit Tool' : 'Add Tool or Define Gap'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowAddToolModal(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </Button>
          </CardHeader>
          <CardContent>
            {!isSubmitted ?
          <form onSubmit={handleSubmitTool} className="space-y-4">
                <p className="text-slate-400 text-sm">
                  {editingTool ? `Editing tool in category: ${activeCategory}` : `Adding to category: ${activeCategory}`}
                </p>
                <div>
                  <Label htmlFor="tool-name" className="text-slate-300">Tool or Gap Name</Label>
                  <Input
                id="tool-name"
                placeholder="e.g., Asana or 'Project Management Gap'"
                value={toolForm.name}
                onChange={handleToolFormChange}
                className="bg-slate-800 border-slate-700 text-white"
                required />

                </div>
                <div>
                  <Label htmlFor="tool-logo" className="text-slate-300">Tool Logo URL (optional)</Label>
                  <Input
                id="tool-logo"
                placeholder="e.g., https://logo.clearbit.com/asana.com"
                value={toolForm.logo}
                onChange={handleToolFormChange}
                className="bg-slate-800 border-slate-700 text-white" />

                </div>
                <div>
                  <Label htmlFor="tool-status" className="text-slate-300">Status</Label>
                  <Select value={toolForm.status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="tool-status" className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {Object.keys(badgeColors).map((status) =>
                  <SelectItem key={status} value={status} className="hover:bg-slate-700 focus:bg-slate-700">{status}</SelectItem>
                  )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tool-description" className="text-slate-300">Known Problems or Requirements</Label>
                  <Textarea
                id="tool-description"
                placeholder="e.g., High cost, overlapping features, must integrate with Salesforce"
                value={toolForm.description}
                onChange={handleToolFormChange}
                className="bg-slate-800 border-slate-700 text-white min-h-[100px]" />

                </div>
                <Button type="submit" className="w-full gradient-button text-white">
                  {editingTool ? 'Save Changes' : 'Add to Planner'}
                </Button>
              </form> :

          <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">{editingTool ? 'Tool Updated!' : 'Tool Added!'}</h4>
                <p className="text-slate-300">Your stack planner has been updated.</p>
              </div>
          }
          </CardContent>
        </Modal>
      }

      {showAddCategoryModal && <AddCategoryModal onClose={() => setShowAddCategoryModal(false)} onAdd={handleAddCategory} />}
      {editingCategory && <EditCategoryModal categoryName={editingCategory} onClose={() => setEditingCategory(null)} onSave={handleSaveCategory} />}
      {deletingCategory && <DeleteCategoryModal categoryName={deletingCategory} onClose={() => setDeletingCategory(null)} onConfirm={handleDeleteCategory} />}
    </>);

}
