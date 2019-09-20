<template>
    <div class="gridAd">
        <div class="banner">
            <img :src="item.img" v-for="(item,index) in adList.rows" v-show="item.identification == 'rightAd1'" :key="index" @click="hanldClick(item.url)" alt="">
        </div>
        <div class="grid">
            <div v-for="(item,index) in adList.rows" v-show="item.identification == 'rightAd2'" :key="index">
                <img :src="item.img" @click="hanldClick(item.url)"  alt="">
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { goImgUrl } from "assets/js/utils";

export default {
    name: 'gridAd',
    computed:{
        ...mapGetters(['adList'])
    },
    methods:{
        hanldClick(url) {
            goImgUrl(url)
        }
    }
}
</script>


<style lang="scss" scoped>
.gridAd{
    margin: 15px 0;
    .banner{
        height: 150px;
        cursor: pointer;
    }
    .grid{
        display: flex;
        flex-wrap: wrap;
        div{
            margin-top: 10px;
            cursor: pointer;
            height: 100px;
            width: calc(50%-10px);
            box-sizing: border-box;
            &:nth-of-type(2n){
                margin-right: 10px;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
