import IUser from "./User";

export default interface IPost {
    id: number;
    name_post: string;
    content: string;
    user: string;
    restriction: number;
    date: number;
    isImages: boolean;
    user_idfield: number;
}
