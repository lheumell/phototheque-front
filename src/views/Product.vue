<template>
  <div v-if="!loading">
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-img
            height="400px"
            :src="getImageOfProduct(detailImage.filename)"
          />
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12 d-flex align-center">
          <div class="pl-6">
            <p class="display-1 mb-0">
              {{ detailImage.title }}
            </p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">
                By {{ detailImage.user.username }}
              </p>
              <v-spacer></v-spacer>
              <!-- <v-rating
                v-model="detailImage.rating"
                class=""
                background-color="warning lighten-3"
                color="warning"
                dense
                readonly
              ></v-rating> -->
            </v-card-actions>
            <p>
              <span class="font-weight-thin">Publié le</span> :
              {{ formatDate(detailImage.createdAt) }}
            </p>
            <div class="subtitle-1 font-weight-thin">
              Probabilité des objets présents sur la photo :
              <div
                class="font-weight-regular"
                v-for="djlPicture in detailImage.djlPictures"
                :key="djlPicture.id"
              >
                type : {{ djlPicture.name }} à
                {{ djlPicture.probability.toFixed(2) }} %
              </div>
            </div>
            <v-btn @click="downloadImage()"> Download </v-btn>

            <!-- <p class="title">ITEMS</p>

            <v-text-field
              outlined
              style="width: 100px"
              :value="1"
              dense
            ></v-text-field> -->
            <!-- <div class="d-flex flex-column flex-sm-row">
              <v-btn
                class="primary white--text mr-sm-4 mb-sm-0 mb-2"
                outlined
                tile
                dense
                ><v-icon class="pr-2">mdi-cart</v-icon> Ajouter au panier</v-btn
              >
              <v-btn outlined tile>Ajouter aux favoris</v-btn>
            </div> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>Auteur</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{ detailImage.description }}
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-card elevation="2" width="700" class="ma-2"
                ><v-card-title> Mes informations : </v-card-title>
                <v-card-text class="text--primary">
                  <v-col cols="12" sm="6">
                    <p>
                      <span class="label">Email :</span>
                      {{ detailImage.user.email }}
                    </p>
                    <p>
                      <span class="label">Username :</span>
                      {{ detailImage.user.username }}
                    </p>
                  </v-col>
                </v-card-text></v-card
              >
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { script } from "../backend/script";
import axios from "axios";
export default {
  data: () => ({
    loading: true,
    item: 5,
    detailImage: {},
  }),
  methods: {
    downloadImage() {
      axios
        .get(
          "http://localhost:9000/v1/phototheque/image/download/" +
            this.detailImage.id,
          {
            params: {
              width: 200,
              height: 200,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          // var fileURL = window.URL.createObjectURL(new Blob([res.data]));
          // var fileLink = document.createElement("a");

          // fileLink.href = fileURL;
          // fileLink.setAttribute("download", "file.png");
          // document.body.appendChild(fileLink);

          // fileLink.click();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    downloadZip() {
      axios
        .get(
          "http://localhost:9000/v1/phototheque/image/download/zip/" +
            this.detailImage.id,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.accessToken}`,
            },
          }
        )
        .then((res) => {
          var fileURL = window.URL.createObjectURL(new Blob([res.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "file.zip");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    formatDate(param) {
      return script.formatDate(param);
    },
    getImageOfProduct(filename) {
      return script.getImageOfProduct(filename);
    },
  },
  mounted() {
    axios
      .get(
        "http://localhost:9000/v1/phototheque/image/" +
          this.$route.params.projectId,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        this.detailImage = res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    this.loading = false;
  },
};
</script>


