<template>
  <div class="global-options">
    <div>
      <el-button
        size="mini"
        class="m-1"
        v-show="!onAcademicHistoryPage"
        type="success"
        @click="goToUrl(academicPageUrl)"
        round
        >Go To Academic History</el-button
      >
      <el-button
        size="mini"
        class="m-1"
        v-show="onAcademicHistoryPage && !onCompleteAcademicHistoryPage"
        type="success"
        @click="clickCompleteHistory()"
        round
        >Go To Complete History</el-button
      >
      <el-button size="mini" class="m-1" type="info" @click="toToOptions()" round
        >Go To Full Screen Page</el-button
      >
    </div>
    <div><Download /></div>
    <div>
      <el-button
        v-show="onCompleteAcademicHistoryPage"
        class="m-1"
        size="mini"
        type="success"
        @click="parse"
        round
        >Parse</el-button
      >
      <el-button type="primary" size="mini" round @click="loadSampleData"
        >Load Sample Data</el-button
      >
      <el-button class="m-1" size="mini" type="danger" @click="clearHistory" round>Clear</el-button>
    </div>
    <div>
      <el-tag size="mini">Parsed: {{ parsed }}</el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import {
  executeParse,
  newTab,
  updateTabUrl,
  clickCompleteHistory,
  getCurrentTabURL,
  toToOptions,
} from '../utils/chromeHelper';
import { academicPageUrl } from '../../core/constants';
import { ErrorType } from '../../core/types';
import Download from '../components/Download.vue';

export default {
  data: () => {
    return { academicPageUrl };
  },
  components: {
    Download,
  },
  mounted() {
    this.initAH();
    this.updatePageStatus();
  },
  computed: {
    ...mapGetters(['onAcademicHistoryPage', 'onCompleteAcademicHistoryPage', 'parsed']),
  },
  methods: {
    ...mapActions(['initAH', 'updatePageStatus', 'clearHistory', 'loadSampleData']),
    parse() {
      if (!this.onCompleteAcademicHistoryPage) {
        alert('You have to be on the complete academic history page first before running parse');
      } else {
        executeParse(() => {
          this.initAH();
        });
      }
      this.updatePageStatus();
    },
    toToOptions() {
      toToOptions();
    },
    goToUrl(url: string) {
      getCurrentTabURL()
        .then((curURL: string) => {
          if (curURL.includes('acorn.utoronto.ca')) {
            updateTabUrl(url);
            setTimeout(() => this.updatePageStatus(), 1000);
          } else {
            newTab(url);
          }
        })
        .catch((err: ErrorType) => {
          console.error('cannot go to url');
          console.error(err);
        });
    },
    clickCompleteHistory() {
      clickCompleteHistory((res: boolean) => {
        setTimeout(() => {
          this.updatePageStatus();
          this.initAH();
        }, 2000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.global-options {
  text-align: center;
}
</style>
