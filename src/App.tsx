import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button, CssBaseline } from '@material-ui/core';
import { FileSidebar } from '@components/FileSidebar';

const theme = createMuiTheme({
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
});

export class App extends React.Component<{}, null> {
    constructor(props?: any) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <FileSidebar/>
                <Button>Hello World!</Button>
            </MuiThemeProvider>
        );
    }
}
