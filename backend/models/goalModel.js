// schema
import mongoose from 'mongoose';
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

export default mongoose.model('Goal', goalSchema);  