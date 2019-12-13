import React from 'react';
import StyledColleagues from './Friends.styled';
import {ColleagueData} from "./Friends.constants";
import ColleagueItem from "./FriendItem";
import PageLabel from "../../../shared/components/PageLabel";


// interface IColleaguesProps {
//     data?: {[name:string]:string;}
// }


export default function Colleagues() {

    return (
       <StyledColleagues>
           <PageLabel>Friends</PageLabel>
           {ColleagueData.map((data) => (
                <ColleagueItem name={data.name} key={data.id}/>))}
       </StyledColleagues>)};