<template>
  <div >
        <div >
            <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
        </div>
        <div>
            23
        </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {

  mounted(){
      this.getTest()
  },
  methods:{
   ...mapActions(['getTest'])
  },
  computed: {
      
  },
}
</script>

<style scoped lang="scss">
    .loading{
        position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0,0,0,0.5);z-index: 10000;
        .lds-spin {
            position: absolute;top: 50%;left: 50%;
            -webkit-transform: translate(-71.5px, -71.5px) scale(0.715) translate(71.5px, 71.5px);
            transform: translate(-71.5px, -71.5px) scale(0.715) translate(71.5px, 71.5px);
        }
        @keyframes lds-spin {
            0% {
                opacity: 1;
                -webkit-transform: scale(1.1, 1.1);
                transform: scale(1.1, 1.1);
            }
            100% {
                opacity: 0;
                -webkit-transform: scale(1, 1);
                transform: scale(1, 1);
            }
        }
        .lds-spin div > div {
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #fff;
            -webkit-animation: lds-spin 1s linear infinite;
            animation: lds-spin 1s linear infinite;
        }
        .lds-spin div:nth-child(1) > div {
            left: 150px;
            top: 80px;
            -webkit-animation-delay: -0.875s;
            animation-delay: -0.875s;
        }
        .lds-spin > div:nth-child(1) {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transform-origin: 170px 100px;
            transform-origin: 170px 100px;
        }
        .lds-spin div:nth-child(2) > div {
            left: 129.49747467px;
            top: 129.49747467px;
            -webkit-animation-delay: -0.75s;
            animation-delay: -0.75s;
        }
        .lds-spin > div:nth-child(2) {
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            -webkit-transform-origin: 149.49747467px 149.49747467px;
            transform-origin: 149.49747467px 149.49747467px;
        }
        .lds-spin div:nth-child(3) > div {
            left: 80px;
            top: 150px;
            -webkit-animation-delay: -0.625s;
            animation-delay: -0.625s;
        }
        .lds-spin > div:nth-child(3) {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            -webkit-transform-origin: 100px 170px;
            transform-origin: 100px 170px;
        }
        .lds-spin div:nth-child(4) > div {
            left: 30.502525329999997px;
            top: 129.49747467px;
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
        }
        .lds-spin > div:nth-child(4) {
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            -webkit-transform-origin: 50.50252533px 149.49747467px;
            transform-origin: 50.50252533px 149.49747467px;
        }
        .lds-spin div:nth-child(5) > div {
            left: 10px;
            top: 80px;
            -webkit-animation-delay: -0.375s;
            animation-delay: -0.375s;
        }
        .lds-spin > div:nth-child(5) {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg);
            -webkit-transform-origin: 30px 100px;
            transform-origin: 30px 100px;
        }
        .lds-spin div:nth-child(6) > div {
            left: 30.502525329999997px;
            top: 30.502525329999997px;
            -webkit-animation-delay: -0.25s;
            animation-delay: -0.25s;
        }
        .lds-spin > div:nth-child(6) {
            -webkit-transform: rotate(225deg);
            transform: rotate(225deg);
            -webkit-transform-origin: 50.50252533px 50.50252533px;
            transform-origin: 50.50252533px 50.50252533px;
        }
        .lds-spin div:nth-child(7) > div {
            left: 80px;
            top: 10px;
            -webkit-animation-delay: -0.125s;
            animation-delay: -0.125s;
        }
        .lds-spin > div:nth-child(7) {
            -webkit-transform: rotate(270deg);
            transform: rotate(270deg);
            -webkit-transform-origin: 100px 30px;
            transform-origin: 100px 30px;
        }
        .lds-spin div:nth-child(8) > div {
            left: 129.49747467px;
            top: 30.502525329999997px;
            -webkit-animation-delay: 0s;
            animation-delay: 0s;
        }
        .lds-spin > div:nth-child(8) {
            -webkit-transform: rotate(315deg);
            transform: rotate(315deg);
            -webkit-transform-origin: 149.49747467px 50.50252533px;
            transform-origin: 149.49747467px 50.50252533px;
        }
        .lds-spin div:nth-child(9) > div {
            left: 150px;
            top: 80px;
            -webkit-animation-delay: 0.125s;
            animation-delay: 0.125s;
        }
        .lds-spin > div:nth-child(9) {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
            -webkit-transform-origin: 170px 100px;
            transform-origin: 170px 100px;
        }
    }  
</style>
