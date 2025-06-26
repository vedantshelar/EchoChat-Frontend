import { useContext } from "react";
import { GeneralContext } from "./generalContext";

function useGeneralContext(){
    const { refresh, setRefresh } = useContext(GeneralContext);
    return { refresh, setRefresh };
}

export default useGeneralContext;