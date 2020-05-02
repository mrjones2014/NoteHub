import React from "react";
import { IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import useAppState from '../AppState';

const Sidebar: React.FC = () => {
    const [appState, setAppState] = useAppState();

    const toggleSidebar = () => setAppState(appState.with({ fileSidebarOpen: !appState.fileSidebarOpen }));

    return (
        <div className="c-sidebar">
            <IconButton onClick={toggleSidebar} title="Toggle File Tree">
                <FileCopyIcon/>
            </IconButton>
        </div>
    );
};

export default Sidebar;
