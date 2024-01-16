import React, { useState } from 'react'

interface UserDropDownList{
    name:string;
    id:string;
    img:string;
}

const Select = () => {
const [allUserData,setAllUserData] = useState<UserDropDownList[]>( [ 
        {name:"Ahmed",id:"1",img:"https://randomuser.me/api/portraits/men/10.jpg"},
        {name:"alex",id:"2",img:"https://randomuser.me/api/portraits/men/49.jpg"},
        {name:"chris",id:"3",img:"https://randomuser.me/api/portraits/women/32.jpg"},
        {name:"mohamed",id:"4",img:"https://randomuser.me/api/portraits/men/83.jpg"},
        {name:"sara",id:"5",img:"https://randomuser.me/api/portraits/women/3.jpg"},])
 const [dropDownOptions,setDropDownOptions] = useState<UserDropDownList[]>([
       ...allUserData
    ])
const [menuOpen,setMenuOpen] = useState<boolean>(false);
const [selectedUser,setSelectedUser] = useState<UserDropDownList[]>([])
const [inPutValue,setInPutValue] = useState<string>("");
const [highlightedUser,setHighlightedUser] = useState<string>("")

  return (
    <div className=' w-4/5'>
        <div className='flex grow flex-wrap border-b border-purple-600'>
            {selectedUser.length > 0 && selectedUser.map(user => (
                <div className={`flex items-center gap-3 ${user.id === highlightedUser ? "bg-gray-400" : "bg-gray-200"}  mx-2 my-1 rounded-xl px-2 py-1 `}>
                    <img src={user?.img} className='max-w-6 aspect-square rounded-full ' alt="" />
                        <div className='text-gray-700 text-base'>
                        {user.name}
                        </div>
                     <div className='cursor-pointer text-gray-800 text-base' 
                     onClick={() => {
                        setSelectedUser([...selectedUser.filter(option => option.id !== user.id)])
                        setAllUserData((prev) => [...prev, user])
                        setDropDownOptions((prev) => [...prev, user])
                     }}
                     >x</div>   
                </div>
            ))}
        <input className='flex grow outline-none' 
        onFocus={() => setMenuOpen(true)} 
        value={inPutValue}
        onKeyDown={(e) => {
            if (selectedUser.length > 0 && e.key === "Backspace" && highlightedUser === "" && inPutValue.length === 0){
                setHighlightedUser(selectedUser[selectedUser.length-1]?.id)
            }else if (selectedUser.length > 0 && e.key === "Backspace" && highlightedUser !== "" && inPutValue.length === 0){
                const newData = [...selectedUser]
                const lastValue = {...newData[newData.length-1]}
                setAllUserData((prev) => [...prev,lastValue]);
                setDropDownOptions((prev) => [...prev,lastValue]);
                setHighlightedUser("")
                newData.pop()
                setSelectedUser([...newData]);
            }
        }}
        type="text" 
        // onBlur={() => setMenuOpen(false)} 
        onChange={(e) => {
            setInPutValue(e.target.value)
            if (e.target.value.trim().length > 0 ){
                const newData = allUserData.filter(option => option.name.toLowerCase().includes(e.target.value.toLowerCase().trim()))
                setDropDownOptions([...newData])
            }else if (e.target.value.trim().length === 0 ){
                setDropDownOptions([...allUserData])
            }
        }} />
      
        </div>
          {menuOpen && <div className='w-full  z-10 mt-3  rounded-lg border border-gray-400 max-h-48 overflow-y-auto'>
        {dropDownOptions?.length > 0 ? 
            <>
                {dropDownOptions?.map(option => (
                    <div className='w-full text-gray-800 text-base p-1 hover:bg-gray-100 flex items-center gap-3' 
                    key={option.id}
                    onClick={() => {
                        setSelectedUser((prev) => ([...prev,{name:option.name,id:option.id,img:option.img}]))
                        const newData = dropDownOptions.filter(user => user.id !== option.id)
                        setDropDownOptions([...newData])
                        setAllUserData(allUserData.filter(user => user.id !== option.id))
                        setInPutValue("")
                        setMenuOpen(false)
                    }}
                    >
                        <img src={option?.img} className='max-w-10 aspect-square rounded-full ' alt="" />
                        <div className='text-gray-700 text-base'>
                        {option?.name}
                        </div>
                    </div>
                ))}
            </> : 
            <p className='text-gray-800'>No user found</p>}
            </div>}
    </div>
  )
}

export default Select