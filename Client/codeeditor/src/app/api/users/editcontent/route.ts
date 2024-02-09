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
        const {room,filename,lineno,data} = await request.json();
        const session = await Session.findOne({roomcode: room});
        const userid = await getDataFromToken(request); 
            await File.findOneAndUpdate({sessionid:session._id,filename: filename},{$set: {
                data: data
              },})
              return NextResponse.json({
                message:'edited',
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}