import asyncHandler from 'express-async-handler';
import Goal from '../models/goalModel.js';
import User from '../models/userModel.js';
import { checkGoalOwnership } from '../helpers/authHelpers.js';
// @desc: Get all goals
// @route: GET /api/goals
// @access: Private
export const getGoals = asyncHandler(async (req, res) => {
    // get all goals of a user
    const goals = await Goal.find({ user: req.user._id }); // user comes from protect middleware
    res.status(200).json(goals);
});

// @desc: CREATE a goal
// @route: POST /api/goals
// @access: Private
export const setGoal = asyncHandler(async (req, res, next) => {
    if(!req.body.text) {
        const error = new Error('Please enter a goal');
        error.status = 400; 
        next(error);
    }

    const goal = await Goal.create({ user: req.user._id, text: req.body.text });
    res.status(201).json(goal);
});

// @desc: Update a goal
// @route: PUT /api/goals/:id
// @access: Private
export const updateGoal = asyncHandler(async (req, res) => {
    // Find the goal by id
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      res.status(400);
      throw new Error(`Goal with id ${req.params.id} not found`);
    }
    // Check that the goal belongs to the logged-in user
    await checkGoalOwnership(req, goal);
  
    // Update the goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true 
    });
    res.status(200).json(updatedGoal);
  });

// @desc: Delete a goal
// @route: DELETE /api/goals/:id
// @access: Private 
export const deleteGoal = asyncHandler(async (req, res, next) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal) {
        const error = new Error(`Goal with id ${req.params.id} not found`);
        error.status = 400;
        next(error);
    }
    const user = await User.findById(req.user._id);
    await checkGoalOwnership(req, goal);
    // delete
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id}); 
});
