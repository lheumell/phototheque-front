<template>
  <div v-if="!loading">
    <v-container>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <v-divider></v-divider>
          <p class="display-2 font-weight-light pa-2">Les dernières images</p>
          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
              :key="image.id"
              v-for="image in filteredImages"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto" color="grey lighten-4" max-width="600">
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="200px"
                    :src="getImageOfProduct(image.filename)"
                  >
                    <v-card-title>By {{ image.user.username }} </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%"
                      >
                        <v-btn
                          outlined
                          v-if="hover"
                          :to="{
                            name: 'Product',
                            params: { projectId: image.id },
                          }"
                          >VIEW</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <router-link
                        :to="{
                          name: 'Product',
                          params: { projectId: image.id },
                        }"
                        style="text-decoration: none"
                        >{{ image.title }}</router-link
                      >
                    </div>
                    <div>{{ formatDate(image.createdAt) }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div
            class="col-md-12 col-sm-6 col-xs-12 d-flex justify-center align-center mt-4"
          >
            <v-btn height="50px" outlined :to="toTag">VIEW MORE</v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { script } from "../backend/script";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    images: [],
    loading: true,
  }),
  computed: {
    ...mapGetters(["isConnected"]),
    toTag() {
      if (this.isConnected) {
        return "/list-products";
      } else {
        return "/connexion";
      }
    },
    filteredImages() {
      if (this.$store.state.searchQuery) {
        return this.images.filter((item) => {
          return item.title.startsWith(this.$store.state.searchQuery);
        });
      } else {
        return this.images;
      }
    },
  },
  methods: {
    formatDate(param) {
      return script.formatDate(param);
    },
    getImageOfProduct(filename) {
      return script.getImageOfProduct(filename);
    },
  },
  mounted() {
    axios
      .get("http://localhost:9000/v1/phototheque/image/top", {
        params: {
          number: process.env.VUE_APP_NB_PRODUCTS_HOME,
        },
      })
      .then((res) => {
        this.images = res.data.content;
        console.log(this.images);
      })
      .catch((error) => {
        console.error(error);
      });

    this.loading = false;
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>