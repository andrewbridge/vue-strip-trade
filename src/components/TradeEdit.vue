<template>
    <div>
        <header>
            <TradeInformation :id="id"></TradeInformation>
        </header>
        <main>
            <OptionsPanel :id="id"></OptionsPanel>
            <OptionsTotals :id="id"></OptionsTotals>
        </main>
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
    header {
        position: fixed;
        width: 100%;
    }

    main {
        padding-top: 25vh;
    }
</style>
