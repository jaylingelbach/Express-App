import express from 'express';
import { deleteGoal, getGoals, setGoal, updateGoal } from '../controllers/goalController.js';

const router = express.Router();

// Get all goals
router.get('/', getGoals);

// Create a goal
router.post('/', setGoal);

// Update a goal
router.put('/:id', updateGoal);

// Delete a goal
router.delete('/:id', deleteGoal);
export default router;