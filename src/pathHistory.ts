import { createBrowserHistory } from 'history';

export function pushToAddress(adress: string){
    return createBrowserHistory().push(adress);
}

export default createBrowserHistory();
