// schema
import mongoose from 'mongoose';
const goalSchema = mongoose.Schema({
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