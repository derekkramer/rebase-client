<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column justify-center align-center>
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="login"
          @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="notEmptyRules"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Login</v-btn>
        </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login',
  data: () => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(() => {
          this.$router.push('/articles');
        }).catch((e) => {
          console.error('Authentication error', e);
        });
      }
    },
  },
};
</script>
