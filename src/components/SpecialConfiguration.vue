<template>
  <div class="special-configuration">
    <div class="special-configuration-title">特殊配置</div>
    <div class="special-configuration-body" ref="special-configuration-body">
      <!-- <div :class="!showSpecialText ? 'line-clamp' : ''"> -->
      <span ref="special-configuration-text">
        {{ stationData.SpecialsaleCommont }}</span
      >
      <!-- </div>S
        <div class="gengduo" type="text" v-if="specialFleg" @click="specialOpenShow"> {{
                !showSpecialText ? '更多' : '关闭'
        }}</div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "SpecialConfiguration",
  data() {
    return {
      specialFleg: false,
      showSpecialText: false,
    };
  },
  props: {
    stationData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    if (
      this.$refs["special-configuration-text"].offsetWidth + 8 >
      this.$refs["special-configuration-body"].offsetWidth
    ) {
      this.specialFleg = true;
    } else {
      this.specialFleg = false;
    }
  },
  methods: {
    specialOpenShow() {
      this.showSpecialText = !this.showSpecialText;
    },
  },
};
</script>
<style lang="less">
.special-configuration {
  padding: 10px 5px;
  background-color: #f4f4f5;
  display: flex;

  .special-configuration-title {
    width: 80px;
    text-align: left;
    align-items: center;
    display: flex;
  }

  .special-configuration-body {
    flex: 1;
    text-align: left;
  }
}

.special-configuration-body {
  font-weight: 400;
  font-size: 14px;
  color: #444c55;
  font-family: PingFang SC;
}

.gengduo {
  float: right;
  padding: 2px 5px;
}

.line-clamp {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
}
</style>
