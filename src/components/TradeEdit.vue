<template>
    <div>
        <TradeInformation :id="id"></TradeInformation>
        <OptionsPanel :id="id"></OptionsPanel>
    </div>
</template>

<script>
import TradeInformation from './TradeInformation.vue';
import OptionsPanel from './OptionsPanel.vue';

export default {
  name: 'TradeEdit',
  components: {
    OptionsPanel,
    TradeInformation
  },
  props: {
    id: String,
  },
};
</script>

<style scoped lang="scss">

</style>
