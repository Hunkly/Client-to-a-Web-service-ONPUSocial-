import IFaculty from './Faculty'

export default interface ICafedra {
    id: number,
    name_kafedra: string,
    description_kafedra: string,
    faculty: IFaculty
}
