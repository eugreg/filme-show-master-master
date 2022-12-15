import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SerieView from "../views/SerieView.vue";
import PaginaFilme from "../views/PaginaFilme.vue";
import PaginaSerie from "../views/PaginaSerie.vue";
import PaginaPesquisa from "../views/PaginaPesquisa.vue";
import PaginaLancamento from "../views/PaginaLancamento.vue";
import LoginView from "../views/LoginView.vue";
import PaginaCategorias from "../views/PaginaCategorias.vue";
import MinhacontaView from "../views/MinhacontaView.vue";

import BlankView from "../layouts/BlankView.vue";
import FullView from "../layouts/FullView.vue";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: BlankView,
      children: [
        {
          path: "/",
          name: "login",
          component: LoginView,
        },
      ],
    },
    {
      path: "/",
      component: FullView,
      children: [
        {
          path: "/filmes/:id",
          nome: "filmes",
          component: PaginaFilme,
          props: true,
        },
        {
          path: "/series/:id",
          nome: "series",
          component: PaginaSerie,
          props: true,
        },
        {
          path: "/filmes_por_genero/:id",
          nome: "filmesPorGenero",
          component: PaginaCategorias,
          props: true,
        },
        {
          path: "/pesquisa",
          nome: "pesquisa",
          component: PaginaPesquisa,
          props: true,
        },
        {
          path: "/lancamento",
          nome: "lancameno",
          component: PaginaLancamento,
        },
        {
          path: "/series",
          nome: "series",
          component: SerieView,
        },
        {
          path: "/filme",
          nome: "filme",
          component: HomeView,
        },
        {
          path: "/minha-conta",
          nome: "login",
          component: MinhacontaView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/"];
  const sessionId = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (sessionId && !auth.userToken) {
    auth.returnUrl = to.fullPath;
    return "/filme";
  }
});

export default router;
