<template>
  <div class="course-tag-list">
    <el-tooltip
      class="item course-code-tooltip"
      effect="dark"
      v-for="course in courses2display"
      :key="course.courseCode"
      :content="`Mark: ${course.mark ? course.mark : 'CR'}, GPA: ${course.numberGrade ? course.numberGrade : 'N/A'}`"
      placement="top"
    >
      <el-button>{{ course.courseCode }}</el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
export default {
  props: ['courses2display'],
};
</script>

<style lang="scss" scoped>
.course-tag-list {
  .course-code-tooltip {
    margin: 0.3em;
  }
}
</style>
