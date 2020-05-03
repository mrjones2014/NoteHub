import { Record } from "immutable";
import { DirectoryTreeRecord } from '@modules/DirectoryTreeRecord';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface AppStateInterface {
    fileSidebarOpen: boolean;
    directory: DirectoryTreeRecord;
    initialized: boolean;
    selectedFile: DirectoryTreeRecord;
}

const defaultValues: AppStateInterface = {
    fileSidebarOpen: true,
    directory: null,
    initialized: false,
    selectedFile: null,
};

export class AppState extends Record(defaultValues) implements AppStateInterface {
    constructor(params?: AppStateInterface) {
        if (params == null) {
            params = Object.assign({}, defaultValues);
        }

        params.directory = new DirectoryTreeRecord(params.directory);
        params.selectedFile = new DirectoryTreeRecord(params.selectedFile);

        super(params);
    }

    public with(values: Partial<AppStateInterface>): AppState {
        return new AppState(Object.assign(this.toJS(), values));
    }
}

export type AppStateUpdater = Dispatch<SetStateAction<AppState>>;

const defaultState = new AppState();
const defaultUpdater: AppStateUpdater = () => {};
export const AppStateContext = createContext([defaultState, defaultUpdater]);

const useAppState = (): [AppState, AppStateUpdater] => {
    const [appState, setAppState] = useContext(AppStateContext);

    return [appState as AppState, setAppState as AppStateUpdater];
};

export default useAppState;
