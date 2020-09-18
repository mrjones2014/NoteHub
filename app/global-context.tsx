import React, { PropsWithChildren, useEffect, useState } from "react";
import GlobalStateRecord from "./models/global-state-record";
import GlobalStateContext from "./utils/hooks/use-global-state";

const GlobalContext: React.FC = (props: PropsWithChildren<{}>) => {
    const [globalState, setGlobalState] = useState(new GlobalStateRecord());

    useEffect(() => {
        setGlobalState(globalState.refreshFromStorage());
    }, []);

    return (
        <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalContext;
