const log = console.log;
const header_str = `Crs Code  Title                                    Wgt  Mrk  Grd  CrsAvg   `;
const table1 = `CSC148H1  Intro to Comp Sci                        0.50  83  A-     B      
CSC165H1  Math Expr&Rsng for Cs                    0.50  77  B+     B-     
MAT137Y1  Calculus!                                1.00      IPR           
SPA100Y1  Span for Beginners                       1.00      IPR           `;
const table2 = `CSC165H1  Math Expr&Rsng for Cs                    0.50  98  A+     B-  EXT
ECO101H1  Principles of Microeconomics             0.50  67  C+     C      
MAT137Y1  Calculus!                                1.00  71  B-     C      
MAT223H1  Linear Algebra I                         0.50  87  A      C+     
SPA100Y1  Span for Beginners                       1.00  73  B      B-     `;
const table3 = `CSC207H1  Software Design                          0.50  93  A+     B+     
CSC336H1  Numerical Methods                        0.50  80  A-     B      
CSC343H1  Intro to Databases                       0.50  81  A-     B-     
MAT235Y1  Calculus Sci II                          1.00      IPR           
STA247H1  Prob Comp Appl                           0.50  67  C+     C+     `;
const table4 = `CSC457H1  Principles of Computer Netwrks           0.50      IPR           
CSC458H1  Computer Networks                        0.50      IPR           
CSC494H1  Project in CSC                           0.50      IPR           
          Studying Reliability of CV Models                                
          Supervised by M. Chechik                                         
STA442H1  Methods Applied Stat                     0.50      IPR           `;
const headers = [
  'courseCode',
  'title',
  'weight',
  'mark',
  'grade',
  'courseAvg',
  'opt',
];
type courseObject = {
  courseCode: string;
  title: string;
  weight: string;
  mark: string;
  grade: string;
  courseAvg: string;
  opt: string;
};
type coursesType = courseObject[];
type sessionType = {
  courses: coursesType;
  year: number;
  season: string;
};

const objsToArrays = (table: coursesType) => {
  const col_names = Object.keys(table[0]);
  const row_arr = table.map((row_obj) => Object.values(row_obj));
  return { col_names, table: row_arr };
};

const arraysToObjs = (col_names, table): coursesType => {
  const obj_list: coursesType = [];

  for (const col_list of table) {
    obj_list.push(
      col_names.reduce((obj, col_name, idx) => {
        obj[col_name] = col_list[idx];
        return obj;
      }, {})
    );
  }
  return obj_list;
};

const get_column_header_info = (header_str) => {
  const col_names = header_str
    .split('  ')
    .map((col) => col.trim())
    .filter((col) => col.length != 0);
  const col_indices = col_names.map((col) => header_str.indexOf(col));
  col_indices.push(header_str.length);
  return { col_names, col_indices };
};

const tableStr2TableObj = (
  table_str: string,
  sessionStr: string,
  gpaStr: string
): sessionType => {
  const table_rows = table_str.split('\n');

  // Column 2, title, can have multiple lines, need to merge the lines into a single line
  const valid_row_idx: Array<number> = [];
  table_rows.forEach((row, index) => {
    const first_col = row.substring(col_indices[0], col_indices[1]);
    if (first_col.trim().length !== 0) {
      valid_row_idx.push(index);
    }
  });

  let row_list = [];
  for (const row of table_rows) {
    const col_list = new Array();
    for (let i = 1; i < col_indices.length; i++) {
      const val = row.substring(col_indices[i - 1], col_indices[i]).trim();
      col_list.push(val);
    }
    row_list.push(col_list);
  }

  let prev_valid_row = 0;
  const cur_valid = true;

  for (const valid_idx of valid_row_idx) {
    if (valid_idx > 1 + prev_valid_row) {
      for (let i = prev_valid_row + 1; i < valid_idx; i++) {
        // iterate columns
        const col_list = row_list[i];
        for (const [col_idx, col_content] of col_list.entries()) {
          row_list[prev_valid_row][col_idx] += ` ${col_content}`;
        }
      }
    }
    prev_valid_row = valid_idx;
  }
  row_list = valid_row_idx.map((idx) => row_list[idx]);
  const new_row_list = [];
  for (const col_list of row_list) {
    const new_col_list = col_list.splice(0, col_list.length - 1);
    const last_col = col_list[col_list.length - 1];
    const col_split = last_col.split('  ');
    let [grade, opt] = [last_col, ''];
    if (col_split.length != 1) {
      [grade, opt] = col_split;
      grade = grade.trim();
      opt = opt.trim();
    }
    new_col_list.push(grade);
    new_col_list.push(opt);
    new_row_list.push(new_col_list);
  }
  const courses = arraysToObjs(headers, new_row_list);
  let [year, season] = sessionStr.split('-')[0].trim().split(' ');
  const lst = gpaStr
    .split('  ')
    .map((x) => x.trim())
    .filter((x) => x.length !== 0);
  const gpaObj = {};
  let i = 0;
  while (i < lst.length) {
    if (lst[i].includes('GPA') && i !== lst.length) {
      gpaObj[lst[i]] = lst[i + 1];
    } else if (lst[i].includes('Status:')) {
      gpaObj['status'] = lst[i].split(':')[1].trim();
    } else {
      log('ERROR: not handled');
    }
    i++;
  }
  return { courses, year: parseInt(year), season, ...gpaObj };
};

const header_info = get_column_header_info(header_str);
const col_indices = header_info.col_indices;
const tables = [table1, table2, table3, table4];
const table_objs = tables.map((table_str) =>
  tableStr2TableObj(
    table_str,
    '2017 Fall - 1st Year Studies in Computer Science - University College      ',
    'Sessional GPA   2.95  Annual GPA      3.09  Cumulative GPA  3.09            Status: In good standing     '
  )
);
log(table_objs);
// log(objsToArrays(table_obj));
