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
        const {filename,room} = await request.json();
         const sessid = await Session.findOne({roomcode: room});
        const newFile=  new File({sessionid: sessid._id,filename:filename,data:""})
        await newFile.save();
            return NextResponse.json({
                message:'file created',
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}