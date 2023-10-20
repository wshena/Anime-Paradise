import axios from "axios";

const THIS_ANIME_SEASON = 'this-anime-season';
const TOP_ANIME = 'top-anime';
const TOP_MANGA = 'top-manga';

export const thisAnimeSeason = async () => {
  const checkData = localStorage.getItem(THIS_ANIME_SEASON);
	if (checkData) {
		return JSON.parse(checkData);
	} else {
		try {
			const config = {
				method: 'GET',
				url: 'https://api.jikan.moe/v4/seasons/now'
			}
			const respone = await axios.request(config);
			localStorage.setItem(THIS_ANIME_SEASON, JSON.stringify(respone.data))
			return respone.data;
		} catch (error) {
			console.log(error);
		}
	}
}

export const topAnime = async () => {
	const checkData = localStorage.getItem(TOP_ANIME);
	if (checkData) {
		return JSON.parse(checkData);
	} else {
		try {
			const config = {
				method: 'GET',
				url: 'https://api.jikan.moe/v4/top/anime'
			}
			const respone = await axios.request(config);
			localStorage.setItem(TOP_ANIME, JSON.stringify(respone.data))
			return respone.data;
		} catch (error) {
			console.log(error);
		}
	}
}

export const topManga = async () => {
	const checkData = localStorage.getItem(TOP_MANGA);
	if (checkData) {
		return JSON.parse(checkData);
	} else {
		try {
			const config = {
				method: 'GET',
				url: 'https://api.jikan.moe/v4/top/manga'
			}
			const respone = await axios.request(config);
			localStorage.setItem(TOP_MANGA, JSON.stringify(respone.data))
			return respone.data;
		} catch (error) {
			console.log(error);
		}
	}
}

export const getAnimeFullById = async (id) => {
	try {
		const config = {
			method: 'GET',
			url: `https://api.jikan.moe/v4/anime/${id}/full`
		}
		const respone = await axios.request(config);		
		return respone.data.data;
	} catch (error) {
		console.log(error)
	}
}