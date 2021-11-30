<template>
  <v-data-table
    :headers="headers"
    :items="summary"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Value', value: 'value' },
      ],
      summary: [
        {
          name: 'Parsed',
          value: 'true',
        },
      ],
    };
  },
};
</script>
