import {CurrentSession} from "./actionTypes";

export const loadState = () => {
    try {
        const serializedState: string | null = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.log('Err: ', err)
        return undefined;
    }
};

export const saveState = (state: CurrentSession) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};
