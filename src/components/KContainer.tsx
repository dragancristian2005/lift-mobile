import React from "react";
import { SafeAreaView } from "react-native";

export interface KContainerProps {
  children: React.ReactNode;
}

const KContainer = (props: KContainerProps) => {
  return <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>;
};

export default KContainer;
