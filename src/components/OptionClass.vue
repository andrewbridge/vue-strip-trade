<template>
    <select v-bind:value="value" v-on:change="$emit('input', $event.target.value)">
        <option v-for="optionClass in optionClasses" :value="optionClass">{{optionClass}}</option>
    </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OptionClass',
  props: {
    value: String,
  },
  computed: mapState(['optionClasses']),
};
</script>
