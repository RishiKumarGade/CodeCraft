import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'please provide a username'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'please provide a email'],
        unique:true,
    },
     password:{
        type:String,
        required:[true,'please provide a password'],
        unique:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    joinedSession: { type: String,default:null },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
    icon:{type:String,default:"icon1"},
    isSigned:{type:Boolean,default:false}

})

const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User;