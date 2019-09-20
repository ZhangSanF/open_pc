<template>
  <div class="articleDetails">
    <div class="title">
      <h1>{{articles.title}}</h1>
      <p>{{articles.create_time}}</p>
    </div>
    <div v-html="articles.content" class="content"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "articleDetails",
  data() {
    return {
      articles: ""
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getArticlesInfo(this.$route.params.id).then(res => {
      if (res.code == 200) {
        this.articles = res.data;
      }
    });
  },
  methods: {
    ...mapActions(["getArticlesInfo"])
  }
};
</script>


<style lang="scss" scoped>
.articleDetails {
  padding: 15px;
  background-color: #fff;
  height: 100%;
  .title {
    border-bottom: 1px solid #ccc;
    h1 {
        text-align: center;
      font-size: 30px;
    }
    p{
        line-height: 25px;
        text-align: right;
    }
  }
  .content{
      padding: 20px 0;
  }
}
</style>
