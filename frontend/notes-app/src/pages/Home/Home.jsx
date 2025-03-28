import React from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/NoteCard'

const Home = () => {
  return (
    <>
     <Navbar />
     <div className='container mx-auto'>
      <div className='grid grid-cols-3 gap-4 mt-8'>
      <NoteCard title="Code full satck project" date="28th March 2025" content="Code full stack Notes App" tags="#Meeting" isPinned={true} 
      onEdit={()=>{}}
      onDelete={()=>{}}
      onPinNote={()=>{}}/>
      
      </div>

     </div>

    </>
  )
}

export default Home