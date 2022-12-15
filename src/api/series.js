import axios from "axios";
export default class SerieApi {
  async BuscaTodasAsSeries() {
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=a37701b7a0845f3785cd83eb23add599&language=pt-Br&page=1"
    );
    return response.data.results;
  }
  async BuscarSeries(id) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=a37701b7a0845f3785cd83eb23add599&language=pt-Br&page=1${id}`
    );
    return response.data.results;
  }
}