"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { GetThisAnimeSeasons } from '@/utils/api';
import { BigCarousel } from './Carousel';

const SeasonNow = () => {

	const [thisAnimeSeason, setThisAnimeSeason] = useState({ data: [] });
	const fetchData = async () => {
		const apiData = await GetThisAnimeSeasons();
		if (apiData) setThisAnimeSeason(apiData)
	}

	useEffect(() => {
		fetchData();
	}, [])

  return (
    <section id="anime-season-now" className='w-full overflow-hidden'>
			<div className="container">
				<div className="flex items-center justify-between mb-0">
					<h1>This Season Anime</h1>
					<Link href={'/anime/seasons'}>See more</Link>
				</div>
				<div className="hidden 2xl:block mt-[15px]">
					<BigCarousel data={thisAnimeSeason.data} />
				</div>
			</div>

			<div className="block mt-[10px] 2xl:hidden">
				<BigCarousel data={thisAnimeSeason.data} />
			</div>
		</section>
  )
}

export default SeasonNow