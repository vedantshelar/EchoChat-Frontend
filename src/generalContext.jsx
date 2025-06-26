import { createContext, useState } from "react";

const GeneralContext = createContext();

function GeneralProvider({ children }) {
    let [refresh, setRefresh] = useState(false);

    return (
        <GeneralContext.Provider value={{ refresh, setRefresh }}>
            {children}
        </GeneralContext.Provider>
    )
}

export { GeneralContext, GeneralProvider };