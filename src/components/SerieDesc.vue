<script>
import { mapStores, mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth";
import SerieApi from "../api/series.js";
const seriesapi = new SerieApi();
export default {
  data() {
    return {
      videos: false,
    };
  },
  props: ["serie"],

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ["userFav"]),
  },
  
  
    methods: {
    ...mapActions(useAuthStore, ["salvarfilme", "salvarWatch"]),
    
    getPosterUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
    // getVideoUrl(imdb_id) {
    //   return `  https://embed.warezcdn.com/filme/${imdb_id}`;
    // },
    async salvar(media_id) {
      await this.salvarfilme(media_id);
      this.$toast.success(`Filme salvo com sucesso`, {
        type: "success",
        position: "top-right",
      });
      setTimeout(this.$toast.clear, 3000);
    },
    async salvar2(media_id) {
      await this.salvarWatch(media_id);
      this.$toast.success(`Filme salvo com sucesso`, {
        type: "success",
        position: "top-right",
      });
      setTimeout(this.$toast.clear, 2000);
    },
  
  
   
},
}
</script>
<template>
  <div class="descMovi">
    <div>
        <img
        class="poster-filme-pag"
        :src="getPosterUrl(serie.poster_path)"
        alt="linda imagem do avatar"
      />
    </div>
    <div class="info-movi">
      <div class="titulo">{{ serie.name }}</div>
      <div class="descricao">
        {{ serie.overview }}
      </div>
      <div class="descricao">
        <div class="acao">
          <button @click="salvar(serie.id)" class="filme-curtir">Curtir</button>
          <button @click="salvar2(serie.id)" class="filmes-tarde">
            Assistir mais tarde
          </button>
        </div>
        <h2>lançamento: {{ serie.first_air_date }}</h2>
        <h3>Temporadas: {{serie.number_of_seasons}}</h3>
        <h3>Avaliação dos usuários: {{ Math.round(serie.vote_average) }}</h3>
      </div>
    </div> 
  </div>   
</template>