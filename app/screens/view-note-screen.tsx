import { StackScreenProps } from "@react-navigation/stack";
import { Button, Divider, Icon, IconProps, Layout, Text } from "@ui-kitten/components";
import { StringUtils } from "andculturecode-javascript-core";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "../components/markdown";
import NoteRecord from "../models/note-record";
import { PrimaryParamList } from "../navigation";
import Styles from "../styles";
import { useGlobalState } from "../utils/hooks/use-global-state";

export const ViewNoteScreen = function ViewNoteScreen(props: StackScreenProps<PrimaryParamList, "viewNote">) {
    const { globalState } = useGlobalState();
    const noteId = props.route.params?.id;

    const note = StringUtils.isEmpty(noteId) ? undefined : globalState.notes.find((n: NoteRecord) => n.id === noteId);

    const navigateToNote = () => props.navigation.replace("editNote", { id: note.id });

    const renderPencilIcon = (props: IconProps) => (
        <Icon
            pack=""
            name="edit-2-outline"
            {...props}/>
    );

    if (note == null) {
        return (
            <Layout style={styles.mainView}>
                <Text category="h1">No note selected.</Text>
            </Layout>
        );
    }

    return (
        <Layout style={styles.mainView}>
            <SafeAreaView style={styles.scrollable}>
                <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text category="h1" style={styles.title}>{note.title}</Text>
                        <Button
                            accessoryLeft={renderPencilIcon}
                            onPress={navigateToNote}
                            style={styles.editButton}
                        />
                    </View>
                    <Divider style={styles.divider}/>
                    <Markdown>{note.content}</Markdown>
                </ScrollView>
            </SafeAreaView>
        </Layout>
    );
};

const styles = StyleSheet.create<Styles>({
    mainView: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        maxWidth: 300,
    },
    editButton: {
        maxHeight: 32,
    },
    scrollable: {
        overflow: "scroll",
        paddingBottom: 15,
    },
    divider: {
        marginBottom: 10,
    }
});
