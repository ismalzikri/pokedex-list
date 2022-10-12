import { defineStore } from 'pinia'
import state from "./state";
import actions from "./actions";

export const usePokedexStore = defineStore('pokedex', {
  state: () => ( state ),
  actions: actions
  ,
})
