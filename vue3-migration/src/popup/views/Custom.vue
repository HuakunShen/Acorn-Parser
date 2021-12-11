<template>
  <div class="custom container">
    <div class="mx-auto">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        size="mini"
        fit="true"
      >
        <el-table-column type="selection" />
        <el-table-column
          property="courseCode"
          label="Course Code"
          width="100"
          align="center"
          header-align="center"
        />
        <el-table-column
          property="mark"
          label="Mark"
          align="center"
          width="50"
          header-align="center"
        />
        <el-table-column
          property="numberCourseAvg"
          label="Class Average"
          align="center"
          width="110"
          header-align="center"
        />
        <el-table-column property="weight" label="Weight" width="60" align="center" />
        <el-table-column
          property="numberGrade"
          label="GPA"
          width="50"
          align="center"
          header-align="center"
        />
        <!-- <el-table-column label="Overwrite GPA">
          <template #default="scope">
            <el-input v-model="tableData[scope.$index].numberGrade" placeholder="GPA" size="mini" />
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection()">Clear selection</el-button>
      <p>Average GPA: {{ avgGPA }}</p>
    </div>
  </div>
</template>

<script lang="js">
import { log, getColumnHeaderInfo, sessionTableStr2Obj, calAvgCoursesWeightedGPA } from '../../core/utils';
import {
  sampleTables,
  sampleGpaStr,
  sampleSessionStr,
  sampleHeaderStr,
} from '../../core/sample_data';
import { AcademicHistory, Semester, Course } from '../../core/lib';


export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      avgGPA: 0,
      input: "x"
    };
  },
  mounted() {
    const colHeaderInfo = getColumnHeaderInfo(sampleHeaderStr);
    const sessionTables = sampleTables.map((tableStr) =>
      sessionTableStr2Obj(tableStr, sampleSessionStr, sampleGpaStr, colHeaderInfo)
    );
    const ah = new AcademicHistory(sessionTables);
    let courses = ah.getAllCourses().map(courseObj => {
      const {...obj} = courseObj;
      return obj;
    })
    // courses.forEach(c => {
    //   c.origGpa=c.numberGrade;
    // })
    log(courses);
    this.tableData = courses
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();      // clear all checkbox
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 0){
          this.avgGPA = calAvgCoursesWeightedGPA(this.multipleSelection).toFixed(2);
      }
    },
    handleOverwriteGPA(index, row) {
      console.log(index, row)
    },
  },
};
</script>

<style lang="scss" scoped>
.custom {
  max-width: 35em;
}
</style>
