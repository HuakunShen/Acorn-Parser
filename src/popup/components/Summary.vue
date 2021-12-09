<template>
  <v-data-table
    :headers="headers"
    :items="summary"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script lang="js">
// import { AcademicHistory } from '../../../core/lib';
import { log } from '../utils/logger';

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
  mounted: () => {
    chrome.storage.sync.get(['history'], function (result) {
      log(result);
    });
  },
};
</script>
