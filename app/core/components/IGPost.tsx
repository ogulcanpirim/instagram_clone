import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { GAP, ITEM_SIZE, TALL_SIZE } from '../../constants/dimensions';
import { IFeed } from '../../models/feed';
import { IGImageSlider } from './IGImageSlider';
import { IGSkeleton } from './IGSkeleton';

interface IGPostProps {
  item: IFeed;
  isTall: boolean;
  isVisible?: boolean;
  videoSource?: any;
  isLoading: boolean;
}

export const IGPost = memo(
  ({
    item,
    isTall,
    isVisible = false,
    videoSource,
    isLoading,
  }: IGPostProps) => {
    const containerStyle = useMemo(
      () => [
        styles.itemContainer,
        {
          width: ITEM_SIZE,
          height: isTall ? TALL_SIZE : ITEM_SIZE,
        },
      ],
      [isTall],
    );

    console.log('IGPost rendered:', item.id);

    if (isLoading) {
      return (
        <View style={containerStyle}>
          <IGSkeleton />
        </View>
      );
    }

    return (
      <View style={containerStyle}>
        {item.content.video && videoSource && isTall ? (
          <Video
            source={{ uri: videoSource }}
            style={StyleSheet.absoluteFill}
            muted={true}
            repeat={true}
            paused={!isVisible}
            controls={false}
            playInBackground={false}
            playWhenInactive={false}
            disableFocus={true}
            resizeMode="cover"
            ignoreSilentSwitch="ignore"
          />
        ) : item.content.images && item.content.images.length > 0 ? (
          <IGImageSlider images={item.content.images} isTall={isTall} />
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  itemContainer: {
    borderWidth: GAP / 2,
    borderColor: 'transparent',
  },
});
