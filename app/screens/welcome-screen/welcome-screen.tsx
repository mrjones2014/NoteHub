import React from "react";
import { View, ViewStyle, FlatList, ListRenderItemInfo } from "react-native";
import NoteRecord from "../../models/note-record";
import { Text } from "../../components";
import { useGlobalState } from "../../utils/hooks/use-global-state";
import { SafeAreaView } from "react-native-safe-area-context";

const FULL: ViewStyle = { flex: 1 };

export const WelcomeScreen = function WelcomeScreen() {
  const { globalState } = useGlobalState();

  const renderListItem = (listRenderItem: ListRenderItemInfo<NoteRecord>) => (
    <Text text={listRenderItem.item.title} key={listRenderItem.index} />
  );

  return (
    <View style={FULL}>
      <SafeAreaView>
        <FlatList
          data={globalState.notes}
          renderItem={renderListItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>
    </View>
  );
};
