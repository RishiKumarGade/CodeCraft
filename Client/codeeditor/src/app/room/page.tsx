'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Header from "../Header";
import Image from 'next/image';
import icon1 from '@/images/1.png'
import icon2 from '@/images/2.png'
import icon3 from '@/images/3.png'
import icon4 from '@/images/4.png'
import "@/cssFiles/homeanimations.css";





export default function Roompage() {
  const router = useRouter();
  const [roomname,setRoomname] = useState("")
  const [rcode,setRcode] = useState("")
  const [rooms,setRooms] = useState([])
  const [selectIcon,setSelectIcon] = useState(false);
  const [icon,setIcon] = useState(icon1)

  const [loading,setLoading] = useState(false);
  
  const getJoinedRoom = ()=>{
      axios.get('/api/users/getjoinedroom').then(res=>{ 
      if(res.data.data !== null){
        router.push(`/room/${(res.data.data)}`)
      }
     })
  }

  const joinRoom = (roomcode:string)=>{
    try {
      const r = toast.loading("please wait ...")
      axios.post('/api/users/joinroom',{roomcode}).then(()=>{
        toast.dismiss(r)
        toast.success("successfully joined")
      router.push(`/room/${roomcode}`)
      })
      }
    catch (error) {
      toast.error("something went wrong")
      console.log(error)
    }
  }

  const createRoom = async (roomname:string)=>{
    try{
      setLoading(true);
      axios.post('/api/users/createroom',{roomname}).then(()=>{
        location.reload();
      })
    }
    catch (error:any) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    }

  const getMyRooms = async()=>{
  try {
    axios.get('/api/users/getmyrooms').then(res =>{
      setRooms(res.data.data)
    })

    
  } catch (error) {
    
  }
  }
    useEffect(()=>{
      getJoinedRoom()
      getMyRooms()
    },[])

    useEffect(()=>{
      localStorage.setItem("icon",JSON.stringify(icon))
    },[icon])

  return(
    <>
    <Header />
      <div className="flex flex-col content justify-centre mt-20 text-white">
        <div className="grid grid-cols-2 gap-8 mt-8 place-items-center">
          
          

          <div className="text-white fade-in">
            <p className="text-2xl text-[#b5daff] mb-10 bg-white/10 h-[50px] w-[600px] flex items-center justify-center rounded-2xl">
              Your Rooms
            </p>
            <div className="bg-white/10 w-[600px] h-[400px] rounded-[40px] p-4">
              {rooms != null &&
                rooms.map((room: any) => {
                  return (
                    <div
                      key={room.roomcode}
                      className="flex items-center justify-between px-4 py-2 border-b border-gray-300"
                    >
                      <p className='text-[#b5daff]'>{room.roomname}</p>
                      <button onClick={() => joinRoom(room.roomcode)} className="bg-[#00adf1] text-white px-4 py-2 rounded-xl hover:bg-[#37bcf8]">
                      Join room
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%] h-[100%] gap-9 fade-in">
          <p className="text-[40px] text-[#b5daff]">Explore new rooms</p>
          <div className="flex flex-col items-center justify-center space-y-4 gap-7 bg-white/10 rounded-xl p-6 w-[65%] min-h-[50%]">

            <div className='flex justify-center items-center gap-5 text-center'>
            <input
              type="text"
              placeholder="Enter code"
              className="py-2 mt-2 bg-[#1e293b] text-[#8f9eb3] text-center p-2 rounded-md w-[80%] px-6"
              onChange={(e) => setRcode(e.target.value)}
              value={rcode}
            />
            <button
              className="hover:bg-[#37bcf8] text-white py-2 mt-2 rounded-xl bg-[#00adf1] px-8 min-w-[120px]"
              onClick={() => joinRoom(rcode)}
            >
              join
            </button>
            </div>
            <div className='flex justify-center items-center gap-5 text-center'>
            <input
              type="text"
              placeholder="Enter name"
              className="py-2 mt-2 bg-[#1e293b] text-[#8f9eb3] text-center p-2 rounded-md w-[80%] px-6"
              onChange={(e) => setRoomname(e.target.value)}
              value={roomname}
            />
             {loading ? (
                <button
                  disabled
                  className="bg-[#00adf1] text-white px-8 py-2 mt-2 rounded-xl hover:bg-[#37bcf8] min-w-[120px]"
                  onClick={() => createRoom(roomname)}
                >
                  create
                </button>
              ) : (
                <button
                  className="bg-[#00adf1]  text-white px-8 py-2 rmt-2 rounded-xl hover:bg-[#37bcf8] min-w-[120px]"
                  onClick={() => createRoom(roomname)}
                >
                  create
                </button>
              )}
            </div>
            
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
