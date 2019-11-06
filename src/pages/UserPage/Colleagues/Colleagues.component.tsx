import React from 'react';
import StyledColleagues from './Colleagues.styled';
import {ColleagueData} from "./Colleague.constants";
import ColleagueItem from "./ColleagueItem";
import PageLabel from "../../../shared/components/PageLabel";

// interface IColleaguesProps {
//     data?: {[name:string]:string;}
// }


export default function Colleagues() {

    return (
       <StyledColleagues>
           <PageLabel>Colleagues</PageLabel>
           {ColleagueData.map((data) => (
                <ColleagueItem name={data.name}/>))}
       </StyledColleagues>)};