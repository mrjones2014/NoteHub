import React, { useEffect } from "react";
import * as Showdown from "showdown";
import { useState } from 'react';
import ReactMde from "react-mde";
import { CircularProgress, Button } from '@material-ui/core';
import { toast } from "react-toastify";
import FileUtils from '@modules/FileUtils';
import { CssClassProps } from '@modules/CssClassProp';
import SettingsManager from '@modules/SettingsManager';
import useDebouce from '@modules/hooks/UseDebounce';

const renderer = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
});
renderer.setFlavor("github");

export interface EditorProps extends CssClassProps {
    filePath: string;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
    const settingsPath = SettingsManager.filePath.split("\\").join("/"); // normalize path
    const isSettingsFile = props.filePath === settingsPath;

    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const debouncedValue = useDebouce(value);
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
         isSettingsFile ? "write" : "preview"
    );

    useEffect(() => FileUtils.getFileContents(
        props.filePath,
        (data: string) => {
            if (isSettingsFile) {
                data = JSON.stringify(JSON.parse(data), null, 4); // pretty print json
            }
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
        () => {},
        (err) => {
            toast.error("Failed to save file. Change the file contents to re-trigger autosave");
            console.error(err);
        }
    );

    // autosave
    useEffect(() => {
        if (loading === false) {
            save();
        }
    }, [debouncedValue, loading]);

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <div className={`c-editor ${props.cssClass ?? ""} ${isSettingsFile ? "-settings-editor" : ""}`}>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={render}
            />
        </div>
    );
};

export default Editor;
