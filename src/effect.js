
const EffectTarget = 
{
    Self: 100,
    // combat minis in the same army
    SingleAlly: 101,
    SelectionAllies: 102,  //  requires a payload with the data to make the selection
    AllAllies: 103,
    // combat minis in the opposite army
    SingleEnemy: 104,
    SelectionEnemirs: 105,
    AllEnemies: 106,

    AllOther:107,
    NoTarget:108
}



class Effect {

  constructor(struct_data, id)
    {

    }
}