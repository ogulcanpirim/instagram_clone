import { FlashList } from '@shopify/flash-list';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GAP, ITEM_SIZE, TALL_SIZE } from '../../constants/dimensions';

interface IGImageSliderProps {
  images: string[];
  isTall: boolean;
}

export const IGImageSlider = memo(({ images, isTall }: IGImageSliderProps) => {
  const keyExtractor = useCallback((item: string, index: number) => {
    return `${item}-${index}`;
  }, []);

  const containerStyle = useMemo(
    () => ({
      width: ITEM_SIZE - GAP,
      height: isTall ? TALL_SIZE : ITEM_SIZE - GAP,
      borderColor: 'transparent',
    }),
    [isTall],
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <View style={containerStyle}>
          <FastImage
            source={{
              uri: item,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={styles.imageItem}
          />
        </View>
      );
    },
    [isTall],
  );

  return (
    <View accessible={false} style={styles.container}>
      <FlashList<string>
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
});

export const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    height: '100%',
    borderRightWidth: GAP,
    borderColor: 'transparent',
  },
  imageItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
