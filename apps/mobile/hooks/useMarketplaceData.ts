import { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MarketplaceItem = {
  id: string;
  title: string;
  category: string;
  price?: number;
  status: 'auction' | 'donation' | 'sold' | 'draft';
  updatedAt: string;
  image?: string;
};

const CACHE_KEY = 'marketplace-cache-v1';

const SAMPLE_ITEMS: MarketplaceItem[] = [
  {
    id: 'hero-1',
    title: 'Mid-century lounge chair',
    category: 'Furniture',
    price: 120,
    status: 'auction',
    updatedAt: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hero-2',
    title: 'Carbon road bike',
    category: 'Cycling',
    price: 900,
    status: 'auction',
    updatedAt: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1529429617124-aee1f1650a5a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hero-3',
    title: 'Sustainable bamboo desk',
    category: 'Office',
    status: 'donation',
    updatedAt: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
  },
];

export function useMarketplaceData() {
  const [items, setItems] = useState<MarketplaceItem[]>(SAMPLE_ITEMS);
  const [offline, setOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

  const sortItems = useMemo(
    () => (list: MarketplaceItem[]) =>
      [...list].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [],
  );

  const hydrateFromCache = useCallback(async () => {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed: MarketplaceItem[] = JSON.parse(cached);
        setItems(sortItems(parsed));
      } catch (error) {
        console.warn('Failed to parse cache', error);
      }
    }
  }, [sortItems]);

  const refresh = useCallback(async () => {
    if (!baseUrl) {
      setOffline(true);
      return hydrateFromCache();
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/featured`);
      if (!response.ok) {
        throw new Error('Bad response');
      }
      const payload = await response.json();
      const normalized: MarketplaceItem[] = (payload?.items ?? []).map((item: any, index: number) => ({
        id: item.id ?? `remote-${index}`,
        title: item.title ?? 'Listing',
        category: item.category ?? 'General',
        price: item.price,
        status: item.status ?? 'auction',
        updatedAt: item.updatedAt ?? new Date().toISOString(),
        image: item.image,
      }));
      if (normalized.length) {
        setItems(sortItems(normalized));
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(normalized));
        setOffline(false);
      } else {
        await hydrateFromCache();
        setOffline(true);
      }
    } catch (error) {
      console.warn('Falling back to cache due to error', error);
      await hydrateFromCache();
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, hydrateFromCache, sortItems]);

  useEffect(() => {
    hydrateFromCache();
  }, [hydrateFromCache]);

  return {
    items,
    offline,
    loading,
    refresh,
  };
}
