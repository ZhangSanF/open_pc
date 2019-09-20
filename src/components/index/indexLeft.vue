<template>
  <div class="left">
   
    <!-- 计划 -->
    <div>
      <forecast-plan-index/>
    </div>

    <!-- 热门彩种 -->
    <hot-lottery/>
  </div>
</template>

<script>
import ForecastPlanIndex from "./forecastPlanIndex";
import HotLottery from "./hotLottery";

export default {
  components: {
    ForecastPlanIndex,
    HotLottery
  }
};
</script>
