const academic_history_columns = ['course_code', 'title', 'weight', 'mark', 'grade', 'course_avg'];

const download_file = () => {
  log('download file');

  chrome.storage.sync.get(['course_table'], function (result) {
    const json_file = URL.createObjectURL(
      new Blob([JSON.stringify({ courses: result }, null, 2)], { type: 'application/json' })
    );
    chrome.downloads.download({
      url: json_file,
      filename: 'academic_history.json',
      conflictAction: 'overwrite',
      saveAs: true,
    });
  });
};

const calculate_course_average = () => {
  chrome.storage.sync.get(['course_table'], function (result) {});
};

const parseTable = (res) => {
  log(res);
  if (res.success) {
    log(res.data);
    const flat_table = res.data.flat();
    const valid_courses = get_valid_courses(flat_table);
    log(valid_courses);
    const avg_mark = get_avg_mark(valid_courses).toFixed(2);
    log(`avg_mark: ${avg_mark}`);
    // $('#avg-mark-value').val(avg_mark);
    chrome.storage.sync.set({ course_table: flat_table, avg_mark: avg_mark, parsed: true }, () => {
      log('course_table saved');
      $('#avg-mark-value').text(avg_mark);
      $('#parsed-indicator').text('true');
      $('#download-json-btn').show();
    });
  } else {
    log(res.message);
  }
};

const send_parse_signal = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'parse', parseTable);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  //   send_parse_signal();
  $('#download-json-btn').hide();
  $('#parse-btn').click(() => {
    send_parse_signal();
  });

  $('#download-json-btn').click(() => {
    download_file();
  });
});
