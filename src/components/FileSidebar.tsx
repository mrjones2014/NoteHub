import React from 'react';
import { Drawer, CircularProgress } from '@material-ui/core';
import { CssClassProps } from '@modules/CssClassProp';
import { AppState } from '@appstate';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { DirectoryTree } from 'directory-tree';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionIcon from '@material-ui/icons/Description';
import './FileSidebar.scss';

export class FileSidebar extends React.Component<CssClassProps, null> {
    constructor(props?: any) {
        super(props);
    }

    public async componentDidMount() {
        await AppState.initialize();
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
            <TreeItem
                nodeId={directory.path}
                label={directory.name}
                collapseIcon={<ExpandMoreIcon/>}
                expandIcon={<ChevronRightIcon/>}
                icon={directory.type === "directory" ? <ChevronRightIcon/> : <DescriptionIcon/>}>
                {
                    directory.children?.map((dir: DirectoryTree) =>
                        <TreeItem
                            nodeId={dir.path}
                            label={dir.name}
                            collapseIcon={<ExpandMoreIcon/>}
                            expandIcon={<ChevronRightIcon/>}
                            icon={dir.type === "directory" ? <ChevronRightIcon/> : <DescriptionIcon/>}
                            key={dir.path}>
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
