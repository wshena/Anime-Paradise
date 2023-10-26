import axios from "axios";

// Anime API
export const GetThisAnimeSeasons = async () => {
	try {
		const config = {
			url: `${process.env.NEXT_PUBLIC_HOST_API}/seasons/now`
		}
	
		const respones = await axios.request(config);
		return respones.data;
	} catch (error) {
		console.log(error)
	}
}

export const GetTopAnime = async () => {
	try {
		const config = {
			url: `${process.env.NEXT_PUBLIC_HOST_API}/top/anime`
		}
	
		const respones = await axios.request(config);
		return respones.data;
	} catch (error) {
		console.log(error)
	}
}

export const GetAnimeDetailById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/anime/${id}/full`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetAnimePicturesById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/anime/${id}/pictures`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetAnimeRecomendationsById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/anime/${id}/recommendations`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetAnimeReviewsById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/anime/${id}/reviews`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}
// Anime API

// Manga API
export const GetTopManga = async () => {
	try {
		const config = {
			url: `${process.env.NEXT_PUBLIC_HOST_API}/top/manga`
		}
		
		const respones = await axios.request(config);
		return respones.data;
	} catch (error) {
		console.log(error)
	}
}

export const GetMangaDetailById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/manga/${id}/full`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetMangaPicturesById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/manga/${id}/pictures`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetMangaRecomendationsById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/manga/${id}/recommendations`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}

export const GetMangaReviewsById = async (id:number) => {
	try {
		const respone = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/manga/${id}/reviews`);
		return respone.data.data
	} catch (error) {
		console.log(error)
	}
}
// Manga API