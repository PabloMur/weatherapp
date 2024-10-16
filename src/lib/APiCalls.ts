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
    return result;
  } catch (error) {
    console.error(error);
  }
}

// API para obtener el clima de Trenque Lauquen
export async function APIgetWeatherTrenqueLauquen() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=-35.98%2C-62.73"; // Coordenadas de Trenque Lauquen
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

// API para obtener el clima de Montevideo
export async function APIgetWeatherMontevideo() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=-34.90%2C-56.19"; // Coordenadas de Montevideo
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

// Función para obtener el clima de Tucumán (ya existente)
export async function APIgetWeatherTucuman() {
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=-26.83%2C-65.20"; // Coordenadas de Tucumán
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
