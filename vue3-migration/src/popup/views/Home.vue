<template>
  <div class="home">
    <p>cGPA: {{ cgpa }}</p>
    <p>Average Mark: {{ avgMark }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getSampleData } from '../../core/sample';

export default defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      courses: [],
      avgMark: 0,
      cgpa: 0,
    };
  },
  mounted() {
    const ah = getSampleData();
    let courses = ah.getCompletedCourses().map((courseObj) => {
      const { ...obj } = courseObj;
      return obj;
    });
    this.courses = courses;
    this.avgMark = ah.getAvgMark().toFixed(2);
    this.cgpa = ah.getNumberCGPA().toFixed(2);
  },
});
</script>
