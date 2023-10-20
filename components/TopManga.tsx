import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import {AnimeCard} from './AnimeCard';
import { TopMangaAnime } from '@/types';

const TopManga = async () => {
	const apiData = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/top/manga?limit=8`);
	const manga = apiData.data;
  return (
    <section id="top_manga" className='container'>
			<div className="flex items-center justify-between mb-6">
				<h1>Top Manga</h1>
				<Link href={'/manga/topManga'}>See more</Link>
			</div>

			<div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-4 gap-5 ">
				{
					manga.data.map((item:TopMangaAnime) => {
						return (
							<AnimeCard id={item.mal_id} title={item.title} image={item.images.jpg.image_url} key={item.mal_id}/>							
						)
					})
				}
			</div>
		</section>
  )
}

export default TopManga