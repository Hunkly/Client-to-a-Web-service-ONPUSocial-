import ICafedra from './Cafedra'

export default interface IGroup {
    id: number;
    name_group: string;
    description_group: string;
    kafedra: ICafedra;
    course: number;
    stream: number;
}
