import { createBrowserHistory } from 'history';
import React from "react";

export function pushToAddress(adress: string){
    return createBrowserHistory().push(adress);
}

export default createBrowserHistory();
