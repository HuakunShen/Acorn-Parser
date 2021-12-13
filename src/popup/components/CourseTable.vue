<template>
  <el-table
    ref="multipleTable"
    @cell-click="cellClick"
    :data="data"
    @selection-change="handleSelectionChange"
    size="mini"
    :fit="false"
  >
    <el-table-column type="selection" />
    <el-table-column
      property="courseCode"
      sortable
      label="Code"
      width="100"
      align="center"
      header-align="center"
    />
    <el-table-column property="mark" sortable label="Mark" align="center" header-align="center" />
    <el-table-column
      property="numberGrade"
      sortable
      label="GPA"
      align="center"
      header-align="center"
    />
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
<script lang="ts">
import { DeptCountType } from '../../core/types';

export default {
  props: {
    data: {
      default: [] as DeptCountType[],
    },
  },
  methods: {
    handleSelectionChange(row: DeptCountType): void {
      this.$emit('selectionChange', row);
    },
    cellClick(row: any, column: any, cell: HTMLElement, event: any): void {
      (this.$refs.multipleTable as any).toggleRowSelection(row);
    },
  },
};
</script>
