import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export async function POST(request:NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email,password} = reqBody;
        const user = await User.findOne({email})

        if (!user){
            return NextResponse.json({message:'user does not exist',success:false})
        }
        if(user.isSigned){
            return NextResponse.json({message:'Already Signed In Another Device',success:false})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:'wrong password',success:false})
        }
        


        const tokenData = {
            id : user._id,
            username:user.username,
            email: user.email,
        }

        user.isSigned = true
        await user.save()

        let token
            while (!token) {
            token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
            }

        const response = NextResponse.json({
            message:'login successful',
            success:true
        })

        if(token){
            token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        }

        console.log(token)

        response.cookies.set('token',token,{httpOnly:true})
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }

}