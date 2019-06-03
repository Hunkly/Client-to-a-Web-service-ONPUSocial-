import React from 'react';
import UserModel from '../../shared/models/User';
import UserGroup from '../../shared/models/Group';
import { match } from 'react-router-dom';
import UserPage from './UserPage.component';

interface IUserPageContainerProps {
    match: match<{ id: string }>;
    // theme: ITheme
}

interface IUserPageContainerState {
    isLoading: boolean;
    user: UserModel | null;
    group: UserGroup | null;
}

export default class UserPageContainer extends React.PureComponent<
    IUserPageContainerProps,
    IUserPageContainerState
    > {
    public state = {
        isLoading: false,
        user: null,
        group: null,
    };

    public componentDidMount(): void {
        this.setState({ isLoading: true });
        const ID = this.props.match.params.id;
        fetch(`http://localhost:9005/users/`+ID)
            .then(resp => resp.json())
            .then((data: UserModel) => {
                if (data.id) {
                    this.setState({
                        isLoading: false,
                        user: data
                    });
                }
            })
    }

    public render() {
        return (
            // <ThemeProvider theme={this.props.theme}>
            <UserPage user={this.state.user} />
            //  </ThemeProvider>
        );
    }
}
