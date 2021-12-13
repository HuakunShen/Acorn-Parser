<template>
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
    <el-table-column property="gpaAvg" sortable label="GPA" align="center" header-align="center" />
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
    <el-table-column
      sortable
      property="weight"
      label="Weight"
      align="center"
      header-align="center"
    />
  </el-table>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { DeptCountType, DeptTableRow } from '../../core/types';
import { round } from '../../core/utils';

export default {
  computed: {
    ...mapGetters(['gpaByDept']),
    deptData(): DeptTableRow[] {
      return Object.entries(this.gpaByDept as DeptCountType).map(([dept, value]) => {
        return {
          dept,
          gpaAvg: round(value.gpaAvg, 2),
          markAvg: round(value.markAvg, 2),
          numCourses: value.courseCodes.length,
          weight: value.weightSum,
        };
      });
    },
  },
  methods: {
    cellClick(row: any, column: any, cell: HTMLElement, event: any) {
      this.$emit('cellClick', row, column, cell, event);
    },
  },
};
</script>
