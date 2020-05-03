import { CookieManager, Cookies } from '@modules/Cookies';
import { DirectoryTreeRecord } from '@modules/DirectoryTreeRecord';
import directoryTree from 'directory-tree';
import * as FileSystem from "fs";
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
};

const getFileContents = (path: string, onSuccess: (data: string) => void, onError: (error: any) => void) => {
    try {
        FileSystem.readFile(path, { encoding: "utf-8" }, (err, data) => {

            if (err) {
                onError(err);
                return;
            }

            onSuccess(data);
        });
    } catch (e) {
        onError(e);
    }
};

const saveFile = (path: string, value: string, onSuccess: () => void, onError: (err: any) => void) => {
    try {
        FileSystem.writeFile(path, value, { encoding: "utf-8" }, (err) => {
            if (err) {
                onError(err);
                return;
            }

            onSuccess();
        });
    } catch (e) {
        onError(e);
    }
};

const FileUtils = {
    askForFolder,
    getFolderFromCookie,
    hasFolderCookie,
    getFileContents,
    saveFile,
};

export default FileUtils;
