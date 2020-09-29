/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeScreen, ViewNoteScreen } from "../screens";
import GlobalContext from "../global-context";
import { EditNoteScreen } from "../screens/edit-note-screen";

export type PrimaryParamList = {
  welcome: undefined;
  viewNote: {
    id: string;
  };
  editNote: {
    id: string;
  };
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>();

export function PrimaryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen}/>
      <Stack.Screen name="viewNote" component={ViewNoteScreen}/>
      <Stack.Screen name="editNote" component={EditNoteScreen}/>
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
