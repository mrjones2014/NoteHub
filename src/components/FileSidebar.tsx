import React from 'react';
import { Drawer, CircularProgress, IconButton, Divider } from '@material-ui/core';
import { CssClassProps } from '@modules/CssClassProp';
import TreeView from '@material-ui/lab/TreeView';
import useAppState from '../AppState';
import { DirectoryTreeRecord } from '../modules/DirectoryTreeRecord';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import { Comparators } from '@modules/Comparators';
import TreeItem from '@material-ui/lab/TreeItem';

export interface FileSidebarProps extends CssClassProps {
    open: boolean;
    onToggle: () => void;
}

const FileSidebar: React.FC<FileSidebarProps> = (props: FileSidebarProps) => {
    const [appState] = useAppState();

    const recursivelyRenderDir = (directory: DirectoryTreeRecord): JSX.Element => (
        <TreeItem
            key={directory.path}
            nodeId={directory.path}
            label={directory.name}
            collapseIcon={<FolderOpenIcon/>}
            expandIcon={<FolderIcon/>}
            icon={directory.type === "directory" ? null : <DescriptionIcon/>}>
            {
                directory.children?.sort(Comparators.DirectoryTree)?.map((dir: DirectoryTreeRecord) =>
                    <TreeItem
                        nodeId={dir.path}
                        label={dir.name}
                        collapseIcon={<FolderOpenIcon/>}
                        expandIcon={<FolderIcon/>}
                        icon={dir.type === "directory" ? null : <DescriptionIcon/>}
                        key={dir.path}>
                        {
                            dir.children?.map(recursivelyRenderDir)
                        }
                    </TreeItem>
                )
            }
        </TreeItem>
    );

    return (
        <div
            className={`c-file-sidebar ${props.cssClass ?? ''} ${appState.fileSidebarOpen ? "" : "-hidden"}`}>
            { !appState.initialized &&
                <CircularProgress/>
            }
            { appState.initialized &&
                <TreeView>
                    { recursivelyRenderDir(appState.directory) }
                </TreeView>
            }
        </div>
    );
};

export default FileSidebar;
