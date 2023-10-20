import React from 'react'
import { CustomButtonProps } from '../types'

const CustomButton = ({text, btnType, customStyle, handleOnClick}:CustomButtonProps) => {
  return (
    <button onClick={() => handleOnClick} type={btnType} className={`${customStyle}`}>{text}</button>
  )
}

export default CustomButton