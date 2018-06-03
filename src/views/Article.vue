<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout column>
      <v-flex
        v-if="loading"
        class="content"
        justify-center
        align-center
        fill-height
        >
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-flex>
      <v-flex class="container" align-start>
        <v-flex class="content">
          <v-slide-y-transition>
            <v-container v-show="!loading">
              <v-layout>
                <v-flex>
                  <h3 class="display-2">{{this.article.title}}</h3>
                  <div class="title mb-3">{{this.article.description}}</div>
                  <div class="subheading" style="white-space: pre-line;">{{this.article.body}}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-slide-y-transition>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

function parseBody(response) {
  const newLines = response.body.replace(/\\n/g, '\n');
  console.log(newLines);

  return {
    ...response,
    body: newLines
  };
}

export default {
  name: 'articleView',
  data: () => ({
    creating: false,
    valid: false,
    article: {},
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  mounted() {
    this.getArticle(this.$route.params.id)
      .then(response => response.data || response)
      .then(parseBody)
      .then((response) => {
        console.log(response);
        this.article = response;
      });
  },
  methods: {
    ...mapActions('articles', { getArticle: 'get' }),
  },
  computed: {
    ...mapState('articles', { loading: 'isGetPending' }),
    ...mapGetters('articles', { getArticleInStore: 'get' }),
  },
};
</script>
