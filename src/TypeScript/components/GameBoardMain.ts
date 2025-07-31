export const userGameBoardComponent: HTMLElement = document.querySelector("#user-game-board-container > .game-board")!;
export const userGameSpaces: HTMLDivElement[] = Array.from(userGameBoardComponent.querySelectorAll(".game-space")!);


export const computerGameBoardComponent: HTMLElement = document.querySelector("#computer-game-board-container > .game-board")!;
export const computerGameSpaces: HTMLDivElement[] = Array.from(computerGameBoardComponent.querySelectorAll(".game-space")!);