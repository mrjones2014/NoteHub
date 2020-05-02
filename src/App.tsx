import React, { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton, CircularProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FileSidebar from '@components/FileSidebar';
import SplashPage from '@components/SplashPage';
import './Global.scss';
import { useState } from 'react';
import { AppState, AppStateContext } from './AppState';
import FileUtils from '@modules/FileUtils';
import Sidebar from '@components/Sidebar';

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
                        </div>
                    </>
                }
            </AppStateContext.Provider>
        </MuiThemeProvider>
    );
};

export default App;
