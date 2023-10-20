"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { navbarLinks } from '@/constant';
import CustomButton from './CustomButton';
import {BiSearchAlt ,BiMenuAltRight} from 'react-icons/bi'

const NavbarLinks = ({item}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div key={item.title} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='cursor-pointer relative z-50'>
      <h1>{item.title}</h1>
      {
        isHovered && (
          <div className="absolute shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] flex flex-col w-[200px] z-[50]">
            {
              item.dropdown.map((item) => {
                return (
                  <div className="p-2 hover:bg-black hover:text-white" key={item.text}>
                    <Link href={item.link}>{item.text}</Link>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className='container'>
      <div className='flex items-center justify-between'>
        <Link href={'/'}>AnimeMaster</Link>
        <div className='hidden md:flex items-center gap-5'>
          {
            navbarLinks.map((item) => {
              return (
                <NavbarLinks item={item} key={item.title}/>
              )
            })
          }
        </div>
        <form method='GET' action='' className='lg:flex items-center justify-between border px-3 py-2 w-[400px] rounded-[5px] hidden'>
          <input type='text' name='title' id='title' placeholder='Search anime, manga, or more...' autoComplete='off' className='w-[95%] focus:outline-none'></input>
          <button type='submit'> <BiSearchAlt /> </button>
        </form>
        <button className='md:block lg:hidden hidden'> <BiSearchAlt /> </button>
        <CustomButton text={'Sign In'} handleOnClick={() => {}} btnType={'button'} customStyle={'border py-1 px-4 md:block hidden'}/>

        <button className='block md:hidden'> <BiMenuAltRight size={24}/> </button>
      </div>
    </nav>
  )
}

export default Navbar