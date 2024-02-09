import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    sessionid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Session'
    },
    filename:{
        type:String,
        required:[true,'please provide a name for the file'],
    },
    data:{
        type:String,
        default:' '
    }
})

const File = mongoose.models.files || mongoose.model('files',fileSchema);

export default File;