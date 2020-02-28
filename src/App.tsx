import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
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

export class App extends React.Component<{}, null> {
    constructor(props?: any) {
        super(props);
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
                        <FileSidebar/>
                    }
                </AppStateContext.Provider>
            </MuiThemeProvider>
        );
    }

    private onFolderSelected(): void {
        this.forceUpdate();
    }
}
