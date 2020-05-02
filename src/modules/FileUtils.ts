import { CookieManager, Cookies } from '@modules/Cookies';
import { DirectoryTreeRecord } from '@modules/DirectoryTreeRecord';
import directoryTree from 'directory-tree';
const { dialog } = require('electron').remote;

const hasFolderCookie = (): boolean => {
    const cookie = CookieManager.get(Cookies.RootDirPath);
    return cookie != null && cookie !== "";
};

const getFolderFromCookie = async (): Promise<DirectoryTreeRecord> => {
    const cookie = CookieManager.get(Cookies.RootDirPath);
    if (cookie == null || cookie === "") {
        return null;
    }
    return new DirectoryTreeRecord(directoryTree(cookie, {normalizePath: true}));
};

const askForFolder = async (): Promise<DirectoryTreeRecord> => {
    const selection = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (selection.filePaths == null || selection.filePaths.length === 0) {
        return;
    }

    const path = selection.filePaths[0];
    CookieManager.set(Cookies.RootDirPath, path);
    return new DirectoryTreeRecord(directoryTree(path, {normalizePath: true}));
}

const FileUtils = {
    askForFolder,
    getFolderFromCookie,
    hasFolderCookie,
};

export default FileUtils;
