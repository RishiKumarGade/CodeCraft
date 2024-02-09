import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {

        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        const {icon} = reqBody
        const user:any = await User.findOne({_id:userId})
        user.icon = icon 
        await user.save()
            return NextResponse.json({
            message:'icon set',
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}