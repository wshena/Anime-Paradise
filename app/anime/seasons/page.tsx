"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {AnimeCardSmall} from '@/components/AnimeCard';
import { SeasonsInfo, YearSeasons } from '@/types';

const page = () => {
	const seasonListFromApi = axios.get('https://api.jikan.moe/v4/seasons');
	const [seasonsList, setSeasonsList] = useState([]);
	const seasons = seasonsList.slice(0, 4)

	useEffect(() => {
    seasonListFromApi.then((response) => {
      setSeasonsList(response.data.data);
    });
  }, []);

	const [activeTab, setActiveTab] = useState({ year: 2023, season: 'fall' });
  const [apiData, setApiData] = useState([]);

	const fecthData = async (year:number, season:string) => {
		try {
      const response = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`);
      const data = response.data.data;
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
	}

	useEffect(() => {
    fecthData(activeTab.year, activeTab.season);
  }, [activeTab]);

  return (
    <section className="w-full">
			<div className="container">
				<div className="pb-10">
					<h1 className="font-bold text-[1.2rem] md:text-[2rem] lg:text-[3rem]">Anime season all year around</h1>
				</div>
				<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
					{
						seasons.map((data:YearSeasons, idx) => {
							return (
								<div className="flex items-center gap-3" key={idx}>
									{
										data.seasons.map((item, idx:number) => {
											return (
												<div key={idx}>
													<button onClick={() => setActiveTab({ year: data.year, season: item })} className={`flex items-center gap-2 border rounded-[10px] p-2 ${data.year === activeTab.year && item === activeTab.season ? 'active' : ''}`}>{data.year} {item}</button>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				</div>
				<div className="pt-7">
					<h1 className='font-bold text-[1.2rem]'>{`${activeTab.year} ${activeTab.season}`}</h1>
				</div>
				<div className="flex items-center justify-center">
          <div className="w-[100%] lg:w-[75%]">
            <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {
              apiData.map((item:SeasonsInfo) => {
                return (
                  <AnimeCardSmall title={item.title} image={item.images.jpg.image_url} key={item.mal_id} synopsis={item.synopsis}/>							
                )
              })
            }
						</div>
          </div>
        </div>
			</div>
		</section>
  )
}

export default page