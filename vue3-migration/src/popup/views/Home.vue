<template>
  <div class="home container">
    <el-button @click="select(coursesConsideredAll)"
      >cGPA: {{ cgpa }}</el-button
    >
    <el-button @click="select(coursesConsideredAll)"
      >Average Mark: {{ avgMark }}</el-button
    >

    <el-button>Total Credit: {{ weightSum }}</el-button>
    <el-button>Total Credit Finished: {{ weightSumDone }}</el-button>
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
import { Course } from '../../core/lib';
import { DeptCountType } from '../../core/types';
import { AcademicHistory } from '@/core/lib';
export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      courses: [] as Course[],
      avgMark: 0,
      cgpa: 0,
      ah: null,
      coursesConsideredAll: [] as Course[],
      coursesConsideredDisplay: [] as Course[],
      gpaByDept: {} as DeptCountType,
    };
  },
  computed: {
    deptData() {
      return Object.entries(this.gpaByDept).map(([dept, value]) => {
        return {
          dept,
          gpaAvg: value.gpaAvg.toFixed(2),
          markAvg: value.markAvg.toFixed(2),
          numCourses: value.courseCodes.length,
        };
      });
    },
    weightSum() {
      if (this.ah) {
        return Object.setPrototypeOf(this.ah, AcademicHistory.prototype)
          ?.getAllCourses()
          .map((c: Course) => c.weight)
          .reduce((a, b) => a + b, 0);
      } else {
        return 0;
      }
    },
    weightSumDone() {
      // console.log(this.ah?.getAllCourses());
      if (this.ah) {
        return Object.setPrototypeOf(this.ah, AcademicHistory.prototype)
          ?.getAllCourses()
          .filter((c: Course) =>
            Object.setPrototypeOf(c, Course.prototype).completed()
          )
          .map((c: Course) => c.weight)
          .reduce((a, b) => a + b, 0);
      } else {
        return 0;
      }
    },
  },
  mounted() {
    const ah = getSampleData();
    this.ah = ah;
    let courses = ah.getCompletedCourses().map((courseObj) => {
      const { ...obj } = courseObj;
      return obj;
    });
    this.courses = courses;
    this.coursesConsideredAll = courses;
    this.coursesConsideredDisplay = this.coursesConsideredAll;
    this.avgMark = ah.getAvgMark().toFixed(2);
    this.cgpa = ah.getNumberCGPA().toFixed(2);
    this.gpaByDept = ah.getGPAByDept();
  },
  methods: {
    select(courseCodes: string[]) {
      this.coursesConsideredDisplay = courseCodes;
    },
    cellClick(row, column, cell, event) {
      const courseCodeSet = new Set(this.gpaByDept[row.dept].courseCodes);
      this.coursesConsideredDisplay = this.courses.filter((course: Course) =>
        courseCodeSet.has(course.courseCode)
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
