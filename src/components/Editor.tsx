import React, { useEffect } from "react";
import * as Showdown from "showdown";
import { useState } from 'react';
import ReactMde from "react-mde";
import { CircularProgress, Button } from '@material-ui/core';
import { toast } from "react-toastify";
import FileUtils from '@modules/FileUtils';

const renderer = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
});
renderer.setFlavor("github");

export interface EditorProps {
    filePath: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("preview");

    useEffect(() => FileUtils.getFileContents(
        props.filePath,
        (data: string) => {
            setValue(data);
            setLoading(false);
        },
        (err) => {
            console.error(err);
            toast.error("Failed to read file contents. Please re-open the file.");
            setLoading(false);
        }
    ), []); // empty deps array, run once on mount

    const render = (markdown: string) => Promise.resolve(renderer.makeHtml(markdown));
    const save = () => FileUtils.saveFile(
        props.filePath,
        value,
        () => {
            toast.success("File saved successfully.");
            setSelectedTab("preview");
        },
        (err) => {
            toast.error("Failed to save file. Please try again.");
            console.error(err);
        }
    );

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <div className="c-editor">
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={render}
            />
            <Button
                variant="contained"
                className="c-editor__save-btn"
                size="small"
                onClick={save}>
                Save
            </Button>
        </div>
    );
};

export default Editor;
