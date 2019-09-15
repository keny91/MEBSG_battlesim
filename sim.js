/**
 * Main execution point for the project
 */

const rolls = require("./src/rolls");
const { app, BrowserWindow } = require('electron');
const fiefdoms = require("./Armies/Fiefdoms.json");
const mordor = require("./Armies/Mordor.json");
const mini = require("./src/mini");
const combat = require("./src/combat");






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




/** Unit is the defined Miniature with all possible loadouts specified.
 * 
 */
class CombatUnit
{
    // weapons is an array
    constructor(UnitStruct)
    {
        this.basePointValue = UnitStruct.basePointValue;
        this.weapons = UnitStruct.weapons;
        this.attr = profile.attr;
        this.heroicActions = profile.attr;
        this.special = rules; // clashmen don´t decrease natural 6´s
        this.options = profile.options;
        this.Index = indexRef;
    }


    

}

/**
 * Directive to identify which list/file corresponds 
 * to the army index.
 */
const ArmyListIndex = {
    MT: 1,  // 1000 - 1999
    Rohan: 2,   // 2000 - 2999
    C: 3,    // 2000 - 2999
    D: 4,    
    E: 5
}

/** Search for a miniature given a full index
 * turning it into an armyIndex (1,2,...nof_lists)
 * and localArmyIndex (1-999)
 * 
 * @param {*} MiniatureIndex 
 */
function DetermineArmyIndex(MiniatureIndex)
{
    var LocalMiniatureIndex = MiniatureIndex%1000;
    var ArmyListIndex = Math.floor(MiniatureIndex/1000);  
    // point to the 
    if(DEBUG_ON)
    {

    }
    return [ArmyListIndex,LocalMiniatureIndex];
} 

class BattleHandler
{
    constructor()
    {
        this.team1 = [];
        this.team2 = []
        this.iniciative; // 1 -> team A ; 2 -> team B ; 0 -> undecided (let it be rand) 
        this.setup = []; // Is this decision phase
        this.ChargePhaseEffects = [];  // this is
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


     /* 1 -> team A ; 2 -> team B ; 0 -> undecided (let it be rand) 
        In general, whoever has the iniciative will make the charge.
     */
    setIniciative(selection)
    {
        switch(selection)
        {
            case 1:
                this.iniciative = 1;
                break;
            
            case 2:
                this.iniciative = 2;
                break;
            
            case 0:
                this.iniciative = 0;
                break;
            
            case undefined:
                this.iniciative = 0;
                break;

            default:
                this.iniciative = 0;
                break;

        }
        return;
    }

    addUnit(unitID, team)
    {

        if(team != 1 && team != 2)
        {
            console.error("Unit was tried to be assigned to invalid team.");
            return -1;
        }

        // if(th)

        // var teamSelection = team;
        

    }

    
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
    // console.log(fiefdoms.index[0]);

    // load the army that the unit instance will be added
    var armyFiefdoms = new mini.Builder(fiefdoms);
    var armyMordor = new mini.Builder(mordor);
    // console.log(armyMordor);

    // Combat handler instance that will take the reins of the battle
    //var handler = new BattleHandler();

    // Add units to the combat handler
    //var unit = armyFiefdoms.getIDbyUnitName("Blackroot Vale Archer");
    //console.log(unit);
    var combatUnit = new mini.CombatMiniature(armyFiefdoms.getUnitTemplate(10), 1 ,armyFiefdoms.name); // 10 for valeroot archer

    var battle = new combat.Combat();
    battle.Side_1.addCombatUnit(10 ,armyFiefdoms); // 10 is root vale archer
    battle.Side_1.addCombatUnit(10 ,armyFiefdoms);
    battle.Side_2.addCombatUnit(27,armyMordor);
    console.log(combatUnit);

    battle.Side_1.combatUnits[0].toogleOption(0);
    //battle.Side_1.combatUnits[0].toogleOption(1);
    battle.Side_1.combatUnits[0].selectWeapon(0);
    battle.Side_1.combatUnits[1].selectWeapon(0);

    //battle.Side_2.combatUnits[0].toogleOption(0);
    //battle.Side_1.combatUnits[0].toogleOption(1);
    battle.Side_2.combatUnits[0].selectWeapon(0);
    battle.StartBattle();




   // battle.Side_1.removeCombatUnit(0);

    //handler.addUnit(combatUnit, team);
    // combatUnit.toogleOption(5);
    //combatUnit.toogleOption(0);

    console.log(combatUnit);


    combatUnit.toogleOption(0);

    //ElectronTest(app, BrowserWindow);
}


test();