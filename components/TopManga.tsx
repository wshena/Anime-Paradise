"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GetTopManga } from '@/utils/api';
import { BigCarousel } from './Carousel';

const TopManga = () => {
	const [thisTopManga, setThisTopManga] = useState({ data: [] });
	const fetchData = async () => {
		const apiData = await GetTopManga();
		if (apiData) setThisTopManga(apiData)
	}

	useEffect(() => {
		fetchData();
	}, [])

  return (
    <section id="top_manga" className='w-full overflow-hidden'>
			<div className="container">
				<div className="flex items-center justify-between mb-0">
					<h1>Top Manga</h1>
					<Link href={'/manga/topManga'}>See more</Link>
				</div>
				<div className="hidden 2xl:block mt-[15px]">
						<BigCarousel data={thisTopManga.data} />
				</div>
			</div>

			<div className="block mt-[10px] 2xl:hidden">
				<BigCarousel data={thisTopManga.data} />
			</div>
		</section>
  )
}

export default TopManga