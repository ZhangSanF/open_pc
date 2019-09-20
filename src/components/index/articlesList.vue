<template>
  <div class="articlesList">
    <div class="title">
      <h2>方案预测</h2>
      <!-- <span class="more">更多</span> -->
    </div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in articlesList" :key="index">
          <router-link
            tag="a"
            target="_blank"
            :to="'/articleDetails/'+item.category_id"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "articlesList",
  data() {
    return {
      articlesList: []
    };
  },
  methods: {
    ...mapActions(["getArticles"])
  },
  computed: {
    ...mapGetters(["articleCategory"])
  },
  watch: {
    articleCategory: function() {
      setTimeout(() => {
        this.articleCategory.rows.forEach(item => {
          if (item.identification == "predication") {
            this.getArticles({ category_id: item.id }).then(res => {
              // console.log(res.data);
              this.articlesList = res.data.rows || [];
            });
          }
        });
      }, 500);
    }
  }
};
</script>


<style lang="scss" scoped>
.articlesList {
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid #f0f0f0;
    h2 {
      font-size: 20px;
    }
    span {
      font-size: 14px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: orange;
      }
    }
  }
  .list {
    padding: 15px;
    li {
      line-height: 30px;
      color: #555;
      cursor: pointer;
      a {
        color: #555;
        &:hover {
          color: orange;
        }
      }
    }
  }
}
</style>
