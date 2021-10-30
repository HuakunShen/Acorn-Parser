const academic_history_columns = [
  'course_code',
  'title',
  'weight',
  'mark',
  'grade',
  'course_avg',
];

const download_file = () => {
  chrome.storage.sync.get(['course_table'], function (result) {
    const json_file = URL.createObjectURL(
      new Blob([JSON.stringify({ courses: result }, null, 2)], {
        type: 'application/json',
      })
    );
    chrome.downloads.download({
      url: json_file,
      filename: 'academic_history.json',
      conflictAction: 'overwrite',
      saveAs: true,
    });
  });
};

const parseTableCallback = (res) => {
  if (res.success) {
    chrome.storage.sync.set({ course_table: res.data, parsed: true }, () => {
      update_general_info_table();
      update_avg_by_department_table();
      update_buttons();
    });
  } else {
    log(res.message);
  }
};

const update_buttons = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs[0].url !== academic_history_url) {
      $('#go-history-btn').show();
      $('#parse-btn').hide();
      $('#go-complete-btn').hide();
    } else {
      $('#go-history-btn').hide();
      // on the page
      chrome.tabs.sendMessage(tabs[0].id, 'check_if_in_complete', (res) => {
        if (res) {
          $('#go-complete-btn').hide();
          $('#parse-btn').show();
        } else {
          $('#go-complete-btn').show();
          $('#parse-btn').hide();
        }
      });
    }
    chrome.storage.sync.get(['parsed'], (result) => {
      result.parsed === true
        ? $('#download-json-btn').show()
        : $('#download-json-btn').hide();
    });
  });
};

const get_general_info_table_dataset = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['parsed', 'course_table'], (result) => {
      const dataset = [['Parsed', result.parsed]];
      const course_table = result.course_table;
      if (result.parsed) {
        const flat_table = course_table.flat();
        const valid_courses = get_valid_courses(flat_table);
        const avg_mark = get_avg_mark(valid_courses).toFixed(2);
        log(`avg mark: ${avg_mark}`);
        const avg_gpa = get_avg_gpa(valid_courses).toFixed(2);
        log(`avg gpa: ${avg_gpa}`);
        dataset.push(['Average Mark', avg_mark]);
        dataset.push(['Average GPA', avg_gpa]);
        dataset.push(['Total Credit So Far', get_total_credit(valid_courses)]);
      }
      resolve(dataset);
    });
  });
};

const update_general_info_table = async () => {
  const dataset = await get_general_info_table_dataset();
  const datatable = $('#general-info-table').DataTable();
  datatable.clear();
  datatable.rows.add(dataset);
  datatable.draw();
};

const update_avg_by_department_table = async () => {
  const dataset = await get_avg_by_department_table_dataset();
  const datatable = $('#dept-avg-table').DataTable();
  datatable.clear();
  datatable.rows.add(dataset);
  datatable.draw();
};

const get_avg_by_department_table_dataset = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['parsed', 'course_table'], (result) => {
      const course_table = result.course_table;
      const dataset = [];
      if (result.parsed) {
        const flat_table = course_table.flat();
        const valid_courses = get_valid_courses(flat_table);
        const res = avg_by_department(valid_courses);
        for (const [dept, data] of Object.entries(res)) {
          dataset.push([
            dept,
            data.avg_mark.toFixed(2),
            data.avg_gpa.toFixed(2),
            data.total_credit,
          ]);
        }
      }
      resolve(dataset);
    });
  });
};

const go_to_history_page = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs[0].url !== academic_history_url) {
      chrome.tabs.create({
        url: academic_history_url,
      });
      return;
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  update_buttons();

  $('#parse-btn').click(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'parse', parseTableCallback);
    });
  });

  $('#go-history-btn').click(() => {
    log('go to page');
    go_to_history_page();
  });

  $('#go-complete-btn').click(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'click_complete');
      update_buttons();
    });
  });
  $('#download-json-btn').click(() => {
    download_file();
  });
  $(document).ready(() => {
    get_general_info_table_dataset().then((dataset) => {
      $('#general-info-table').DataTable({
        data: dataset,
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        columns: [{ title: 'Key' }, { title: 'Value' }],
      });
    });
    get_avg_by_department_table_dataset().then((dataset) => {
      $('#dept-avg-table').DataTable({
        data: dataset,
        searching: false,
        paging: false,
        ordering: false,
        info: false,
        columns: [
          { title: 'Dept.' },
          { title: 'Avg. Mark' },
          { title: 'Avg. GPA' },
          { title: 'Total Credit' },
        ],
      });
    });
  });
});
