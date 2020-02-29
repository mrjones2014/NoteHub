import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { FileSidebar } from '@components/FileSidebar';
import { AppState, AppStateContext } from '@appstate';
import { SplashPage } from '@components/SplashPage';
import { ReactUtils } from '@modules/ReactUtils';
import { CookieManager, Cookies } from '@modules/Cookies';
import './Global.scss';

const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
});

interface LocalAppState {
    fileSidebarOpen: boolean;
}

export class App extends React.Component<{}, LocalAppState> {
    constructor(props?: any) {
        super(props);
        this.state = { fileSidebarOpen: true };
        ReactUtils.bindAll(this);
    }

    public async componentDidMount(): Promise<void> {
        const rootDirCookie = CookieManager.get(Cookies.RootDirPath);
        if (rootDirCookie != null && rootDirCookie != '' && rootDirCookie != 'null') {
            await AppState.initialize();
            this.onFolderSelected();
        }
    }

    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <AppStateContext.Provider value={AppState}>
                    {
                        !AppState.initialized &&
                        <SplashPage onFolderSelected={this.onFolderSelected}/>
                    }
                    {
                        AppState.initialized &&
                        <>
                            <AppBar position="sticky" color="default">
                                <Toolbar>
                                    <IconButton edge="start" onClick={this.toggleSidebar} title="Files">
                                        <MenuIcon/>
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <FileSidebar open={this.state.fileSidebarOpen} onToggle={this.toggleSidebar}/>
                        </>
                    }
                </AppStateContext.Provider>
            </MuiThemeProvider>
        );
    }

    private toggleSidebar(): void {
        this.setState({ fileSidebarOpen: !this.state.fileSidebarOpen });
    }

    private onFolderSelected(): void {
        this.forceUpdate();
    }
}
