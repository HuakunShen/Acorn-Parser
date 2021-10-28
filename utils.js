const log = (message) => {
  chrome.runtime.sendMessage({
    action: 'log',
    message: message,
  });
};

const get_valid_courses = (course_table) => {
  return course_table.filter((course) => {
    return (
      course.grade !== 'IPR' &&
      course.mark.length != 0 &&
      course.weight !== '0.00' &&
      course.weight.length != 0
    );
  });
};

const get_avg_mark = (courses) => {
  let weighted_mark_sum = 0,
    weight_sum = 0;
  for (const course of courses) {
    if (course.grade !== 'IPR') {
      const weight = parseFloat(course.weight);
      weight_sum += weight;
      weighted_mark_sum += parseFloat(course.mark) * weight;
    }
  }
  return weighted_mark_sum / weight_sum;
};

const GPA_MAP = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0,
};
