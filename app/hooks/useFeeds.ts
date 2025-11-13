import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

import { APIClient } from '../core/APIClient';
import { IFeedResponse } from '../models/feed';
import { DASHBOARD_PAGE_SIZE } from '../constants/dashboard';
import { useAppSelector } from './useAppSelector';

interface INearUserParams {
  pageParam: number;
  is_pro_only?: boolean;
  selected_gender?: number;
}

const REFRESH_DELAY_MS = 1500;
const SEARCH_DEBOUNCE_MS = 250;

export const useFeeds = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const debounceTimerRef = useRef<number | null>(null);
  const searchText = useAppSelector(state => state.coreData.searchText);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchText]);

  const queryKey = useMemo(
    () => ['getFeeds', debouncedSearchText],
    [debouncedSearchText],
  );
  const getNearUsers = async ({
    pageParam,
    queryKey,
  }: INearUserParams & {
    queryKey: (string | number)[];
  }): Promise<IFeedResponse> => {
    const searchQuery = (queryKey[1] as string) || '';
    const response = await APIClient.get<IFeedResponse>('/api/feeds', {
      params: {
        page: pageParam,
        limit: DASHBOARD_PAGE_SIZE,
        search: searchQuery,
      },
      showSuccessToast: false,
      hasLoader: false,
    });

    return response.data;
  };

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, queryKey: qk }) =>
      getNearUsers({ pageParam, queryKey: qk }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage?.pagination.page + 1 < lastPage?.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    const startTime = Date.now();
    await queryClient.setQueryData(queryKey, {
      pages: query.data?.pages[0] ? [query.data.pages[0]] : [],
      pageParams: [1],
    });
    await query.refetch();
    // Mock 1.5s delay for better UX
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, REFRESH_DELAY_MS - elapsedTime);
    if (remainingTime > 0) {
      await new Promise<void>(resolve => setTimeout(resolve, remainingTime));
    }
    setRefreshing(false);
  };

  const feeds = useMemo(() => {
    return query.data?.pages.flatMap(page => page.data) || [];
  }, [query.data]);

  return {
    ...query,
    feeds,
    onRefresh,
    refreshing,
    searchText,
  };
};
