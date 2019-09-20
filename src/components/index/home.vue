<template>
    <div class="home">
        <!-- <div class="left">
        </div> -->
        <router-view/>
        <!-- <aside class="right"> -->
            <!-- 推荐彩种 -->
            <!-- <recommend-lottery/> -->

            <!-- 栅格广告 -->
            <!-- <grid-ad/> -->

            <!-- 文章列表 -->
            <!-- <articles-list/> -->

            <!-- 广告位 -->
            <!-- <div class="adBox">
                <img v-for="(item,index) in adList.rows" :key="index" :src="item.img" v-show="item.identification == 'rightAd3'" @click="hanldClick(item.url)" alt="">
            </div> -->

            <!-- 彩种分析 -->
            <!-- <lottery-analysis/> -->
        <!-- </aside> -->
    </div>
</template>

<script>

import RecommendLottery from './recommendLottery'
import GridAd from './gridAd'
import ArticlesList from './articlesList'
import LotteryAnalysis from './lotteryAnalysis'
import {mapActions, mapGetters} from 'vuex'
import { goImgUrl } from "assets/js/utils";

export default {
    name: 'home',
    components:{
        RecommendLottery,
        GridAd,
        ArticlesList,
        LotteryAnalysis
    },
    created(){
        this.getLotteryCodes()
    },
    methods:{
        ...mapActions(['getLotteryCodes']),
    },
    computed:{

    },
    mounted() {
        
    }
}
</script>


<style lang="scss" scoped>
.home{
    // margin: 15px 0;
    display: flex;
    .left{
        flex: 1;
        overflow: hidden;
    }
    .right{
        width: 320px;
        margin-left: 10px; 
        .adBox{
            margin: 15px 0;
            height: 170px;
            background-color: #fff;
        }
    }
}
</style>
