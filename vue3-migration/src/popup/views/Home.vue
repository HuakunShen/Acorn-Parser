<template>
  <div class="home container">
    <el-button @click="select(coursesConsideredAll)">cGPA: {{ cgpa }}</el-button>
    <el-button @click="select(coursesConsideredAll)">Average Mark: {{ avgMark }}</el-button>
    <!-- <el-button v-for="(dept, value) in Object.entries(gpaByDept)" :key="dept"
      >{{ dept }} {{ value }}</el-button
    > -->
    <div class="table-container mt-3 mx-auto">
      <el-table :data="deptData" border @cell-click="cellClick" width="10%">
        <el-table-column
          class="dept-col-cell"
          property="dept"
          label="Dept."
          align="center"
          header-align="center"
        />
        <el-table-column property="gpaAvg" label="GPA" align="center" header-align="center" />
        <el-table-column property="markAvg" label="Mark" align="center" header-align="center" />
      </el-table>
    </div>
    <div class="course-considered mt-5">
      <h2>Course Considered</h2>
      <el-tag class="course-tags" v-for="item in coursesConsideredDisplay" :key="item">{{
        item
      }}</el-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getSampleData } from '../../core/sample';
import { Course } from '../../core/lib';
import { DeptCountType } from '../../core/types';
export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      courses: [] as Course[],
      avgMark: 0,
      cgpa: 0,
      coursesConsideredAll: [] as string[],
      coursesConsideredDisplay: [] as string[],
      gpaByDept: {} as DeptCountType,
    };
  },
  computed: {
    deptData() {
      return Object.entries(this.gpaByDept).map(([dept, value]) => {
        return { dept, gpaAvg: value.gpaAvg.toFixed(2), markAvg: value.markAvg.toFixed(2) };
      });
    },
  },
  mounted() {
    const ah = getSampleData();
    let courses = ah.getCompletedCourses().map((courseObj) => {
      const { ...obj } = courseObj;
      return obj;
    });
    this.courses = courses;
    this.coursesConsideredAll = courses.map((c: Course) => c.courseCode);
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
      this.coursesConsideredDisplay = this.gpaByDept[row.dept].courseCodes;
    },
  },
});
</script>

<style lang="scss" scoped>
.course-tags {
  margin: 0.3em;
}
.table-container {
  width: 20em;
}
</style>
