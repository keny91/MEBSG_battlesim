const combat = require("./combat");
const dices = require("./rolls");

class phaseCombatResults
{
    constructor(highest_roll, bestCombat, elven_picked, unitId, rollId)
    {
        this.highest_roll = highest_roll;
        this.bestCombat = bestCombat;
        this.elven_picked = elven_picked;
        this.unitId = unitId;
        this.rollId = rollId;

    }
}


function rollAttacks(battle)
{
    if(!(battle instanceof combat.Combat))
    {
        console.error("Invalid structure parsed into phaseCombat.rollAttacks()");
        return -1;
    }


    // side 1
    for(let i = 0; i<battle.rolls_Side_1.rolls.length;i++)
    {
        battle.rolls_Side_1.rolls[i].rollTheDice();
    }

    // side 2
    for(let i = 0; i<battle.rolls_Side_2.rolls.length;i++)
    {
        battle.rolls_Side_2.rolls[i].rollTheDice();
    }


}

function DetermineWinner(Side_1_Roll,Side_2_Roll)
{
    if(!(Side_1_Roll instanceof phaseCombatResults) || !(Side_2_Roll instanceof phaseCombatResults))
    {
        console.error("Invalid structure parsed into phaseCombat.DetermineWinner()");
        return -1;
    }

    var winner = -1;
    // team 1 rolls higher than 2
    if(Side_1_Roll.highest_roll > Side_2_Roll.highest_roll)
        winner = 1; 
    // team 2 rolls higher than 1
    else if (Side_2_Roll.highest_roll > Side_1_Roll.highest_roll)
        winner = 2;
        
    // they tied on the roll -> decide by combat value
    else /* (Side_2_Roll.highest_roll > Side_1_Roll.highest_roll) */
    {
    // team 1 has higher 'Combat' than 2
        if(Side_1_Roll.highest_roll > Side_2_Roll.highest_roll)
            winner = 1; 
    // team 2 has higher 'Combat' than 1
        else if (Side_2_Roll.highest_roll > Side_1_Roll.highest_roll)
            winner = 2;
    // they tie in combat too -> full tie
        else
            winner = 0;
    }
    return winner;
}


function processPhaseCombat(battle)
{

    if(!(battle instanceof combat.Combat))
    {
        console.error("Invalid structure parsed into phaseCombat.processPhaseCombat()");
        return -1;
    }

    var diceResults_1 = -1;
    var diceResults_2 = -1;
    var winnerSide = -1;
    // 1 - get dices

    // 2 - pre-roll effects
    
    // 3 - roll dices
    rollAttacks(battle);
    diceResults_1 =  getBestCombatResult(battle.rolls_Side_1);
    diceResults_2 =  getBestCombatResult(battle.rolls_Side_2);

    // 4 - post roll effects

    // 5 - determine winner/loser side.
    winnerSide = DetermineWinner(diceResults_1,diceResults_2);

    // Re-rolls? if the team is losing currently
    // Don´t forget some modifiers post-combat-roll





    // currently we dismiss 
    //[highest_roll, bestCombat, elven_picked, unitId, rollId];


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

        var resultStruck = new phaseCombatResults(highest_roll, bestCombat, elven_picked, unitId, rollId);

         //  At last, return [rollResult, unit´s Combat, Elven Flag, UnitID, AttackId]
         return resultStruck;

}


exports.processPhaseCombat = processPhaseCombat;