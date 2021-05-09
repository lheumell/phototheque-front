<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title style="width: 350px">
        <a href="/" class="white--text" style="text-decoration: none"
          ><v-icon>mdi-camera</v-icon>&nbsp;Photothèque</a
        >
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
        v-model="searchQuery"
        @input="search"
      />
      <v-spacer />
      <v-btn
        v-if="isConnected"
        href="/edit-product"
        class="white primary--text mr-1"
      >
        <v-icon class="mr-1">mdi-plus-box</v-icon>
        <span v-if="!isMobile">Ajouter une image</span>
      </v-btn>
      <div class="log">
        <v-btn :href="goToScreenAccount" icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </div>

      <v-btn href="/cart" icon>
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main class="nav-bar">
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <a href="/" class="v-btn">
          <span>NAV CATEGORY</span>
        </a>
      </v-bottom-navigation>
    </v-main>
    <router-view class="main-container" />
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn
            class="mx-4 white--text"
            href="https://gitlab.com/java152/phototheque/phototheque-api"
            target="_blank"
            icon
          >
            <v-icon size="24px">mdi-git</v-icon>
          </v-btn>
          <v-btn
            class="mx-4 white--text"
            href="https://trello.com/b/4vMspWA5/epsi-java-phototh%C3%A8que"
            target="_blank"
            icon
          >
            <v-icon size="24px">mdi-trello</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          Réalisation d’une application permettant de gérer une bibliothéque
          d’images en mettant en place une API Java et une interface graphique
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Photothèque</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeBtn: 1,
      searchQuery: "",
    };
  },
  computed: {
    ...mapGetters(["isConnected"]),
    goToScreenAccount() {
      if (this.isConnected) {
        return "/profil";
      } else {
        return "/connexion";
      }
    },
    isMobile() {
      if (
        this.$vuetify.breakpoint.name === "sm" ||
        this.$vuetify.breakpoint.name === "xs"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    search() {
      this.$store.commit("typeSearch", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.nav-bar {
  max-height: 112px;
}
.main-container {
  height: 100%;
}
</style>
