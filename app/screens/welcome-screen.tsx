import React, { useRef } from "react";
import { View, ListRenderItemInfo, StyleSheet, ViewProps, Alert } from "react-native";
import NoteRecord from "../models/note-record";
import { useGlobalState } from "../utils/hooks/use-global-state";
import { Button, Card, Icon, IconProps, Layout, List, Text } from "@ui-kitten/components";
import Markdown from "../components/markdown";
import Styles from "../styles";
import { PrimaryParamList } from "../navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { CollectionUtils } from "andculturecode-javascript-core";
import Toast from "@rimiti/react-native-toastify";


export const WelcomeScreen = function WelcomeScreen(props: StackScreenProps<PrimaryParamList, "welcome">) {
  const { globalState, setGlobalState } = useGlobalState();

  const toast = useRef<Toast>();

  const deleteNote = async (noteId: string) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: async () => {
          const idx = globalState.notes.findIndex((n: NoteRecord) => n.id === noteId);
          if (idx < 0) {
            return;
          }

          const newState = globalState.with({
            notes: CollectionUtils.removeElementAt(
              globalState.notes,
              idx
            )
          });
          const saveSuccess = await newState.persistToStorage();
          if (saveSuccess) {
            setGlobalState(newState);
            return;
          }

          toast.current.show("Failed to delete note.", 2000);
        },
        style: "destructive"
      }
    ],
    { cancelable: false })
  };

  const renderTrashIcon = (props: IconProps) => (
    <Icon
        pack=""
        name="trash-2-outline"
        {...props}/>
  );

  const renderItemHeader = (headerProps: ViewProps, item: ListRenderItemInfo<NoteRecord>) => (
    <View {...headerProps}>
      <View style={styles.cardHeader}>
        <Text category="h6" style={styles.cardHeaderTitle}>
          {item.item.title}
        </Text>
        <Button onPress={() => deleteNote(item.item.id)} status="danger" accessoryLeft={renderTrashIcon} style={styles.deleteButton}/>
      </View>
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
          style={item.index === globalState.notes.length ? styles.lastItem : styles.item}
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
      <Toast ref={toast}/>
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
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  cardHeaderTitle: {
    maxWidth: "80%"
  },
  deleteButton: {
    height: 4
  }
});
