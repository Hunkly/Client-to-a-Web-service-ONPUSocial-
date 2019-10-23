import React from 'react';
import UserModel from '../../shared/models/User';
import StyledUserPage from './UserPage.styled';
import BasicInfo from './BasicInfo';
import ProfileMenu from "./ProfileMenu";
import Colleagues from "./Colleagues";
import Publications from "./Publications";

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
            <div>
              <div className = "page-container">
                <ProfileMenu/>
                <BasicInfo user={this.props.user} />
              </div>
              <Publications/>
            </div>
            <Colleagues/>
          </StyledUserPage>
    );
  }
}
