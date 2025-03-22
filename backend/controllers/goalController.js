import asyncHandler from 'express-async-handler';
import Goal from '../model/goalModel.js';
// @desc: Get all goals
// @route: GET /api/goals
// @access: Private
export const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
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

    const goal = await Goal.create({ text: req.body.text });
    res.status(201).json(goal);
});

// @desc: Update a goal
// @route: PUT /api/goals/:id
// @access: Private
export const updateGoal = asyncHandler(async (req, res, next) => {
    // find the goal by id
    const goal = await Goal.findById(req.params.id);
    // if goal not found, return 404
    if(!goal) {
        const error = new Error(`Goal with id ${req.params.id} not found`);
        error.status = 400;
        next(error);
    }
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
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({id: req.params.id}); 
});