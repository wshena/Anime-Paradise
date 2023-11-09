"use client";
import { SmallCarousel } from "@/components/Carousel";
import Loading from "@/components/Loading";
import { AnimeDetails, AnimeMangaRecomendations, AnimeMangaReview } from "@/types";
import { GetAnimeDetailById, GetAnimePicturesById, GetAnimeRecomendationsById, GetAnimeReviewsById } from "@/utils/api";
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

interface ShowMoreProps {
  text:string,
  maxChar:number
}

const ShowMore = ({text, maxChar}:ShowMoreProps) => {
  const [showFullText, setShowFullText] = useState(false);
  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      <p className={`text-black ${showFullText ? '' : 'line-clamp-3'}`}>
        {text}
      </p>
      {!showFullText && text.length > maxChar && (
        <button
          className="text-blue-500 hover:underline"
          onClick={toggleShowMore}
        >
          Show More
        </button>
      )}
    </div>
  );
}

const AnimeDetail = ({ params }: { params: { id: number } }) => {
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails>();
  const [animeRecomendations, setAnimeRecomendations] = useState<AnimeMangaRecomendations>();
  const [animeReviews, setAnimeReviews] = useState<AnimeMangaReview[]>([])
  const [animePictures, setAnimePictures] = useState<ImageUrls[]>([]);

  const fetchData = async (id:number) => {
    try {
      const animeDetail = await GetAnimeDetailById(id);
      const animePicture = await GetAnimePicturesById(id);
      const animeRecomendations = await GetAnimeRecomendationsById(id)
      const animeReview = await GetAnimeReviewsById(id)
      
      if (animeDetail) {
        setAnimeDetails(animeDetail);
        setAnimePictures(animePicture);
        setAnimeRecomendations(animeRecomendations)
        setAnimeReviews(animeReview)
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData(params.id);
  }, [params.id]);

  if (!animeDetails) {
    return <Loading />
  }

  return (
    <div className="w-full">

      {/* Image */}
      <div className="w-full relative h-[350px] bg-cover bg-center" style={{
        backgroundImage: `url(${animeDetails?.images.jpg.large_image_url})`
      }}>
        <div className="absolute top-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <img src={animeDetails?.images.jpg.image_url} alt={animeDetails?.title} />
        </div>
      </div>

      <div className="container mb-[50px]">
        <div className="flex flex-col gap-[30px] lg:gap-0 lg:flex-row lg:justify-between">
          
          {/* Anime Info */}
          <div className="flex flex-col w-[100%] lg:w-[55%]">
            <h1 className="font-bold text-[1.7rem]">{`${animeDetails?.title} (${animeDetails?.type})`}</h1>
            <div className="flex items-center gap-2">
              <p>{animeDetails?.rating}</p>
              <span className="block w-[1px] bg-black h-[15px]"></span>
              <p>{animeDetails?.score}</p>
            </div>
            <h3>{`${animeDetails?.status}, ${animeDetails?.episodes} Episodes (${animeDetails?.duration})`}</h3>
            <div className="my-[20px]">
              <div className="flex flex-wrap justify-evently">
                <ShowMore text={animeDetails?.synopsis} maxChar={150} />              
              </div>
              <div className="mt-[20px] flex flex-wrap items-center gap-3">
                {
                  animeDetails?.genres.map((item, idx) => {
                    return <div key={idx} className="px-3 py-2 bg-gray-700 text-white"><h1>{item.name}</h1></div>
                  })
                }
              </div>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b">
              <h3>Studios:</h3>
              <h3>{animeDetails?.studios.map(studio => studio.name).join(', ')}</h3>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b my-3">
              <h3>Producers:</h3>
              <h3>{animeDetails?.producers.map(producer => producer.name).join(', ')}</h3>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b">
              <h3>Straming Plaform:</h3>
              <div>
                {
                  animeDetails?.streaming.map((streaming, idx) => {
                    return (
                      <span key={idx} className="hover:underline">
                        <Link target="blank" href={streaming.url}>
                          {streaming.name}
                        </Link>
                        {idx < animeDetails?.streaming.length - 1 ? ', ' : ''}
                      </span>
                    )
                  })
                }                
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-3 border-black border-b my-3">
              <h3>Related Manga</h3>
							{
								animeDetails.relations.map((relation, idx) => {
									return (
										<div key={idx} className="flex flex-col lg:flex-row justify-between item-center">
											<p>{relation.relation}:</p>
											{
												relation.entry.map((item, idx) => {
													return <Link key={idx} href={item.url}>{item.name}</Link>
												})
											}
										</div>
									)
								})
							}
            </div>

            <div className="">
							<h1 className='mb-[20px]'>Manga Recomendations</h1>
							<SmallCarousel data={animeRecomendations}></SmallCarousel>
						</div>
          </div>
          {/* Anime Info */}

          {/* Anime Video */}
          <div className="w-[100%] lg:w-[40%]">
            <iframe
              className="w-[100%]"
              height="300"
              src={animeDetails?.trailer.embed_url}
              title="YouTube Video"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="flex flex-row flex-wrap justify-between lg:justify-start lg:flex-col gap-2 mt-[20px]">
              <div className="flex items-center gap-3">
                <p>Rank: </p>
                <p>{animeDetails?.rank}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Season: </p>
                <p style={{
                  textTransform: 'capitalize'
                }}>{`${animeDetails?.season}, ${animeDetails?.year}`}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Popularity: </p>
                <p>{animeDetails?.popularity}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Favorites: </p>
                <p>{animeDetails?.favorites}</p>
              </div>
            </div>
          </div>
          {/* Anime Video */}

        </div>
        
        {/* Anime Pictures */}
        <div className="mt-[50px]">
          <h1 className="mb-[20px] text-center font-bold text-[1.5rem]">Pictures</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {
              animePictures.map((picture:ImageUrls, idx:number) => {
                return <Link key={idx} href={picture.jpg.large_image_url}>
                  <img src={picture.jpg.large_image_url} alt="image" className="w-[150px] h-[150px] md:w-[227px] md:h-[320px]"/>
                </Link>
              })
            }
          </div>
        </div>
        {/* Anime Pictures */}

        {/* Anime Reviews */}
        <div className="mt-20 w-full">
          <div className="w-[100%] lg:w-[80%] mx-auto">
            <h1 className='font-bold text-[1.5rem] mb-7 text-center'>Reviews</h1>
            {
              (animeReviews?.length !== 0) ? (
                <div className="">
                  {
                    animeReviews.map((review:AnimeMangaReview) => {
                      return (
                        <div className="mb-[20px] border p-[10px]" key={review.mal_id}>
                          <div className="flex gap-5 mb-[10px] lg:mb-0">
                            <img src={review.user.images.jpg.image_url} alt={review.user.username} className='w-[100px] h-[100px]' />
                            <div className="">
                              <Link href={review.user.url}>{review.user.username}</Link>
                              <div className="flex flex-col lg:flex-row gap-0 lg:gap-[10px] mb-[10px]">
                                {
                                  review.tags.map((tag:string) => {
                                    return <p key={tag}>{tag}</p>
                                  })
                                }
                                <p>{`Score: ${review.score}`}</p>
                              </div>
                              <div className="hidden lg:block">
                                <ShowMore text={review.review} maxChar={250} />  
                              </div>
                            </div>
                          </div>
                          <div className="block lg:hidden">
                            <ShowMore text={review.review} maxChar={250} />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <h1 className='text-[1.8rem]'>There are no review yet</h1>
                </div>
              )
            }
          </div>
        </div>
        {/* Anime Reviews */}
      </div>
    </div>
  );
};

export default AnimeDetail;