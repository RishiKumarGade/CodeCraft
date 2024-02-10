import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {

        const userId = await getDataFromToken(request)
        const user:any = await User.findOne({_id:userId})
            return NextResponse.json({
            message:'roomcode',
            data:user.joinedSession
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}