/**
 * Main execution point for the project
 */

const rolls = require("./src/rolls");
const { app, BrowserWindow } = require('electron');
const fiefdoms = require("./Armies/Fiefdoms.json")








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



  // ENABLE LATER

// function ElectronTest(app, BrowserWindow)
// {
//     let win ;

//     function createWindow () {
//         // Create the browser window.
//         win = new BrowserWindow({ width: 800, height: 600 })
      
//         // and load the index.html of the app.
//         win.loadFile('./appUI/index.html')
      
//         // Open the DevTools.
//         win.webContents.openDevTools()
      
//         // Emitted when the window is closed.
//         win.on('closed', () => {
//           // Dereference the window object, usually you would store windows
//           // in an array if your app supports multi windows, this is the time
//           // when you should delete the corresponding element.
//           win = null
//         })
//     }
    
//     app.on('ready', createWindow);
// }

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
         *      - Weapons are pointers to the special attack list.
         *      - Special attacks point to effects at the different stages of combat.
         *          .BeforeCombatRoll (cav charge, Feint -> - d3 Combat) (add strenght here too?)
         *          .AfterCombatRoll  (Rerolls, -1 to 2h, ...)
         *          .BeforeWoundRoll  (isTrapped?, calculate/decide who to hit)
         *          .AfterWoundRoll   (+1 by 2h, reroll 1s, )
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

        // this is the current phase that is being resolved
        // 100 - 199 - 
        // 200 - 299 
        // 300 - 399 
        // 400 - 499 
        this.phaseIndex;
        // Max 
        this.maxphaseIndex;

        
    }


    /*  
    
    */


    // progresses through each unit in each phase
    next()
    {
        

        // the return indicates phase + unit index
        return ;
    }

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

    ModifyResult(amount)
    {
        if(this.roll != -1)
        {
            this.roll += amount;
        }
        else
        {
            console.warn("");
        }

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
        this.meleTargets = []; // contains index reference to unit
        this.unitList;  // 
        this.combatDices;
        this.nofUnits;
    }
}


/** Unit is the defined Miniature with all possible loadouts specified.
 * 
 */
class Unit
{
    // weapons is an array
    constructor(profile, indexRef)
    {
        this.basePointValue = profile.basePointValue;
        this.weapons = profile.weapons;
        this.attr = profile.attr;
        this.heroicActions = profile.attr;
        this.special = rules; // clashmen don´t decrease natural 6´s
        this.options = profile.options;
        this.armyIndex = indexRef;
    }


    

}


class CombatController
{
    constructor()
    {
        this.setup = [];
        this.ChargePhaseEffects = [];
        this.Pre_CombatRollEffects = [];
        this.Post_CombatRollEffects = [];
        this.Pre_WoundRollEffects = [];
        this.Post_WoundRollEffects = [];
        this.Post_Combat = [];
    }
    
    RegisterEffects(effects)
    {
        // find the listed effect - 1by1

        // add effect to the corresponding phase phase

        // th





    };
}


class SpecialRule
{
    constructor(funcCB, type, profile)
    {
        this.funct = funcCB;
        this.type = type;
        this.callback = cb;

    }

    resolve()
    {
         
    }

}



function test()
{
    console.log("\n \nStarting test test...\n");
    console.log(rolls.rollD6());
    console.log(rolls.rollD6());
    console.log(rolls.rollD6());
    console.log(rolls.rollD6());

    console.log(fiefdoms);
    console.log(fiefdoms.index);
    //console.log(fiefdoms("index"));

    //ElectronTest(app, BrowserWindow);
}


test();