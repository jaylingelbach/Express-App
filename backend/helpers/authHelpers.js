// helpers/auth.js (or any file where you keep your helper functions)
import User from '../models/userModel.js';

export const checkGoalOwnership = async (req, goal) => {
  // Retrieve the user using the id from the JWT (provided by your protect middleware)
  const user = await User.findById(req.user._id);
  if (!user) {
    const error = new Error('User not found');
    error.status = 401;
    throw error;
  }
  // Ensure that the goal's user id matches the logged-in user's id
  if (goal.user.toString() !== user._id.toString()) {
    const error = new Error('User not authorized');
    error.status = 401;
    throw error;
  }
  return user;
};
