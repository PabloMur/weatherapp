/**
 * HTTP Client para llamadas a WeatherAPI.com (https://www.weatherapi.com)
 * Centraliza la configuración y agrega la API key a cada pedido
 */

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>;
}

class HttpClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl =
      import.meta.env.VITE_API_BASE_URL || "https://api.weatherapi.com/v1";
    // Key de WeatherAPI.com. Se llama RAPIDAPI_KEY porque así quedó cargada en
    // Vercel; vite.config.ts expone el prefijo RAPIDAPI_ al cliente.
    this.apiKey = import.meta.env.RAPIDAPI_KEY || "";
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number>,
  ): string {
    const url = new URL(
      endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`,
    );
    url.searchParams.set("key", this.apiKey);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    try {
      const url = this.buildUrl(endpoint, options?.params);
      const response = await fetch(url, {
        method: "GET",
        // Sin respuesta en 10 s se corta, para que la UI pase al modo offline
        signal: AbortSignal.timeout(10_000),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("HTTP Client Error:", error);
      throw error;
    }
  }
}

export const httpClient = new HttpClient();
