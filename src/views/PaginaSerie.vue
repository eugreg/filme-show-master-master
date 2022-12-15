<script>
import axios from "axios";
import SerieDesc from "../components/SerieDesc.vue";
export default {
  components: { SerieDesc },
  props: ["id"],
  data() {
    return {
      serie: {},
    };
  },
  async created() {
    const url = `https://api.themoviedb.org/3/tv/${this.id}?api_key=a37701b7a0845f3785cd83eb23add599&language=pt-BR`;
    const { data } = await axios.get(url);
    this.serie = data;
  },
};
</script>

<template>
  <div class="main">
    {{ id }}
     <SerieDesc :serie="serie" />
  </div>
</template>