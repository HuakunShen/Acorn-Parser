import { createStore } from 'vuex';
import { getSampleData } from '../../core/sample';
import { AcademicHistory, Course } from '../../core/lib';
import { DeptCountType, Courses, ParseTableResponse } from '../../core/types';
import { log, warn } from '../../core/utils';
import { clearChromeStorage } from '../utils/chromeHelper';
import {
  checkOnAcademicHistory,
  checkOnCompleteAcademicHistory,
  clickCompleteHistory,
} from '../utils/chromeHelper';
export default createStore({
  state: {
    academicHistory: new AcademicHistory([]),
    parsed: false,
    onAcademicHistoryPage: false,
    onCompleteAcademicHistoryPage: false,
  },
  getters: {
    academicHistory: (state): AcademicHistory => state.academicHistory,
    allCourses: (state, getters): Courses => getters.academicHistory.getAllCourses(),
    uniqueCourses: (state, getters): Courses => getters.academicHistory.getUniqueCourses(),
    completeCourses: (state, getters): Courses => getters.academicHistory.getCompletedCourses(),
    finishedUniqueCourses: (state, getters): Courses =>
      getters.uniqueCourses.filter((c: Course) => c.toConsider()),
    gpaByDept: (state, getters): DeptCountType => getters.academicHistory.getGPAByDept(),
    parsed: (state) => state.parsed,
    onAcademicHistoryPage: (state) => state.onAcademicHistoryPage,
    onCompleteAcademicHistoryPage: (state) => state.onCompleteAcademicHistoryPage,
  },
  mutations: {
    setAcademicHistory(state, academicHistory: AcademicHistory): void {
      state.academicHistory = academicHistory;
    },
    setParsed(state, value: boolean): void {
      state.parsed = value;
    },
    setOnAcademicHistoryPage(state, value: boolean): void {
      state.onAcademicHistoryPage = value;
    },
    setOnCompleteAcademicHistoryPage(state, value: boolean): void {
      state.onCompleteAcademicHistoryPage = value;
    },
  },
  actions: {
    initAH({ commit }): void {
      if (!chrome || !chrome.tabs || !chrome.tabs.query) {
        warn('chrome ext not available, sample data will be used');
        commit('setAcademicHistory', getSampleData());
        commit('setParsed', true);
      } else {
        chrome.storage.local.get(['history', 'parsed'], function (result) {
          const ah = result.history
            ? AcademicHistory.loadFromJsObj(result.history)
            : new AcademicHistory([]);
          commit('setAcademicHistory', ah);
          commit('setParsed', result.parsed ? result.parsed : false);
        });
      }
    },
    loadSampleData({ commit }): void {
      commit('setAcademicHistory', getSampleData());
      commit('setParsed', true);
    },
    updatePageStatus({ commit }): void {
      checkOnAcademicHistory((res) => {
        commit('setOnAcademicHistoryPage', res);
      });
      checkOnCompleteAcademicHistory((res) => {
        commit('setOnCompleteAcademicHistoryPage', res);
      });
    },
    clearHistory({ commit }): void {
      commit('setParsed', false);
      commit('setAcademicHistory', new AcademicHistory([]));
      clearChromeStorage((res) => {
        res ? log('chrome storage cleared') : warn('chrome storage fail to clear');
      });
    },
  },

  modules: {},
});
