<template>
  <div class="navContainer" v-if="lotteryCodes">
    <ul class="nav">
      <li
        v-for="(item, index) of lotteryCodes"
        :class="{'active':item.code == curLotteryCode}"
        @click="changeLotteryCode(item.code)"
        :key="index"
        v-show="index < 10"
      >{{item.name}}</li>
      <li
        :class="['gamesHall', {'navHover': mouseonNavGameshall || mouseonGamesContainer}]"
        @mousemove="mouseonNavGameshall = true"
        @mouseout="mouseonNavGameshall = false"
        v-show="lotteryCodes.length > 10"
      >
        更多彩种
        <i class="fas fa-bars"></i>
      </li>
    </ul>
    <div
      class="gamesContainer"
      v-show="mouseonNavGameshall || mouseonGamesContainer"
      @mousemove="mouseonGamesContainer = true"
      @mouseout="mouseonGamesContainer = false"
    >
      <div class="gamesCol" v-for="(item, index) of lotteryCodes" v-show="index > 9" :key="index">
        <ul class="games">
          <li
            class="game"
            :class="{'active':item.code == curLotteryCode}"
            :key="index"
            @click="changeLotteryCode(item.code)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { GAMESGROUP } from "@/config/config";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "VNav",
  props: ["lotteryCodes"],
  data() {
    return {
      mouseonNavGameshall: false,
      mouseonGamesContainer: false,
      GAMESGROUP: GAMESGROUP,
      page: "index"
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters(["curLotteryCode"])
  },
  methods: {
    ...mapActions(["chengecurLotteryCode"]),

    // 切换彩种
    changeLotteryCode(code) {
      this.chengecurLotteryCode(code);
      this.$router.push("/Data/historyData");
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" scoped>
.navContainer {
  width: 100%;
  height: 40px;
  position: relative;
  .nav {
    height: 100%;
    display: flex;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 14px;
      flex: 1;
      cursor: pointer;
      &:hover,
      &.active {
        color: #e73f3f;
        background-color: #fff;
      }
      svg {
        margin-left: 5px;
      }
    }
  }
  .gamesHall {
    margin-bottom: 0;
  }
  .navHover,
  .router-link-active {
    color: #e73f3f !important;
    background-color: #fff;
  }
  .gamesContainer {
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 9;
    width: 130px;
    box-sizing: border-box;
    min-height: 200px;
    background-color: #fff;
    border: 1px solid #eee;
    border-top: none;
    box-shadow: 10px 9px 13px -11px #1f1f1f;
    .gamesCol {
      text-align: center;
      border-bottom: 1px solid #efefef;
      vertical-align: middle;
      &:nth-last-of-type(1) {
        border: none;
      }
      .title {
        display: inline-block;
        width: 10%;
        font-weight: 600;
        color: #555;
        font-size: 15px;
      }
      .games {
        display: inline-block;
        text-align: center;
        .game {
          display: inline-block;
          margin: 0 10px 0 10px;
          cursor: pointer;
          padding: 2px 8px;
          border-radius: 4px;
          color: #555;
          &:hover,
          &.active {
            background: #e73f3f;
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
