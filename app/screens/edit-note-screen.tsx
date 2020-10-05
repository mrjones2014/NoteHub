import { StackScreenProps } from "@react-navigation/stack";
import Toast from "@rimiti/react-native-toastify";
import { Button, Divider, Input, Layout, Tab, TabView } from "@ui-kitten/components";
import { CollectionUtils, StringUtils } from "andculturecode-javascript-core";
import React, { useRef, useState } from "react";
import { Keyboard, LayoutChangeEvent, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "../components/markdown";
import NoteRecord from "../models/note-record";
import { PrimaryParamList } from "../navigation";
import Styles from "../styles";
import { useGlobalState } from "../utils/hooks/use-global-state";
import useKeyboardState from "../utils/hooks/use-keyboard-state";

export const EditNoteScreen = function EditNoteScreen(props: StackScreenProps<PrimaryParamList, "editNote">) {
    const { globalState, setGlobalState } = useGlobalState();
    const noteId = props.route.params?.id;

    const [note, setNote] = useState<NoteRecord>(() => {
        if (StringUtils.isEmpty(noteId)) {
            return new NoteRecord();
        }

        const note = globalState.notes.find((n: NoteRecord) => n.id === noteId) ?? new NoteRecord();
        return note;
    });

    const [viewHeight, setViewHeight] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);

    const toast = useRef<Toast>();

    const { keyboardOpen, keyboardHeight } = useKeyboardState();

    const handleTitleChange = (title: string) => setNote(note.with({ title }));
    const handleContentChange = (content: string) => setNote(note.with({ content }));

    const handleTabChanged = (newTabIndex: number) => {
        setTabIndex(newTabIndex);
        Keyboard.dismiss();
    };

    const handleSave = async () => {
        Keyboard.dismiss();

        // validate
        if (StringUtils.isEmpty(note.title)) {
            toast.current.show("Title is required.", 2000);
            return;
        }

        // returns existing ID if editing existing note
        const noteWithId = note.withGeneratedId();
        const idx = globalState.notes.findIndex((n: NoteRecord) => n.id === noteWithId.id);
        if (idx >= 0) {
            const newGlobalState = globalState.with({
                notes: CollectionUtils.replaceElementAt(
                    globalState.notes,
                    idx,
                    noteWithId
                )
            });
            setGlobalState(newGlobalState);
            const saveSuccess = await newGlobalState.persistToStorage();
            if (!saveSuccess) {
                toast.current.show("Failed to save note.");
                return;
            }
            props.navigation.replace("viewNote", { id: noteWithId.id });
            return;
        }

        const newGlobalState = globalState.addNewNote(noteWithId);
        setGlobalState(newGlobalState);
        const saveSuccess = await newGlobalState.persistToStorage();
        if (!saveSuccess) {
            toast.current.show("Failed to save note.");
            return;
        }
        props.navigation.replace("viewNote", { id: noteWithId.id });
    };

    const editorStyle = keyboardOpen ?
        {
            maxHeight: viewHeight - keyboardHeight - 220,
            height: viewHeight - keyboardHeight - 220,
            minHeight: viewHeight - keyboardHeight - 220,
        } :
        {
            maxHeight: "84%",
            minHeight: "84%",
        }

    return (
        <Layout
            style={styles.mainView}
            onLayout={(e: LayoutChangeEvent) => setViewHeight(e.nativeEvent.layout.height)}
        >
            <SafeAreaView style={styles.scrollable}>
                <TabView selectedIndex={tabIndex} onSelect={handleTabChanged} style={styles.tabView}>
                    <Tab title="Edit">
                    <Layout style={styles.tabContainer}>
                        <Input
                            style={styles.titleInput}
                            value={note.title}
                            onChangeText={handleTitleChange}
                            placeholder="Note title..."
                        />
                        <Divider style={styles.divider}/>
                        <Input
                            multiline={true}
                            value={note.content}
                            onChangeText={handleContentChange}
                            style={editorStyle}
                            textStyle={{minHeight: "100%"}}
                            placeholder="Note contents..."
                        />
                        <Button onPress={handleSave} style={styles.saveButton}>Save</Button>
                    </Layout>
                    </Tab>
                    <Tab title="Preview">
                        <Layout style={styles.previewTabContainer}>
                            <ScrollView>
                                <Markdown>
                                    {note.content}
                                </Markdown>
                            </ScrollView>
                            <Button onPress={handleSave} style={styles.saveButton}>Save</Button>
                        </Layout>
                    </Tab>
                </TabView>
            </SafeAreaView>
            <Toast ref={toast}/>
        </Layout>
    );
};

const styles = StyleSheet.create<Styles>({
    tabView: {
        // flex: 1,
        maxHeight: "100%",
        height: "100%",
    },
    mainView: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    },
    tabContainer: {
        paddingTop: 15,
    },
    previewTabContainer: {
        paddingTop: 15,
        maxHeight: "84%",
    },
    saveButton: {
        marginTop: 5,
    },
});
