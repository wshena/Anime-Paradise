import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AnimeMangaRecomendations, SeasonsInfo } from "@/types";
import Link from "next/link";
import { useRef } from "react";
import {GrFormNextLink, GrFormPreviousLink} from 'react-icons/gr'
import { AnimeCard } from "./AnimeCard";

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 6,
	slidesToScroll: 6,
	arrows: true,
	lazyLoad: true,
	draggable: true,
	focusOnSelect: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				arrows: true
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
			},
		}
	],
};

export const BigCarousel = ({data}) => {
	const slideRef = useRef(null);
	const next = () => {
		slideRef?.current?.slickNext();
	}
	const prev = () => {
		slideRef?.current?.slickPrev();
	}
	
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		lazyLoad: true,
		draggable: true,
		focusOnSelect: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: true
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					centerMode: true,
					variableWidth: false
				},
			}
		],
	};

	return (
		<div className="w-full">
			<Slider {...settings} ref={slideRef}>
				{
					data.map((item:SeasonsInfo) => {
						return (
							<div className="px-[10px] w-[250px] md:w-[200px] lg:w-[250px] h-[350px] " key={item.mal_id}>
								<AnimeCard title={item.title} type={item.type} image={item.images.jpg.image_url} id={item.mal_id} synopsis={item.synopsis}/>
							</div>
						)
					})
				}
			</Slider>
			<div className="w-full flex items-center justify-center mt-[20px]">
				<div className="flex gap-[15px]">
					<button onClick={prev}> <GrFormPreviousLink size={30}/> </button>
					<button onClick={next}> <GrFormNextLink size={30}/> </button>
				</div>
			</div>
		</div>
	)
}

export const SmallCarousel = ({data}) => {
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		lazyLoad: true,
		draggable: true,
		focusOnSelect: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
					arrows: true
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				},
			},{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: false,
					variableWidth: false
				},
			}
		],
	};
	const slideRef = useRef(null);
	const next = () => {
		slideRef?.current?.slickNext();
	}
	const prev = () => {
		slideRef?.current?.slickPrev();
	}

	return (
		<div className="">
			<Slider {...settings} ref={slideRef}>
				{
					data.map((item:AnimeMangaRecomendations) => {
						return (
							<Link href={item.entry.url} key={item.entry.mal_id} className="">
								<div className="w-[100px] h-[200px]">
									<img src={item.entry.images.jpg.large_image_url} alt={item.entry.title} className='w-[100%] h-[90%]'/>
									<div className="w-full overflow-hidden">
										<h1 className='mt-[10px] w-[100%] truncate font-bold'>{item.entry.title}</h1>
									</div>
								</div>
							</Link>
						)
					})
				}
			</Slider>
			<div className="w-full flex items-center justify-center mt-[10px]">
				<div className="flex gap-[15px]">
					<button onClick={prev}> <GrFormPreviousLink size={30}/> </button>
					<button onClick={next}> <GrFormNextLink size={30}/> </button>
				</div>
			</div>
		</div>
  )
}