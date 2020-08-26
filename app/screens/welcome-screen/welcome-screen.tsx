import React from "react"
import { View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"

const FULL: ViewStyle = { flex: 1 }

export const WelcomeScreen = function WelcomeScreen() {
  const navigation = useNavigation()
  const nextScreen = () => navigation.navigate("demo")

  return <View style={FULL}></View>
}
