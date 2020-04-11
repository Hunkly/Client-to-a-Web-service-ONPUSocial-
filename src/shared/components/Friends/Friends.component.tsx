import React from 'react';
import StyledColleagues from './Friends.styled';
import {ColleagueData} from "./Friends.constants";
import ColleagueItem from "./FriendItem";
import PageLabel from "../PageLabel";

export default function Friends() {

    return (
       <StyledColleagues>
           <PageLabel>Friends</PageLabel>
           <div className="friends__container">
               {ColleagueData.map((data) => (
                    <ColleagueItem name={data.name} key={data.id}/>
                ))}
           </div>
       </StyledColleagues>)};
