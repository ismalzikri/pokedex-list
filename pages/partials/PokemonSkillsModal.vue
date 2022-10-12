<template>
  <transition>
    <section v-if="show">
      <div :class="`modal box-pokemon ${getPokemon.types[0].type.name}`">
        <div class="modal__up">
          <div class="modal__up--img">
            <img
              v-if="getPokemon.id < 10"
              :src="imgPokemon('00', getPokemon.id)"
              :alt="getPokemon.name"
            />
            <img
              v-else-if="getPokemon.id < 100"
              :src="imgPokemon('0', getPokemon.id)"
              :alt="getPokemon.name"
            />
            <img
              v-else
              :src="imgPokemon('', getPokemon.id)"
              :alt="getPokemon.name"
            />
          </div>
          <h1>{{ getPokemon.name + " " + "#" + getPokemon.id }}</h1>
        </div>
        <div class="modal__down">
          <div class="modal__down--body">
            <div>
              <span> height </span>
              <h3>{{ getHeight }} m</h3>
            </div>
            <div>
              <span> weight </span>
              <h3>{{ getWeight }} kg</h3>
            </div>
          </div>
          <div class="modal__down--abilities">
            <div>
              <span> abilities </span>
              <div v-for="pokemon in getAbilities" :key="pokemon.url">
                <h3>{{ pokemon.ability.name }}</h3>
              </div>
            </div>
          </div>
          <div class="modal__down--types">
            <p>types</p>
            <div v-for="pokemon in getTypes" :key="pokemon.url">
              <div :class="pokemon.type.name">
                <h3>{{ pokemon.type.name }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="x-icon" @click="show = !show">
          <img src="../../public/img/x-mark-24.png" alt="x-icon" />
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  import { usePokedexStore } from "../../store";
  import { mapState, mapActions } from "pinia";

  export default {
    name: "pokemon-skills-modal",

    data() {
      return {
        show: true,
        imgPokemon: (n, id) =>
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
          n +
          id +
          ".png",
      };
    },

    computed: {
      ...mapState(usePokedexStore, ["getPokemon"]),

      getAbilities() {
        return this.getPokemon.abilities.filter((abi) => abi.ability);
      },
      getTypes() {
        return this.getPokemon.types.filter((types) => types.type);
      },
      getHeight(){
        let height = this.getPokemon.height.toString()
        if(height.length >= 1){
          return height / 10
        } else if (height.length > 2) {
          return height / 100
        }
      },
      getWeight(){
        let weight = this.getPokemon.weight.toString()
        if(weight.length > 1){
          return weight / 10
        } else if (weight.length > 2) {
          return weight / 100
        }
      }
    },

    async created() {
      await this.getPokemonsSkills(this.getPokemon.id);
    },

    methods: {
      ...mapActions(usePokedexStore, ["getPokemonsSkills"]),
    },
  };
</script>

<style lang="scss" scoped>
  section {
    width: 100%;
    padding: 2rem 7.5%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: $black, $alpha: 0.5);
    z-index: 1;

    .box-pokemon {
      cursor: auto;
    }

    .modal {
      width: 100%;
      max-width: 620px;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      position: relative;

      .x-icon {
        position: absolute;
        top: 2%;
        right: 2%;

        img {
          filter: none;
        }
      }

      &__up {
        display: flex;
        flex-direction: column;
        align-items: center;
        &--img {
          background: $white;
          width: 250px;
          height: 250px;
          border-radius: 50%;
        }

        & h1 {
          font-size: 1.5rem;
        }
      }

      &__down {
        width: 100%;
        height: 35%;
        padding: 1.25rem 2%;
        background: $dark-black;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        color: $white;

        &--body {
          & div {
            margin-bottom: 1rem;
          }
        }

        &--abilities {
          & div h3{
            text-transform: capitalize;
          }
        }

        &--types {
          & p {
            margin-bottom: 0.5rem;
          }

          & div div {
            margin-bottom: 0.75rem;
            padding: 0.35rem;
            border-radius: 10px;

            h3 {
              text-shadow: 2px 2px 5px $gray;
            }
          }
        }
      }
    }

    .x-icon {
      cursor: pointer;
    }
  }
</style>
