<template>
  <div
    v-if="this.$store.state.role == 'ROLE_MODERATOR'"
    class="dashboard-page ma-6"
  >
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.username }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.role.description }}</td>
          <td>
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="selectedUser(row.item.id)"
                  class="mr-6"
                  color="warning"
                  v-bind="attrs"
                  v-on="on"
                  >Modifier</v-btn
                >
              </template>
              <template v-if="!loading" v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark
                    >Modifier les informations de cet utilisateur</v-toolbar
                  >
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-container>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-text-field
                              v-model="user.username"
                              :rules="nameRules"
                              label="Username"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="12">
                            <v-text-field
                              v-model="user.email"
                              :rules="emailRules"
                              label="E-mail"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row class="d-flex justify-center">
                          <v-btn
                            @click="updateUser(user, row.item.id)"
                            color="success"
                            >Valider</v-btn
                          >
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="error" v-bind="attrs" v-on="on">Supprimer</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar color="primary" dark
                    >Voulez-vous vraiment supprimer cet utilisateur ?</v-toolbar
                  >
                  <v-card-text class="card-delete">
                    <h3 class="text-sm-h5 pa-sm-12 red--text">
                      Cette action est irreversible
                    </h3>
                    <v-btn @click="deleteUser(item.id)" color="error"
                      >Supprimer</v-btn
                    >
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </td>
        </tr>
      </template></v-data-table
    >
    <v-row justify="space-around">
      <v-col class="add-user-btn" cols="auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="mx-2"
              fab
              dark
              large
              color="primary"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark
                >INSCRIPTION D'UN UTILISATEUR</v-toolbar
              >
              <v-card-text>
                <v-card-title></v-card-title>
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
                    <v-text-field
                      v-model="email"
                      label="Email"
                      outlined
                    ></v-text-field>
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
                  <v-btn @click="signUp()" height="50px" outlined
                    >INSCRIRE</v-btn
                  >
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { deleteUser } from "../backend/deleteUser";
import { updateUser } from "../backend/updateUser";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      user: {},
      users: [],
      valid: false,
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "username",
        },
        { text: "Email", value: "email" },
        { text: "Role", value: "role.description" },
        { text: "", value: "name" },
      ],
    };
  },
  methods: {
    deleteUser(id) {
      deleteUser.deleteUser(id);
    },
    selectedUser(id) {
      this.loading = true;
      axios
        .get("http://localhost:9000/v1/phototheque/user/" + id, {
          headers: {
            Authorization: `Bearer ${window.localStorage.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.user = res.data;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateUser(user, id) {
      updateUser.updateUser(user, id);
    },
    signUp() {
      var self = this;
      axios
        .post(
          "http://localhost:9000/v1/phototheque/auth/signup",
          {
            username: this.username,
            email: this.email,
            password: this.password,
            role: "ROLE_USER",
          },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.accessToken}`,
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          self.existProfil = true;
          window.location = "/dashboard";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get("http://localhost:9000/v1/phototheque/user?pageNo=0&pageSize=20", {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.content);
        this.users = res.data.content;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.card-delete {
  display: flex;
  padding: 0 50px;
  align-items: center;
}

.add-user-btn {
  position: fixed;
  bottom: 200px;
  right: 72px;
}
</style>





