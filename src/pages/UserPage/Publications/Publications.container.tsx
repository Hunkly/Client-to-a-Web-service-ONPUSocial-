import React from 'react';
import UserPost from '../../../shared/models/Post';
import PublicationItem from '../../../shared/components/PublicationItem';
import PageLabel from "../../../shared/components/PageLabel";
import axios from 'axios';
import {CurrentSession} from "../../../store/currentSession/actionTypes";
import {saveState} from "../../../store/localStorage";
import Store from "../../../store/store";
import Publications from "./Publications.component";
// import {PostData} from "./Publications.constants";

// interface IPublicationProps {
//     data?: {
//         name_post: string,
//         content: string,
//         user: string,
//         date: number,
//     };
// }

interface IPublicationsContainerState {
    //isLoading: boolean;
    posts: UserPost[];
}

let list: CurrentSession = JSON.parse(localStorage.getItem('state') || '{}');
console.log(list);
saveState(list);
console.log('Store ', Store.getState());

export default class PublicationsContainer extends React.PureComponent<{},
    IPublicationsContainerState
    > {
    public state = {
        //isLoading: false,
        posts: []
    };

    public componentDidMount(): void {
        //this.setState({ isLoading: true });
        axios
            .get(`http://localhost:9005/posts/user/${list.account.login}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    //isLoading: false,
                    posts: res.data.content
                });
            })
    }

    public render() {
        return (
            <div>
                <Publications posts={this.state.posts}/>
            </div>
        );
    }
}
