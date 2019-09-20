<template>
  <div class="timeDown">
    <div v-show="!isOpening">
      <span class="bgtime hour" v-if="formatTime(curTimeNum).day">{{formatTime(curTimeNum).day}}</span>
      <span class="hourtxt" v-if="formatTime(curTimeNum).day">天</span>
      <span class="bgtime hour" v-if="formatTime(curTimeNum).hour">{{formatTime(curTimeNum).hour}}</span>
      <span class="hourtxt" v-if="formatTime(curTimeNum).hour">时</span>
      <span class="bgtime minute">{{formatTime(curTimeNum).min}}</span>
      <span>分</span>
      <span class="bgtime second">{{formatTime(curTimeNum).second}}</span>
      <span>秒</span>
    </div>
    <div v-show="isOpening">
      <span class="opening" v-if="isLastQs>0">开奖中...</span>
      <span class="opening" v-else>封盘中...</span>
    </div>
  </div>
</template>


<script>
import { formatTimerCallback } from "assets/js/utils";
import { mapGetters } from 'vuex'

export default {
  name: "timeDown",
  props: {
    isLastQs: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      setTimeFunc: {},
      curTimeNum: 0,
      isOpening: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.timeDown();
    });
  },
  methods: {
    formatTime(time) {
      return formatTimerCallback(time);
    },
    timeDown() {
      let _self = this;
      try {
        _self.curTimeNum = _self.time;
        if (_self.curTimeNum <= 0) {
          _self.isOpening = true;
          if (_self.isLastQs > 0) {
            _self.$emit("callBackFunc", _self.isOpening);
          }
          return;
        }
        clearTimeout(_self.setTimeFunc);
        let _run = () => {
          _self.setTimeFunc = setTimeout(() => {
            _self.curTimeNum--;
            if (_self.curTimeNum > 0) {
              _self.isOpening = false;
              _run();
            } else {
              _self.isOpening = true;
              if (_self.isLastQs > 0) {
                _self.$emit("callBackFunc", _self.isOpening);
              }
            }
          }, 1000);
        };
        _run();
      } catch (err) {
        _self.isOpening = true;
        if (_self.isLastQs > 0) {
          _self.$emit("callBackFunc", _self.isOpening);
        }
      }
    }
  },
  computed: {
    ...mapGetters(['socketOpenResult']),
  },
  watch: {
    time() {
      this.timeDown();
      this.isOpening = false;
      this.$emit("callBackFunc", this.isOpening);
    },
    isLastQs() {
      if (this.isLastQs <= 0) {
        this.$emit("callBackFunc", false);
      }
    },
    curTimeNum() {
      if(this.curTimeNum <= 0) {
        this.isOpening = true
        this.$emit("callBackFunc", this.isOpening);
      }else {
        this.isOpening = false
        this.$emit("callBackFunc", this.isOpening);
      }
    },
  }
};
</script>


<style lang="scss" scoped>
.timeDown {
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    margin: 0 2px;
  }
  .bgtime {
    text-align: center;
    line-height: 36px;
    border-radius: 5px;
    color: #fff;
    width: 36px;
    height: 36px;
    background-color: #64616c;
    font-size: 24px;
    font-family: time;
  }
  .opening {
    color: red;
  }
}
</style>
