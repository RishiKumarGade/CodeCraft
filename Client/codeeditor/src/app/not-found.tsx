import React from 'react'
import Header from '@/app/Header'
const Notfound = () => {
  return (
    <div>
    <Header></Header>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md text-center">
            <h1 className="text-9xl md:text-10xl lg:text-11xl font-semibold text-white">404</h1>
            <p className="text-xl font-medium mb-4 text-white">Oops! Page Not Found</p>
            <p className="text-lg text-[#ffffff50] mb-8">The page you are looking for doesn’t exist</p>
            <a href="#" className="px-4 py-2 bg-[#ffffff90] text-white rounded-full hover:bg-[#ffffff40]">Go Back Home</a>
        </div>
    </div>
    </div>
  )
}

export default Notfound
