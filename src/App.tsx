import React, { useEffect , useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress, Tabs, AppBar, Tab } from '@material-ui/core';
import FileSidebar from '@components/FileSidebar';
import SplashPage from '@components/SplashPage';
import { AppState, AppStateContext } from './AppState';
import FileUtils from '@modules/FileUtils';
import Sidebar from '@components/Sidebar';
import Editor from '@components/Editor';
import { ToastContainer } from "react-toastify";
import * as Path from "path";

import './Global.scss';
import { DirectoryTreeRecord } from '@modules/DirectoryTreeRecord';

const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
});

const App: React.FC = () => {
    const [appState, setAppState] = useState(new AppState());

    const toggleSidebar = () => setAppState(appState.with({ fileSidebarOpen: !appState.fileSidebarOpen }));

    const [initialized, setInitialized] = useState(false);

    const initFromCookie = async () => {
        const folder = await FileUtils.getFolderFromCookie();
        setAppState(appState.with({
            initialized: true,
            directory: folder,
        }));
        setInitialized(true);
    };

    useEffect(() => {
        if (FileUtils.hasFolderCookie()) {
            initFromCookie();
        } else {
            setInitialized(true);
        }
    }, []); // empty dep array, run only once

    const getFileName = (path: string): string => Path.basename(path);

    const setActiveTab = (_: any, idx: number) => setAppState(appState.with({ activeTab: idx }));

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <AppStateContext.Provider value={[appState, setAppState]}>
                {
                    !initialized &&
                    <CircularProgress/>
                }
                {
                    !appState.initialized && initialized &&
                    <SplashPage/>
                }
                {
                    appState.initialized && initialized &&
                    <>
                        <Sidebar/>
                        <div className="c-app-content">
                            <FileSidebar open={appState.fileSidebarOpen} onToggle={toggleSidebar}/>
                            <div className="c-app-content__editor-area">
                                <div className="c-app-content__editor-area__tabs">
                                    <Tabs
                                        value={appState.activeTab}
                                        onChange={setActiveTab}
                                        variant="scrollable"
                                        scrollButtons="auto">
                                        {
                                            (appState.selectedFiles ?? []).map((d: DirectoryTreeRecord) =>
                                                <Tab label={getFileName(d.path)} key={d.path}/>
                                            )
                                        }
                                    </Tabs>
                                </div>
                                {
                                    (appState.selectedFiles ?? []).map((d: DirectoryTreeRecord, idx: number) =>
                                        <Editor key={d.path} filePath={d.path} cssClass={appState.activeTab !== idx ? "-hidden" : "-active"}/>
                                    )
                                }
                            </div>
                        </div>
                    </>
                }
                <ToastContainer
                    autoClose={3000}
                    position="bottom-right"
                    draggable={false}/>
            </AppStateContext.Provider>
        </MuiThemeProvider>
    );
};

export default App;
