import React from "react";
import { View, ListRenderItemInfo, StyleSheet, ViewProps } from "react-native";
import NoteRecord from "../models/note-record";
import { useGlobalState } from "../utils/hooks/use-global-state";
import { Button, Card, Layout, List, Text } from "@ui-kitten/components";
import Markdown from "../components/markdown";
import Styles from "../styles";
import { PrimaryParamList } from "../navigation";
import { StackScreenProps } from "@react-navigation/stack";


export const WelcomeScreen = function WelcomeScreen(props: StackScreenProps<PrimaryParamList, "welcome">) {
  const { globalState } = useGlobalState();

  const renderItemHeader = (headerProps: ViewProps, item: ListRenderItemInfo<NoteRecord>) => (
    <View {...headerProps}>
      <Text category="h6">
        {item.item.title}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps: ViewProps, item: ListRenderItemInfo<NoteRecord>) => (
    <Text {...footerProps}>
      {item.item.formatLastUpdatedText()}
    </Text>
  );

  const renderItem = (item: ListRenderItemInfo<NoteRecord>) => {
    if (item.item.isPersisted()) {
      return (
        <Card
          onPress={() => props.navigation.navigate("viewNote", { id: item.item.id })}
          style={item.index === globalState.notes.length - 1 ? styles.lastItem : styles.item}
          status="basic"
          header={(headerProps: ViewProps) => renderItemHeader(headerProps, item)}
          footer={(footerProps: ViewProps) => renderItemFooter(footerProps, item)}
        >
          <View style={styles.markdownContainer}>
            <Markdown>
              {item.item.content}
            </Markdown>
          </View>
        </Card>
      );
    }

    return (
      <Card onPress={() => props.navigation.navigate("editNote")}>
        <View>
          <Text category="h6">New Note</Text>
        </View>
      </Card>
    );
  };

  return (
    <Layout style={styles.mainView}>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={globalState.getNotesWithBlankFirstValue()}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create<Styles>({
  mainView: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 600,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  markdownContainer: {
    maxHeight: 100,
    overflow: "hidden",
  },
  item: {
    marginVertical: 4,
  },
  lastItem: {
    marginTop: 4,
    marginBottom: 150,
  }
});
