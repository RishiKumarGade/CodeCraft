import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Room from "@/models/roomModel";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        if(userId == null){
            return NextResponse.json({
                message:'your id',
                data:null
            })
        }
        const user = await User.findOne({_id:userId})
            return NextResponse.json({
            message:'your id',
            data:user
        })
       
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}