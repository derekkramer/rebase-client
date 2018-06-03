<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <h1>Articles Page</h1>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
        <v-layout row wrap align-center>
          <v-flex v-if="!loading" v-for="article in articles" :key="article._id">
            <v-card flat>
              <v-card-title primary-title>
                <div class="headline">
                  {{article.title}}
                </div>
              </v-card-title>
            </v-card>
            <!-- {{articles}} -->
          </v-flex>
        </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'articles',
  data: () => ({
    creating: false,
    valid: false,
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  mounted() {
    this.findArticles({ query: {} })
      .then(() => {
        // const articles = response.data || response;
      });
  },
  methods: {
    ...mapActions('articles', { findArticles: 'find' }),
    createArticle() {
      if (this.valid) {
        const { Article } = this.$FeathersVuex;
        const article = new Article(this.articles);
        article.save();
      }
    },
  },
  computed: {
    ...mapState('articles', { loading: 'isFindPending' }),
    ...mapGetters('articles', { findArticlesInStore: 'find' }),
    articles() {
      return this.findArticlesInStore({ query: {} }).data;
    },
  },
};
</script>
