import { API_KEY } from "./fetchWeatherAPI";

export async function autoComplete(search) {
    try {
        if(!search || !search.trim()) return[];

        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`);

        if(!response.ok){
            throw new Error('Search error');
        }

      const searchedData = await response.json();

      console.log('Searched data: ', searchedData);

      return searchedData;

    } catch (error) {
        console.error('Fetching Error: ', error);
        throw error;
    }
}



