"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AnimeTrailerInfo } from '@/types';
import { TrailerCard } from '@/components/AnimeCard';

const page = () => {
	const animePromosRespone = axios.get('https://api.jikan.moe/v4/watch/promos')
	const [animePromos, setAnimePromos] = useState([])

	useEffect(() => {
    animePromosRespone.then((response) => {
      setAnimePromos(response.data.data);
    });
  }, []);

  return (
    <section className="w-full">
			<div className="container">
				<h1 className='mb-10 font-bold text-[1.2rem] md:text-[2rem]'>Anime Trailer</h1>
				<div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-5 gap-10 pb-[50px]">
					{
						animePromos.map((item:AnimeTrailerInfo) => {
							return (
								<TrailerCard title={`${item.title}`} name={item.entry.title} image={item.entry.images.jpg.image_url} url={item.trailer.url}/>
							)
						})
					}
				</div>
			</div>
		</section>
  )
}

export default page