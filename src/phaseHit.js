const combat = require("./combat");
const dices = require("./rolls");



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

/**
 * 
 * @param {*} battle 
 * @param {*} combatWinnerSide 
 * @param {*} strikingProtocol 
 */
function processPhaseCombat(battle, combatWinnerSide, strikingProtocol)
{

    if(!(battle instanceof combat.Combat))
    {
        console.error("Invalid structure parsed into phaseCombat.processPhaseCombat()");
        return -1;
    }

    // prepare side to target opponents depending on the hits

    // find out what target each mini is going to target and the order. This depends on the protocol


    // Pre-roll effects

    // Effects based on targets? hatred, spirit and such

    // 



}


exports.processPhaseCombat = processPhaseCombat;