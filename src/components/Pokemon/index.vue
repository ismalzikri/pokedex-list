<template>
  <div :class="`box-pokemon ${getPokemonType1}`">
    <img
      v-if="skills.id < 10"
      :src="imgPokemon('00', skills.id)"
      :alt="skills.name"
    />
    <img
      v-else-if="skills.id < 100"
      :src="imgPokemon('0', skills.id)"
      :alt="skills.name"
    />
    <img v-else :src="imgPokemon('', skills.id)" :alt="skills.name" />

    <h1>{{ skills.name }}</h1>
    <small>#{{ skills.id }}</small>
  </div>
</template>

<script>
  export default {
    name: "Pokemon",
    props: {
      skills: {
        type: Object,
        default: () => null,
      },
    },
    data() {
      return {
        imgPokemon: (n, id) =>
          "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
          n +
          id +
          ".png",
      };
    },
    computed: {
      getPokemonType1() {
        return this.skills.types[0].type.name;
      },

      getPokemonTypes() {
        return this.skills.types
          .map((typeInfo) => typeInfo.type.name)
          .join(" | ");
      },
    },
  };
</script>

<style lang="scss">
  .box-pokemon {
    width: 100%;
    padding: 1rem;
    text-align: center;
    border-radius: 10px;
    filter: drop-shadow(5px 5px 5px $dark-gray);
    cursor: pointer;
    position: relative;

    & img {
      filter: drop-shadow(5px 5px $white);
      transition: all ease 0.3s;
      z-index: 3;
    }

    &:hover img {
      transform: scale(1.1);
    }

    & h1 {
      text-transform: capitalize;
      color: $white;
      text-shadow: 2px 2px 5px $gray;

      @media (max-width: map-get($media-breakpoints, "sm")) {
        font-size: 1.25rem;
      }
    }

    & small {
      padding: .25rem;
      background-color: $dark-black;
      border-radius: 10px;
      color: $white;
      font-weight: bolder;
      position: absolute;
      top: 2%;
      left: 2%;
    }
  }
</style>
