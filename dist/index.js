!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("dayjs"),require("dayjs/plugin/isSameOrBefore"),require("dayjs/plugin/isBetween"),require("@babel/runtime/helpers/extends")):"function"==typeof define&&define.amd?define(["exports","react","dayjs","dayjs/plugin/isSameOrBefore","dayjs/plugin/isBetween","@babel/runtime/helpers/extends"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).asd={},e.React,e.dayjs,e.isSameOrBefore,e.isBetween,e._extends)}(this,(function(e,t,a,n,r,l){"use strict";a.extend(n),a.extend(r);let s=["日","一","二","三","四","五","六"],o=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];const m=e=>{let{startDate:n,endDate:r,name:l,onApply:m,isRange:d=!1,format:i="YYYY/MM/DD",maxDate:c,minDate:y,autoApply:p,isFuture:u=!1}=e,[h,f]=t.useState(n),[g,D]=t.useState(r),[v,E]=t.useState(!1),[k,C]=t.useState(a(n).year()),[N,$]=t.useState(a(n).month()),[P,_]=t.useState(!1),[x,O]=t.useState([]);t.useEffect((()=>{d?(f(a(h).format(i)),D(a(g).format(i))):h||f(a().format(i))}),[h,g]);const M=(e,t)=>{let n=a(`${e}/${t+1}/01`).startOf("day").format(i),r=a(n).daysInMonth(),l=[];for(let e=0;e<r;e++)l=[...l,a(n).add(e,"days").format(i)];let s=(e=>{let t=a(e).day(),n=a(e).subtract(t,"days"),r=[];for(let e=0;e<t;e++)r=[...r,a(n).add(e,"days").format(i)];return r})(n),o=(e=>{let t=a(e).day(),n=[];for(let r=1;r<7-t;r++)n=[...n,a(e).add(r,"days").format(i)];return n})(l[l.length-1]);return[...s,...l,...o]},b=()=>{let e=a(`${k}/${N+1}/01`).subtract(1,"month"),t=e.month(),n=e.year();$(t),C(n)},S=()=>{let e=a(`${k}/${N+1}/01`).add(1,"month"),t=e.month(),n=e.year();$(t),C(n)};return{getRangeCalendarDays:(e,t)=>{if(e||(e=a().year()),t||(t=a().month()),u){let n=a(`${e}/${t+1}/01`).startOf("day"),r=a(`${e}/${t+2}/01`).startOf("day");return[M(n.year(),n.month()),M(r.year(),r.month())]}{let n=a(`${e}/${t}/01`).startOf("day"),r=a(`${e}/${t+1}/01`).startOf("day");return[{month:n.month(),year:n.year(),days:M(n.year(),n.month())},{month:r.month(),year:r.year(),days:M(r.year(),r.month())}]}},getNextMonthProps:()=>{let e=a(c).isSameOrBefore(a(`${k}/${N+1}/01`).endOf("month"));return{onClick:()=>e?"":S(),className:["month_next month_control",e?"disabled":""].join(" ")}},getPreMonthProps:()=>{let e=a(`${k}/${N+1}/01`).startOf("month").isSameOrBefore(a(y));return{onClick:()=>e?"":b(),className:["month_prev month_control",e?"disabled":""].join(" ")}},setEndTime:D,setStartTime:f,onOpenCalendar:()=>{g?(C(a(g).year()),$(a(g).month())):(C(a(h).year()),$(a(h).month())),E(!0)},onCloseCalendar:()=>{E(!1)},isOpen:v,setIsOpen:E,getCalendarDays:M,startTime:h,endTime:g,weeks:s,months:o,year:k,month:N,getDayProps:(e,t)=>{let n=a(e).month(),r=[a(e).isSame(a(h))?"active":""];r=[...r,a(e).isSame(a(g))?"active":""],r=[...r,d?"":"redius"],r=[...r,d&&h===e?"startTime":""],r=[...r,d&&g===e?"endTime":""],r=[...r,d&&a(e).isBetween(h,g,"()")?"bw_active":""],r=[...r,d&&x.includes(e)?"hover":""];let s=!1;return c&&a(e).isAfter(a(c))&&(r=[...r,"line-through"],s=!0),y&&a(e).isBefore(a(y))&&(r=[...r,"line-through"],s=!0),n!==t||s?(r=[...r,"day_disalbed"],s=!0):r=[...r,"day_item"],{key:`day${t}_${a(e).format("YYYYMMDD")}`,onClick:()=>s?"":d?(e=>{P?(a(h).isAfter(e)?(f(e),D(h),m({startTime:e,endTime:h},l)):(D(e),m({startTime:h,endTime:e},l)),p&&E(!1)):(f(e),D("")),_(!P)})(e):(e=>{f(e),p&&E(!1),m({startTime:e},l)})(e),onMouseEnter:()=>d?(e=>{if(P){console.log("onMouseEnter",e);let t=[],n=h,r=e;a(h).isAfter(e)&&(n=e,r=h);let l=a(r).diff(a(n),"day");for(let e=1;e<=l;e++)t=[...t,a(n).add(e,"day").format(i)];O(t)}else O([])})(e):"",className:r.join(" ")}},getDayLabel:e=>a(e).date(),onPrevCalendar:b,onNextCalendar:S}},d=e=>{let{getNextMonthProps:a,getPreMonthProps:n,calendarsDays:r,weeks:s,months:o,month:m,year:d,getDayProps:i,getDayLabel:c,isOpen:y,onClose:p}=e;return t.createElement(t.Fragment,null,y&&t.createElement("div",{className:"calendar_wapper single"},t.createElement("div",{className:"calendar_control"},t.createElement("div",n()," "),t.createElement("div",a()," ")),t.createElement("div",{className:"calendar_header"},t.createElement("div",null," ",o[m]),t.createElement("div",null," ",d)),t.createElement("div",{className:"calendar_content "},s.map(((e,a)=>t.createElement("div",{key:`week_${a}`,className:"calendar_header"},e))),r.map(((e,a)=>{let{key:n,...r}=i(e,m);return t.createElement("div",l({key:n},r),c(e))})))),y&&t.createElement("div",{className:"backdrop",onClick:p}))};e.DatePicker=e=>{let{className:n,date:r,onApply:l,name:s,placeholder:o,maxDate:i,minDate:c,format:y="YYYY/MM/DD",autoApply:p=!0}=e,[u,h]=t.useState(""),{startTime:f,setStartTime:g,getNextMonthProps:D,getPreMonthProps:v,onOpenCalendar:E,onCloseCalendar:k,isOpen:C,setIsOpen:N,weeks:$,getCalendarDays:P,year:_,month:x,months:O,getDayLabel:M,getDayProps:b,onPrevCalendar:S,onNextCalendar:T}=m({startDate:r,name:s,onApply:l,maxDate:i,minDate:c,autoApply:p}),w=P(_,x);t.useEffect((()=>{r&&h(`${a(r).format(y)} `)}),[r]);const Y=()=>{a(u).isValid()?g(a(u).toDate()):h(f?a(f).format(y):"")};return t.createElement("div",{className:[n,"datepicker_wapper",C?"active":""].join(" ")},t.createElement("input",{type:"text",value:u,placeholder:o,onClick:E,onChange:e=>{let t=e.target.value;h(t),g(a(t).toDate())},onBlur:Y,onKeyDown:e=>{13===e.keyCode&&(Y(),p&&N(!1))}}),t.createElement(d,{isOpen:C,getNextMonthProps:D,getPreMonthProps:v,calendarsDays:w,weeks:$,onPrev:S,onNext:T,months:O,month:x,year:_,getDayProps:b,getDayLabel:M,onClose:k}))},e.DateRangePicker=({className:e,startTime:n,endTime:r,onApply:s,name:o,placeholder:d,maxDate:i,minDate:c,format:y="YYYY/MM/DD"})=>{let[p,u]=t.useState(""),{setStartTime:h,setEndTime:f,getNextMonthProps:g,getPreMonthProps:D,onOpenCalendar:v,onCloseCalendar:E,isOpen:k,weeks:C,getRangeCalendarDays:N,year:$,month:P,months:_,getDayLabel:x,getDayProps:O}=m({startDate:n,endDate:r,onApply:s,name:o,maxDate:i,minDate:c,isRange:!0,format:y,autoApply:!0});t.useEffect((()=>{n&&r&&u(`${a(n).format(y)} - ${a(r).format(y)}`)}),[n,r]);let M=N($,P);return t.createElement("div",{className:[e,"datepicker_wapper",k?"active":""].join(" ")},t.createElement("input",{type:"text",value:p,placeholder:d,onClick:v,onChange:e=>{let t=e.target.value;u(t);let[n,r]=t.split(" - ");a(n).format(y)===n&&h(n),a(r).format(y)===r&&f(r)}}),t.createElement(t.Fragment,null,k&&t.createElement("div",{className:"calendar_wapper"},t.createElement("div",{className:"calendar_control"},t.createElement("div",D()," "),t.createElement("div",g()," ")),t.createElement("div",{className:"calendar_list"},M.map(((e,a)=>{let{days:n,year:r,month:s}=e;return t.createElement("div",{className:"calendar_div",key:`calendar${r}${s}_${a}`},t.createElement("div",{className:"calendar_header"},t.createElement("div",null," ",_[s]),t.createElement("div",null," ",r)),t.createElement("div",{className:"calendar_content"},C.map(((e,a)=>t.createElement("div",{key:`week_${a}`,className:"calendar_header"},e))),n.map(((e,a)=>{let{key:n,...r}=O(e,s);return t.createElement("div",l({key:n},r),x(e))}))))})))),k&&t.createElement("div",{className:"backdrop",onClick:E})))},e.SingleCalendar=d,e.useDatePicker=m}));
