<template>
  <v-app>
    <v-toolbar
      app>
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
  data () {
    return {
      fixed: false,
    }
  },
  mounted() {
    this.authenticate()
    .then((result) => {
      console.log('LOGGED IN');
      this.$router.push('/articles');
    }).catch(e => {
      console.error('Authentication error', e);
    });
  },
  methods: {
    ...mapActions('auth', ['authenticate'])
  },
};
</script>
