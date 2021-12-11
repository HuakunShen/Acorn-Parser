<template>
  <el-table
    ref="multipleTable"
    :data="data"
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
    <el-table-column property="mark" label="Mark" align="center" width="50" header-align="center" />
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
</template>
<script>
export default {
  props: {
    data: {
      default: [],
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('selectionChange', val);
    },
  },
};
</script>
