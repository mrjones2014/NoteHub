import { createContext, Dispatch, SetStateAction, useContext } from "react";
import GlobalStateRecord from "../../models/global-state-record";

export type GlobalStateUpdater = Dispatch<SetStateAction<GlobalStateRecord>>;

const defaultState = new GlobalStateRecord();
const defaultUpdater: GlobalStateUpdater = () => {};
const GlobalStateContext = createContext([defaultState, defaultUpdater]);

export function useGlobalState() {
  const [globalState, setGlobalState] = useContext(GlobalStateContext);

  return {
    globalState: globalState as GlobalStateRecord,
    setGlobalState: setGlobalState as GlobalStateUpdater,
  };
}

export default GlobalStateContext;
