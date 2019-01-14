<template>
    <div>
        <TradeInformation :id="id"></TradeInformation>
        <div class="options-panel">

        </div>
        <div class="trade-totals">

        </div>
    </div>
</template>

<script>
import TradeInformation from './TradeInformation.vue';

export default {
  name: 'TradeEdit',
  components: {
    TradeInformation,
  },
  props: {
    id: String,
  },
};
</script>

<style scoped lang="scss">

</style>
