<template>
    <div class="lotteryAnalysis">
        <div class="title">
            <h2>彩种分析</h2>
        </div>
        <div class="list">
            <ul>
                <li class="item">
                    <div class="trendBox row">
                        <div class="head">
                            <img src="https://1680118.com/img/index_r/beijinpk10.png?v=20189271110" alt="">
                            <span>北京PK10</span>
                        </div>
                        <div class="iconBox">
                            <div class="name">
                                <i class="fas fa-chart-line icon trend"></i>
                                <span>走势</span>
                            </div>
                            <span class="more">更多</span>
                        </div>
                        <div class="other">
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                        </div>
                    </div>
                    <div class="missBox row">
                        <div class="iconBox">
                            <div class="name">
                                <i class="fas fa-list icon miss"></i>
                                <span>遗漏</span>
                            </div>
                            <span class="more">更多</span>
                        </div>
                        <div class="other">
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                            <span>冠亚和走势</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
  name: "lotteryAnalysis"
};
</script>


<style lang="scss" scoped>
.lotteryAnalysis {
    background-color: #fff;
    .title{
        height: 50px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        font-size: 20px;
        border-bottom: 1px solid #f0f0f0;
    }
    .list{
        padding: 15px;
        .item{
            border-bottom: 1px solid #f0f0f0;
            .row{
                &.trendBox{
                    border-bottom: 1px solid #f0f0f0;
                }
                .head{
                    height: 45px;
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: 20px;
                    }
                }
                .iconBox{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15px;
                    height: 20px;
                    .name{
                        font-size: 16px;
                        color: #555;
                        .icon{
                            &.trend{
                                color: #0f98df;
                            }
                            &.miss{
                                color: #ff0e3e;
                            }
                        }
                        span{
                            margin-left: 15px
                        }
                    }
                    .more{
                        color: #999;
                        cursor: pointer;
                        &:hover{
                            color: orange;
                        }
                    }
                }
                .other{
                    padding: 10px 15px;
                    line-height: 25px;
                    span{
                        padding: 0 5px;
                        color: #999;
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                            color: #de0846;
                        }
                    }
                }
            }
        }
    }
}
</style>
