<template>
    <div class="row-inf" v-for="(title, index) in titles" :key="index">
      <div class="semibold-title">{{ title }}</div>
      <div v-if="typeinfo==='RATING'" :class="'semibold-inf ' + getRatingStyle(values[index])">
        {{ values[index] !== null ? values[index] : '-' }}
      </div>
      <div v-else class="semibold-inf">
        {{ values[index] !== null ? values[index] : '-'}}
      </div>
    </div>
</template>

<script>
export default {
  props: {
    typeinfo: String,
    titles: Array,
    values: Array,
  },

  methods: {
    getRatingStyle(rate) {

      if (rate == null) {
        return "color-inf-na";
      }

      if (rate < 10) {
        rate *= 10;
      }

      if (rate < 40 ) {
        return "color-inf-bad";
      } else if (rate >= 40 && rate <= 70) {
        return "color-inf-good";
      } else if (rate > 70) {
        return "color-inf-exelent";
      } else {
        return "color-inf-na";
      }
    }, 
  },

};
</script>

<style scoped>
.row-inf {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: #f5f5f5;
}

.semibold-title, .text-format {
  font-weight: 700;
}

.semibold-inf, .semibold-title, .text-format {
  font-size: 20px;
}

.color-inf-exelent {
  color: #2dc233;
}

.color-inf-good {
  color: #e97c17;
}

.color-inf-bad {
  color: rgb(253, 0, 0)
}

.color-inf-na {
    color: #c617e9;
}
</style>