import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomname:{
        type:String,
        required:[true,'please provide a username'],
        unique:true,
    },
    roomcode:{
        type:String,
        required:[true,'please provide a code'],
        unique:true,
    },
    Admin:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})

const Room = mongoose.models.rooms || mongoose.model('rooms',roomSchema);

export default Room;