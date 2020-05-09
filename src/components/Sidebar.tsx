import React from "react";
import { IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';
import useAppState from '@appstate';
import FileUtils from '@modules/FileUtils';

const Sidebar: React.FC = () => {
    const [appState, setAppState] = useAppState();

    const toggleSidebar = () => setAppState(appState.with({ fileSidebarOpen: !appState.fileSidebarOpen }));

    const openSettings = () => {
        const newFilesArr = [...appState.selectedFiles, FileUtils.openSettingsFile()];
        setAppState(appState.with({
            selectedFiles: newFilesArr,
            activeTab: newFilesArr.length - 1,
        }));
    };

    return (
        <div className="c-sidebar">
            <IconButton onClick={toggleSidebar} title="Toggle File Tree">
                <FileCopyIcon/>
            </IconButton>
            <IconButton onClick={openSettings} title="Open Settings File">
                <SettingsIcon/>
            </IconButton>
        </div>
    );
};

export default Sidebar;
