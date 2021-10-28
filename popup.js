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

const parseTable = (res) => {
  if (res.success) {
    log(res.data);
    const flat_table = res.data.flat();

    chrome.storage.sync.set({ course_table: flat_table }, () => {
      log('course_table set');
    });
  } else {
    log(res.message);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  $('#parse-btn').click(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, 'parse', parseTable);
    });
  });

  $('#download-json-btn').click(() => {
    download_file();
  });
});
