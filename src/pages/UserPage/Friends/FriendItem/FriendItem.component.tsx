import React from 'react';
import StyledColleagueItem from './FriendItem.styled';
import DeafultPhoto from '../../../../assets/img/DefaultPhoto.png';
//import IColleagueItem from '../Colleague.constants';

interface IUserColleagues {
    name: string;
    photo?: string;
}

export default class ColleagueItem extends React.PureComponent<
    IUserColleagues
    > {

    public render() {
        return (
            <StyledColleagueItem>
                <div className="colleague-item__avatar">
                    <img src={DeafultPhoto} alt=""/>
                </div>
                <div className="colleague-item__label">{this.props.name}</div>
            </StyledColleagueItem>
        );
    }
}
