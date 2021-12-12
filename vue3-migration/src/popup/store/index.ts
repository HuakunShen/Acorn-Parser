import { createStore } from 'vuex';
import { getSampleData } from '../../core/sample';
import { AcademicHistory, Course } from '../../core/lib';
import { DeptCountType, Courses } from '../../core/types';
export default createStore({
  state: {
    academicHistory: new AcademicHistory([]),
  },
  getters: {
    academicHistory: (state): AcademicHistory => state.academicHistory,
    allCourses: (state, getters): Courses => getters.academicHistory.getAllCourses(),
    uniqueCourses: (state, getters): Courses => getters.academicHistory.getUniqueCourses(),
    completeCourses: (state, getters): Courses => getters.academicHistory.getCompletedCourses(),
    finishedUniqueCourses: (state, getters): Courses =>
      getters.uniqueCourses.filter((c: Course) => c.toConsider()),
    gpaByDept: (state, getters): DeptCountType => getters.academicHistory.getGPAByDept(),
  },
  mutations: {
    setAcademicHistory(state, academicHistory: AcademicHistory): void {
      state.academicHistory = academicHistory;
    },
  },
  actions: {
    initAH({ commit }): void {
      commit('setAcademicHistory', getSampleData());
    },
  },
  modules: {},
});
