<template>
  <v-container class="mt-12">
    <v-card v-if="existProfil" class="mx-auto pa-4" max-width="900">
      <v-card-title>CONNEXION/INSCRIPTION</v-card-title>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="showPassword = !showPassword"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn @click="signIn()" height="50px" outlined>SE CONNECTER</v-btn>
      </v-row>
    </v-card>
    <v-card v-else class="mx-auto pa-4" max-width="900">
      <v-card-title>INSCRIPTION</v-card-title>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="username"
            label="Username"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="showPassword = !showPassword"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-btn @click="signUp()" height="50px" outlined>S'INSCRIRE</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    existProfil: true,
  }),
  methods: {
    signIn() {
      var self = this;
      axios
        .post("http://localhost:9000/v1/phototheque/auth/signin", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data) {
            window.localStorage.accessToken = response.data.accessToken;
            window.localStorage.email = response.data.email;
            window.localStorage.username = response.data.username;
            window.localStorage.role = response.data.role;
          }

          window.location = "/";
        })
        .catch(function (error) {
          console.log(error);
          self.existProfil = false;
        });
    },
    signUp() {
      var self = this;
      axios
        .post("http://localhost:9000/v1/phototheque/auth/signup", {
          username: this.username,
          email: this.email,
          password: this.password,
          role: "USER",
        })
        .then(function (response) {
          console.log(response.data);
          self.existProfil = true;
          window.location = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>