const academic_history_columns = ['course_code', 'title', 'weight', 'mark', 'grade', 'course_avg'];

const get_column_header_info = (header_str) => {
  const col_names = header_str
    .split('  ')
    .map((col) => col.trim())
    .filter((col) => col.length != 0);
  const col_indices = col_names.map((col) => header_str.indexOf(col));
  return { col_names, col_indices };
};

// on complete history link clicked
$('[data-ng-click="$ctrl.getComplete()"]').click(() => {
  setTimeout(() => {
    parse_tables();
  }, 1000);
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req) {
    case 'parse':
      const res = parse_tables();
      sendResponse(res);
      break;
    case 'click_complete':
      go_to_complete_history();
      break;
    case 'check_if_in_complete':
      sendResponse(is_in_complete_history());
      break;
    default:
  }
});

const is_in_complete_history = () => {
  const is_complete_history = $('.history-academic-complete').length === 1;
  const is_recent_history = $('.academic-history-recent').length === 1;
  return is_complete_history;
};

const go_to_complete_history = () => {
  const is_complete_history = $('.history-academic-complete').length === 1;
  const is_recent_history = $('.academic-history-recent').length === 1;
  if (is_recent_history && !is_complete_history) {
    document.querySelector('[data-ng-click="$ctrl.getComplete()"').click();
  }
};

const parse_tables = () => {
  const is_recent_history = $('.academic-history-recent').length === 1;
  const is_complete_history = $('.history-academic-complete').length === 1;

  if (is_recent_history) {
    const tables = $('[data-ng-repeat="session in $ctrl.data.academicData"]');
    console.log(tables);
    return {
      success: false,
      message: 'This is recent academic history, I parse only complete academic history.',
      data: tables,
    };
  } else if (is_complete_history) {
    const header_str = $('.coursesHeader.pre-elem')[0].innerText;
    const header_info = get_column_header_info(header_str);
    const tables = $('.courses.blok.pre-elem'); // table here are in string format, need to be formated
    const table_list = [];
    $('.courses.blok.pre-elem').each((idx, ele) => {
      const table_str = ele.innerText;
      const table_str_list = table_str.split('\n');
      if (table_str_list[table_str_list.length - 1].length == 0) {
        table_str_list.pop();
      }
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
        const last_col_val = row_str.substring(header_info.col_indices[-1]).trim();
        // decide whether the last column has multiple value, such as EXT
        const last_col_split = last_col_val.split('  ');
        if (last_col_split.length == 1) {
          col_list.push(last_col_val);
        } else if (last_col_split.length == 2) {
          col_list.push(last_col_split[0].trim());
          // TODO: Handle this case, it may be a EXT or something else
          // may be ignore the extra stuff?
        } else {
          console.log('last_col_val has more than 2 columns, case not handled');
        }
        row_list.push(col_list);
      });
      table_list.push(row_list);
    });

    const tables_obj = table_list.map((table) => {
      return table.map((row) => {
        return Object.fromEntries(
          academic_history_columns.map((_, i) => [academic_history_columns[i], row[i]])
        );
      });
    });

    return {
      success: true,
      message: '',
      data: tables_obj,
    };
  } else {
    return {
      success: false,
      message: 'No Academic History Found, please go to the correct web page and click parse.',
      data: null,
    };
  }
  return {
    success: false,
    message: 'No Academic History Found, please go to the correct web page and click parse.',
    data: null,
  };
};
