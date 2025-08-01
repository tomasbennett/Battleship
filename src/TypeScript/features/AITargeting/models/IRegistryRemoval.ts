export interface IRegistryRemoval<T> {
    getAll(): T[];

    remove(elem: T): void;

    refresh(): void;
}


export type IRegistryRemoveSpaces = IRegistryRemoval<[number, number]>;