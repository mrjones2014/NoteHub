import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export default interface Styles {
    [key: string]: ViewStyle | TextStyle | ImageStyle;
}
