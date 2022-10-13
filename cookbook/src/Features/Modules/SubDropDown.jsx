import {IoMdArrowDropright} from 'react-icons/io';

const SubDropDown = ({Object_Type,Sub_Objects,updatePath ,curPath}) => {
    const callme=(new_path)=>{
      updatePath(new_path)
    }  
  return (
    <div  className='group  relative w-full mb-0.5'>
        <button onClick={()=>updatePath(curPath+'/'+Object_Type+'/')} className=' w-full text-left bg-slate-100 rounded-md border border-gray-300 px-5 py-2 flex justify-between'> <h1>{Object_Type}</h1> {Sub_Objects.length?<IoMdArrowDropright className='text-xl'/>:<></>}</button>
        <div className='invisible  group-hover:visible absolute top-0 right-0 translate-x-full border bg-white'>
            <ul>
                {Sub_Objects.map((curElem,index)=>{
                    return (
                        <li key={index} onClick={()=>callme(curPath+Object_Type+'/'+curElem.Object_Type)} className='border border-b-gray-300 border-transparent  text-sm'><button  className='w-full px-8 py-2'>{curElem.Object_Type}</button></li>

                    )
                })}
             
            </ul>
            
        </div>
    </div>
  )
}

export default SubDropDown