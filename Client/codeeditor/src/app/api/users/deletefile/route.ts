import {  connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import File from "@/models/fileModel";

import Session from "@/models/sessionModel";
import { NextResponse,NextRequest } from "next/server";
connect()
export async function POST(request:NextRequest){
    try {
        const {filename,room} = await request.json();
         const sessid = await Session.findOne({roomcode: room});
         const deleted = await File.findOneAndDelete({sessionid: sessid._id,filename:filename})
            return NextResponse.json({
                message:'file deleted',
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}