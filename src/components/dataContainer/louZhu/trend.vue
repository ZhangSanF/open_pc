<template>
  <!-- 路珠走势 -->
  <div>
    <div class="dewdrop" >
      <div class="tableBox">
        <div class="tableTitle">
          <div class="fl">
            <span>连续出现</span>
            <input type="text" ref="count" :value="count" class="num">
            <span>次以上</span>
            <select v-model="name">
              <option
                :value="typeName"
                v-for="(typeName) in  luzuList[cIndex].type_name"
                :key="typeName"
              >{{typeName}}</option>
            </select>
            <input type="button" @click="calcCount" value="确定" class="btn">
            <span>
              出现的次数为:
              <i class="show_num">{{appearCount}}</i>
            </span>
          </div>
          <div class="fr rightBox">
            <span>今天累计：</span>
            <span>{{luzuList[cIndex].type_name[0]}}（{{calcTotalCount(luzuList[cIndex].type_name[0])}}）</span>
            <span>{{luzuList[cIndex].type_name[1]}}（{{calcTotalCount(luzuList[cIndex].type_name[1])}}）</span>
            <span class="c-red num-mc">{{title[pIndex].location_name}}</span>
            <span class="c-red">{{luzuList[cIndex].type_name}}</span>
            <span class="c-red">最新&nbsp;↓</span>
          </div>
        </div>
        <div class="table" ref="table">
          <table cellspacing="0" cellpadding="0">
            <tr>
              <td
                v-for="(temp,index) in list"
                :key="index"
                :class="{'active':temp[0] == name && temp.length >= count && checked}"
              >
                <span
                  :class="{'red':num=='大' || num=='单'||num=='龙','blue': num=='小'||num=='双'||num=='虎'}"
                  v-for="(num,key) in temp"
                  :key="key"
                >{{num}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "louZhu",
  props: ["list", "pIndex", "title", "cIndex", "luzuList"],
  data() {
    return {
      count: "",
      name: "",
      checked: false,
      appearCount: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.name = this.luzuList[this.cIndex].type_name[0]
    });
  },
  methods: {
    // 计算统计
    calcTotalCount(name) {
      let count = 0;
      this.list.forEach(item => {
        item.forEach(obj => {
          if (name == obj) {
            count++;
          }
        });
      });
      return count;
    },
    // 计算出现次数
    calcAppearCount() {
      this.appearCount = this.$refs.table.querySelectorAll(".active").length;
    },
    // 计算连续出现
    calcCount() {
      this.count = this.$refs.count.value;
      if (this.count > 0) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.$nextTick(() => {
        this.calcAppearCount();
      });
    }
  },
};
</script>


<style lang="scss" scoped>
.louZhu {
  .dewdrop {
    .tableBox {
      margin-top: 15px;
      .tableTitle {
        height: 38px;
        line-height: 38px;
        background: #fafafa;
        border: 1px solid #e5e5e5;
        padding: 0 15px;
        font-size: 13px;
        box-sizing: border-box;
        overflow: hidden;
        .rightBox {
          span {
            margin-left: 5px;
          }
          .c-red {
            color: #e73f3f;
          }
        }
        input {
          margin: 7px 5px 0;
          height: 24px;
          border: 1px solid #e5e5e5;
          line-height: 22px;
          background: #fff;
          color: #666;
          outline: 0;
          width: 45px;
          text-align: center;
          font-size: 13px;
          padding: 0 3px;
        }
        .num {
          height: 22px;
          line-height: 22px;
          width: 40px;
        }
        select {
          margin: 7px 5px 0;
          color: #666;
          height: 24px;
          border: 1px solid #e5e5e5;
          line-height: 22px;
          background: #fff;
          width: 45px;
          text-align: center;
          font-size: 13px;
          padding: 0 3px;
        }
        .btn {
          background: #666;
          border-radius: 3px;
          color: #fff;
          border-color: #666;
          cursor: pointer;
          margin-right: 10px;
          &:hover {
            opacity: 0.85;
          }
        }
        i {
          font-style: normal;
        }
      }
      .table {
        width: 100%;
        margin-top: -1px;
        overflow-x: scroll;
        direction: rtl;
        table {
          width: 100%;
          box-sizing: border-box;
          td {
            text-align: center;
            vertical-align: top;
            padding: 5px 5px 15px;
            min-width: 19px;
            border: 1px solid #e5e5e5;
            &.active {
              background-color: #f9fb05;
            }
            .red {
              color: #e73f3f;
            }
            .blue {
              color: #3771de;
            }
            span {
              display: block;
              line-height: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
}
</style>
