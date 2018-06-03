<template>
  <v-container fluid pt-5>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <div class="display-2">Articles</div>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
        <v-layout column pt-5>
          <v-flex v-if="!loading" v-for="article in this.articles" :key="article._id">
            <v-container>
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <div class="display-1">{{article.title}}</div>
                    <div class="subheading mb-3 ml-2">{{article.description}}</div>
                    <div class="body-1">{{article.body}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-flex class="content" justify-center>
                    <v-btn
                    flat
                    small
                    color="blue-grey"
                    :to="{ name: 'articleView', params: { id: article._id } }"
                    >
                      Read more
                    </v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

function truncateBody(response) {
  return new Promise((resolve, reject) => {
    let iterator = 1;
    const newArticles = [];

    response.forEach((article) => {
      const truncatedBody = article.body.length > 500 ?
        article.body
          .substr(0, 500)
          .replace(/^(.*\w)[ \.\,;]+(?:.*)$/gm, (match, p1) => {
            return p1 + '...';
          })
        : article.body;

        newArticles.push({
          ...article,
          body: truncatedBody
        });

        iterator++;

        if (iterator === response.length) resolve(newArticles)
    });
  });
}

export default {
  name: 'articles',
  data: () => ({
    articles: null,
    valid: false,
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  mounted() {
    this.findArticles()
      .then(response => response.data || response)
      .then(truncateBody)
      .then((response) => {
        this.articles = response;
      });
  },
  methods: {
    ...mapActions('articles', { findArticles: 'find' }),
  },
  computed: {
    ...mapState('articles', { loading: 'isFindPending' }),
  }
};
</script>
