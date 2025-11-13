import { Dimensions } from 'react-native';

export const { width } = Dimensions.get('window');
export const GAP = 2;
export const NUM_COLUMNS = 3;
export const ITEM_SIZE = width / NUM_COLUMNS;
export const TALL_SIZE = ITEM_SIZE * 2;
