import { useTheme } from '@react-navigation/native';
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { TEST_IDS } from '../../constants/testids';
import { IGText } from './IGText';
import { useAppDispatch } from '../../store';
import { setSearchText } from '../../store/slices/core.slice';
import { useDispatch } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

interface IGSearchBarProps {
  headerOpacity: SharedValue<number>;
  headerTranslateY: SharedValue<number>;
}

export const IGSearchBar = ({
  headerOpacity,
  headerTranslateY,
}: IGSearchBarProps) => {
  const dispatch = useAppDispatch();
  const inputWidth = useSharedValue(screenWidth - 32);
  const focused = useSharedValue(false);
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  useAnimatedReaction(
    () => focused.value,
    isFocused => {
      if (isFocused) {
        inputWidth.value = withTiming(screenWidth - 80, { duration: 200 });
      } else {
        inputWidth.value = withTiming(screenWidth - 32, { duration: 200 });
      }
    },
    [],
  );

  const onFocus = () => {
    focused.value = true;
  };

  const onBlur = () => {
    focused.value = false;
  };

  const onChangeText = (text: string) => {
    dispatch(setSearchText(text));
  };

  const inputContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value,
    };
  }, []);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [
        {
          translateY: headerTranslateY.value,
        },
      ],
    };
  });

  const clearAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      inputWidth.value,
      [screenWidth - 32, screenWidth - 80],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
    };
  }, []);

  const handleClear = () => {
    dispatch(setSearchText(''));
    Keyboard.dismiss();
  };

  return (
    <Animated.View
      accessible={false}
      style={[
        styles.searchContainer,
        headerStyle,
        { backgroundColor: theme.colors.background, top: insets.top },
      ]}
    >
      <View style={styles.rowContainer}>
        <View accessible={false} style={styles.container}>
          <Animated.View
            style={[styles.inputContainer, inputContainerAnimatedStyle]}
          >
            <Ionicons
              name="search"
              size={16}
              color={colors.textGray}
              style={styles.searchIcon}
            />
            <TextInput
              testID={TEST_IDS.HOME_SEARCH_BAR}
              placeholder="Search"
              onFocus={onFocus}
              onBlur={onBlur}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={onChangeText}
              placeholderTextColor={colors.textGray}
              style={[
                styles.input,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.card,
                },
              ]}
            />
          </Animated.View>
        </View>
        <TouchableOpacity
          onPress={handleClear}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Animated.View style={clearAnimatedStyle}>
            <IGText style={styles.clearText}>Clear</IGText>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 8,
    zIndex: 1,
    ...Platform.select({
      ios: {
        top: 10,
      },
      android: {
        top: 11,
      },
    }),
  },
  inputContainer: {
    width: screenWidth - 32,
    zIndex: 1,
  },
  input: {
    paddingVertical: 8,
    borderRadius: 8,
    paddingLeft: 32,
    fontSize: 16,
  },
  searchContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearText: {
    fontWeight: '500',
    color: colors.primary,
    fontSize: 16,
  },
});
