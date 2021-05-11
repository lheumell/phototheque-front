
<template>
  <v-container class="edit_product_page">
    <v-card class="mx-auto pa-4 mt-6" max-width="750">
      <v-form ref="form" v-model="valid" lazy-validation class="mt-6">
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

        <v-text-field
          :rules="rules"
          counter
          v-model="title"
          color="blue darken-2"
          label="Titre"
          required
        ></v-text-field>

        <v-textarea
          :rules="rulesDesc"
          counter
          name="input-7-1"
          placeholder="Ajouter une description"
          v-model="description"
        ></v-textarea>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submitFile()"
        >
          Publier
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
      valid: true,
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
