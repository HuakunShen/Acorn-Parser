<template>
  <div id="nav">
    <router-link class="link" to="/">Home</router-link> |
    <router-link class="link" to="/custom">Custom</router-link> |
    <router-link class="link" to="/about">About</router-link>

    <div>
      <el-button
        size="mini"
        class="m-1"
        v-show="!onAcademicHistoryPage"
        type="success"
        @click="newTab(academicPageUrl)"
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
    <router-view />
  </div>
</template>
<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { executeParse, newTab, clickCompleteHistory } from './utils/chromeHelper';
import { academicPageUrl } from '../core/constants';
import Download from './components/Download.vue';
export default {
  data: () => {
    return { academicPageUrl };
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
    newTab(url: string) {
      newTab(url);
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
  computed: {
    ...mapGetters(['onAcademicHistoryPage', 'onCompleteAcademicHistoryPage', 'parsed']),
  },
  mounted() {
    this.initAH();
    this.updatePageStatus();
  },
  components: {
    Download,
  },
};
</script>
<style>
#app {
  min-width: 50em;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
