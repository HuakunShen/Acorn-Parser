<template>
  <div class="custom container">
    <!-- <el-affix :offset="80"> -->
    <div class="sticky-top result pt-3 pb-1">
      <h4>Average GPA: {{ avgGPA }}</h4>
      <h4>Average Mark: {{ avgMark }}</h4>
    </div>
    <!-- </el-affix> -->
    <CourseTable :data="tableData" @selectionChange="handleSelectionChange" />
  </div>
</template>

<script lang="js">
import { log, getColumnHeaderInfo, sessionTableStr2Obj, calAvgCoursesWeightedGPA, calAvgCoursesWeightedMark } from '../../core/utils';
import {getSampleData} from '../../core/sample'
import { AcademicHistory, Semester, Course } from '../../core/lib';
import CourseTable from '../components/CourseTable'

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      avgGPA: 0,
      avgMark: 0
    };
  },
  components: {CourseTable},
  mounted() {
    const ah = getSampleData()
    let courses = ah.getCompletedCourses().map(courseObj => {
      const {...obj} = courseObj;
      return obj;
    })
    this.tableData = courses
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0){
          this.avgGPA = calAvgCoursesWeightedGPA(this.multipleSelection).toFixed(2);
          this.avgMark = calAvgCoursesWeightedMark(this.multipleSelection).toFixed(2);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.custom {
  max-width: 40em;
  .result {
    background-color: #2d3436;
    color: white;
  }
}
</style>
