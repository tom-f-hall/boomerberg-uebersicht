/**
 * Abbreviates big numbers
 * ? Thanks to https://www.html-code-generator.com/javascript/shorten-long-numbers
 * @param   {[type]}  num  [num description]
 *
 * @return  {[type]}       [return description]
 */
export const intToString = (num) => {
    if (num < 1000) {
        return num;
    }
    var si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].v) {
            break;
        }
    }
    return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
  }