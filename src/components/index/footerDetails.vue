<template>
<div>
    <!-- <div v-for="(item,index) in baseSettingData.single_page" :key="index" class="articleDetails" >
        <div v-if="identification == item.identification">
            <div class="title">
                <h1>{{item.title}}</h1>
                <p>{{item.create_time}}</p>
            </div>
            <div v-html="item.content" class="content"></div>
        </div>
    </div> -->
</div>
  
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      identification: this.$route.params.identification
    };
  },
  computed:{
    // ...mapGetters(["baseSettingData"])
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    
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
