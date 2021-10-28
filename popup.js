const academic_history_columns = ['course_code', 'title', 'weight', 'mark', 'grade', 'course_avg'];

const parseTable = (res) => {
  if (res.success) {
    log(res.data);
    const flat_table = res.data.flat();
    let doc = URL.createObjectURL(
      new Blob([JSON.stringify({ courses: flat_table }, null, 2)], { type: 'application/json' })
    );
    chrome.downloads.download({
      url: doc,
      filename: 'academic_history.json',
      conflictAction: 'overwrite',
      saveAs: true,
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
});
