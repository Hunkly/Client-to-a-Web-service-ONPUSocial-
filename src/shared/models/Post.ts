import IUser from "./User";

export default interface IPost {
    id: number;
    name_post: string;
    content: string;
    user: IUser;
    restriction: number;
    date: number;
}
