"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RecomendationsInfo } from '@/types';

const page = () => {
	const [recomend, setRecomend] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [nextPage, setHasNextPage] = useState(false);

	useEffect(() => {
    async function fectData(page:number) {
      const apiData = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/recommendations/manga?page=${page}`);
      const pagination = apiData.data.pagination;
      const mangaRecomendations = apiData.data.data
      if (mangaRecomendations) {
        setRecomend(mangaRecomendations)
      }

      (pagination.has_next_page) ? setHasNextPage(true) : setHasNextPage(false);
    };

    fectData(currentPage);
  }, [currentPage])

  return (
    <section className="w-full">
      <div className="container">
        <div className="pb-5 md:pb-7">
          <h1 className="font-bold text-[2rem]">Manga Recomendations</h1>
        </div>
        <div className="flex flex-col">
				{
					recomend.map((item:RecomendationsInfo) => {
						return (
							<>
							<h1 className='py-5 md:text-[1.2rem] lg:text-[1.5rem]'>If you like this one, maybe you might like this one...</h1>
							<div className="flex flex-col lg:flex-row gap-5 lg:gap-8 py-7 p-2 lg:p-6 border-4 rounded-[10px]">
								{
									<div className="flex justify-between lg:justify-start md:gap-6 items-center">
										{item.entry.map((manga) => {
											return (
												<div className="p-2 lg:p-6 border-4 rounded-[10px]">
													<img src={manga.images.jpg.image_url} className='w-[100px] h-[150px] md:w-[150px] md:h-[200px] lg:w-[200px] lg:h-[200px]'/>
													<h1 className='mt-3 font-bold w-[100px] md:w-[150px] lg:w-[200px] text-[0.6rem] lg:text-[1.2rem]'>{manga.title}</h1>
												</div>
											)
										})}
									</div>
								}
								<div className="">
									<p className='text-[1rem[] lg:text-[1.5rem]'>{`recomended by: ${item.user.username}`}</p>
									<p className='text-[1rem[] lg:text-[1.2rem] w-[90%]'>{item.content}</p>
								</div>
							</div>
							</>
						)
					})
				}
			</div>

      <div className="flex justify-between items-center pt-10">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!nextPage}>Next Page</button>
      </div>
      </div>
    </section>
  )
}

export default page