import React, { PropsWithChildren, useEffect, useState } from "react";
import GlobalStateRecord from "./models/global-state-record";
import GlobalStateContext from "./utils/hooks/use-global-state";
import { Do } from "andculturecode-javascript-core";

const GlobalContext: React.FC = (props: PropsWithChildren<{}>) => {
    const [globalState, setGlobalState] = useState(new GlobalStateRecord());

    useEffect(() => {
        Do.try(
            async () => setGlobalState(
                (await globalState.refreshFromStorage()) ?? new GlobalStateRecord()
            )
        );
    }, []);

    return (
        <GlobalStateContext.Provider value={[globalState, setGlobalState]}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalContext;
