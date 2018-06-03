<template>
  <v-container fluid grid-list-md fill-height pt-5>
    <v-layout column>
      <v-flex class="content" v-if="!success" justify-center>
        <div class="display-2">Author</div>
      </v-flex>
      <v-flex
        class="content"
        v-if="loading"
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
      <v-slide-y-transition mode="out-in">
        <v-flex v-show="posted" fill-height>
          <v-jumbotron class="content" align-center>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-2 text-xs-center"><code>ARTICLE PUBLISHED</code></h3>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-flex>
      </v-slide-y-transition>
      <v-slide-y-transition mode="out-in">
        <v-flex v-show="formShow" fill-height>
          <v-flex class="content">
            <v-container v-show="formShow">
              <v-layout>
                <v-flex>
                  <v-form
                    class="container"
                    v-model="valid"
                    @submit.prevent="createArticle"
                    @keydown.prevent.enter>
                    <v-text-field
                      v-model="article.title"
                      :rules="notEmptyRules"
                      label="Title"
                    ></v-text-field>
                    <v-text-field
                      v-model="article.description"
                      label="Description"
                    ></v-text-field>
                    <v-text-field
                      v-model="article.tags"
                      label="Tags"
                    ></v-text-field>
                    <v-text-field
                      v-model="article.body"
                      :rules="notEmptyRules"
                      label="Body"
                      multi-line
                    ></v-text-field>
                    <v-btn type="submit" :disabled="!valid">Create</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-flex>
      </v-slide-y-transition>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

function formatArticle(article) {
  return Promise.resolve(article)
    .then(parseTags)
    .then(parseBody)
}

function parseTags(article) {
  const newTags = article.tags
    .replace(/\s/g, '')
    .toLowerCase()
    .split(',');

  return {
    ...article,
    tags: newTags,
  };
}

function parseBody(article) {
  const newBody = article.body.replace(/\n/g, '\\n');

  return {
    ...article,
    body: newBody,
  };
}

export default {
  name: 'create',
  data: () => ({
    article: {},
    success: false,
    posted: false,
    valid: false,
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  methods: {
    ...mapActions('articles', { findArticles: 'find' }),
    createArticle() {
      if (this.valid) {
        this.loading = true;
        formatArticle(this.article)
          .then((newArticle) => {
            console.log(newArticle);
            const { Article } = this.$FeathersVuex;
            const article = new Article(newArticle);

            return article.save();
          })
          .then((response) => {
            this.success = true;
            this.posted = true;
            this.loading = false;

            setTimeout(() => {
              this.posted = false;
            }, 2500);

            setTimeout(() => {
              this.$router.push('/articles/' + response._id);
            }, 3000);
          })
          .catch(err => console.error('Error: ' + err));
      }
    },
  },
  computed: {
    ...mapState('articles', { loading: 'isCreatePending' }),
    formShow: {
      get: function() {
        this.loading;
        this.success;
        return !(this.loading || this.success);
      },
    },
  },
};
</script>
