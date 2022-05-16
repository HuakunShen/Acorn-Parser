<template>
  <el-dropdown size="mini" @click="downloadJson" split-button type="primary">
    Download
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="downloadJson">Download json</el-dropdown-item>
        <el-dropdown-item @click="downloadCSV">Download csv</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Courses } from '@/core/types';
import { Course } from '@/core/lib';
import { defineComponent } from 'vue';
import { chromeDownload } from '@/ui/utils/chromeHelper';

export default defineComponent({
  computed: {
    ...mapGetters(['academicHistory']),
  },
  methods: {
    downloadJson() {
      const jsonBlob = new Blob([JSON.stringify(this.academicHistory, null, 2)], {
        type: 'application/json',
      });
      const jsonFile = URL.createObjectURL(jsonBlob);
      chromeDownload(jsonFile, 'academic_history.json', 'overwrite', true);
    },
    downloadCSV() {
      const allCourses: Courses = this.academicHistory.getAllCourses();
      const headerStr = ['course_code', 'mark', 'gpa', 'classAvg', 'complete'].join(',');
      const csvData = allCourses.map((c: Course) => {
        const mark: string = c.mark ? c.mark.toString() : '0';
        const numberGrade: string = c.numberGrade ? c.numberGrade.toString() : '0';
        const numberCourseAvg: string = c.numberCourseAvg ? c.numberCourseAvg.toString() : '0';
        return [c.courseCode, mark, numberGrade, numberCourseAvg, c.complete.toString()];
      });
      const data = headerStr + '\n' + csvData.map((row: string[]) => row.join(',')).join('\n');
      const csvBlob = URL.createObjectURL(
        new Blob([data], {
          type: 'text/json',
        })
      );
      chromeDownload(csvBlob, 'academic_history.csv', 'overwrite', true);
    },
  },
});
</script>
