<template>
  <label role="checkbox" 
  @click="changeChecked"
  :class="['el-checkbox', {'is-checked': checked}]" :aria-checked="checked">
    <span aria-checked="mixed" :class="['el-checkbox__input', {'is-checked': checked}]">
      <span class="el-checkbox__inner"></span>
    </span>
    <span class="el-checkbox__label">{{text}}</span>
  </label>
</template>

<script>
  export default {
    name: "checkBox",
    props: {
      text: { //文字
        type: String,
        default: '备选项'
      },
      checked: { //是否选中
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        
      };
    },
    methods: {
      changeChecked() {
        this.$emit('checkedChanged');
      },
    },
    watch: {
      'checked': {
        handler: function() {console.log(this.checked);},
        deep: true
      },
    },
  };

</script>

<style lang="scss" scoped>
  .el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    .el-checkbox__input {
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
    }
    &:hover {
      color: #fa8e19;
    }
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #fa8e19;
  }
  .el-checkbox__inner {
      display: inline-block;
      position: relative;
      border: 1px solid #fa8e19;
      border-radius: 2px;
      box-sizing: border-box;
      width: 14px;
      height: 14px;
      background-color: #fff;
      z-index: 1;
      transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #fa8e19;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner:after {
      transform: rotate(45deg) scaleY(1);
  }
  .el-checkbox__inner:after {
      box-sizing: content-box;
      content: "";
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform .15s ease-in .05s;
      transform-origin: center;
  }
  .el-checkbox__original {
      opacity: 0;
      outline: none;
      position: absolute;
      margin: 0;
      width: 0;
      height: 0;
      z-index: -1;
  }
</style>
