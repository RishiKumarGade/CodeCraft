"use client";
import Image from "next/image";
import { useEffect } from "react";
import editor from "@/images/code_editor_placeholder.png";
import Header from "./Header";
import Link from "next/link";
import "@/cssFiles/homeanimations.css";
import syntax from '@/images/syntax_highlighting.png'
import chat from '@/images/chatbox.png'
import avatars from '@/images/avatars.png'





export default function Home() {
  //   useEffect(()=>{
  //  const lightSwitches = document.querySelectorAll('.light-switch');
  // if (lightSwitches.length > 0) {
  //   lightSwitches.forEach((lightSwitch, i) => {
  //     if (localStorage.getItem('dark-mode') === 'true') {
  //       lightSwitch.checked = true;
  //     }
  //     lightSwitch.addEventListener('change', () => {
  //       const { checked } = lightSwitch;
  //       lightSwitches.forEach((el, n) => {
  //         if (n !== i) {
  //           el.checked = checked;
  //         }
  //       });
  //       if (lightSwitch.checked) {
  //         document.documentElement.classList.add('dark');
  //         localStorage.setItem('dark-mode', true);
  //       } else {
  //         document.documentElement.classList.remove('dark');
  //         localStorage.setItem('dark-mode', false);
  //       }
  //     });
  //   });
  // }
  //   })

  return (
    <>
      <div className="content">
        <Header />
        <div className="text-white flex flex-col h-[100%] w-[100%] mt-24 gap-16  fade-in">
          <div className=" p-7 font-bold flex flex-col text-center items-center ">
            <p className="text-[50px]">
              Struggling to collaborate with your friends?
            </p>
            <p className="font-normal text-[#b5daff] text-3xl">
              Try out our Collaborative Code Editor!
            </p>
          </div>
          <div className="flex flex-row gap-7 text-lg justify-center items-center">
            <Link href={"/room"}>
              <button className="bg-[#0ea5e9] text-white px-4 py-4 rounded-3xl hover:bg-[#37bcf8] font-semibold w-[350px]">
                Collaborative Editor
              </button>
            </Link>
            <Link href={"/code"}>
              {" "}
              <button className="bg-[#334154] text-white px-4 py-4 rounded-3xl hover:bg-[#ffffff40] font-semibold w-[350px]">
                Offline Editor
              </button>
            </Link>
          </div>
        </div>
        <hr className="mt-40 opacity-[0]" />
        <h1 className="text-white font-bold mt-20 text-3xl font-mono bg-white/10 py-2 fade-in2">
          Check out its features -
        </h1>
        <div className="gradient">
          <div className="features grid-rows-4 mt-20 font-mono mx-16 content">
            <div className="syntax_highlighting w-[100%] h-[50%] flex justify-left gap-10 items-center fade-in2">
              <Image
                src={syntax}
                className="inline"
                alt=""
                width={400}
                height={400}
              />
              <p className="text-2xl text-[#b5daff]">
                Real-time code updation!!! _〆(ﾟ□ﾟ*) <br /> Syntax highlighting to help
                distinguish the tokens.
              </p>
            </div>
            <div className="syntax_highlighting w-[100%] h-[50%] flex flex-row-reverse justify-left gap-10 items-center fade-in2">
              <Image
                src={chat}
                className="inline h-[500px] w-[200px]"
                alt=""
                width={400}
                height={400}
              />
              <p className="text-2xl text-[#b5daff]">
                Support for multiple types of files. <br /> A sleek chatbox for
                facilitating quick communication ~ヾ(＾∇＾)
              </p>
            </div>
            <div className="syntax_highlighting w-[100%] h-[50%] flex justify-left gap-10 items-center fade-in2">
              <Image
                src={avatars}
                className="inline"
                alt=""
                width={400}
                height={400}
              />
              <p className="text-2xl text-[#b5daff]">
                Choose your own COOL avatars ヽ(⌐■_■)ノ♪♬
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
