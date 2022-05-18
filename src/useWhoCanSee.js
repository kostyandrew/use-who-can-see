import { useEffect } from "react";
import axios from "axios";
const useWhoCanSee = (requestArgs, fetcher = defaultFetcher) => {
    const id = typeof requestArgs === 'object' ? JSON.stringify(requestArgs) : requestArgs.toString();

    useEffect(() => {
        return () => {
            delete activeHandlers[id];
        }
    }, []);

    if (activeHandlers[id] == null) {
        const promise = fetcher(requestArgs);
        promise.then((data) =>  {
            activeHandlers[id].data = data;
            activeHandlers[id].state = 'resolved';
        }).catch((error) => {
            activeHandlers[id].data = error;
            activeHandlers[id].state = 'rejected';
        });
        activeHandlers[id] = {promise, state: 'loading', data: null};
    }

    if(activeHandlers[id].state === 'resolved') {
        return activeHandlers[id].data;
    } else if (activeHandlers[id].state === 'rejected') {
        throw activeHandlers[id].data;
    } else {
        throw activeHandlers[id].promise;
    }
}
const defaultFetcher = async (fetchArguments) => {
    const response = await axios.get(fetchArguments);
    return response.data;
}
const activeHandlers = {};

export default useWhoCanSee;