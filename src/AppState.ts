import { Record } from "immutable";
import { DirectoryTreeRecord } from './modules/DirectoryTreeRecord';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface IAppState {
    fileSidebarOpen: boolean;
    directory: DirectoryTreeRecord;
    initialized: boolean;
}

const defaultValues: IAppState = {
    fileSidebarOpen: true,
    directory: null,
    initialized: false
};

export class AppState extends Record(defaultValues) implements IAppState {
    constructor(params?: IAppState) {
        if (params == null) {
            params = Object.assign({}, defaultValues);
        }

        params.directory = new DirectoryTreeRecord(params.directory);

        super(params);
    }

    public with(values: Partial<IAppState>): AppState {
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
