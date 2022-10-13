<template>
  <div>
    <main>
      <div class="github">
        <a
          href="https://github.com/Laravel007"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../public/img/gh.png" alt="github" />
        </a>
      </div>
      <div class="logo">
        <img
          src="../public/img/poke_logo.svg"
          alt="logo"
          loading="lazy"
          id="top"
        />
      </div>
      <section>
        <div class="search-poke">
          <input
            type="text"
            placeholder="search pokémon with their fullname..."
            v-model="search"
          />
        </div>

        <div class="container-pokemons">
          <ul
            class="block-pokemons"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <li v-for="pokemon in searchPokemon" :key="pokemon.data.name">
              <Pokemon
                @click="handleModal(pokemon.data)"
                :skills="pokemon.data"
              />
            </li>
            <Observer @intersect="handleSeeMore" />
          </ul>
        </div>
      </section>
      <footer :class="counter >= 906 ? 'center' : ''">
        <div v-if="searchPokemon.length > 0" class="arrow-top">
          <a href="#top">
            <div><img src="../public/img/arrow-up-24.png" alt="up" /></div>
          </a>
        </div>
        <button
          class="button-see-more"
          v-if="counter < 906 && searchPokemon.length > 0"
          @click="handleSeeMore()"
        >
          load more
        </button>
      </footer>
    </main>
    <transition>
      <PokemonSkillsModal v-if="show" />
    </transition>
    <div class="loading" v-if="loading">
      <img src="../public/img/poke.png" alt="pokeball" />
    </div>
  </div>
</template>

<script>
  import Pokemon from "@/components/Pokemon/index";
  import Observer from "@/components/Observer"
  import PokemonSkillsModal from "./partials/PokemonSkillsModal";
  import { usePokedexStore } from "../store";
  import { mapActions, mapState } from "pinia";

  export default {
    name: "App",
    components: {
      Pokemon,
      Observer,
      PokemonSkillsModal,
    },

    data() {
      return {
        search: "",
        show: false,
        loading: false,
      };
    },

    async created() {
      try {
        this.loading = !this.loading;
        await Promise.all([this.fetchPokemons()]);
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        this.loading = !this.loading;
      }
    },

    computed: {
      ...mapState(usePokedexStore, ["pokemonsSkills", "getPokemon", "counter"]),

      getPokemons() {
        return this.pokemonsSkills;
      },

      getPokemonSkills() {
        return this.getPokemon;
      },

      searchPokemon() {
        if (this.search == "" || this.search == " ") {
          return this.getPokemons;
        } else {
          return this.getPokemons.filter(
            (pokemon) => pokemon.data.name == this.search.toLowerCase()
          );
        }
      },
    },

    methods: {
      ...mapActions(usePokedexStore, [
        "fetchPokemons",
        "setPokemon",
        "setPagination",
      ]),

      showModal() {
        this.show = !this.show;
      },

      async handleSeeMore() {
        try {
          this.loading = !this.loading;
          await this.setPagination();
        } catch (error) {
          alert(error);
          console.log(error);
        } finally {
          this.loading = !this.loading;
        }
      },

      handleModal(poke) {
        this.showModal();
        this.setPokemon(poke);
      },
    },
  };
</script>

<style lang="scss">
  main {
    width: 100%;
    min-height: 100vh;
    padding: 2rem 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .github {
    position: fixed;
    top: 2%;
    right: 2%;
    z-index: 2;
  }

  .logo {
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;

    & img {
      width: 30vw;
    }
  }

  section {
    width: 100%;
  }

  .search-poke {
    width: 100%;
    margin: 2rem 0;
    display: flex;
    justify-content: center;

    & input {
      width: 70%;
      padding: 0.75rem 0;
      border: none;
      border-bottom: 2px solid $black;
      background: transparent;
      outline: none;

      &::placeholder {
        color: $black;
      }
    }
  }

  .container-pokemons,
  .block-pokemons {
    width: 100%;
  }

  .block-pokemons {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }

  footer {
    width: 100%;
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .arrow-top {
      width: 100%;

      & a div {
        width: 50px;
        height: 50px;
        background-color: $dark-black;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .button-see-more {
      background: $dark-black;
      border: none;
      border-radius: 12px;
      padding: 0.5rem;
      color: $white;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        filter: drop-shadow(5px 5px $white);
        transition: all ease 0.3s;
      }
    }
  }

  @media (max-width: map-get($media-breakpoints, "lg")) {
    .block-pokemons {
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }
  }

  @media (max-width: map-get($media-breakpoints, "lg-m")) {
    .block-pokemons {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: map-get($media-breakpoints, "sm")) {
    main {  
      padding: 2rem 2.5%;
    }

    .github {
      position: absolute;
    }

    .logo {
      margin-bottom: 0;

      & img {
        width: 70vw;
      }
    }

    .loading {
      & img {
        width: 100px !important;
        height: 100px !important;
      }
    }

    .search-poke input {
      width: 90%;
    }

    .block-pokemons {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .center {
    grid-template-columns: none !important;
    justify-content: center !important;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .loading {
    width: 100%;
    min-height: 100vh;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: $black, $alpha: 0.5);
    z-index: 5;

    & img {
      width: 200px;
      height: 200px;
      animation: rotation 1s infinite linear;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
</style>
