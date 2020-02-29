import React from 'react';
import { Drawer, CircularProgress, IconButton, Divider } from '@material-ui/core';
import { CssClassProps } from '@modules/CssClassProp';
import { AppState } from '@appstate';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { DirectoryTree } from 'directory-tree';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DescriptionIcon from '@material-ui/icons/Description';
import { ReactUtils } from '@modules/ReactUtils';
import './FileSidebar.scss';
import { Comparators } from '@modules/Comparators';

export interface FileSidebarProps extends CssClassProps {
    open: boolean;
    onToggle: () => void;
}

export class FileSidebar extends React.Component<FileSidebarProps> {
    constructor(props: FileSidebarProps) {
        super(props);
        ReactUtils.bindAll(this);
    }

    public async componentDidMount() {
        await AppState.initialize();
        this.forceUpdate();
    }

    public render(): JSX.Element {
        return (
            <Drawer
                open={this.props.open}
                variant="persistent"
                anchor="left"
                className={`c-file-sidebar ${this.props.cssClass || ''}`}>
                { !AppState.initialized &&
                    <CircularProgress/>
                }
                { AppState.initialized &&
                    <>
                        <div className="c-file-sidebar__drawer-header">
                            <IconButton onClick={this.props.onToggle} title="Collapse">
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <TreeView>
                            { this.recursivelyRenderDir(AppState.directory) }
                        </TreeView>
                    </>
                }
            </Drawer>
        );
    }

    private recursivelyRenderDir(directory: DirectoryTree): JSX.Element {
        return (
            <TreeItem
                nodeId={directory.path}
                label={directory.name}
                collapseIcon={<FolderOpenIcon/>}
                expandIcon={<FolderIcon/>}
                icon={directory.type === "directory" ? null : <DescriptionIcon/>}>
                {
                    directory.children?.sort(Comparators.DirectoryTree)?.map((dir: DirectoryTree) =>
                        <TreeItem
                            nodeId={dir.path}
                            label={dir.name}
                            collapseIcon={<FolderOpenIcon/>}
                            expandIcon={<FolderIcon/>}
                            icon={dir.type === "directory" ? null : <DescriptionIcon/>}
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
