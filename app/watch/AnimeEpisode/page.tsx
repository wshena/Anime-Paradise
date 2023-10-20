"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AnimeEpisode } from '@/types'
import { EpisodeCard } from '@/components/AnimeCard'

const page = () => {
	const recentEpisodeRespones = axios.get('https://api.jikan.moe/v4/watch/episodes')
	const popularEpisodeRespones = axios.get('https://api.jikan.moe/v4/watch/episodes/popular')

	const [recentEpisode, setRecentEpisode] = useState([])
	const [popularEpisode, setPopularEpisode] = useState([])
	const [activeTab, setActiveTab] = useState('recent');

	useEffect(() => {
    recentEpisodeRespones.then((response) => {
      setRecentEpisode(response.data.data);
    });
		popularEpisodeRespones.then((response) => {
			setPopularEpisode(response.data.data)
		})
  }, []);

  return (
    <section className="w-full">
			<div className="container">
				<div className="flex items-center justify-between md:justify-start md:gap-5 mb-[20px] pb-5 border-b-2">
					<button onClick={() => setActiveTab('recent')} className='text-[0.9rem]'>Recent Episodes</button>
					<span className='block w-[2px] h-[20px] bg-black'></span>
          <button onClick={() => setActiveTab('popular')} className='text-[0.9rem]'>Popular Episodes</button>
				</div>

				{
					activeTab === 'recent' && (
						<div className="">
							<h1 className='mb-10 font-bold text-[1.2rem] md:text-[2rem]'>Recent Episode</h1>
							<div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-5 gap-10 pb-[50px]">
								{
									recentEpisode.map((item:AnimeEpisode) => {
										return (
											<EpisodeCard title={`${item.entry.title}`} image={item.entry.images.jpg.image_url} episodes={item.episodes}/>
										)
									})
								}
							</div>
						</div>
					)
				}

				{
					activeTab === 'popular' && (
						<div className="">
							<h1 className='mb-10 font-bold text-[1.2rem] md:text-[2rem]'>Popular Episode</h1>
							<div className="flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-5 gap-10 pb-[50px]">
								{
									popularEpisode.map((item:AnimeEpisode) => {
										return (
											<EpisodeCard title={`${item.entry.title}`} image={item.entry.images.jpg.image_url} episodes={item.episodes}/>
										)
									})
								}
							</div>
						</div>
					)
				}
			</div>
		</section>
  )
}

export default page