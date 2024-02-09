import React from 'react'
import Image from 'next/image'
import code from '@/images/code.jpg'
import coding from '@/images/coding.jpg'
import Header from "../Header"
const Page = () => {
  return (
    <div>
      <Header></Header>
      <div className="grid grid-cols-2 gap-1 px-65 py-17 content fade-in">
        <div className="wrapper bg-transparent rounded-lg w-full px-10 py-2 text-white">
            <section className="container mx-auto my-6 p-6 bg-white/10 shadow-lg rounded-md">
                <h2 className="text-xl font-semibold mb-2 text-[#b5daff]">Who We Are</h2>
                <p className="text-white">
                    Welcome to CodeCraft, your go-to platform for coding enthusiasts. We provide a powerful and user-friendly
                    code editing experience tailored to meet the needs of developers, beginners, and professionals alike.
                </p>

                <h2 className="text-xl font-semibold mt-4 mb-2 text-[#b5daff]">Our Mission</h2>
                <p className="text-white">
                    Our mission is to empower individuals to express their creativity through coding. We strive to offer an
                    accessible and feature-rich code editor that fosters learning, collaboration, and innovation within the
                    developer community.
                </p>

                <h2 className="text-xl font-semibold mt-4 mb-2 text-[#b5daff]">Why Choose Code Editor?</h2>
                <ul className="list-disc list-inside text white">
                    <li>Intuitive User Interface</li>
                    <li>Extensive Language Support</li>
                    <li>Real-time Collaboration Features like live chat and many more</li>
                    <li>Customizable Themes and Settings</li>
                </ul>
            </section>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-0 w-full px-10 py-2 ">
            <div className="wrapper bg-transparent rounded-lg md:w-full px-10 py-2 text-white"></div>
            <div className="grid-shrink-0 md:w-1/2 order-2 ml-auto">
                <Image src={code} alt={'pic1'} className="rounded-lg max-w-1/2 h-50 opacity-40" height={500} width={500}/>
            </div>
            <div className="grid-shrink-0 md:w-1/2 order-1">
                <Image src={coding} alt={'pic2'}  className="rounded-lg max-w-1/3 h-50 opacity-40" height={500} width={500}/>
            </div>
        </div>  
    </div>    

    <footer className="bg-[#1e293b70] text-white text-center py-4">
        <p>&copy; 2024 Code Editor. All rights reserved.</p>
    </footer>

    </div>
  )
}

export default Page
