const log = (message) => {
  chrome.runtime.sendMessage({
    action: 'log',
    message: message,
  });
};
const academic_history_url = 'https://acorn.utoronto.ca/sws/#/history/academic';
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

const get_avg_gpa = (courses) => {
  let weighted_gpa_sum = 0,
    weight_sum = 0;
  for (const course of courses) {
    if (course.grade !== 'IPR') {
      const weight = parseFloat(course.weight);
      weight_sum += weight;
      const letter_grade = course.grade;
      const gpa = GPA_MAP[letter_grade];
      weighted_gpa_sum += gpa * weight;
    }
  }
  return weighted_gpa_sum / weight_sum;
};

const avg_by_department = (courses) => {
  let _courses = courses.filter((course) => course.grade !== 'IPR');
  const data = {};
  for (const course of _courses) {
    const dept = course.course_code.substring(0, 3);
    if (!(dept in data)) {
      data[dept] = { weight_sum: 0, mark_sum: 0, gpa_sum: 0 };
    }
    const weight = parseFloat(course.weight);
    data[dept].weight_sum += weight;
    data[dept].mark_sum += parseFloat(course.mark) * weight;
    const letter_grade = course.grade;
    const gpa = GPA_MAP[letter_grade];
    data[dept].gpa_sum += gpa * weight;
  }
  const result = {};
  for (const [dept, d] of Object.entries(data)) {
    result[dept] = {
      avg_mark: d.mark_sum / d.weight_sum,
      avg_gpa: d.gpa_sum / d.weight_sum,
      total_credit: d.weight_sum,
    };
  }
  return result;
};

const get_total_credit = (courses) => {
  let _courses = courses.filter((course) => course.grade !== 'IPR');
  const weights = _courses.map((course) => parseFloat(course.weight));
  return weights.reduce((a, b) => a + b);
};
