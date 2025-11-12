import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate=useNavigate()
  const[getrole,setGetrole]=useState(null)
  useEffect(()=>{
    const role=localStorage.getItem("role")
    setGetrole(role)

  })
  return (
    <footer className="bg-zinc-100 text-zinc-700 mt-10 z-10 px-10">
      {/* {!getrole && (  <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <img 
            src="https://prescripto.vercel.app/assets/logo-BNCDj_dh.svg" 
            alt="Logo" 
            className="w-32 mb-4"
          />
          <p className="text-sm leading-relaxed text-zinc-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>


        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-sky-600 cursor-pointer" onClick={()=>navigate('/')}>Home</li>
            <li className="hover:text-sky-600 cursor-pointer"onClick={()=>navigate('/about')}>About</li>
            <li className="hover:text-sky-600 cursor-pointer">Delivery</li>
            <li className="hover:text-sky-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">📞 +91 8050480504</p>
          <p className="text-sm">📧 capabhi@gmail.com</p>
        </div>
      </div>)} */}
    


      <div className="border-t border-zinc-300 py-4 text-center text-sm text-zinc-500">
        © 2024 Abhishek-Creation.dev - All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
