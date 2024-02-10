"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import logo from "@/images/logo.png";
import icon1 from '@/images/1.png'
import icon2 from '@/images/2.png'
import icon3 from '@/images/3.png'
import icon4 from '@/images/4.png'
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Header() {
    const [selectIcon,setSelectIcon] = useState(false);
    const [user,setUser] = useState();
    const router = useRouter();

    useEffect(()=>{
        getmyinfo()
    },[])

    const handleSetIcon = (icon)=>{
        setUser({...user,icon:icon})
        axios.post('/api/users/seticon',{icon}).then((response)=>{
            console.log(response.data.message)
        })
    }

    useEffect(()=>{
        
      },[])

    const logout = () => {
        const t = toast.loading("please wait...")
        axios.get('/api/users/logout').then(() => {
            localStorage.setItem("name", "");
            toast.dismiss(t)
            toast.success("successfully logged out")
            router.push('/')
        });
    };
    const getmyinfo = () => {
        axios.get('/api/users/getuser').then((res)=>{
            setUser(res.data.data)
        })
    }

    return (
        <>
            <header className="rounded-[19px] m-4 h-20 content flex flex-col justify-evenly">
                <nav className="text-white flex items-center justify-between px-12 h-15">
                    <div className="logo flex items-center">
                        <Image src={logo} className="h-[60px] w-[60px]" alt={''} width={60} height={60} />
                        <a href="#" className="text-2xl font-bold px-2 py-1 ml-3">CodeCraft</a>
                    </div>
                    <div id="nav-items">
                        <ul className="flex flex-row gap-8 items-center">
                                
                            {selectIcon ? <>
                               <li> <Image alt='mario' src={icon1} width={50} height={50} onClick={()=>{handleSetIcon("icon1");setSelectIcon(false)}} /></li>
                               <li><Image alt='cool ' src={icon2} width={50} height={50} onClick={()=>{handleSetIcon("icon2");setSelectIcon(false)}} /></li>
                               <li> <Image alt='logo' src={icon3} width={50} height={50} onClick={()=>{handleSetIcon("icon3");setSelectIcon(false)}} /></li>
                               <li> <Image alt='deadpool' src={icon4} width={50} height={50} onClick={()=>{handleSetIcon("icon4");setSelectIcon(false)}} /></li>
                                </> 
                                    : <>
                                                                 <li><Link href={"/"} className={`hover:underline hover:underline-offset-4 ${usePathname() == "/" ? "text-[#00adf1]": "hover:text-[#00adf1]" } `}>Home</Link></li>
                                    <li><Link href={"/room"} className={`hover:underline hover:underline-offset-4 ${usePathname() == "/room" ? "text-[#00adf1]": "hover:text-[#00adf1]" } `}>Join Rooms</Link></li>
                                    <li><Link href={"/contact"} className={`hover:underline hover:underline-offset-4 ${usePathname() == "/contact" ? "text-[#00adf1]": "hover:text-[#00adf1]" } `}>Contact Us</Link></li>
                                    <li><Link href={"/about"} className={`hover:underline hover:underline-offset-4 ${usePathname() == "/about" ? "text-[#00adf1]": "hover:text-[#00adf1]" } `}>About</Link></li>
                                    {user != null ? <>
                                    <li> <button onClick={logout} className='hover:underline hover:underline-offset-4 hover:text-[#00adf1]'>Logout</button></li>
                                    </> : <>
                                    <li><Link href={"/login"} className={`hover:underline hover:underline-offset-4 ${usePathname() == "/login" ? "text-[#00adf1]": "hover:text-[#00adf1]" } `}>Login</Link></li>
                                    </>}
                                    <li>
                                        {(user && user.icon == "icon1") && <>
                                        <Image onClick={()=>{setSelectIcon(!selectIcon)}} src={icon1} width={50} height={50} alt={''}/>
                                        </>}
                                        {(user && user.icon == "icon2") && <>
                                        <Image onClick={()=>{setSelectIcon(!selectIcon)}} src={icon2} width={50} height={50} alt={''}/>
                                        
                                        </>}{(user && user.icon == "icon3") && <>
                                        <Image onClick={()=>{setSelectIcon(!selectIcon)}} src={icon3} width={50} height={50} alt={''}/>
                                        
                                        </>}{(user && user.icon == "icon4") && <>
                                        <Image onClick={()=>{setSelectIcon(!selectIcon)}} src={icon4} width={50} height={50} alt={''}/>
                                        
                                        </>}
                                        </li>

                                </>}    
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}
