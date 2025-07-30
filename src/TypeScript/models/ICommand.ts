export interface ICommand<T = void> {
    execute(e: T): void;
}

export type ICommandEvent = ICommand<Event | undefined>;

export type ICommandEventLastRun = ICommandEvent & {
    lastElements: HTMLElement[]
}