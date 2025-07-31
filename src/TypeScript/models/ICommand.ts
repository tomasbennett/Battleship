export interface ICommand<T = void> {
    execute(e: T): void;
}

export type ICommandEvent = ICommand<Event | undefined>;

export type ICommandHTML = ICommand<HTMLElement>;

export type ICommandEventLastRun = ICommandEvent & {
    lastElements: HTMLElement[]
}