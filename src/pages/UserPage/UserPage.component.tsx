import React from 'react';
import UserModel from '../../shared/models/User';
import StyledUserPage from './UserPage.styled';
import { PersonalInformation } from './PersonalInformation/PersonalInformation.component';
import ProfileMenu from "./ProfileMenu";
import Friends from "./Friends";
import {PostsContainer} from "./Posts/Posts.container";

interface IUserPageProps {
  user: UserModel | null;
}

export default class UserPage extends React.PureComponent<IUserPageProps> {
  public render() {
    if (!this.props.user) {
      return (
          <StyledUserPage>
            <div>Loading...</div>
          </StyledUserPage>
      );
    }
    return (
          <StyledUserPage>
            <div className="page-container">
              <div className = "page-information-box">
                <ProfileMenu/>
                <PersonalInformation user={this.props.user} />
              </div>
              <PostsContainer user={this.props.user}/>
            </div>
            <div className="page__friend-box">
                <Friends/>
            </div>
          </StyledUserPage>
    );
  }
}
