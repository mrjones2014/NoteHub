import React from 'react';
import { Drawer, CircularProgress } from '@material-ui/core';
import { CssClassProps } from '@modules/CssClassProp';
import { AppState } from '@appstate';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { DirectoryTree } from 'directory-tree';
import './file-sidebar.scss';

export class FileSidebar extends React.Component<CssClassProps, null> {
    constructor(props?: any) {
        super(props);
    }

    public async componentDidMount() {
        await AppState.initialize();
        console.log(AppState.initialized);
        this.forceUpdate();
    }

    public render(): JSX.Element {
        return (
            <Drawer open={true} className={`c-file-sidebar ${this.props.cssClass || ''}`}>
                { !AppState.initialized &&
                    <CircularProgress/>
                }
                { AppState.initialized &&
                    <TreeView>
                        { this.recursivelyRenderDir(AppState.directory) }
                    </TreeView>
                }
            </Drawer>
        );
    }

    private recursivelyRenderDir(directory: DirectoryTree): JSX.Element {
        return (
            <TreeItem nodeId={directory.path} label={directory.name}>
                {
                    directory.children?.map((dir: DirectoryTree) =>
                        <TreeItem nodeId={dir.path} label={dir.name}>
                            {
                                dir.children?.map(this.recursivelyRenderDir)
                            }
                        </TreeItem>
                    )
                }
            </TreeItem>
        );
    }
}
