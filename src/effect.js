
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
  setUpPhase: 200,
  Inmediate: 201,
  preDuelPhase: 202,
  postDuelPhase: 203,
  preHitPhase: 204,
  postHitPhase: 205,

}


class EffectHandler 
{
  constructor()
  {
    this.effectList = [];
    this.Effect_setUpPhase = [];
    this.Effect_preDuelPhase = [];
    this.Effect_postDuelPhase = [];
    this.Effect_preHitPhase = [];
    this.Effect_postHitPhase = [];

  }


  /** Determine the phase and the effect to be assigned to the CB
   * 
   * @param {*} effect 
   */
  parseEffect(effect)
  {

    // check that is an effect object
    if(!(effect instanceof Effect))
    {
        return -1;
    }

    switch (effect.EffectPhase)
    {
      case EffectPhases.setUpPhase:
        this.Effect_setUpPhase.push(effect);
      break;

      case EffectPhases.preDuelPhase:
          this.Effect_preDuelPhase.push(effect);
      break;

      case EffectPhases.postDuelPhase:
          this.Effect_postDuelPhase.push(effect);
      break;

      case EffectPhases.preHitPhase:
          this.Effect_preHitPhase.push(effect);
      break;

      case EffectPhases.postHitPhase:
          this.Effect_postHitPhase.push(effect);
      break;
    }
    

    // SetCondition?

    // assing callbackFunction to the function trigger.
     



  }

}


class Effect {

  constructor(struct_data, id)
    {
      this.effectName; // this is also the ID?
      this.targetType;
      this.targets;
      this.conditions; // conditions 
      this.EffectPhase;
      this.EffectCB; 

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


