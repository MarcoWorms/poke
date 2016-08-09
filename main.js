/*
  global: POKEDEX : Array PokeModel
  global: TYPES : Array PokeTypes
*/

const makeShittyDom = () => {

  const query = (findFirst) => document.querySelector(findFirst)

  const setValue = (findFirst, newValue) => {
    query(findFirst).innerHTML = newValue
  }
  const getValue = (findFirst) => {
    query(findFirst).innerHTML
  }
  const seProp = (findFirst, prop, newValue) => {
    query(findFirst)[prop] = newValue
  }

  const renderPokeContainer = (prefix, poke) => {
    setValue("#" + prefix + "Name", poke.name)
    seProp("#" + prefix + "Img", 'src', poke.image)
    setValue("#" + prefix + "Hp", ('' + poke.combat.hp + ' / ' + poke.combat.maxHp))
  }

  return {
    renderPokeContainer: renderPokeContainer
  }
}

const cloneJsonObject = (object) => JSON.parse(JSON.stringify(object))
const randomArrayElement = (array) => array[Math.floor(Math.random() * array.length)]

//    makePoke : PokeModel -> Poke
const makePoke = (pokeModel) => {
  const poke = cloneJsonObject(pokeModel)
  return {
    name: poke.pokemon[0].Pokemon,
    image: poke.images.front,
    type: poke.stats[0].types.text,
    combat: {
      maxHp: poke.stats[0].hp
    , hp: poke.stats[0].hp
    , attack: poke.stats[0].attack
    , defense: poke.stats[0].defense
    , spAttack: poke.stats[0]["sp atk"]
    , spDefense: poke.stats[0]["sp def"]
    , speed: poke.stats[0].speed
    }
  }
}

//    pokeAleatorio : Poke
const pokeAleatorio = () => makePoke(randomArrayElement(POKEDEX))


const makePlayer = () => {

  //    pokemons : List Poke
  const pokemons = []

  return {
    addPoke: (poke) => {
      pokemons.push(poke)
    },
    active: () => pokemons[0]
  }
}
const player = makePlayer()
player.addPoke(makePoke(POKEDEX[0]))
var enemy = pokeAleatorio()

const dom = makeShittyDom()


dom.renderPokeContainer('enemy', enemy)
dom.renderPokeContainer('player', player.active())
