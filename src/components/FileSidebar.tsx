import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { CssClassProps } from '@modules/CssClassProp';
import TreeView from '@material-ui/lab/TreeView';
import useAppState from '@appstate';
import { DirectoryTreeRecord } from '../modules/DirectoryTreeRecord';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import TreeItem from '@material-ui/lab/TreeItem';

export interface FileSidebarProps extends CssClassProps {
    open: boolean;
    onToggle: () => void;
}

const FileSidebar: React.FC<FileSidebarProps> = (props: FileSidebarProps) => {
    const [appState, setAppState] = useAppState();

    const openFile = (file: DirectoryTreeRecord) => {
        if (file.type === "file" && !appState.selectedFiles.some((f: DirectoryTreeRecord) => f.path === file.path)) {
            const newFilesArr = [...appState.selectedFiles, file];
            setAppState(appState.with({
                selectedFiles: newFilesArr,
                activeTab: newFilesArr.length - 1,
            }));
        }
    };

    const recursivelyRenderDir = (directory: DirectoryTreeRecord): JSX.Element => {
        const children = (directory.children ?? []).filter((d: DirectoryTreeRecord) => d.type === "directory")?.map((dir: DirectoryTreeRecord) =>
            <TreeItem
                nodeId={dir.path}
                label={dir.name}
                collapseIcon={<FolderOpenIcon/>}
                expandIcon={<FolderIcon/>}
                icon={dir.type === "directory" ? null : <DescriptionIcon/>}
                onClick={() => openFile(dir)}
                key={dir.path}>
                {
                    dir.children?.map(recursivelyRenderDir)
                }
            </TreeItem>
        ).concat(
            (directory.children ?? []).filter((d: DirectoryTreeRecord) => d.type === "file")?.map((dir: DirectoryTreeRecord) =>
                <TreeItem
                    nodeId={dir.path}
                    label={dir.name}
                    collapseIcon={<FolderOpenIcon/>}
                    expandIcon={<FolderIcon/>}
                    icon={dir.type === "directory" ? null : <DescriptionIcon/>}
                    onClick={() => openFile(dir)}
                    key={dir.path}>
                    {
                        dir.children?.map(recursivelyRenderDir)
                    }
                </TreeItem>
            )
        ).filter((e: React.ReactNode) => e != null);

        return (
            <TreeItem
                key={directory.path}
                nodeId={directory.path}
                label={directory.name}
                collapseIcon={<FolderOpenIcon/>}
                expandIcon={<FolderIcon/>}
                onClick={() => openFile(directory)}
                icon={directory.type === "directory" ? null : <DescriptionIcon/>}>
                { children }
            </TreeItem>
        );
    }

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
