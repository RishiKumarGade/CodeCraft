"use client";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import axios from "axios";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function RoomPage({ params }: { params: { roomcode: String } }) {
  const [message, setMessage]: any = useState();

  useEffect(() => {
    setMessage(localStorage.getItem("roomcode"));
  });

  const setItem = () => {
    localStorage.setItem("roomcode", "roomcode");
  };
  return (
    <>
      <div className="relative overflow-hidden shadow-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10">
        <div className="relative w-full flex flex-col">
          <div className="flex-none border-b border-slate-500/30">
            <div className="flex items-center h-8 space-x-1.5 px-3">
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
            </div>
          </div>
          <div className="relative min-h-0 flex-auto flex flex-row bg-slate-50">
            <div className="w-[5%] h-[100%] bg-slate-200" >

            </div>
            <div className="w-[95%] h-[100%] bg-slate-500" >

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
