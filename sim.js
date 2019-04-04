/**
 * Main execution point for the project
 */

 /**
  * Skirmish simulator, in a single encounter both sides have a %chance to WIN/HURT/KILL opponents.
  * This will also validate the possibility of using special actions like shielding, charges, special attacks, ...
  * 
  * Per skirmish we will create a log that uses.
  * 
  * Ideally, we will have a UI to help creating the situations.
  * 
  * UI Features: 
  *     -
  *     -
  */



/** Profile
 * 
 *  | Mv | Fc | Fa | S | D | A | W | C || M | W | F |
 *  
 */

const SpecialRules = {
    BroadSword: 50001,
    MightyBlow: 50002,
    GoldLeague: 1500,
    PlatinumLeague: 2000,
    DiamondLeages: 2500,
    MasterLeague: 4000
  }


/** After all contenders in a battle have been determined
 * we will log all possibilities in a battle log
 * 
 * @param {*} battle 
 * @param {*} battleLogName
 */
function resolveBattle(battle, battleLogName)
{
    //   Determine the number of rolls
        // Each roll might apply rules based on special rules

        // How to determine the rolls results

        /**
         * ROLL SIMULATOR
         * 
         *  A) STANDARD SIMULATION
         * 1_ Create Combat models - (Str, Combat, rolls)
         * 2_ Determine each sides (list) HurtableModels (Def,Wounds,Fate, trapped)
         * 3_ ApplyCombatRules (Combat Dices)
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         */


        /**
         * My rolls are independent of enemy rolls, so deal with each dice and
         * determine the probability to get each of the results.
         * 1: x%
         * 2: y%
         * ...
         * total = 100%
         * 
         *   - reRoll are calculated here?
         * 
         * 
         *  Calculate chances on both sides. Then find out what results make both sides win:
         *      - Combat
         * 
         *  Calculate dices in the hurt role
         * 1: x%
         * ...
         * (rerolls)
         * 
         *  In this scenario we only check for  +X results (S against D) so is much more simple
         * 
         * In the end calculate the chances of the outcome and the points at risk.
         * 
         * - Chances that with X amount of points I will Y points
         * Outcomes:
         *  - A wins combat and KILLS  : Chances x%
         *  - A wins but NO KILLS ...
         *  - B ...   K   ...
         *  - B ...   NO K  ...
         * 
         */




    //  Might


    //   Attack variants


    // Combat modifier


    // Hurt modifiers ()


    // Value per point: how many points are traded


    // Overall is favorable to side A or B.


    return 1;
}


class Battle {
    constructor()
    {
        this.Army_A = [];
        this.Army_B = [];
    }


    /*  
    
    */
    DetermineHurtableModels()
    {
        
    }

    SetPriorityTargets();

}



class Dice_D6
{
    constructor(Combat,Strength)
    {
        this.Combat = Combat;
        this.Str = Strength;
        this.roll = -1; // not defined
    };

    RollDice()
    {
        // rand generation 1-6
        roll = rand;
    }

}

// apr
function RollD3()
{
    let d6 = new Dice_D6(0,0);
    d6.RollDice();

    // better generate rand 1-3

    if (d6.roll <=2)
        return 1;
    else if (d6.roll <=4)
        return 2;
    else 
        return 3;
}



class Army 
{
    constructor()
    {
        // units that can be injured during a combat (support units cannot be hurt on regular combats)
        this.meleTargets = [];
        this.totalUnits;
        this.totalDices;
    }
}

class Unit
{
    // weapons is an array
    constructor(weapons, rules)
    {
        this.weapons = weapons;
        this.special = rules; // clashmen don´t decrease natural 6´s
    }

}