import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {

        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId})
        user.isSigned =false
        await user.save()
        try {
            const response = NextResponse.json({
                message:'logout',
                success:true,
            })

            response.cookies.set('token','',{httpOnly:true,expires: new Date(0)})
            
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}