'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../Header';
import CodeEditor from '@uiw/react-textarea-code-editor';


export default function LoginPage() {

  const[language , setLanguage] = useState("py")
  

 
  return(
    <>
    <Header/> 
    <div className="relative m-[5%] overflow-hidden shadow-xl flex bg-slate-800 h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:bg-slate-900/70 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10">
        <div className="relative w-full flex flex-col">
          <div className="flex-none border-b border-slate-500/30">
            <div className="flex items-center h-8 space-x-1.5 px-3">
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
            </div>
          </div>
          <div className="relative min-h-0 flex-auto flex flex-row bg-slate-50">
            <div className="w-[5%] h-[100%] flex flex-col  bg-slate-700 place-items-center text-slate-400" >
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>

            </div>
            <div className="w-[95%] h-[100%] " >
            <CodeEditor
          
              autoFocus
              autoComplete="off"
              language={language}
              className="w-[100%] h-[100%] text-[#b5daff] bg-white/10 border backdrop-blur-xl border-black rounded-md"
            />
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}


       


