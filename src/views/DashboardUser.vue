<template>
  <div
    v-if="this.$store.state.role == 'ROLE_MODERATOR'"
    class="dashboard-page ma-6"
  >
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.name">
            <td>{{ item.username }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role.description }}</td>
            <td>
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="selectedUser(item.id)"
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
                          <!-- <v-row>
                            <v-col cols="12" md="12">
                              <v-text-field
                                v-model="user.role.name"
                                :rules="nameRules"
                                label="Role"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row> -->
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
                            <v-btn @click="updateUser(user, item.id)" color="success"
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
                  <v-btn color="error" v-bind="attrs" v-on="on"
                    >Supprimer</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="primary" dark
                      >Voulez-vous vraiment supprimer cet utilisateur
                      ?</v-toolbar
                    >
                    <v-card-text class="card-delete">
                      <h3 class="text-h2 pa-12 red--text">
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
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import { deleteUser } from "../backend/deleteUser";
import { updateUser } from "../backend/updateUser";


export default {
  data() {
    return {
      loading: false,
      user: {},
      users: [],
      valid: false,
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
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
  },
  mounted() {
    axios
      .get("http://localhost:9000/v1/phototheque/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.users = res.data;
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
</style>





