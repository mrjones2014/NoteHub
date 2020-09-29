import { StackScreenProps } from "@react-navigation/stack";
import { Divider, Input, Layout } from "@ui-kitten/components";
import { FlexStyleProps } from "@ui-kitten/components/devsupport";
import { StringUtils } from "andculturecode-javascript-core";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "../components/markdown";
import NoteRecord from "../models/note-record";
import { PrimaryParamList } from "../navigation";
import Styles from "../styles";
import { useGlobalState } from "../utils/hooks/use-global-state";

export const EditNoteScreen = function EditNoteScreen(props: StackScreenProps<PrimaryParamList, "editNote">) {
    const { globalState } = useGlobalState();
    const noteId = props.route.params?.id;

    const [note, setNote] = useState<NoteRecord>(() => {
        if (StringUtils.isEmpty(noteId)) {
            return undefined;
        }

        const note = globalState.notes.find((n: NoteRecord) => n.id === noteId) ?? new NoteRecord();
        return note;
    });

    const handleTitleChange = (title: string) => setNote(note.with({ title }));
    const handleContentChange = (content: string) => setNote(note.with({ content }));

    return (
        <Layout style={styles.mainView}>
            <SafeAreaView style={styles.scrollable}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <ScrollView>
                        <Input
                            style={styles.titleInput}
                            value={note.title}
                            onChangeText={handleTitleChange}
                        />
                        <Divider style={styles.divider}/>
                        <Input
                            multiline={true}
                            value={note.content}
                            onChangeText={handleContentChange}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
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
    keyboardAvoidingView: {
        display: "flex",
    },
    titleInput: {
        alignSelf: "stretch",
    },
    scrollable: {
        overflow: "scroll",
        paddingBottom: 15,
    },
    divider: {
        marginBottom: 10,
    }
});
