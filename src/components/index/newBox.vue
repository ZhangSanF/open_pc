<template>
  <div class="newBox">
    <div class="news">
      <div class="swperBox">
        <swper>
          <swiper-slide v-for="(item,index) in adList.rows" v-show="item.identification == 'indexAd'" :key="index">
            <img :src="item.img" alt style="width: 100%;height: 100%">
          </swiper-slide>
        </swper>
      </div>
      <div class="newsList">
        <h1>
          <span class="title">行业新闻</span>
          <span class="more">
            <!-- <a href="news/index.html">更多</a> -->
          </span>
        </h1>
        <ul>
          <li v-for="(item,index) in articlesList.rows" :key="index">
            <!-- target="_blank" -->
            <router-link tag="a" :to="'/articleDetails/'+item.category_id">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="adBox">
        <img :src="item.img" v-for="(item,index) in adList.rows" v-show="item.identification == 'headAd'" :key="index" alt="">
    </div>
  </div>
</template>

<script>
import Swper from "base/swper";
import { swiperSlide } from "vue-awesome-swiper";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "newBox",
  components: {
    Swper,
    swiperSlide
  },
  data() {
    return {
      articlesList: [],
    };
  },

  methods: {
    ...mapActions(["getArticles"]),
    getnewBow() {
      this.articleCategory.rows.forEach(item => {
        if (item.identification == "IndustryNews") {
          this.getArticles({ category_id: item.id }).then(res => {
            // console.log('rrrrrrrrrrrrrrr',res)
            this.articlesList = res.data;
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["articleCategory", "adList"])
  },
  watch: {
    articleCategory: function() {
      this.getnewBow()
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.articleCategory.rows) {
        this.getnewBow()
      }
    });
  }
};
</script>


<style lang="scss" scoped>
.newBox {
  .news {
    height: 300px;
    display: flex;
    background-color: #fff;
    .swperBox {
      padding: 20px;
      overflow: hidden;
      width: 500px;
      display: flex;
    }
    .newsList {
      flex: 1;
      padding: 0 20px 20px 0;
      overflow: hidden;
      h1 {
        height: 45px;
        line-height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        .more {
          font-size: 14px;
          a {
            font-weight: 400;
            color: #999;
            &:hover {
              color: orange;
            }
          }
        }
      }
      ul {
        margin-top: 15px;
        li {
          line-height: 30px;
          a {
            color: #555;
            &:hover {
              color: orange;
            }
          }
        }
      }
    }
  }
  .adBox {
    margin-top: 2px;
    height: 170px;
    background-color: #fff;
  }
}
</style>
