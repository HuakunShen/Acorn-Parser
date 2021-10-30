var log = console.log;
var header_str = "Crs Code  Title                                    Wgt  Mrk  Grd  CrsAvg   ";
var table1 = "CSC148H1  Intro to Comp Sci                        0.50  83  A-     B      \nCSC165H1  Math Expr&Rsng for Cs                    0.50  77  B+     B-     \nMAT137Y1  Calculus!                                1.00      IPR           \nSPA100Y1  Span for Beginners                       1.00      IPR           ";
var table2 = "CSC165H1  Math Expr&Rsng for Cs                    0.50  98  A+     B-  EXT\nECO101H1  Principles of Microeconomics             0.50  67  C+     C      \nMAT137Y1  Calculus!                                1.00  71  B-     C      \nMAT223H1  Linear Algebra I                         0.50  87  A      C+     \nSPA100Y1  Span for Beginners                       1.00  73  B      B-     ";
var table3 = "CSC207H1  Software Design                          0.50  93  A+     B+     \nCSC336H1  Numerical Methods                        0.50  80  A-     B      \nCSC343H1  Intro to Databases                       0.50  81  A-     B-     \nMAT235Y1  Calculus Sci II                          1.00      IPR           \nSTA247H1  Prob Comp Appl                           0.50  67  C+     C+     ";
var table4 = "CSC457H1  Principles of Computer Netwrks           0.50      IPR           \nCSC458H1  Computer Networks                        0.50      IPR           \nCSC494H1  Project in CSC                           0.50      IPR           \n          Studying Reliability of CV Models                                \n          Supervised by M. Chechik                                         \nSTA442H1  Methods Applied Stat                     0.50      IPR           ";
var headers = ["courseCode", "title", "weight", "mark", "grade", "courseAvg", "opt"];
var objsToArrays = function (table) {
    var col_names = Object.keys(table[0]);
    var row_arr = table.map(function (row_obj) { return Object.values(row_obj); });
    return { col_names: col_names, table: row_arr };
};
var arraysToObjs = function (col_names, table) {
    var obj_list = [];
    var _loop_1 = function (col_list) {
        var obj = {};
        col_names.forEach(function (col_name, idx) {
            obj[col_name] = col_list[idx];
        });
        obj_list.push(obj);
    };
    for (var _i = 0, table_1 = table; _i < table_1.length; _i++) {
        var col_list = table_1[_i];
        _loop_1(col_list);
    }
    return obj_list;
};
var get_column_header_info = function (header_str) {
    var col_names = header_str
        .split('  ')
        .map(function (col) { return col.trim(); })
        .filter(function (col) { return col.length != 0; });
    var col_indices = col_names.map(function (col) { return header_str.indexOf(col); });
    col_indices.push(header_str.length);
    return { col_names: col_names, col_indices: col_indices };
};
var tableStr2TableObj = function () {
    var table_rows = table_str.split('\n');
    // Column 2, title, can have multiple lines, need to merge the lines into a single line
    var valid_row_idx = [];
    table_rows.forEach(function (row, index) {
        var first_col = row.substring(col_indices[0], col_indices[1]);
        if (first_col.trim().length !== 0) {
            valid_row_idx.push(index);
        }
    });
    var row_list = [];
    for (var _i = 0, table_rows_1 = table_rows; _i < table_rows_1.length; _i++) {
        var row = table_rows_1[_i];
        var col_list = [];
        for (var i = 1; i < col_indices.length; i++) {
            var val = row.substring(col_indices[i - 1], col_indices[i]).trim();
            col_list.push(val);
        }
        row_list.push(col_list);
    }
    var prev_valid_row = 0;
    var cur_valid = true;
    for (var _a = 0, _b = valid_row_idx.entries(); _a < _b.length; _a++) {
        var _c = _b[_a], idx = _c[0], valid_idx = _c[1];
        if (valid_idx > 1 + prev_valid_row) {
            for (var i = prev_valid_row + 1; i < valid_idx; i++) {
                // iterate columns
                var col_list = row_list[i];
                for (var _d = 0, _e = col_list.entries(); _d < _e.length; _d++) {
                    var _f = _e[_d], col_idx = _f[0], col_content = _f[1];
                    row_list[prev_valid_row][col_idx] += " " + col_content;
                }
            }
        }
        prev_valid_row = valid_idx;
    }
    row_list = valid_row_idx.map(function (idx) { return row_list[idx]; });
    var new_row_list = [];
    for (var _g = 0, _h = row_list.entries(); _g < _h.length; _g++) {
        var _j = _h[_g], idx = _j[0], col_list = _j[1];
        var new_col_list = col_list.splice(0, col_list.length - 1);
        var last_col = col_list[col_list.length - 1];
        var col_split = last_col.split('  ');
        var _k = [last_col, ''], grade = _k[0], opt = _k[1];
        if (col_split.length != 1) {
            grade = col_split[0], opt = col_split[1];
            grade = grade.trim();
            opt = opt.trim();
        }
        new_col_list.push(grade);
        new_col_list.push(opt);
        new_row_list.push(new_col_list);
    }
    return arraysToObjs(headers, new_row_list);
};
var header_info = get_column_header_info(header_str);
var col_indices = header_info.col_indices;
var table_str = table2;
log(tableStr2TableObj(table_str));
//# sourceMappingURL=exp2.js.map