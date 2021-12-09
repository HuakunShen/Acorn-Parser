<template>
  <v-data-table
    :headers="headers"
    :items="summary"
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Dept.', value: 'dept' },
        { text: 'Avg. Mark', value: 'avgmark' },
        { text: 'Avg. GPA', value: 'avggpa' },
      ],
      summary: [
        {
          dept: 'CSC',
          avgmark: 90,
          avggpa: 'A+',
        },
      ],
    };
  },
};
</script>
