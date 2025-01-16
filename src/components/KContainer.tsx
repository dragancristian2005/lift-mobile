import React from 'react';
import { SafeAreaView } from 'react-native';

export interface KContainerProps {
  children: React.ReactNode;
}

const KContainer = ({ children }: KContainerProps) => (
  <SafeAreaView style={{ flex: 1, margin: 8 }}>{children}</SafeAreaView>
);

export default KContainer;
