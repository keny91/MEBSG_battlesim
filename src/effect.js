
const EffectTarget = 
{
    Self: 100,
    // combat minis in the same army
    SingleAlly: 101,
    SelectionAllies: 102,  //  requires a payload with the data to make the selection
    AllAllies: 103,
    // combat minis in the opposite army
    SingleEnemy: 104,
    SelectionEnemies: 105,
    AllEnemies: 106,

    AllOther:107,
    NoTarget:108
}


const EffectPhases = 
{
  Inmediate: 201,
  preCombatPhase: 202,
  postCombatPhase: 203,
  preHurtPhase: 204,
  postHurtPhase: 205,

}


class Effect {

  constructor(struct_data, id)
    {
      this.effectName;
      this.targetType;
      this.targets;
      this.conditions; // conditions 
      this.EffectPhase;

    }



  // given the units in combat determine the effects 
  addTargets(targets)
  {

  }

  // will apply the effect to the targets
  applyEffect()
  {

    // verify VALID targets & condition fulfilled


  }

  // is the condition fulfilled? - NOTE ... there are many kinds of conditions
  // verifyCondition(function cb?, gamedata)
  verifyCondition()
  {

  }

}


class CombatEffects
{
  constructor()
  {
    // do the phases depend if won or lost?

    // define the phases
    // 0# - activate as soon as the option attached has been selected; Combat Aura that modifies profile for example
    this.inmediateEffect = []; 
    
    // 1# - Effects that happen before the roll. Modify rolls on special attack or charge modifiers.
    this.preCombatPhase = [];  

    // 2# - Effects that happen AFTER the dices roll out. Repeat a dice or modify score (ex, 2h modifiers).
    this.postCombatPhase = [];

    // 2.5#?

    // 3# - Effects BEFORE rolling hits. 
    this.preHurtPhase = []; // 3#

    // 4# - Effects AFTER rolling hits. 2h modifiers
    this.postHurtPhase = [];  // 4#
  }

  addEffect(effectData, phase)
  {

  }
}