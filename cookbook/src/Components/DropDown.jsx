import React from 'react'
import SubDropDown from '../Features/Modules/SubDropDown'
import { IoMdArrowDropright } from 'react-icons/io'

const DropDown = ({Object_Type,Sub_Objects , updatePath,updatePath3,showSublist}) => {
  return (
    <>
    <div    className="w-full mb-1 ">
       <button onClick={()=>updatePath(Object_Type + '/')} className="border bg-gray-300 shadow-md w-full border-gray-300 px-5 py-2.5 text-left flex justify-between"> <h1>{Object_Type}</h1>{Sub_Objects.length? <IoMdArrowDropright className="text-xl"/>:<></> } </button>
    </div>
    {showSublist === Object_Type &&
        Sub_Objects.map((curElem,index)=>{
            return(
                
              <div key={index} >
                <SubDropDown Object_Type={curElem.Object_Type} Sub_Objects={curElem.Sub_Objects} updatePath={updatePath} curPath={Object_Type+'/'}/>
              </div>
            )
        })
    }
    </>
  )
}

export default DropDown