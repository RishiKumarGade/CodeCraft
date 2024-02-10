import {  connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Room from "@/models/roomModel";
import User from "@/models/userModel";
import File from "@/models/fileModel";

import Session from "@/models/sessionModel";
import { NextResponse,NextRequest } from "next/server";

connect()
export async function POST(request:NextRequest){
    try {
        const {room} = await request.json();
        const session = await Session.findOne({roomcode: room});
        const users = await User.find({joinedSession:room})
        
        if(session==null){
            const newSession = new Session({
                roomcode:room,
            })
            await newSession.save()
            return NextResponse.json({
                message:'your session created successfully',
                files:null,
                lines:null,
                users:users
            })
        }
        else{
            const files = await File.find({sessionid: session._id}).select('filename data -_id')
            return NextResponse.json({
                message:'your session data',
                files:files,
                users:users
            })
        }
       
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}