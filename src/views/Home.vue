<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <input type="text" @input="onKeywordInput($event.target.value)" @keyup.enter="onSearch($event.target.value)" :value="keyword" />
      <div v-for="autoCompleteKeyword in autoCompleteKeywords" :key="autoCompleteKeyword" @click="onSearch(autoCompleteKeyword)">
        {{ autoCompleteKeyword }}
      </div>
    </div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else v-for="pokemon in pokemons" :key="pokemon.no">
      <img :src="pokemon.image" :alt="pokemon.name.eng" class="pokemon-image" />
      <div>
        <span>도감번호: {{ pokemon.no }} </span>
        <span>이름: {{ pokemon.name.kor }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import autoCompleteKeyword from '@/gql/autoCompleteKeyword.gql';
import pokemons from '@/gql/pokemons.gql';

export default {
  data: () => ({
    keyword: '',
    isLoading: 0,
    autoCompleteKeywords: [],
    searchName: null,
    pokemons: [],
    totalCount: 0,
  }),
  apollo: {
    autoCompleteKeywords: {
      query: autoCompleteKeyword,
      variables() {
        return { keyword: this.keyword };
      },
      update: ({ getAutoCompleteKeyword }) => getAutoCompleteKeyword,
    },
    pokemons: {
      query: pokemons,
      variables() {
        return this.searchName && { name: this.searchName };
      },
      update: ({ getPokemons }) => getPokemons.pokemon,
      result({ data: { getPokemons } }) {
        this.totalCount = getPokemons.count;
      },
      loadingKey: 'isLoading',
    },
  },
  methods: {
    onKeywordInput(keyword) {
      this.keyword = keyword;
    },
    onSearch(searchName) {
      this.keyword = '';
      this.searchName = searchName;
    },
  },
};
</script>
<style>
.home > div {
  margin: 2rem 0;
}
.pokemon-image {
  width: 5rem;
}
</style>
