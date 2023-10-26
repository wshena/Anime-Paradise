"use client";
import { AnimeCardSmall } from '@/components/AnimeCard'
import { TopMangaAnime } from '@/types';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [anime, setAnime] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    async function fectData(page:number) {
      const apiData = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/top/anime?page=${page}`);
      const pagination = apiData.data.pagination;
      const anime = apiData.data.data
      if (anime) {
        setAnime(anime)
      }

      (pagination.has_next_page) ? setHasNextPage(true) : setHasNextPage(false);
    };

    fectData(currentPage);
  }, [currentPage])

  return (
    <section className="w-full">
      <div className="container">
        <div className="pb-7">
          <h1 className="font-bold text-[2rem]">Top Anime</h1>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[100%] lg:w-[75%]">
            <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {
              anime.map((item:TopMangaAnime) => {
                return (
                  <AnimeCardSmall id={item.mal_id} type={item.type} title={item.title} image={item.images.jpg.image_url} key={item.mal_id} synopsis={item.synopsis}/>							
                )
              })
            }
          </div>
          </div>
        </div>
        <div className="w-[100%] flex items-center justify-center">
          <div className="w-[100%] lg:w-[20%]">
            <div className="flex justify-between items-center mt-10">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!hasNextPage}>Next Page</button>
            </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default page