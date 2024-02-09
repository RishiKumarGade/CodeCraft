import {  connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Room from "@/models/roomModel";
import User from "@/models/userModel";
import File from "@/models/fileModel";
import Line from "@/models/lineModel";


import Session from "@/models/sessionModel";
import { NextResponse,NextRequest } from "next/server";

connect()
export async function POST(request:NextRequest){
    try {
        const {room,type,filename,lineno,data} = await request.json();
        const session = await Session.findOne({roomcode: room});
        const userid = await getDataFromToken(request);    
        if(type == "EDIT"){
            await Line.findOneAndUpdate({sessionid:session._id,filename: filename,index:lineno},{$set: {
                data: data
              },})
        }

        if(type=="CREATEFILE"){
            await File.create({filename: filename,sessionid: session._id})
            await Line.create({sessionid: session._id,filename:filename,index:0,data:""})
        }

            return NextResponse.json({
                message:'updated',
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}