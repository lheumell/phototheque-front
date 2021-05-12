
<template>
  <v-container class="edit_product_page">
    <v-card
      class="d-flex flex-column align-center mx-auto pa-4 mt-6"
      max-width="900"
    >
      <v-card-title>PUBLIER UNE IMAGE</v-card-title>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="mt-6"
        style="max-width: 100vw"
      >
        <label class="labelFile"
          >File
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          />
        </label>
        <!-- <v-file-input
        show-size
        counter
        multiple
        label="File input"
        ref="file"
        type="file"
        id="file"
        v-on:change="handleFileUpload()"
      ></v-file-input> -->
        <v-col>
          <v-text-field
            :rules="rules"
            counter
            v-model="title"
            color="blue darken-2"
            label="Titre"
            required
          ></v-text-field>
        </v-col>

        <v-col>
          <v-textarea
            :rules="rulesDesc"
            counter
            name="input-7-1"
            placeholder="Ajouter une description"
            v-model="description"
          ></v-textarea>
        </v-col>

        <v-btn
          @click="submitFile()"
          :disabled="!valid"
          class="white primary--text pr-0 d-flex ma-auto"
        >
          <span>Publier</span>
          <v-icon class="mr-1">mdi-menu-right</v-icon>
        </v-btn>

        <!-- <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn> -->

        <!-- <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn> -->
      </v-form>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :value="true"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  /*
      Variables used by the drag and drop component
    */
  data() {
    return {
      snackbar: false,
      text: `Vous venez de publier une image, Bravo !`,
      valid: false,
      title: "",
      description: "",
      files: [],
      file: "",
      rules: [(v) => v.length > 4 || "Min 4 characters"],
      rulesDesc: [(v) => v.length > 1 || "Min 1 character"],
    };
  },

  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("file", this.file);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      var self = this;
      axios
        .post("http://localhost:9000/v1/phototheque/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${window.localStorage.accessToken}`,
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
          self.snackbar = true;
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
  },
};
</script>

<style >
</style>
