const combat = require("./combat");
const dices = require("./rolls");




function processPhaseCombat(battle)
{

    var winnerSide = -1;
    // 1 - get dices

    // 2 - pre-roll effects

    // 3 - roll dices

    // 4 - post roll effects

    // 5 - determine winner/loser side.

    // 6 - rerolls?
        // 6.1 - reroll availible?
        // 6.2 - mini to make the reroll
        // 6.3 - determine winner/loser side.
        // 6.4 - reroll the other side.  -> change on winner loser
        // 6.5 - 

        // rerolls opposing side 
        // 


    return winnerSide;
}



/**********************/


/**
     * The best result comes first from the highest roll,
     * then from Combat value,
     * (next if is using elven weapon)
     *  
     * returns [rollResult, unit´s Combat, Elven Flag, UnitID, AttackId]
     */
function getBestCombatResult(rollStruct)
{
        // first find the highest results
        var highest_roll = -1;
        var bestCombat = -1;
        var unitId = -1;
        var rollId = -1;
        var elven_picked = 0;

        if(!(rollStruct instanceof combat.Rolls))
        {
            console.error("Invalid structure parsed into getBestCombatResult()");
            return -1;
        }
        

        // there may be faster ways to extract this result, but this way we wont skip a result for sure
        for(let i =0; i< rollStruct.rolls.length; i++)
        {
            if(rollStruct.rolls[i].result > highest_roll)
            {
                highest_roll = rollStruct.rolls[i].result;
            }
        }


        
        // we got the highest result
        // ALTERNATIVE: Store highest combat of each team and compare it here to possibly break out of the loop faster
        for(let i =0; i< rollStruct.rolls.length; i++)
        {
            
            if(rollStruct.rolls[i].result == highest_roll && rollStruct.rolls[i].combat >= bestCombat)
            {
                // if(!elven_picked)
                // {
                    bestCombat = rollStruct.rolls[i].combat;
                    unitId = rollStruct.rolls[i].getUnitId();
                    rollId = rollStruct.rolls[i].getDiceId();
                    // if(rollStruct.rolls[i].hasElvenWeapon)
                    // {
                    //     elven_picked = 1;
                    //     // [rollResult, unit´s Combat, Elven Flag, UnitID, AttackId]
                    //     return []
                    // }


                // }

            }

        }

        /**
         * CHECK IF ELVEN WEAPON HERE
         */

        

         //  At last, return [rollResult, unit´s Combat, Elven Flag, UnitID, AttackId]
         return [highest_roll, bestCombat, elven_picked, unitId, rollId];

}


exports.phaseCombat = processPhaseCombat;