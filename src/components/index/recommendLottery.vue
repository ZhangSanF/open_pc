<template>
    <div class="recommendLottery">
        <div class="title">
            <h2>推荐彩种</h2>
            <span>RECOMMEND LOTTERY</span>
        </div>
        <div class="lotteryList">
            <ul>
                <li v-for="(item,index) in lotteryCodes" v-show="index < 12" :key="index" @click="goHistoryData(item.code)">
                    <img :src="item.logo" alt="">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name:'recommendLottery',
    computed:{
        ...mapGetters(['lotteryCodes'])
    },
    methods: {
        ...mapActions(["chengecurLotteryCode"]),
        goHistoryData(code) {
            // console.log(code)
            this.chengecurLotteryCode(code);
            this.$router.push("/Data/historyData");
        }
    }
}
</script>


<style lang="scss" scoped>
.recommendLottery{
    background-color: #fff;
    height: 400px;
    overflow: hidden;
    padding: 10px 20px;
    .title{
        text-align: center;
        border-bottom: 1px solid #cdcc;
        height: 50px;
        padding-top: 10px;
        box-sizing: border-box;
        h2{
            font-size: 20px;
        }
        span{
            padding: 0 10px;
            color: #999;
            background-color: #fff;

        }
    }
    .lotteryList{
        margin-top: 20px;
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                cursor: pointer;
                color: #555;
                &:hover{
                    color: orange;
                }
                text-align: center;
                width: 33%;
                padding: 2px 0;
                img{
                    width: 52px;
                    height: 52px;
                }
            }
        }
    }
}
</style>
