import React from 'react';
import StyledColleagues from './Colleagues.styled';
import {ColleagueData} from "./Colleague.constants";
import ColleagueItem from "./ColleagueItem";
import PageLabel from "../../../shared/components/PageLabel";
import UserModel from '../../../shared/models/User';
//import IColleagueItem from '../Colleagues/Colleague.constants';

interface IColleaguesProps {
    data?: {[name:string]:string;}
}


export default function Colleagues({data }: IColleaguesProps) {

    return (
       <StyledColleagues>
           <PageLabel>Colleagues</PageLabel>
           {ColleagueData.map((data) => (
                <ColleagueItem name={data.name}/>))}
       </StyledColleagues>)};