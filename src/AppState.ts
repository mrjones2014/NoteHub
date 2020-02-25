import directoryTree, { DirectoryTree } from 'directory-tree';

export interface IAppState {
    directory: DirectoryTree;
}

// TODO change this to a setting
const filesDir = 'C:\\Users\\mjone\\git\\notehub_content';

class AppStateClass implements IAppState {
    private _directory: DirectoryTree;

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
            path: filesDir,
            name: filesDir,
            size: 0,
            type: 'directory',
            children: null
        };
    }

    public async initialize(): Promise<void> {
        if (this._initialized) return;
        await this.scanDirectory();
        this._initialized = true;
    }

    private scanDirectory(dir: string = filesDir): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.directory = directoryTree(dir, {normalizePath: true});
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

const appStateSingleton = new AppStateClass();
appStateSingleton.initialize();

export const AppState = appStateSingleton;
