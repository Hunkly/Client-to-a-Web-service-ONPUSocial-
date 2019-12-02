import IGroup from './Group';
import IColleague from './Colleague';
import IPost from './Post';

export default interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    birthday: number;
    email: string;
    description: string;
    phone: string;
    studygroup: IGroup;
    colleagues:  IColleague[];
    posts: IPost[];
    username: string;
    }
