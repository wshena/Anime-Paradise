"use client";
import { AnimeDetails } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


interface ImageUrls {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

const AnimeDetail = ({ params }: { params: { id: number } }) => {
  const animeDetailRespones = axios.get(`https://api.jikan.moe/v4/anime/${params.id}/full`)
  const animePicturesRepones = axios.get(`https://api.jikan.moe/v4/anime/${params.id}/pictures`)

  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [animePictures, setAnimePictures] = useState([]);

  useEffect(() => {
    animeDetailRespones.then((response) => {
      setAnimeDetails(response.data.data);
    });
    animePicturesRepones.then((response) => {
      setAnimePictures(response.data.data);
    });
  }, []);

  if (!animeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full relative h-[350px] bg-cover bg-center" style={{
        backgroundImage: `url(${animeDetails.images.jpg.large_image_url})`
      }}>
        <div className="absolute top-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <img src={animeDetails.images.jpg.image_url} alt={animeDetails.title} />
        </div>
      </div>

      <div className="container mb-[50px]">
        <div className="flex justify-between">
          <div className="flex flex-col w-[55%]">
            <h1 className="font-bold text-[1.7rem]">{`${animeDetails.title} (${animeDetails.type})`}</h1>
            <div className="flex items-center gap-2">
              <p>{animeDetails.rating}</p>
              <span className="block w-[1px] bg-black h-[15px]"></span>
              <p>{animeDetails.score}</p>
            </div>
            <h3>{`${animeDetails.status}, ${animeDetails.episodes} Episodes (${animeDetails.duration})`}</h3>
            <div className="my-[20px]">
              <div className="flex flex-wrap justify-evently">
                <p className="w-[100%]">{animeDetails.synopsis}</p>
              </div>
              <div className="mt-[20px] flex items-center gap-3">
                {
                  animeDetails.genres.map((item, idx) => {
                    return <div key={idx} className="px-3 py-2 bg-gray-700 text-white"><h1>{item.name}</h1></div>
                  })
                }
              </div>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b">
              <h3>Studios:</h3>
              <h3>{animeDetails.studios.map(studio => studio.name).join(', ')}</h3>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b my-3">
              <h3>Producers:</h3>
              <h3>{animeDetails.producers.map(producer => producer.name).join(', ')}</h3>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b">
              <h3>Straming Plaform:</h3>
              <div>
                {
                  animeDetails.streaming.map((streaming, idx) => {
                    return (
                      <span key={idx} className="hover:underline">
                        <Link target="blank" href={streaming.url}>
                          {streaming.name}
                        </Link>
                        {idx < animeDetails.streaming.length - 1 ? ', ' : ''}
                      </span>
                    )
                  })
                }                
              </div>
            </div>
          </div>

          <div className="w-[40%]">
            <iframe
              className="w-[100%]"
              height="300"
              src={animeDetails.trailer.embed_url}
              title="YouTube Video"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="flex flex-col gap-2 mt-[20px]">
              <div className="flex items-center gap-3">
                <p>Rank: </p>
                <p>{animeDetails.rank}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Season: </p>
                <p style={{
                  textTransform: 'capitalize'
                }}>{`${animeDetails.season}, ${animeDetails.year}`}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Popularity: </p>
                <p>{animeDetails.popularity}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Favorites: </p>
                <p>{animeDetails.favorites}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[30px]">
          <h1 className="mb-[20px]">Anime Pictures</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {
              animePictures?.map((picture:ImageUrls, idx:number) => {
                return <Link href={picture.jpg.large_image_url}>
                  <img key={idx} src={picture.jpg.large_image_url} alt="image" className="w-[150px] h-[150px] md:w-[227px] md:h-[320px]"/>
                </Link>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;