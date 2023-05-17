export async function APIgetWeather() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=-38%2C-57.56";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "604c4a73bcmsh15c5083584728f9p1678acjsn3f28db565705",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
