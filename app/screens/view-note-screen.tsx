import { StackScreenProps } from "@react-navigation/stack";
import { Card, Divider, Layout, Text } from "@ui-kitten/components";
import { StringUtils } from "andculturecode-javascript-core";
import React, { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "../components/markdown";
import NoteRecord from "../models/note-record";
import { PrimaryParamList } from "../navigation";
import Styles from "../styles";
import { useGlobalState } from "../utils/hooks/use-global-state";

export const ViewNoteScreen = function ViewNoteScreen(props: StackScreenProps<PrimaryParamList, "viewNote">) {
    const { globalState } = useGlobalState();
    const noteId = props.route.params?.id;
    
    const note = useMemo(() => {
        if (StringUtils.isEmpty(noteId)) {
            return undefined;
        }

        const note = globalState.notes.find((n: NoteRecord) => n.id === noteId);
        return note;
    }, [noteId]);

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
                <Text category="h1">{note.title}</Text>
                <Divider style={styles.divider}/>
                <Markdown>{note.content}</Markdown>
            </SafeAreaView>
        </Layout>
    );
};

const styles = StyleSheet.create<Styles>({
    mainView: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: "scroll",
    },
    scrollable: {
        overflow: "scroll"
    },
    divider: {
        marginBottom: 10,
    }
});
