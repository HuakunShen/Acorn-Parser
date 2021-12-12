<template>
  <div class="home container">
    <el-button @click="select(coursesConsideredAll)"
      >cGPA: {{ cgpa }}</el-button
    >
    <el-button @click="select(coursesConsideredAll)"
      >Average Mark: {{ avgMark }}</el-button
    >

    <el-button @click="select(uniqueCourses)"
      >Total Credit: {{ weightSum }}</el-button
    >
    <el-button @click="select(finishedCourses)"
      >Total Credit Finished: {{ weightSumDone }}</el-button
    >
    <el-button @click="download" type="primary">Download</el-button>
    <!-- <el-button v-for="(dept, value) in Object.entries(gpaByDept)" :key="dept"
      >{{ dept }} {{ value }}</el-button
    > -->
    <div class="table-container mt-3 mx-auto">
      <el-table
        :data="deptData"
        border
        @cell-click="cellClick"
        :default-sort="{ prop: 'numCourses', order: 'descending' }"
      >
        <el-table-column
          class="dept-col-cell"
          property="dept"
          label="Dept."
          align="center"
          header-align="center"
        />
        <el-table-column
          property="gpaAvg"
          sortable
          label="GPA"
          align="center"
          header-align="center"
        />
        <el-table-column
          property="markAvg"
          sortable
          label="Mark"
          align="center"
          header-align="center"
        />
        <el-table-column
          sortable
          property="numCourses"
          label="# Course"
          align="center"
          header-align="center"
        />
      </el-table>
    </div>
    <div class="course-considered mt-5">
      <h2>Course Considered</h2>
      <el-tooltip
        class="item course-code-tooltip"
        effect="dark"
        v-for="course in coursesConsideredDisplay"
        :key="course.courseCode"
        :content="`Mark: ${course.mark}, GPA: ${course.numberGrade}`"
        placement="top"
      >
        <el-button>{{ course.courseCode }}</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getSampleData } from '../../core/sample';
import { DeptCountType, Courses } from '../../core/types';
import { AcademicHistory, Course } from '../../core/lib';
import {
  calCoursesWeightSum,
  round,
  filterNotToCalculateCourses,
} from '../../core/utils';
export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      uniqueCourses: [] as Courses, // year courses could repeat
      finishedCourses: [] as Courses,
      avgMark: 0,
      cgpa: 0,
      ah: new AcademicHistory([]),
      coursesConsideredAll: [] as Courses,
      coursesConsideredDisplay: [] as Courses,
      gpaByDept: {} as DeptCountType,
    };
  },
  computed: {
    deptData() {
      return Object.entries(this.gpaByDept).map(([dept, value]) => {
        return {
          dept,
          gpaAvg: round(value.gpaAvg, 2),
          markAvg: round(value.markAvg, 2),
          numCourses: value.courseCodes.length,
        };
      });
    },
    weightSum() {
      // TODO: Total Credit seems to be wrong, fix this problem
      if (this.ah != undefined)
        return calCoursesWeightSum(this.uniqueCourses as Courses);
      else return 0;
    },
    weightSumDone() {
      if (this.ah != undefined) {
        return calCoursesWeightSum(
          this.uniqueCourses.filter((c: Course) =>
            Object.setPrototypeOf(c, Course.prototype).toConsider()
          )
        );
      } else {
        return 0;
      }
    },
  },
  mounted() {
    const ah = getSampleData();
    this.ah = ah;
    const uniqueCourses: Courses = ah.getUniqueCourses();
    this.uniqueCourses = uniqueCourses;
    this.coursesConsideredAll = uniqueCourses;
    this.finishedCourses = filterNotToCalculateCourses(uniqueCourses);
    this.coursesConsideredDisplay = this.coursesConsideredAll; // init display
    this.avgMark = round(ah.getAvgMark(), 2);
    this.cgpa = round(ah.getNumberCGPA(), 2);
    this.gpaByDept = ah.getGPAByDept();
  },
  methods: {
    download() {
      const json_file = URL.createObjectURL(
        new Blob([JSON.stringify(this.ah, null, 2)], {
          type: 'application/json',
        })
      );
      chrome.downloads.download({
        url: json_file,
        filename: 'academic_history.json',
        conflictAction: 'overwrite',
        saveAs: true,
      });
    },
    select(courseCodes: Courses) {
      this.coursesConsideredDisplay = courseCodes;
    },
    cellClick(row, column, cell, event) {
      const courseCodeSet = new Set(this.gpaByDept[row.dept].courseCodes);
      this.coursesConsideredDisplay = this.uniqueCourses.filter(
        (course: Course) => courseCodeSet.has(course.courseCode)
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.course-code-tooltip {
  margin: 0.3em;
}
.table-container {
  width: 30em;
}
</style>
