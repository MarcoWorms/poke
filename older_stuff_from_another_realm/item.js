function effect(pokemon, name)  {
  switch (name) {
    case 'potion': updateRemainingHP(pokemon, 20); break;
    case 'super potion': updateRemainingHP(pokemon, 50); break;
    case 'antidote': healStatus(pokemon, 'psn'); break;
    case 'burn heal': healStatus(pokemon, 'brn'); break;
    case 'awaken': healStatus(pokemon, 'slp'); break;
    case 'paralyz heal': healStatus(pokemon, 'par'); break;
    case 'ice heal': healStatus(pokemon, 'frz'); break;
    case 'revive': revive(pokemon, false); break;
    case 'max revive': revive(pokemon, true); break;
  }
}
