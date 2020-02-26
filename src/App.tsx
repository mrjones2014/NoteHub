import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { FileSidebar } from '@components/FileSidebar';
import { AppState } from '@appstate';

const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
});

export class App extends React.Component<{}, null> {
    constructor(props?: any) {
        super(props);
    }

    public async componentDidMount(): Promise<void> {
        await AppState.initialize();
        this.forceUpdate();
    }

    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                {
                    AppState.initialized &&
                    <FileSidebar/>
                }
            </MuiThemeProvider>
        );
    }
}
