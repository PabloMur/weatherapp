/**
 * HTTP Client para llamadas a la API de Weather
 * Centraliza la configuración y reutiliza headers
 */

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number>;
}

class HttpClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "https://weatherapi-com.p.rapidapi.com";
    this.headers = {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY || "",
      "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST || "",
      "Content-Type": "application/json",
    };
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(endpoint.startsWith("http") ? endpoint : `${this.baseUrl}${endpoint}`);
    
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
        headers: this.headers,
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
