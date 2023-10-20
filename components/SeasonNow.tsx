import axios from 'axios';
import React from 'react'
import Link from 'next/link';
import {AnimeCard} from './AnimeCard';
import { SeasonsInfo } from '@/types';

const SeasonNow = async () => {
	const apiData = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/seasons/now?limit=8`);
	const anime = apiData.data;

  return (
    <section id="anime-season-now" className='container'>
			<div className="flex items-center justify-between mb-6">
				<h1>This Season Anime</h1>
				<Link href={'/anime/seasons'}>See more</Link>
			</div>
			<div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-10 gap-5">
				{
					anime.data.map((item:SeasonsInfo) => {
						return (
							<AnimeCard id={item.mal_id} title={item.title} image={item.images.jpg.image_url} key={item.mal_id}/>							
						)
					})
				}
			</div>
		</section>
  )
}

export default SeasonNow