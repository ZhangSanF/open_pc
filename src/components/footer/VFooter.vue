<template>
  <div class="footer" ref="footer">
    <ul>
      <li>声明：本网资讯仅供彩票爱好者浏览、购买彩票参考之用。任何人不得用于非法用途，否则责任自负。</li>
      <li>本网所登载广告均为广告客户的个人意见及表达方式，和本网无任何关系。</li>
      <li>
        {{baseSettingBase.site_icp}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "vfooter",
  data() {
    return {

    };
  },
  methods: {
    // parseDom(arg) {
    //   var objE = document.createElement("div");

    //   objE.innerHTML = arg;
    //   return objE.firstChild;
    // },

    // loadScript(dom) {
    //   var head = document.getElementsByTagName("head")[0];
    //   var script = document.createElement("script");
    //   script.type = "text/javascript";

    //   if (dom.src) {
    //     script.src = dom.src;
    //     head.appendChild(script);
    //   } else {
    //     document.body.appendChild(dom);
    //   }
    // }
  },
  computed: {
    ...mapGetters(["baseSettingBase"])
  },
  watch: {
    // "baseSettingData.site_statis"() {
    //   this.$nextTick(() => {
    //     if (!this.baseSettingData.site_statis) return;
    //     var temp = this.baseSettingData.site_statis
    //       .replace(/&lt;+/g, "<")
    //       .replace(/&gt;+/g, ">");
    //     var dom = this.parseDom(temp);
    //     this.loadScript(dom);
    //   });
    // }
  }
};
</script>


<style lang="scss" scoped>
.footer {
  ul {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
    line-height: 35px;
    box-sizing: border-box;
  }
}
</style>
