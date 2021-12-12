!function(e){var t={};function r(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(s,o,function(t){return e[t]}.bind(null,o));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sessionTableStr2Obj=t.courseRowStr2CourseObj=t.round=t.filterNotToCalculateCourses=t.filterIncompleteCourses=t.filterDuplicateCourses=t.getColumnHeaderInfo=t.number2letterGpaMap=t.letter2numberGpaMap=t.calAvgCoursesWeightedGPA=t.calAvgCoursesWeightedMark=t.calWeightedCoursesMarkSum=t.calWeightedCoursesGPASum=t.calCoursesWeightSum=t.warn=t.error=t.log=void 0;const s=r(1);t.log=console.log,t.error=console.error,t.warn=console.warn;t.calCoursesWeightSum=e=>e.map(e=>e.weight).reduce((e,t)=>e+t,0);t.calWeightedCoursesGPASum=e=>e.map(e=>e.weight*e.numberGrade).reduce((e,t)=>e+t,0);t.calWeightedCoursesMarkSum=e=>e.map(e=>e.weight*e.mark).reduce((e,t)=>e+t,0);t.calAvgCoursesWeightedMark=e=>{const r=t.calCoursesWeightSum(e);return t.calWeightedCoursesMarkSum(e)/r};t.calAvgCoursesWeightedGPA=e=>{const r=t.calCoursesWeightSum(e);return t.calWeightedCoursesGPASum(e)/r},t.letter2numberGpaMap={"A+":4,A:4,"A-":3.7,"B+":3.3,B:3,"B-":2.7,"C+":2.3,C:2,"C-":1.7,"D+":1.3,D:1,"D-":.7,F:0},t.number2letterGpaMap=Object.fromEntries(Object.entries(t.letter2numberGpaMap).map(e=>e.reverse()));t.getColumnHeaderInfo=e=>{const t=e.split("  ").map(e=>e.trim()).filter(e=>0!=e.length),r=t.map(t=>e.indexOf(t));return r.push(e.length),{colNames:t,colIndices:r}};t.filterDuplicateCourses=e=>{const t={};return e.forEach(e=>{e.courseCode in t?e.toConsider()&&(t[e.courseCode]=e):t[e.courseCode]=e}),Object.values(t)};t.filterIncompleteCourses=e=>e.filter(e=>e.completed());t.filterNotToCalculateCourses=e=>e.filter(e=>e.toConsider());t.round=(e,t)=>Math.round(e*10**t)/10**t;t.courseRowStr2CourseObj=e=>{const r=new s.Course(e[0],e[1],parseFloat(e[2]),parseFloat(e[3]),t.letter2numberGpaMap[e[4]],t.letter2numberGpaMap[e[5]],e[6],"IPR"!==e[4]);return console.log(r),r};t.sessionTableStr2Obj=(e,r,o,n)=>{const u=e.split("\n"),{colIndices:l}=n,i=[];u.forEach((e,t)=>{0!==e.substring(l[0],l[1]).trim().length&&i.push(t)});let c=[];for(const e of u){const t=[];for(let r=1;r<l.length;r++){const s=e.substring(l[r-1],l[r]).trim();t.push(s)}c.push(t)}let a=0;for(const e of i){if(e>1+a)for(let t=a+1;t<e;t++){const e=c[t];for(const[t,r]of e.entries())c[a][t]+=" "+r}a=e}c=i.map(e=>c[e]);const m=[];for(const e of c){const t=e.splice(0,e.length-1),r=e[e.length-1],s=r.split("  ");let[o,n]=[r,""];1!=s.length&&([o,n]=s,o=o.trim(),n=n.trim()),t.push(o),t.push(n),m.push(t)}const p=m.map(e=>new s.Course(e[0],e[1],parseFloat(e[2]),parseFloat(e[3]),t.letter2numberGpaMap[e[4]],t.letter2numberGpaMap[e[5]],e[6],""!==e[3]&&"IPR"!==e[4]&&void 0!==t.letter2numberGpaMap[e[4]]));return new s.Semester(p,null===r?"":r,null===o?"":o)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AcademicHistory=t.Semester=t.Course=void 0;const s=r(0);class o{constructor(e,t,r,s,o,n,u,l){this.courseCode=e,this.title=t,this.weight=r,this.mark=s,this.numberGrade=o,this.numberCourseAvg=n,this.opt=u,this.complete=l}completed(){return this.complete}toConsider(){return this.completed()&&"EXT"!==this.opt}dept(){return this.courseCode.substring(0,3)}}t.Course=o;class n{constructor(e,t,r){this.courses=[],this.courses=e,this.sessionHdr=t,this.gpaHdr=r;const[o,n]=t.split("-")[0].trim().split(" ");this.year=parseInt(o),this.season=n;const u=r.split("  ").map(e=>e.trim()).filter(e=>0!==e.length);this.gpaSummary={};let l=0;for(;l<u.length;)u[l].includes("GPA")&&l!==u.length?(this.gpaSummary[u[l]]=parseFloat(u[l+1]),l++):u[l].includes("Status:")?this.gpaSummary.Status=u[l].split(":")[1].trim():s.error("ERROR: not handled, "+u[l]),l++}getTotalWeight(){return s.calCoursesWeightSum(this.courses)}getCompletedWeight(){return s.calCoursesWeightSum(this.courses.filter(e=>e.complete))}getCompletedCourses(){return this.courses.filter(e=>e.completed())}getAvgNumberGPA(){return s.calAvgCoursesWeightedGPA(this.getCompletedCourses())}getAvgLetterGPA(){return s.number2letterGpaMap[this.getAvgNumberGPA()]}getAvgMark(){return s.calAvgCoursesWeightedMark(this.getCompletedCourses())}}t.Semester=n;class u{constructor(e){this.semesters=[],this.semesters=e}getAllCourses(){return this.semesters.map(e=>e.courses).flat()}getUniqueCourses(){return s.filterDuplicateCourses(this.getAllCourses())}getCompletedCourses(){return this.getAllCourses().filter(e=>e.completed())}getTotalWeight(){return s.calCoursesWeightSum(this.getAllCourses())}getCompletedWeight(){return s.calCoursesWeightSum(this.getCompletedCourses())}getAvgMark(){return s.calAvgCoursesWeightedMark(this.getCompletedCourses())}getNumberCGPA(){return s.calAvgCoursesWeightedGPA(this.getCompletedCourses())}getLetterCGPA(){return s.number2letterGpaMap[this.getNumberCGPA()]}getGPAByDept(){const e=this.getCompletedCourses(),t=new Set(e.map(e=>e.courseCode)),r={};for(const e of t){const t=e.substring(0,3);r[t]={gpaSum:0,markSum:0,weightSum:0,courseCodes:[],gpaAvg:0,markAvg:0}}for(const t of e){const e=t.dept();r[e].gpaSum+=t.numberGrade*t.weight,r[e].markSum+=t.mark*t.weight,r[e].weightSum+=t.weight,r[e].courseCodes.push(t.courseCode)}return Object.entries(r).forEach(([e,t])=>{r[e].gpaAvg=r[e].gpaSum/r[e].weightSum,r[e].markAvg=r[e].markSum/r[e].weightSum}),r}static loadFromJson(e){const t=JSON.parse(e).semesters.map(e=>(e.courses=e.courses.map(e=>Object.setPrototypeOf(e,o.prototype)),Object.setPrototypeOf(e,n.prototype)));return new u(t)}}t.AcademicHistory=u},,,,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=r(0),o=r(1);s.log("content.ts"),chrome.runtime.onMessage.addListener((e,t,r)=>{switch(e){case"parse":const e=n();console.log(e),r(e);break;case"click_complete":(()=>{const e=1===$(".history-academic-complete").length;console.log(e);const t=1===$(".academic-history-recent").length;if(console.log(t),t&&!e){let e=document.querySelector('[data-ng-click="$ctrl.getComplete()"');e&&e.click()}})(),r();break;case"check_if_in_complete":r((()=>{const e=1===$(".history-academic-complete").length;$(".academic-history-recent").length;return e})())}});const n=()=>{const e=1===$(".academic-history-recent").length,t=1===$(".history-academic-complete").length;if(e){$('[data-ng-repeat="session in $ctrl.data.academicData"]');return{success:!1,message:"This is recent academic history, I parse only complete academic history.",data:null}}if(t){const e=document.querySelectorAll(".courses.blok.pre-elem"),t=[];return e.forEach((e,r)=>{var o;const n=(null==e?void 0:e.previousElementSibling).innerText,u=null===(o=null==e?void 0:e.previousElementSibling)||void 0===o?void 0:o.previousElementSibling,l="emph gpa-listing pre-elem"==u.className?u.innerText:null,i=(null==u?void 0:u.previousElementSibling).innerText,c=e.innerText,a=s.getColumnHeaderInfo(n),m=s.sessionTableStr2Obj(c,i,l,a);t.push(m)}),{success:!0,message:"parsed",data:new o.AcademicHistory(t)}}return{success:!1,message:"No Academic History Found, please go to the correct web page and click parse.",data:null}}}]);