import './Global.scss';
import React, { useEffect , useState } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress, Tabs, AppBar, Tab, IconButton } from '@material-ui/core';
import FileSidebar from '@components/FileSidebar';
import SplashPage from '@components/SplashPage';
import { AppState, AppStateContext } from './AppState';
import FileUtils from '@modules/FileUtils';
import Sidebar from '@components/Sidebar';
import Editor from '@components/Editor';
import { ToastContainer } from "react-toastify";
import * as Path from "path";
import { DirectoryTreeRecord } from '@modules/DirectoryTreeRecord';
import SettingsManager from '@modules/SettingsManager';
import PersonalAccessTokenSetup from '@components/PersonalAccessTokenSetup';
import CloseIcon from '@material-ui/icons/Close';

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
        setAppState(appState.with({ githubPersonalAccessToken: SettingsManager.githubPersonalAccessToken }));

        if (FileUtils.hasFolderCookie()) {
            initFromCookie();
        } else {
            setInitialized(true);
        }
    }, []); // empty dep array, run only once

    const getFileName = (path: string): string => Path.basename(path);

    const setActiveTab = (_: any, idx: number) => setAppState(appState.with({ activeTab: idx }));

    const closeEditor = (index: number) => {
        console.log(appState.selectedFiles);
        const newEditors = [...appState.selectedFiles].splice(index, 1);
        console.log(newEditors);
        console.log(newEditors.length);
        const newAppState = appState.with({
            selectedFiles: newEditors,
            activeTab: newEditors.length - 1
        });
        console.log(newAppState.toJS());
        setAppState(newAppState);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <AppStateContext.Provider value={[appState, setAppState]}>
                {
                    !initialized &&
                    <CircularProgress/>
                }
                {
                    !appState.initialized && initialized && appState.githubPersonalAccessToken == null &&
                    <PersonalAccessTokenSetup/>
                }
                {
                    !appState.initialized && initialized && appState.githubPersonalAccessToken != null &&
                    <SplashPage/>
                }
                {
                    appState.initialized && initialized && appState.githubPersonalAccessToken != null &&
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
                                            (appState.selectedFiles ?? []).map((d: DirectoryTreeRecord, idx: number) =>
                                                <Tab
                                                    label={
                                                        <div className="c-editor-label">
                                                            {getFileName(d.path)}
                                                            <CloseIcon onClick={() => closeEditor(idx)}/>
                                                        </div>
                                                    }
                                                    key={d.path}/>
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
