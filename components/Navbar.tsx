"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { navbarLinks } from '@/constant';
import CustomButton from './CustomButton';
import {BiSearchAlt ,BiMenuAltRight} from 'react-icons/bi'
import {AiOutlineCloseCircle} from 'react-icons/ai'

const NavbarLinks = ({item}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(!isClick)
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div key={item.title} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='cursor-pointer relative'>
      <h1>{item.title}</h1>
      {
        isHovered && (
          <div className="absolute shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] flex flex-col w-[200px] bg-white z-50">
            {
              item.dropdown.map((item) => {
                return (
                  <div className="p-2 hover:bg-black hover:text-white text-black" key={item.text}>
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
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(!isClick)

    if (!isClick) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }  

  return (
    <nav className='container z-50 relative'>
      <div className='flex items-center justify-between'>
        <div className="flex items-center gap-[15px]">
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
        </div>

        <div className="flex items-center gap-[15px]">
          <form method='GET' action='' className='lg:flex items-center justify-between border px-3 py-2 w-[400px] rounded-[5px] hidden'>
            <input type='text' name='title' id='title' placeholder='Search anime, manga, or more...' autoComplete='off' className='w-[95%] focus:outline-none'></input>
            <button type='submit'> <BiSearchAlt /> </button>
          </form>
          <button className='md:block lg:hidden hidden'> <BiSearchAlt /> </button>
          <CustomButton text={'Sign In'} handleOnClick={() => {}} btnType={'button'} customStyle={'border py-1 px-4 md:block hidden'}/>
        </div>

        <button onClick={handleClick} className='block md:hidden'> <BiMenuAltRight size={24}/> </button>

        {
          isClick && (
            <div className="absolute top-0 left-0 bg-gray-100 w-full h-[100vh] container">
              <div className="flex justify-between items-center mb-[30px]">
                <Link className='font-bold' href={'/'}>AnimeMaster</Link>
                <button onClick={handleClick}> <AiOutlineCloseCircle size={24} color={'black'}/> </button>
              </div>

              <div className='flex flex-col gap-[10px] -z-10'>
                {
                  navbarLinks.map((item) => {
                    return (
                      <NavbarLinks item={item} key={item.title}/>
                    )
                  })
                }
              </div>
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar