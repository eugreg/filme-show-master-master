<script>
import PictureCard from "../components/PictureCard.vue";
import { mapStores, mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
  components: { PictureCard },
  data() {
    return {
      user: "",
      favorito: [],
      tmdb:[],
      
    };
  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, [
      "userMovies",
      "userWatch",
      "userToken",
      "userData",
      
    ]),
  },
  async created() {
    await this.getfilme();
    await this.getWatch();
  },
  methods: {
    //    reset() {
    //   Object.assign(this, this.userToken);
    // },

    ...mapActions(useAuthStore, [
      "login",
      "token",
      "getfilme",
      "logout",
      "getWatch",
      
    ]),

    async deslogar() {
      try {
        await this.logout();
        this.$router.push("/");
      } catch (e) {
        alert("Aconteceu um erro");
      }
    },

    getPosterUrl(posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    },
    getProfileUrl(avatar_path) {
      return `https://image.tmdb.org/t/p/w500${avatar_path}`;
    },
  },
};
</script>

<template>
  <div class="perfil">
    <div class="info-perfil">
      <div>
        <img
          class="poster-profile-pag"
          :src="getProfileUrl(userData.avatar.tmdb.avatar_path)"
          
    
        /> 
      </div>
      <div>
        <h1>{{ userData.username }}</h1>
 
      </div>
    </div>
    <div class="caixa-btn">
      <button @click="deslogar()" class="btn-logout">logout</button>
    </div>
  </div>

  <div class="caixona">
    <div>
      <div class="titulo-caixa">
        <p>Curtidos</p>
      </div>
      <div class="conteudo caixa">
        <PictureCard
          v-for="favorito of userMovies"
          :key="favorito.id"
          :picture_src="getPosterUrl(favorito.poster_path)"
          :pic_link="favorito"
        />
      </div>
    </div>

    <div>
      <div class="titulo-caixa">
        <p>Assitir mais tarde</p>
      </div>
      <div class="conteudo caixa">
        <PictureCard
          v-for="favorito of userWatch"
          :key="favorito.id"
          :picture_src="getPosterUrl(favorito.poster_path)"
          :pic_link="favorito"
        />
      </div>
    </div>
  </div>
</template>
