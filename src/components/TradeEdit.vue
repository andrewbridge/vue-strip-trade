<template>
    <div>
        <TradeInformation :id="id"></TradeInformation>
        <OptionsPanel :id="id"></OptionsPanel>
        <OptionTotals :id="id"></OptionTotals>
    </div>
</template>

<script>
import TradeInformation from './TradeInformation.vue';
import OptionsPanel from './OptionsPanel.vue';
import OptionTotals from './OptionTotals.vue';

export default {
  name: 'TradeEdit',
  components: {
    OptionsPanel,
    TradeInformation,
    OptionTotals
  },
  props: {
    id: String,
  },
};
</script>

<style scoped lang="scss">

</style>
