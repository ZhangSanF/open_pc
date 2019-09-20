<template>
    <div class="wrap408">
        <div class="content">
            <p class="text">请勿非法操作，或核对您的设备时间 !</p>
            <router-link tag="a" to="/">返回首页</router-link>
        </div>
    </div>
</template>

<script>

  export default {
    name: "page408",
    methods: {
      
    },
  };

</script>

<style lang="scss" scoped>
  .wrap408{
      .content{
          position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);text-align: center;
          .text{
            font-size: 22px;margin-bottom: 5px;
          }
          a{
            font-size: 18px;color: #0080FF;
          }
      }
  }
</style>
