import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

export type HomeParamType = {
  Home: undefined;
  ResultsPage: { id: string; title: string };
};

export type HomeNavProps<T extends keyof HomeParamType> = {
  navigation: StackNavigationProp<HomeParamType, T>;
  route: RouteProp<HomeParamType, T>;
};
