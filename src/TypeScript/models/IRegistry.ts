export interface IRegistry<T> {
    getAll(): T[];

    addNew(elem: T): void;

    refresh(): void;
}


export type IRegistryHTML = IRegistry<HTMLElement>;