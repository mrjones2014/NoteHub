import directoryTree, { DirectoryTree } from 'directory-tree';
const { dialog } = require('electron').remote;
import { CookieManager, Cookies } from '@modules/Cookies';
import React from 'react';

export interface IAppState {
    directory: DirectoryTree;
    initialized: boolean;
    initialize: () => void;
}

export class AppStateClass implements IAppState {
    private _directory: DirectoryTree;
    private _rootDir: string;

    public get directory(): DirectoryTree {
        return JSON.parse(JSON.stringify(this._directory)); // return deep copy
    }

    public set directory(value: DirectoryTree) {
        this._directory = value;
    }

    private _initialized: boolean = false;
    public get initialized(): boolean {
        return this._initialized;
    }

    constructor() {
        this._initialized = false;
        this.directory = {
            path: '',
            name: '',
            size: 0,
            type: 'directory',
            children: null
        };
    }

    public async initialize(): Promise<void> {
        if (this._initialized) return;
        if (this._rootDir == null || this._rootDir == '') {
            await this.determineRootDir();
            if (this._rootDir == null || this._rootDir == '') {
                return;
            }
        }
        await this.scanDirectory();
        this._initialized = true;
    }

    private async determineRootDir(): Promise<void> {
        const cookie = CookieManager.get(Cookies.RootDirPath);
        if (cookie == null || cookie == '') {
            return await this.askForFolder();
        }
        this._rootDir = cookie;
    }

    private async askForFolder(): Promise<void> {
        const selection = await dialog.showOpenDialog({ properties: [ 'openDirectory' ]});
        if (selection.filePaths == null || selection.filePaths.length === 0) {
            return;
        }

        this._rootDir = selection.filePaths[0];
        CookieManager.set(Cookies.RootDirPath, this._rootDir);
    }

    private scanDirectory(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.directory = directoryTree(this._rootDir, {normalizePath: true});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

const appStateSingleton = new AppStateClass();

export const AppState = appStateSingleton;
export const AppStateContext = React.createContext(AppState);
