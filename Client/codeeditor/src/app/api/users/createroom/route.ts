import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Room from '@/models/roomModel'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {roomname} = reqBody;
        const userId = await getDataFromToken(request)
        let roomexists
        let roomcode
        // while(roomexists){
            roomcode = makeid()
            roomexists = await Room.exists({roomcode:roomcode})
        // }
        let newRoom = new Room({
            roomname:roomname,
            roomcode:roomcode,
            Admin:userId
        })
        await newRoom.save()
        return NextResponse.json({message:'room created',success:true})

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }

}



const ROOM_ID_LENGTH = 6

function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < ROOM_ID_LENGTH) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}