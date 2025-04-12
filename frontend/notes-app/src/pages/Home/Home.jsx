import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/Toast'
import EmptyCard from '../../components/EmptyCard'
import AddNote from '../../assets/images/addnotes.png'
import NoData from '../../assets/images/noData.png'
const Home = () => {

const [openAddEditModal, setOpenAddEditModal] = useState({
  isShown : false,
  type: "add",
  data: null

});


const [showToastMsg, setShowToastMsg] = useState({
  isShown: false,
  message:"",
  type:"add"
})

const [userInfo, setUserInfo] = useState(null);
const navigate = useNavigate();
const [allNotes, setAllNotes] = useState([]);

const [isSearch, setIsSearch] = useState(false)

const handleEdit = (noteDetails)=>{
  setOpenAddEditModal({isShown:true, type:"edit", data: noteDetails});
}

const showToastMessage =(message, type)=>{
  setShowToastMsg({
    isShown:true,
    message,
    type
  })
}

const handleCloseToast =()=>{
  setShowToastMsg({
    isShown:false,
    message:"",
  })
}

//Get User Info

const getUserInfo = async()=>{
  try{
    const response = await axiosInstance.get("/get-user");
    if(response.data && response.data.user){
      setUserInfo(response.data.user);
    }

  } catch(error){
    if(error.response.status === 401){
      localStorage.clear();
      navigate("/login")
    }

  }
}

//Get all notes
const getAllNotes = async()=>{
  try{
    const response = await axiosInstance.get("/get-all-notes");
    if(response.data && response.data.notes){
      setAllNotes(response.data.notes)
    }

  } catch(error){
    console.log("An unexpected error occured. Please try again later")
  }
}

//Delete Note
const deleteNote =async(data)=>{
  const noteId = data._id
  try{
    const response = await axiosInstance.delete('/delete-note/'+ noteId)

    if(response.data && !response.data.error){
      showToastMessage("Note deleted successfully", 'delete')
      getAllNotes()
     
    }

  }catch(error){
    if(error.response && error.response.data && error.response.data.message){
      console.log("An unexpected error has occured please try again")
    }

  }
}

//Search for Note

const searchNote = async(query)=>{

  try{
    const response = await axiosInstance.get("/search-notes",{
      params:{query},
    })

    if(response.data && response.data.notes){
      setIsSearch(true);
      setAllNotes(response.data.notes)
    }

  }catch(error){

    console.log(error)

  }

}

const handleClearSearch = ()=>{
  setIsSearch(false);
  getAllNotes()
}

const updateIsPinned = async(noteData)=>{
  const noteId = noteData._id
  
    try{
      const response = await axiosInstance.put('/update-note-pinned/'+ noteId,{
        isPinned: !noteData.isPinned,
      })
  
      if(response.data && response.data.note){
        showToastMessage(noteData.isPinned ? "Note unpinned successfully" : "Note pinned successfully");

        getAllNotes()
        
      }
  
    }catch(error){
      console.log(error)
  
    }

}
useEffect(() => {
  getAllNotes()
  getUserInfo();

  return () => {
    
  }
}, [])


  return (
    <>
     <Navbar userInfo = {userInfo} searchNote = {searchNote} handleClearSearch = {handleClearSearch}/>
     <div className='container mx-auto'>
      {allNotes.length>0 ? (<div className='grid grid-cols-3 gap-4 mt-8'>
        {allNotes.map((item,index)=>(

          <NoteCard 
          key={item._id} 
          title={item.title} 
          date={moment(item.createdOn).format('Do MMM YYYY')} 
          content={item.content}  
          tags={item.tags}  
          isPinned={item.isPinned} 
          onEdit={()=>handleEdit(item)}
          onDelete={()=>deleteNote(item)}
          onPinNote={()=>updateIsPinned(item)}/>

        ))}
      
      
      </div>) : (<EmptyCard imgSrc={isSearch? NoData : AddNote} message={isSearch? `Areh Areh Jo nahin hain use dhundh rahe ho!`:`Start creating your first note! Add Button pe click karo. You can add your thoughts, tasks, reminders and much more. Lets get started!`}/>)}

     </div>

     <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{
      setOpenAddEditModal({isShown : true,
        type: "add",
        data: null})
     }}>
      <MdAdd className='text-[32px] text-white'/>
     </button>

     <Modal
       isOpen={openAddEditModal.isShown}
       onRequestClose={()=>{}}
       style={{
          overlay:{
            backgroundColor:"rgba(0,0,0,0.2)",
          },
       }}
       contentLabel=""
       className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
       >

      <AddEditNotes onClose={()=>{setOpenAddEditModal({isShown:false, type:"add", data:null})}} getAllNotes={getAllNotes} noteData={openAddEditModal.data}
    type={openAddEditModal.type} showToastMessage={showToastMessage}/>
     </Modal>

     <Toast 
     isShown={showToastMsg.isShown}
     message= {showToastMsg.message}
     type = {showToastMsg.type}
     onClose={handleCloseToast} />


    </>
  )
}

export default Home