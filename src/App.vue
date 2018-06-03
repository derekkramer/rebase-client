<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title @click="home">Rebase</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user" class="hidden-sm-and-down">
        <v-btn flat :to="{ name: 'login' }">Login</v-btn>
        <v-btn flat :to="{ name: 'register' }">Register</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user" class="hidden-sm-and-down">
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 Derek Kramer and Dan Beerman</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      fixed: false,
    };
  },
  mounted() {
    this.login();
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
  },
  methods: {
    ...mapActions('auth', {
      authLogout: 'logout',
      authCheck: 'authenticate',
    }),
    login() {
      this.authCheck()
        .catch((e) => {
          console.error('Authentication error', e);
        });
    },
    logout() {
      this.authLogout()
        .then(() => {
          this.$router.push('/home');
        });
    },
    home() {
      this.$router.push('/home');
    },
  },
};
</script>
