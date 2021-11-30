<template>
  <v-container>
    <h2>Summary</h2>
    <Summary />
    <br />
    <h2 v-on:click="click()">Department GPA</h2>
    <DepartmentGPA />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Summary from '../components/Summary.vue';
import DepartmentGPA from '../components/DepartmentGPA.vue';
export default Vue.extend({
  name: 'Home',

  components: {
    Summary,
    DepartmentGPA,
  },
  methods: {
    click: () => {
      chrome.tabs.query(
        { currentWindow: true, active: true },
        (tabs: chrome.tabs.Tab[]) => {
          if (tabs.length && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, 'parse', () => {
              console.log('callback');
            });
          }
        }
      );
    },
  },
  mounted() {
    this.click();
  },
});
</script>
