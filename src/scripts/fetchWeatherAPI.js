export const API_KEY = "89f6596948ee4f748e9123610251910";

export async function getWeather(location){   
     try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`);

        if(!response.ok){
            throw new Error('Location was not found');
        }

      const processedData = await response.json();

      console.log('processed data: ', processedData);

      return processedData;

     } catch(error){
        console.error('Fetching Error: ', error);
        throw error;
     }

}

export async function getForecast(location) {
   try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`);
      if(!response.ok){
         throw new Error('Houly location not found');
      }

      const forecastData = await response.json();

      console.log('forecast data: ', forecastData);

      return forecastData;
   } catch (error) {
      console.error('Fetching Error: ', error);
      throw error;
   }
}





