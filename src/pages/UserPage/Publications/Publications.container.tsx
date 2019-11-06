import React from 'react';
import UserPost from '../../../shared/models/Post';
import PublicationItem from '../../../shared/components/PublicationItem';
import PageLabel from "../../../shared/components/PageLabel";
import {PostData} from "./Publications.constants";

// interface IPublicationProps {
//     data?: {
//         name_post: string,
//         content: string,
//         user: string,
//         date: number,
//     };
// }

interface IPublicationsContainerState {
    isLoading: boolean;
    posts: UserPost | null;
}

export default class PublicationsContainer extends React.PureComponent<{},
    IPublicationsContainerState
    > {
    public state = {
        isLoading: false,
        posts: null
    };

    public componentDidMount(): void {
        this.setState({ isLoading: true });
        fetch(`http://localhost:9005/posts/1`)
            .then(resp => resp.json())
            .then((data: UserPost) => {
                if (data.content) {
                    this.setState({
                        isLoading: false,
                        posts: data
                    });
                }
            })
    }

    public render() {
        return (
            <div>
               {/*// <Publications posts={this.state.posts} />*/}
                <PageLabel> Publications </PageLabel>
                {PostData.map(({ name_post, user, content, date }) => (
                    <PublicationItem user={user} name_post={name_post} date={date} content={content}/>))}
            </div>
        );
    }
}
