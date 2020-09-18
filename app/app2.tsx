/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n";
import React, { useEffect, useState } from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import * as storage from "./utils/storage";
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStateRecord from "./models/global-state-record";
import { useRef } from "react";
import GlobalStateContext from "./utils/hooks/use-global-state";
LogBox?.ignoreLogs(["Require cycle:"]);

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";

/**
 * This is the root component of our app.
 */
function App() {
  console.log("App.tsx component called...")

  const navigationRef = useRef<NavigationContainerRef>();

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [globalState, setGlobalState] = useState(new GlobalStateRecord());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGlobalState(globalState.refreshFromStorage());
    setLoading(false);
  });

  if (loading) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaView>
        <RootNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange}/>
      </SafeAreaView>
    </ApplicationProvider>
  );
}

export default App;
