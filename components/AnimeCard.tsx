"use client";
import { TrailerCardProps, bigCardProps, episodeCardProps, smallCardProps } from '@/types';
import Link from 'next/link'
import React, { useState } from 'react'
import {PiCrownSimpleFill} from 'react-icons/pi'
import {FiPlay} from 'react-icons/fi'

const AnimeCard = ({id, title, image, type, synopsis}:bigCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
		<Link href={`${type.toLowerCase() === 'manga' ? "/manga/[id]/[title]" : "/anime/[id]/[title]"}`} as={`${type.toLowerCase() === 'manga' ? `/manga/${id}/${title}` : `/anime/${id}/${title}`}`} className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<img src={image} alt={title} className="w-[100%] h-[100%]"/>
			<div className="absolute bottom-0 w-[100%] h-[50px] z-10 bg-black opacity-40"></div>
			<div className="absolute bottom-0 p-2 text-white w-[100%] overflow-hidden z-20">
				<h1 className="text-[0.8rem] font-bold">{title}</h1>
			</div>

			{
				isHovered && (
					<div className="p-[20px] z-50 absolute top-0 left-0 w-full h-[100%] bg-black bg-opacity-70 text-white">
						<h1 className='font-bold text-[1rem] mb-[10px]'>{title}</h1>
						{
							synopsis.length > 150 ? (
								<p>
									{`${synopsis.slice(0, 150)}...`}
								</p>
							) : (
								<p>{synopsis}</p>
							)
						}
					</div>
				)
			}
		</Link>
  )
}

const AnimeCardSmall = ({title, type, id, image, synopsis}:smallCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

	return (
		<Link href={`${type.toLowerCase() === 'manga' ? "/manga/[id]/[title]" : "/anime/[id]/[title]"}`} as={`${type.toLowerCase() === 'manga' ? `/manga/${id}/${title}` : `/anime/${id}/${title}`}`} className='relative w-[250px] md:w-[200px] lg:w-[150px] h-[250px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] p-2' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="w-[100%] h-[85%]">
				<img src={image} alt={title} className='w-[100%] h-[100%]'/>
			</div>
			<div className="py-2 overflow-hidden">
				<h1 className='text-black font-bold text-[1rem] md:text-[0.8rem] truncate'>{title}</h1>
			</div>

			{
				isHovered && (
					<div className="absolute top-0 left-[160px] h-[250px] flex items-center justify-center">
						<div className="w-[250px] h-[150px] bg-gray-900 z-20 p-3 text-white overflow-hidden">
							<h1 className='text-[0.7rem] font-bold mb-2'>{title}</h1>
							<p className='text-[0.7rem] line-clamp-5'>{synopsis}</p>
						</div>
					</div>
				)
			}
		</Link>
  )
}

const EpisodeCard = ({title, image, episodes}:episodeCardProps) => {
	return (
		<Link href={'#'} className='w-[200px] h-[350px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]'>
			<img src={image} alt={title} className='w-[100%] h-[75%]'/>
			<div className="p-2 w-[100%] overflow-hidden">
				<h1 className='w-[100%] truncate text-[0.9rem] font-bold'>{title}</h1>
				<div className="flex flex-col gap-1">
					{
						episodes?.map((episode, idx) => {
							return (
								<div key={idx} className="flex items-center text-[0.8rem] gap-3">
									<p>{episode.title}</p>
									{episode.premium ? <PiCrownSimpleFill size={20}/> : ''}
								</div>
							)
						}) 
					}
				</div>
			</div>
		</Link>
	)
}

const TrailerCard = ({title, name, image, url}:TrailerCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

	return (
		<Link href={url} target='blank' className='w-[200px] h-[350px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] bg-center bg-cover relative' style={{
			backgroundImage: `url(${image})`
		}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="absolute bottom-0 w-[100%] h-[50px] z-10 bg-black opacity-30"></div>
			<div className="absolute bottom-0 p-2 text-white w-[100%] overflow-hidden z-20">
				<h1 className="text-[0.8rem] font-bold">{title}</h1>
				<h1 className='w-[100%] truncate text-[0.8rem] font-bold'>{name}</h1>
			</div>

			{
				isHovered && (
					<div className="absolute top-0 w-[100%] h-[100%] bg-black opacity-25 z-50 flex items-center justify-center">
						<FiPlay size={50} color={'white'}/>
					</div>
				)
			}
		</Link>
	)
}


export {AnimeCard, AnimeCardSmall, EpisodeCard, TrailerCard}