<template>
  <div class="home container">
    <h2>Summary</h2>
    <el-tag size="mini">Parsed: {{ parsed }}</el-tag
    ><br /><br />
    <el-button @click="select(uniqueCourses)">cGPA: {{ cgpa }}</el-button>
    <el-button @click="select(uniqueCourses)"
      >Average Mark: {{ avgMark }}</el-button
    >

    <el-button @click="select(uniqueCourses)"
      >Total Credit: {{ weightSum }}</el-button
    >
    <el-button @click="select(finishedUniqueCourses)"
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
import { Courses, DeptCountType } from '../../core/types';
import { Course } from '../../core/lib';
import { mapGetters } from 'vuex';
import { calCoursesWeightSum, round } from '../../core/utils';

export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      coursesConsideredDisplay: [] as Courses,
    };
  },
  computed: {
    ...mapGetters([
      'academicHistory',
      'allCourses',
      'uniqueCourses',
      'completeCourses',
      'finishedUniqueCourses',
      'gpaByDept',
      'parsed',
    ]),
    deptData() {
      return Object.entries(this.gpaByDept as DeptCountType).map(
        ([dept, value]) => {
          return {
            dept,
            gpaAvg: round(value.gpaAvg, 2),
            markAvg: round(value.markAvg, 2),
            numCourses: value.courseCodes.length,
          };
        }
      );
    },
    weightSum() {
      return calCoursesWeightSum(this.uniqueCourses);
    },
    weightSumDone() {
      return calCoursesWeightSum(this.finishedUniqueCourses);
    },
    avgMark() {
      return round(this.academicHistory.getAvgMark(), 2);
    },
    cgpa() {
      return round(this.academicHistory.getNumberCGPA(), 2);
    },
  },
  watch: {
    parsed: function (val) {
      console.log(`parsed changed to ${val}`);
      if (val === false) {
        this.coursesConsideredDisplay = [];
      } else {
        this.coursesConsideredDisplay = this.uniqueCourses;
      }
    },
  },
  mounted() {
    this.coursesConsideredDisplay = this.uniqueCourses; // init display
    setTimeout(() => {
      this.coursesConsideredDisplay = this.uniqueCourses; // init display
    }, 500);
  },
  methods: {
    download() {
      const json_file = URL.createObjectURL(
        new Blob([JSON.stringify(this.academicHistory, null, 2)], {
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
    select(courses: Courses) {
      this.coursesConsideredDisplay = courses;
    },
    cellClick(row: any, column: any, cell: any, event: any) {
      const courseCodeSet = new Set(this.gpaByDept[row.dept].courseCodes);
      this.coursesConsideredDisplay = this.uniqueCourses.filter(
        (course: Course) => courseCodeSet.has(course.courseCode)
      );
    },
  },
});
</script>

<style scoped>
.course-code-tooltip {
  margin: 0.3em;
}
.table-container {
  width: 30em;
}
</style>
