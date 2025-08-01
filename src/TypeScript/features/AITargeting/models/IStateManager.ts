export interface ITargetingState {
    get priorityDirectionsStack(): [number, number][];

    set priorityDirectionsStack(value: [number, number][]);

    get originalShot(): [number, number] | null;

    set originalShot(value: [number, number] | null);

    // get isSecondHit(): boolean;

    // set isSecondHit(value: boolean);

    // get latestShot(): [number, number] | null;

    // set latestShot(value: [number, number] | null);

    chooseFiringCoords(): [number, number] | null;
}


export type ITargetingStateManager = ITargetingState & {
    setState(state: ITargetingState): void;

    getState(): ITargetingState;
}


//BOTH STATES FIRE WHEN READY 
// // (1) THE AI METHOD OF FIRING WILL ALWAYS WAIT FOR AN EVENTLISTENER ON THE SIDE OF THE USER TO FIRE
// // (2) THIS EVENT LISTENER SHOULDN'T NEED TO KNOW WHAT IS BEING FIRED IT WILL JUST TELL THE AI TO FIRE

// // (3) HERE THE AI WILL EITHER PICK A RANDOM PLACE TO FIRE ...USING THE AVAILABLE SPACES (NEEDS PREVSHOTS[])...
// // (4) OR ... THE AI WILL BE PICKING A SPECIFIC DIRECTION ...USING THE AVAILABLE SPACES (NEEDS PREVSHOTS[])...
//  }   (a) THIS SPECIFIC DIRECTION WILL BE DETERMINED BY ...WHETHER THE PREVIOUS SHOT WAS A HIT OR NOT...
// //   }   (I) WHEN WE FIRE WE ASK GIVEN A ...COORDINATE... AND A ...GAMEBOARD... GOING THROUGH ALL THE ...SHIPS... IN THE ...GAMEBOARD... DOES ONE OF THOSE COORDINATES MATCH
// //   }   (II) IF ... IT DOES MATCH THEN CHECK IF THE SHIP HIT ...ISSUNK... IF NOT THEN SWITCH TO ...TARGETSTATE... IN THE STATEMANAGER FOR NEXT FIRE:
// //   }   (III) IN TARGETSTATE FIRE NEEDS TO CHECK NESW DIRECTIONS


//you have a class that runs whatever your shot coords are against the gameboards ships, check if the ship is sunk before the shot, if theres a match then check if the ship is sunk now 