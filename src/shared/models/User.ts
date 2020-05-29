import IGroup from './Group';
import IColleague from './Colleague';
import IPost from './Post';
import IPhoto from './Photo';

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
    profilephoto: IPhoto | null;
    username: string;
    }
