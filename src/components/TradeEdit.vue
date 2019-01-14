<template>
    <div>
        <TradeInformation :id="id"></TradeInformation>
        <OptionsPanel :id="id"></OptionsPanel>
        <OptionsTotals :id="id"></OptionsTotals>
    </div>
</template>

<script>
import TradeInformation from './TradeInformation.vue';
import OptionsPanel from './OptionsPanel.vue';
import OptionsTotals from './OptionsTotals.vue';

export default {
  name: 'TradeEdit',
  components: {
    OptionsPanel,
    TradeInformation,
    OptionsTotals,
  },
  props: {
    id: String,
  },
};
</script>

<style scoped lang="scss">

</style>
