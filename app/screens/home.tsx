import { useTheme } from '@react-navigation/native';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { videoMap } from '../../feeds/videoMap';
import {
  DASHBOARD_MOCK_DATA,
  DASHBOARD_PAGE_SIZE,
} from '../constants/dashboard';
import { IGPost } from '../core/components/IGPost';
import { IGSearchBar } from '../core/components/IGSearchBar';
import { useFeeds } from '../hooks/useFeeds';
import { IFeed } from '../models/feed';

const OFFSET = 12;

export const HomeScreen = () => {
  const listRef = useRef<FlashListRef<IFeed>>(null);
  const scrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);
  const headerOpacity = useSharedValue(1);
  const backup = useSharedValue(0);
  const theme = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const insets = useSafeAreaInsets();
  const {
    feeds,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    onRefresh,
    refreshing,
    isLoading,
  } = useFeeds();

  console.log('HomeScreen rendered');

  const headerOpen = useDerivedValue(() => {
    return headerTranslateY.value < 0 && headerTranslateY.value > -100;
  }, [headerTranslateY]);

  const handleOnScrollEnd = () => {
    if (listRef.current && headerOpen.value) {
      listRef.current.scrollToOffset({
        offset: Math.round(backup.value / 100) * 100,
        animated: true,
      });
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newValue =
      scrollY.value + event.nativeEvent.contentOffset.y - backup.value;
    scrollY.value = Math.min(Math.max(newValue, 0), 115);
    if (!Keyboard.isVisible()) {
      headerTranslateY.value = interpolate(
        scrollY.value,
        [0, 100],
        [0, -100],
        Extrapolation.CLAMP,
      );
      headerOpacity.value = interpolate(
        scrollY.value,
        [0, 50],
        [1, 0],
        Extrapolation.CLAMP,
      );
      backup.value = Math.max(0, event.nativeEvent.contentOffset.y);
    }
  };

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 50,
      minimumViewTime: 100,
    }),
    [],
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any[] }) => {
      const visibleIds = new Set<string>();
      viewableItems.forEach(item => {
        if (item.item?.id) {
          visibleIds.add(item.item.id);
        }
      });
      setVisibleItems(visibleIds);
    },
    [],
  );

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderItem = useCallback(
    ({ item, index }: { item: IFeed; index: number }) => {
      const isTall = index % 10 === 2 || index % 10 === 5;
      const isVisible = visibleItems.has(item.id);
      const videoSource = item.content.video
        ? videoMap[item.content.video]
        : undefined;

      return (
        <IGPost
          item={item}
          isTall={isTall}
          isVisible={isVisible}
          videoSource={videoSource}
          isLoading={isLoading}
        />
      );
    },
    [visibleItems, isLoading],
  );

  const keyExtractor = useCallback((item: IFeed) => item.id, []);

  const handleEndReached = useCallback(() => {
    if (feeds.length < DASHBOARD_PAGE_SIZE) {
      return;
    }
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, feeds]);

  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: insets.top,
    }),
    [insets.top],
  );

  return (
    <View
      accessible={false}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <IGSearchBar
        headerOpacity={headerOpacity}
        headerTranslateY={headerTranslateY}
      />
      <FlashList<IFeed>
        ref={listRef}
        data={isLoading ? DASHBOARD_MOCK_DATA : feeds}
        numColumns={3}
        masonry={true}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={contentContainerStyle}
        onScrollEndDrag={handleOnScrollEnd}
        removeClippedSubviews={true}
        drawDistance={200}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.text}
            progressViewOffset={insets.top - OFFSET}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
