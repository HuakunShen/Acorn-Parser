<template>
  <v-container>
    <div id="direct-btns">
      <v-btn v-show="!onAcademicHistory" depressed color="primary" v-on:click="goToHistory()"
        >Go to Academic History</v-btn
      >
      <v-btn v-show="onCompletePage" depressed color="primary" v-on:click="parse()">Parse</v-btn>
      <v-btn
        v-show="onAcademicHistory && !onCompletePage"
        depressed
        color="primary"
        v-on:click="goTocompleteHistory()"
        >Go to Complete History</v-btn
      >
    </div>
    <h2>Summary</h2>
    <Summary />
    <br />
    <h2 v-on:click="click()">Department GPA</h2>
    <DepartmentGPA />
  </v-container>
</template>

<script lang="js">
import Vue from 'vue';
import Summary from '../components/Summary.vue';
import DepartmentGPA from '../components/DepartmentGPA.vue';
import {log} from '../utils/logger.ts';
import {academicHisUrl} from '../utils/constant.ts';

export default Vue.extend({
  name: 'Home',
  components: {
    Summary,
    DepartmentGPA,
  },
  data: () => {
    return { onAcademicHistory: false, onCompletePage: false };
  },
  mounted() {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0].url === academicHisUrl) {
        this.onAcademicHistory = true;
      }
    });
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'check_if_in_complete', (content) => {
        this.onCompletePage = content;
      });
    });
  },
  methods: {
    goToHistory: () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        if (tabs[0].url !== academicHisUrl) {
          chrome.tabs.create({
            url: academicHisUrl,
          });
          return;
        }
      });
    },
    goTocompleteHistory: function() {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'click_complete', () => {
          this.onCompletePage = true;
        });
      });
    },
    parse: () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        if (tabs.length && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, 'parse', (res) => {
            chrome.storage.sync.set({ history: res.data, parsed: true }, () => {
              log("Parsed History Saved")
            });
          });
        }
      });
    },
  },
});
</script>
