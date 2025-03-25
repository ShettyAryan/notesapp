import React, { useState } from 'react'

const PasswordInput = ({value, onChange, placeholder}) => {

   const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 mb-3 rounded '>PasswordInput</div>
  )
}

export default PasswordInput