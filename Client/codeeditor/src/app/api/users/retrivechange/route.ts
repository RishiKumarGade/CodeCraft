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
        const {room,type,filename,lineno} = await request.json();
        const session = await Session.findOne({roomcode: room});
        const userid = await getDataFromToken(request);
        let files = null
        if(type == "EDIT"){
            files = await File.findOne({sessionid: session._id,filename:filename}).select('data filename -_id')
        }
        if(type == "CREATEFILE"){
            files  = await File.find({sessionid:session._id}).select('filename data -_id')
        }
        if(type == "DELETEFILE"){
            files  = await File.find({sessionid:session._id}).select('filename data -_id')
        }
            return NextResponse.json({
                message:'retrived',
                files:files
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}