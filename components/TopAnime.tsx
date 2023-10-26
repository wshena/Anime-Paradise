"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GetTopAnime } from '@/utils/api';
import { BigCarousel } from './Carousel';

const TopAnime = () => {
	const [thisTopAnime, setThisTopAnime] = useState({ data: [] });
	const fetchData = async () => {
		const apiData = await GetTopAnime();
		if (apiData) setThisTopAnime(apiData)
	}

	useEffect(() => {
		fetchData();
	}, [])

  return (
    <section id="top_anime" className='w-full overflow-hidden'>
			<div className="container">
				<div className="flex items-center justify-between mb-0">
					<h1>Top Anime</h1>
					<Link href={'/anime/topAnime'}>See more</Link>
				</div>
				<div className="hidden 2xl:block mt-[15px]">
					<BigCarousel data={thisTopAnime.data} />
				</div>
			</div>

			<div className="block mt-[10px] 2xl:hidden">
				<BigCarousel data={thisTopAnime.data} />
			</div>
		</section>
  )
}

export default TopAnime