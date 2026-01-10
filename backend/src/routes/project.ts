// src/routes/projects.ts
import { Router, Request, Response } from 'express';
import { Project } from '../models/project';
// Import the middleware (create these files first)
import { protect, adminOnly } from '../middleware/auth';
import {getRandomGradient} from "../utils/gradients";

const router = Router();

// ======================
// GET /projects - Get all projects
// ======================
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 }) // newest first
      .select('-steps.content.engineering'); // optional: hide heavy HTML content if not needed in list

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// GET /projects - Get project overviews
router.get("/overview", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find(
      { active_status: true }, // optional filter
      {
        _id: 1,
        title: 1,
        description: 1,
        tech: 1,
        gradient: 1,
        image: 1,
      }
    )
      .sort({ createdAt: -1 }) // newest first
      .lean();

    const result = projects.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      tech: p.tech,
      gradient: p.gradient,
      image: p.image,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching project overviews:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ======================
// GET /projects/:id - Get single project by ID
// ======================
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// ======================
// BONUS: Get only active projects (for frontend showcase)
// GET /projects/active
// ======================
router.get('/active', async (req: Request, res: Response) => {
  try {
    const activeProjects = await Project.find({ active_status: true })
      .sort({ createdAt: -1 })
      .select('-steps.content.engineering'); // optimize payload

    res.json(activeProjects);
  } catch (error) {
    console.error('Error fetching active projects:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// ======================
// BONUS: Get only active projects (for frontend showcase)
// GET /projects/inactive
// ======================
router.get('/inactive', async (req: Request, res: Response) => {
  try {
    const activeProjects = await Project.find({ active_status: false })
      .sort({ createdAt: -1 })
      .select('-steps.content.engineering'); // optimize payload

    res.json(activeProjects);
  } catch (error) {
    console.error('Error fetching active projects:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// ======================
// PROTECTED ROUTES (Only authenticated ADMIN users)
// ======================

// POST /projects - Create new project
router.post('/', async (req: Request, res: Response) => {
  try {
    const newProject = new Project(req.body);

    // Optional: basic validation (you can also use Joi/zod)
    if (!newProject.title || !newProject.description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    newProject.gradient = getRandomGradient();
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error: any) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
});

// ======================
// PUT /projects/:id - Update project (full or partial)
// ======================
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // allows partial updates
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error });
  }
});

// ======================
// DELETE /projects/:id - Delete project
// ======================
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ status: 'success', message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// ======================
// BONUS: Toggle active status (very common for portfolio)
// PUT /projects/:id/toggle-active
// ======================
router.put('/:id/toggle-active', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.active_status = !project.active_status;
    await project.save();

    res.json({
      status: 'success',
      message: `Project is now ${project.active_status ? 'active' : 'inactive'}`,
      active_status: project.active_status,
    });
  } catch (error) {
    console.error('Error toggling active status:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});



export default router;