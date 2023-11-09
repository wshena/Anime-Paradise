"use client";
import React, { useEffect, useState } from 'react'
import { AnimeMangaRecomendations, AnimeMangaReview, MangaDetails } from '@/types';
import Link from 'next/link';
import { SmallCarousel } from '@/components/Carousel';
import { GetMangaDetailById, GetMangaPicturesById, GetMangaRecomendationsById, GetMangaReviewsById } from '@/utils/api';
import Loading from '../../../../components/Loading';

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

const page = ({ params }: { params: { id: number } }) => {
	const [mangaDetails, setMangaDetails] = useState<MangaDetails>();
  const [mangaRecomendations, setMangaRecomendations] = useState<AnimeMangaRecomendations>();
  const [mangaReviews, setMangaReviews] = useState<AnimeMangaReview[]>([])
  const [mangaPictures, setMangaPictures] = useState<ImageUrls[]>([]);

  const fetchData = async (id:number) => {
    try {
      const mangaDetail = await GetMangaDetailById(id);
      const mangaPicture = await GetMangaPicturesById(id);
      const mangaRecomendations = await GetMangaRecomendationsById(id)
      const mangaReview = await GetMangaReviewsById(id)
      
      if (mangaDetail) {
        setMangaDetails(mangaDetail);
        setMangaPictures(mangaPicture);
        setMangaRecomendations(mangaRecomendations)
        setMangaReviews(mangaReview)
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData(params.id);
  }, [params.id]);

  if (!mangaDetails) {
    return <Loading />
  }

  return (
    <div className="w-full">
			<div className="w-full relative h-[350px] bg-cover bg-center" style={{
        backgroundImage: `url(${mangaDetails.images.jpg.large_image_url})`
      }}>
        <div className="absolute top-0 w-full h-full bg-black opacity-60"></div>
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <img src={mangaDetails.images.jpg.image_url} alt={mangaDetails.title} />
        </div>
      </div>

			<div className="container mb-[50px]">
				<div className="flex flex-col gap-[30px] lg:gap-0 lg:flex-row lg:justify-between">
          <div className="flex flex-col w-[100%] lg:w-[55%]">
            <h1 className="font-bold text-[1.7rem]">{`${mangaDetails.title} (${mangaDetails.type})`}</h1>
            <div className="flex items-center gap-2">
              <p>{mangaDetails.score}</p>
            </div>
            <h3>{`${mangaDetails.status}, ${mangaDetails.chapters} Chapters, ${mangaDetails.volumes} Volumes`}</h3>
            <div className="my-[20px]">
              <div className="flex flex-wrap justify-evently">
                <ShowMore text={mangaDetails?.synopsis} maxChar={150} />
              </div>
              <div className="mt-[20px] flex flex-wrap items-center gap-3">
                {
                  mangaDetails.genres.map((item, idx) => {
                    return <div key={idx} className="px-3 py-2 bg-gray-700 text-white"><h1>{item.name}</h1></div>
                  })
                }
              </div>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b">
              <h3>Author:</h3>
              <h3>{mangaDetails.authors.map(author => author.name).join(', ')}</h3>
            </div>

            <div className="flex justify-between gap-3 pb-3 border-black border-b my-3">
              <h3>Serialization:</h3>
							{
								mangaDetails.serializations.map((serialization, idx) => {
									return <Link key={idx} href={serialization.url}>{serialization.name}</Link>
								})
							}
            </div>

						<div className="flex flex-col gap-3 pb-3 border-black border-b my-3">
              <h3>Related Manga</h3>
							{
								mangaDetails.relations.map((relation, idx) => {
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
							<SmallCarousel data={mangaRecomendations}></SmallCarousel>
						</div>
          </div>

          <div className="w-[100%] lg:w-[40%]">
            <div className="w-full flex items-center justify-center">
              <img src={mangaDetails.images.jpg.large_image_url} alt={mangaDetails.title} className='w-[200px] h-[300px]' />
            </div>
            <div className="flex flex-col gap-2 mt-[20px]">
              <div className="flex items-center gap-3">
                <p>Rank: </p>
                <p>{mangaDetails.rank}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Popularity: </p>
                <p>{mangaDetails.popularity}</p>
              </div>
              <div className="flex items-center gap-3">
                <p>Favorites: </p>
                <p>{mangaDetails.favorites}</p>
              </div>
            </div>
          </div>
				</div>
				
				<div className="mt-[30px]">
          <h1 className="mb-[20px] text-center font-bold text-[1.5rem]">Pictures</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {
              mangaPictures?.map((picture:ImageUrls, idx:number) => {
                return <Link key={idx} href={picture.jpg.large_image_url}>
                  <img src={picture.jpg.large_image_url} alt="image" className="w-[150px] h-[150px] md:w-[227px] md:h-[320px]"/>
                </Link>
              })
            }
          </div>
        </div>

        {/* Anime Reviews */}
        <div className="mt-20 w-full">
          <div className="w-[100%] lg:w-[80%] mx-auto">
            <h1 className='font-bold text-[1.5rem] mb-7 text-center'>Reviews</h1>
            {
              (mangaReviews.length !== 0) ? (
                <div className="">
                  {
                    mangaReviews.map((review:AnimeMangaReview) => {
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
  )
}

export default page