import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

export const useAppNavigation = () => {
  return useNavigation<NavigationProp<ParamListBase>>();
};
