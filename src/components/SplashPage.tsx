import React from 'react';
import { CssClassProps } from '@modules/CssClassProp';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import { ReactUtils } from '@modules/ReactUtils';
import { AppStateContext, AppStateClass } from '@appstate';
import './SplashPage.scss';

export interface SplashPageProps extends CssClassProps {
    onFolderSelected: () => void;
}

export class SplashPage extends React.Component<SplashPageProps> {
    constructor(props: SplashPageProps) {
        super(props);
        ReactUtils.bindAll(this);
    }

    public render(): JSX.Element {
        return (
            <AppStateContext.Consumer>
                {
                    (appState: AppStateClass) => appState && (
                        <div className="c-splash-page">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<FolderIcon/>}
                                onClick={() => this.selectFolder(appState)}>
                                Select Folder
                            </Button>
                        </div>
                    )
                }
            </AppStateContext.Consumer>
        );
    }

    private async selectFolder(appState: AppStateClass): Promise<void> {
        await appState.initialize();
        this.props.onFolderSelected();
    }
}