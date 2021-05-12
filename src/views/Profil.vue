<template>
  <v-container class="mt-12">
    <div class="row">
      <div class="col-sm-12 col-xs-12 col-md-12">
        <v-tabs>
          <v-tab>Mon profil</v-tab>
          <v-tab>Mes images</v-tab>
          <v-tab-item>
            <v-card class="mx-auto pa-4 mt-12" max-width="900">
              <v-card-title>Mon profil</v-card-title>
              <v-row class="d-flex justify-center">
                <v-col cols="12" sm="6">
                  <p>
                    <span class="label">Email :</span>
                    {{ this.$store.state.email }}
                  </p>
                  <p>
                    <span class="label">Username :</span>
                    {{ this.$store.state.username }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-col cols="12" sm="6"> </v-col>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-btn @click="disconnect()" height="50px" outlined
                  >SE DECONNECTER</v-btn
                >
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="mx-auto pa-4 mt-12" max-width="900">
              <v-card-title>Mes images</v-card-title>
              <v-row class="d-flex justify-center">
                <div
                  class="col-md-3 col-sm-6 col-xs-12"
                  :key="image.id"
                  v-for="image in listOfImages"
                >
                  <v-card
                    class="mx-auto"
                    color="grey lighten-4"
                    max-width="600"
                  >
                    <v-img
                      class="white--text align-end"
                      :aspect-ratio="16 / 9"
                      height="200px"
                      :src="getImageOfProduct(image.filename)"
                    >
                    </v-img>
                    <v-card-text class="text--primary">
                      <router-link
                        :to="{
                          name: 'Product',
                          params: { projectId: image.id },
                        }"
                        style="text-decoration: none"
                        >{{ image.title }}</router-link
                      >
                    </v-card-text>
                    <v-row class="ml-1">
                      <v-col cols="9" class="py-0">
                        <div>{{ formatDate(image.createdAt) }}</div></v-col
                      >
                      <v-col cols="3">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon right v-bind="attrs" v-on="on"
                              >mdi-dots-vertical</v-icon
                            >
                          </template>
                          <v-list>
                            <v-list-item class="flex-column">
                              <v-list-item-title
                                style="border-bottom: 1px solid lightgray"
                              >
                                <a
                                  class="lien"
                                  @click="showItem(image.isPublished, image.id)"
                                >
                                  <span v-if="image.isPublished">Cacher</span>
                                  <span v-else>Republier</span></a
                                >
                              </v-list-item-title>

                              <v-list-item-title>
                                <a class="lien" @click="deleteItem(image.id)"
                                  >Supprimer</a
                                >
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
    <v-snackbar
      class="snackbar"
      v-model="snackbar"
      :value="true"
      absolute
      bottom
      color="error"
      outlined
      right
    >
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { script } from "../backend/script";
import axios from "axios";
import { updatePublishedPicture } from "../backend/updatePublishedPicture";
import { deleteImage } from "../backend/deleteImage";

export default {
  data: () => ({
    myImages: {},
    snackbar: false,
    text: `Vous venez de supprimer une image, Bravo !`,
  }),
  computed: {
    listOfImages() {
      return Object.values(this.myImages).filter(
        (el) => el.isDeleted === false
      );
    },
  },
  methods: {
    formatDate(param) {
      return script.formatDate(param);
    },
    getImageOfProduct(filename) {
      return script.getImageOfProduct(filename);
    },
    deleteItem(id) {
      // var self = this;
      deleteImage.deleteImage(id);
      this.snackbar = true
      // self.$router.go(0);
    },
    showItem(isPublished, id) {
      var self = this;
      if (isPublished) {
        updatePublishedPicture.updatePublishedPicture(false, id);
        self.$router.go(0);
      } else {
        updatePublishedPicture.updatePublishedPicture(true, id);
        self.$router.go(0);
      }
    },
    disconnect() {
      window.localStorage.clear();
      window.location = "/";
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:9000/v1/phototheque/image/myself?pageNo=0&pageSize=100",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.content);
        this.myImages = res.data.content;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
.lien {
  text-decoration: none;
}
.label {
  color: lightgray;
  font-weight: 700;
}
.snackbar {
  position: fixed;
  bottom: 200px;
}
</style>