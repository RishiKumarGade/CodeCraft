
import mongoose from 'mongoose';


const sesssionSchema = new mongoose.Schema({
    roomcode:{
        type:String,
        required:true
    },
})

const Session = mongoose.models.sessions || mongoose.model('sessions',sesssionSchema);

export default Session;