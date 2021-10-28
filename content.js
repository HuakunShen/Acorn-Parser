const log = (message) => {
  chrome.runtime.sendMessage({
    action: 'log',
    message: message,
  });
};

log('from content.js');

const academic_history_columns = [
  'course_code',
  'title',
  'weight',
  'mark',
  'grade',
  'course_avg',
];

const get_column_header_info = (header_str) => {
  const col_names = header_str
    .split('  ')
    .map((col) => col.trim())
    .filter((col) => col.length != 0);
  const col_indices = col_names.map((col) => header_str.indexOf(col));
  return { col_names, col_indices };
};

const is_recent_history =
  document.getElementsByClassName('academic-history-recent').length === 1;
const is_complete_history =
  document.getElementsByClassName('history-academic-complete').length === 1;

if (is_recent_history) {
  const tables = $('[data-ng-repeat="session in $ctrl.data.academicData"]');
  log(tables);
} else if (is_complete_history) {
  const header_str = $('.coursesHeader.pre-elem')[0].innerText;
  const header_info = get_column_header_info(header_str);
  const tables = $('.courses.blok.pre-elem'); // table here are in string format, need to be formated
  $('.courses.blok.pre-elem').each((idx, ele) => {
    const table_str = ele.innerText;
    const table_str_list = table_str.split('\n');
    const row_list = [];
    table_str_list.forEach((row_str) => {
      const col_list = [];
      for (let i = 1; i < header_info.col_indices.length; i++) {
        const val = row_str
          .substring(header_info.col_indices[i - 1], header_info.col_indices[i])
          .trim();
        col_list.push(val);
      }
      // get the last coumn value
      const last_col_val = row_str
        .substring(header_info.col_indices[-1])
        .trim();
      // decide whether the last column has multiple value, such as EXT
      const last_col_split = last_col_val.split('  ');
      if (last_col_split.length == 1) {
        col_list.push(last_col_val);
      } else if (last_col_split.length == 2) {
        col_list.push(last_col_split[0].trim());
        // TODO: Handle this case, it may be a EXT or something else
        // may be ignore the extra stuff?
      } else {
        log('last_col_val has more than 2 columns, case not handled');
      }
      row_list.push(col_list);
    });
  });
} else {
  log("case not handled, didn't detect what history this is.");
}
