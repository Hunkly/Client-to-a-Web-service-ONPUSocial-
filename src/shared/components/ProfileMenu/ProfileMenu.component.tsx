import React from 'react';
// import Button from "../Button/Button.component";
import StyledProfileMenu from './ProfileMenu.styled';
import DefaultPhoto from '../../../assets/img/DefaultPhoto.png';


export default function ProfileMenu() {
    return (
        <StyledProfileMenu>
            <div className="profile-menu__avatar">
                <img src={DefaultPhoto} alt=""/>
            </div>
            <div>
                {/*<Button>*/}
                {/*    Add to friends*/}
                {/*</Button>*/}
                {/*<Button>*/}
                {/*    Message*/}
                {/*</Button>*/}
                {/*<Button>*/}
                {/*    Report*/}
                {/*</Button>*/}
            </div>
        </StyledProfileMenu>
    )};
