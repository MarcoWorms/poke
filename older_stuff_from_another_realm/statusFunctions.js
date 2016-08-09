//changes the status of a pokemon during battle and applies the appropriate stat changes
updateStatus = function (pokemon, status)  {
  if (status != 'psn' && status != 'par' && status != 'slp' && status != 'frz' && status != 'brn' && status != 'non' && status != 'fnt') {
    throw new Meteor.Error("passed invalid status string: " + status + ". status must be par, slp, frz, brn, fnt, or non");
  }
  if (pokemon.status == 'non') {
    pokemon.status = status;
  }
  else if (status = 'fnt')  {
    pokemon.status = 'fnt';
  }
  else if (status = 'non')  {
    if (pokemon.status != 'fnt')  {
      pokemon.status = 'non';
    }
  }
  //apply stat changes for paralysis and burn
  if (pokemon.status == 'par')  {
    updateBattleStat(pokemon, -6, 'speed');
  }

  if (pokemon.status == 'brn')  {
    updateBattleStat(pokemon, Math.min(pokemon.attackstage - 2, -6), 'attack')
  }

  if (pokemon.status == 'non')  {
    updateBattleStat(pokemon, 0, 'speed');
    updateBattleStat(pokemon, 0, 'attack');
  }

  return pokemon.status;
}

//heals a specific status condition, returns true if successful
//called by certain items
function healStatus(pokemon, status)  {
  if(status == 'psn') {
    if (pokemon.status == 'psn')  {
      updateStatus(pokemon, 'non');
      return true;
    }
    return false;
  }

  else if(status == 'brn')  {
    if (pokemon.status == 'brn') {
      updateStatus(pokemon, 'non');
      return true;
    }
    return false;
  }

  else if(status == 'slp')  {
    if (pokemon.status == 'slp') {
      updateStatus(pokemon, 'non');
      return true;
    }
    return false;
  }

  else if(status == 'par')  {
    if (pokemon.status == 'par') {
      updateStatus(pokemon, 'non');
      return true;
    }
    return false;
  }

  else if(status == 'frz')  {
    if (pokemon.status == 'frz') {
      updateStatus(pokemon, 'non');
      return true;
    }
    return false;
  }

  else {
    throw new Meteor.Error("you tried to heal the status " + status + ", which is not valid");
  }
}

//heals the pokemon by a specific point value
updateRemainingHP = function (pokemon, points)  {
  pokemon.remainingHP = Math.min(pokemon.HP, pokemon.remainingHP + points);
}

//method for reviving pokemon, which can only be done via revive or max revive
function revive(pokemon, max)  {
  //block using non-revive items and attempting to revive pokemon that haven't fainted
  if (pokemon.statue != 'fnt')  {
    throw new Meteor.Error("the pokemon " + pokemon + " has not fainted. you can only use revive or max revive on a fainted pokemon.");
  }
  //revive the pokemon
  pokemon.status = 'non';
  if (!max) {
    pokemon.remainingHP = Math.floor(pokemon.HP/2);
  }
  else {
    pokemon.remainingHP = pokemon.HP;
  }
  return pokemon;
}
