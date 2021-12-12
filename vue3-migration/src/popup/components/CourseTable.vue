<template>
  <el-table
    ref="multipleTable"
    :data="data"
    @selection-change="handleSelectionChange"
    :size="small"
    fit="false"
  >
    <el-table-column type="selection" />
    <el-table-column
      property="courseCode"
      label="Code"
      width="100"
      align="center"
      header-align="center"
    />
    <el-table-column property="mark" label="Mark" align="center" header-align="center" />
    <el-table-column property="numberGrade" label="GPA" align="center" header-align="center" />
    <el-table-column
      property="numberCourseAvg"
      label="Class Avg"
      align="center"
      width="90"
      header-align="center"
    />
    <el-table-column property="weight" label="Weight" align="center" />
    <el-table-column property="opt" label="Opt" align="center" />
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
