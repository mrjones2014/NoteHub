import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import { Button } from '@material-ui/core';
import useAppState from '../AppState';
import FileUtils from '@modules/FileUtils';

const SplashPage: React.FC = () => {
    const [appState, setAppState] = useAppState();

    const selectFolder = async () => {
        try {
            const tree = await FileUtils.askForFolder();
            setAppState(appState.with({
                directory: tree,
                initialized: true,
            }));
        } catch (e) {
            // TODO react-toastify
        }
    };

    return (
        <div className="c-splash-page">
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FolderIcon/>}
                onClick={selectFolder}>
                Select Folder
            </Button>
        </div>
    );
};

export default SplashPage;
