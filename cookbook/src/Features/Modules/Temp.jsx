import React from 'react'
import { useState,useEffect } from 'react';
import {IoMdArrowDropright} from 'react-icons/io';
const Temp = ({curpath,subpaths,updatePath}) => {
    const [subPath,setSubPath] = useState('');

    const callme=(new_path)=>{
      setSubPath(new_path);
    }
    useEffect(() => {
        console.log(subPath);
        if(subPath){
            updatePath('maindropdown' +'/'+curpath + '/' + subPath)
        }
    }, [subPath])
    
  return (
    <div onClick={()=>updatePath('maindropdown' +'/'+curpath)} className='group  relative w-full mb-1'>
        <button className=' w-full text-left border border-blue-500 px-5 py-2 flex justify-between'> <h1>{curpath}</h1> <IoMdArrowDropright className='text-xl'/></button>
        <div className='invisible  group-hover:visible absolute top-0 right-0 translate-x-full border bg-white'>
            <ul>
                {subpaths.map((curElem,index)=>{
                    return (
                        <li key={index} onClick={()=>callme(curElem)} className='border border-b-gray-300 border-transparent  text-sm'><button  className='w-full px-8 py-2'>{curElem}</button></li>

                    )
                })}
           
            </ul>
            
        </div>
    </div>
  )
}

export default Temp