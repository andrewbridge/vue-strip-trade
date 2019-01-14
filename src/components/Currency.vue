<template>
    <select v-bind:value="value" v-on:change="$emit('input', $event.target.value)">
        <option
                v-for="(currency, index) in currencies"
                v-bind:key="index"
                :value="currency">{{currency}}</option>
    </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Currency',
  props: {
    value: String,
  },
  computed: mapState(['currencies']),
};
</script>
