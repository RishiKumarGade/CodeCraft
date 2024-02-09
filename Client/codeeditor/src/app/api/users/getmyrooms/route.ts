import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Room from "@/models/roomModel";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const rooms:any = await Room.find({Admin:userId})
            return NextResponse.json({
            message:'your rooms',
            data:rooms
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}