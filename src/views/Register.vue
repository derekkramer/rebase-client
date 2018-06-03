<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="register"
          @keydown.prevent.enter>
          <v-text-field
            v-model="user.email"
            :rules="notEmptyRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Display Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="notEmptyRules"
            label="Image URL"
            required
          ></v-text-field>
          <v-btn type="submit" :disabled="!valid">Register</v-btn>
          <v-alert
            v-model="error.status"
            :value="false"
            outline
            color="error"
            icon="warning"
            transition="scale-transition"
            class="mt-3"
            >{{error.text}}</v-alert>
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
import { mapState } from 'vuex';


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  name: 'register',
  data: vm => ({
    valid: false,
    error: {
      status: false,
      text: '',
    },
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules: [value => !!value || 'Cannot be empty'],
    confirmPasswordRules: [confirmPassword => confirmPassword === vm.user.password || 'Password must match'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    register() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        user.save()
          .then(() => {
            this.$router.push('/login');
          })
          .catch((err) => {
            this.showError(err);
          });
      }
    },
    showError(err) {
      this.error.text = err.message ? capitalize(err.message) : 'Error';
      this.error.status = !this.error.status;
      setTimeout(() => {
        this.error.status = !this.error.status;
        this.error.text = '';
      }, 3000);
    },
  },
};
</script>
