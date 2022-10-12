import axios from "axios"

const resource = "https://pokeapi.co/api/v2/pokemon";

export default {
  async fetchPokemons() {
    try {
        const skill = []
        const getPokemonUrl = id => (resource + "/" + id)
        for (let i = 1; i < this.counter; i++) {
          skill.push(await axios.get(getPokemonUrl(i)))
        }
        const data = await Promise.all(skill)
        this.pokemonsSkills = data
      }
      catch (error) {
        alert(error)
        console.log(error)
    }
  },

  async getPokemonsSkills(id) {
    try {
      const data = await axios.get(resource + "/" + id)
        this.getPokemon = data.data
      }
      catch (error) {
        alert(error)
        console.log(error)
    }
  },

  setPokemon(data){
    this.getPokemon = data
  },

  async setPagination(){
    if(this.counter >= 900) {
      this.counter = this.counter + 5
    } else {
      this.counter = this.counter + 50
    }
    await this.fetchPokemons()
  }
};
