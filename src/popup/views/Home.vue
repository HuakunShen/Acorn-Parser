<template>
  <div class="home container">
    <h2>Summary</h2>
    <el-button @click="select(uniqueCourses)">cGPA: {{ cgpa }}</el-button>
    <el-button @click="select(uniqueCourses)">Average Mark: {{ avgMark }}</el-button>

    <el-button @click="select(uniqueCourses)">Total Credit: {{ weightSum }}</el-button>
    <el-button @click="select(finishedUniqueCourses)"
      >Total Credit Finished: {{ weightSumDone }}</el-button
    >
    <div class="table-container mt-3 mx-auto">
      <DeptTable @cellClick="cellClick" />
    </div>
    <div class="course-considered mt-5">
      <h2>Course Considered</h2>
      <CourseTagList :courses2display="courses2display" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Courses, DeptCountType } from '../../core/types';
import { Course } from '../../core/lib';
import { mapGetters } from 'vuex';
import { calCoursesWeightSum, round } from '../../core/utils';
import DeptTable from '../components/DeptTable.vue';
import CourseTagList from '../components/CourseTagList.vue';
export default defineComponent({
  name: 'Home',
  components: { DeptTable, CourseTagList },
  data() {
    return {
      courses2display: [] as Courses,
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
    weightSum(): number {
      return calCoursesWeightSum(this.uniqueCourses);
    },
    weightSumDone(): number {
      return calCoursesWeightSum(this.finishedUniqueCourses);
    },
    avgMark(): number {
      return round(this.academicHistory.getAvgMark(), 2);
    },
    cgpa(): number {
      return round(this.academicHistory.getNumberCGPA(), 2);
    },
  },
  watch: {
    parsed: function (val) {
      this.courses2display = !val ? ([] as Courses) : this.uniqueCourses;
    },
  },
  mounted() {
    this.courses2display = this.uniqueCourses; // init display
    setTimeout(() => {
      this.courses2display = this.uniqueCourses; // init display
    }, 500);
  },
  methods: {
    select(courses: Courses) {
      this.courses2display = courses;
    },
    cellClick(row: any, column: any, cell: HTMLElement, event: any) {
      const courseCodeSet = new Set(this.gpaByDept[row.dept].courseCodes);
      this.courses2display = this.uniqueCourses.filter((course: Course) =>
        courseCodeSet.has(course.courseCode)
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.home {
  text-align: center;

  .course-code-tooltip {
    margin: 0.3em;
  }
  .table-container {
    width: 40em;
  }
}
</style>
