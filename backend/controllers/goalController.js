import asyncHandler from 'express-async-handler';
 
// @desc: Get all goals
// @route: GET /api/goals
// @access: Private
export const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals' });
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
    res.status(201).json({ message: 'Set goal' });
});

// @desc: Update a goal
// @route: PUT /api/goals/:id
// @access: Private
export const updateGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @desc: Delete a goal
// @route: DELETE /api/goals/:id
// @access: Private 
export const deleteGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
});