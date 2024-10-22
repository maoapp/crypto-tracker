import { COINS_API, NEWS_API_URL } from "../../constants";

interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
}

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await fetch(COINS_API);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data.data;
}


export const fetchNews = async (): Promise<NewsArticle[]> => {
  const response = await fetch(NEWS_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();
  return data.articles;
}
