(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function l(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=l(a);fetch(a.href,n)}})();const c=(e,r=!1)=>{const l=document.querySelectorAll(e);return r||l.length>1?l:l[0]},b=e=>({value:e});var m=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t={},x={},h={};Object.defineProperty(h,"__esModule",{value:!0});h.isSvgTag=h.applyChildren=h.setElementStyle=void 0;function N(e,r){let l;const s=Object.keys(r);for(l of s)e.style[l]=r[l]}h.setElementStyle=N;function y(e,r){r instanceof HTMLElement?e.appendChild(r):typeof r=="string"||typeof r=="number"?e.appendChild(document.createTextNode(r.toString())):console.warn("Unknown type to append: ",r)}function L(e,r){for(const l of r)if(!(!l&&l!==0))if(Array.isArray(l))for(const s of l)Array.isArray(s)?L(e,s):y(e,s);else y(e,l)}h.applyChildren=L;function D(e){return["a","circle","clipPath","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","path","pattern","polygon","polyline","radialGradient","rect","script","stop","style","svg","switch","symbol","text","textPath","title","tspan","use","view"].includes(e)}h.isSvgTag=D;(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.h=e.xlinkNS=void 0;const r=h;e.xlinkNS="http://www.w3.org/1999/xlink";function l(s,a,...n){if(typeof s=="function")return s(Object.assign(Object.assign({},a),{children:n}));const o=r.isSvgTag(s),i=o?document.createElementNS("http://www.w3.org/2000/svg",s):document.createElement(s);if(a){a.style&&typeof a.style!="string"&&(r.setElementStyle(i,a.style),delete a.style);for(const u of Object.keys(a)){const f=a[u];if(u.startsWith("on")){const d=u.replace(/Capture$/,""),p=u!==d,k=d.toLowerCase().substring(2);i.addEventListener(k,f,p)}else o&&u.startsWith("xlink:")?i.setAttributeNS(e.xlinkNS,u,f):f===!0?i.setAttribute(u,u):(f||f===0)&&i.setAttribute(u,f.toString())}}return r.applyChildren(i,n),i}e.h=l})(x);var S={};Object.defineProperty(S,"__esModule",{value:!0});(function(e){var r=m&&m.__createBinding||(Object.create?function(s,a,n,o){o===void 0&&(o=n),Object.defineProperty(s,o,{enumerable:!0,get:function(){return a[n]}})}:function(s,a,n,o){o===void 0&&(o=n),s[o]=a[n]}),l=m&&m.__exportStar||function(s,a){for(var n in s)n!=="default"&&!Object.prototype.hasOwnProperty.call(a,n)&&r(a,s,n)};Object.defineProperty(e,"__esModule",{value:!0}),l(x,e),l(S,e)})(t);function C({text:e}){return t.h("header",{class:"bg-lime-700 p-5 text-center text-white",role:"banner"},t.h("h1",{class:"text-2xl font-bold"},"Form Picker"))}function F(){const e=l=>{if(l.filter(a=>!a.value).length>0){l.map(a=>{c(`#${a.id}`).classList.remove("!border-red-500"),c(`#${a.id}`).value||c(`#${a.id}`).classList.add("!border-red-500")});return}r()},r=()=>{console.log("All fields are completed. Something is happening here.")};return{validateForms:e}}function O(){const e=b([]),r=b([]),l=n=>{e.value=n.filter(o=>o.dayNumber<7).splice(0,7).sort((o,i)=>o.dayNumber-i.dayNumber).map(o=>o.dayNameShort),e.value.push(e.value.shift())};return{getCalendar:(n,o)=>{const i=new Date(n,o,1),u=[];for(;i.getMonth()===o;)u.push({date:i,dateShort:i.toLocaleDateString("nl-NL",{dateStyle:"short"}),dateFull:i.toLocaleDateString("nl-NL",{dateStyle:"full"}),monthName:new Intl.DateTimeFormat("nl-NL",{month:"long"}).format(i),monthNameShort:new Intl.DateTimeFormat("nl-NL",{month:"short"}).format(i),dayName:new Intl.DateTimeFormat("nl-NL",{weekday:"long"}).format(i),dayNameShort:new Intl.DateTimeFormat("nl-NL",{weekday:"short"}).format(i),display:i.getDate(),dayNumber:i.getDay()}),i.setDate(i.getDate()+1);if(u[0].dayNumber>0)for(let f=0;f<u[0].dayNumber-1;f++)r.value.push({hidden:!0});return l(u),r.value.length>0?r.value.concat(u):u},dayNames:e,closeDatepicker:n=>{c(n).classList.add("hidden"),c(n).classList.ariaHidden=!0}}}function g({classes:e}){return t.h("i",{class:e,"aria-hidden":"true"})}const{getCalendar:E,dayNames:T,closeDatepicker:v}=O();function _({id:e,calendar:r,triggerEl:l}){const s=E(r.getFullYear(),r.getMonth()),n=`${s.find(d=>d.monthName).monthName} ${r.getFullYear()}`,o=d=>{d.preventDefault(),Array.from(c(`#${e} button[data-type="btndate"]`)).map(p=>{p.classList.remove("bg-red-600"),p.classList.remove("text-white"),p.classList.remove("font-semibold"),c(l).classList.remove("!border-red-500")}),d.target.classList.add("bg-red-600"),d.target.classList.add("text-white"),d.target.classList.add("font-semibold"),c(l).value=d.target.dataset.value,v(`#${e}`)},i=s.map(d=>d.hidden?t.h("div",{class:"invisible w-9 p-2","aria-hidden":"true"}):t.h("button",{class:"w-9 rounded-md p-2 text-sm hover:bg-slate-100 hover:text-red-500 disabled:cursor-auto disabled:text-slate-300 disabled:hover:bg-white","aria-label":`Select ${d.dateFull}`,onClick:o,"data-value":d.dateShort,"data-type":"btndate"},d.display)),u=d=>d.map(p=>t.h("div",{class:"w-9 p-2 text-sm"},p)),f=d=>{d.preventDefault(),c(l).focus(),v(`#${e}`)};return t.h("section",{id:e,class:"fixed z-10 mx-auto mt-2 hidden rounded-md border-2 border-slate-100 bg-white p-2.5 lg:absolute","aria-hidden":"true","data-mode":"datepicker"},t.h("div",{class:"flex w-72 flex-col"},t.h("div",{class:"flex flex-row rounded-md bg-slate-100 p-2 text-center"},t.h("button",{class:"hidden w-1/12","aria-hidden":"false","aria-label":"Go to previous month calendar"},t.h(g,{classes:"fa-solid fa-chevron-left"})),t.h("div",{class:"mx-auto w-full"},n),t.h("button",{class:"hidden w-1/12","aria-hidden":"false","aria-label":"Go to next month calendar"},t.h(g,{classes:"fa-solid fa-chevron-right"}))),t.h("div",{class:"flex flex-wrap gap-x-0.5 gap-y-0.5 pt-0.5","aria-hidden":"true"},u(T.value)),t.h("div",{class:"flex flex-wrap gap-x-0.5 gap-y-0.5 pt-0.5 "},i),t.h("button",{class:"mt-2 rounded-md bg-slate-100 p-2 text-sm hover:bg-red-600 hover:text-white",onClick:f},"Close datepicker")))}const M=new Date;function w({id:e,placeholder:r,label:l,validate:s,datepicker:a,date:n=M}){const o=`${e}Datepicker`,i=u=>{u.preventDefault(),Array.from(c("section[data-mode=datepicker]",!0)).filter(d=>d.id!==o).forEach(d=>{d.classList.add("hidden"),d.classList.ariaHidden=!0}),c(`#${o}`).classList.toggle("hidden"),c(`#${o}`).ariaHidden=c(`#${o}`).ariaHidden!=="true"};return t.h("section",{class:"relative"},t.h("label",{for:e,class:"sr-only"},l),t.h("input",{id:e,class:"w-full rounded-md border-2 border-slate-100 p-2",type:"text",placeholder:r,validate:s?"true":"false"}),t.h("button",{class:"absolute right-1 top-1 text-lg text-slate-300","aria-label":"Open calendar datepicker",onCLick:i},t.h(g,{classes:"fa-regular fa-calendar-days p-2"})),a&&t.h(_,{id:o,calendar:n,triggerEl:`#${e}`}))}const{validateForms:$}=F(),j=e=>{e.preventDefault(),$(Array.from(c("input[validate=true]",!0)))},A=t.h("section",{class:"p-5 lg:h-screen lg:w-3/4 lg:border-r-2 lg:border-r-slate-50"},t.h("form",{class:"flex flex-col gap-y-5 border-b-2 border-b-slate-50 pb-5 lg:ml-0 lg:flex-row lg:gap-x-5 lg:gap-y-0"},t.h(w,{id:"startDate",placeholder:"Start date",label:"Start date:",class:"lg:w-1/3",validate:!0,datepicker:!0}),t.h(w,{id:"endDate",placeholder:"End date",label:"End date:",class:"lg:w-1/3",validate:!0,datepicker:!0}),t.h("button",{class:"rounded-md bg-red-600 py-2 px-5 text-white lg:w-1/3 lg:flex-none",onClick:j},"Find Items")));function I(){return A}const P=e=>{e.preventDefault();const r=e.pointerId>0?e.target.offsetParent:e.target;if(r.ariaExpanded.toLowerCase()==="false"){c("#sidebar-content-1").classList.toggle("hidden"),c("#sidebar-btn-1").classList.toggle("rotate-180"),c("#sidebar-btn-1").ariaLabel="Hide content",r.ariaExpanded="true";return}c("#sidebar-content-1").classList.toggle("hidden"),c("#sidebar-btn-1").classList.toggle("rotate-180"),c("#sidebar-btn-1").ariaLabel="Expand content",r.ariaExpanded="false"};function H(){return t.h("section",{class:"lg:w-1/4"},t.h("h2",{class:"sticky top-0 border-b-2 border-dotted border-b-slate-200 bg-slate-50 p-5 font-bold"},"Sticky sidebar",t.h("button",{id:"sidebar-btn-1",class:"absolute right-0 m-0 mr-5 p-0 lg:hidden","aria-controls":"sidebar-content-1",onClick:P,"aria-label":"Expand content","aria-expanded":"false"},t.h(g,{classes:"fa-solid fa-circle-chevron-down p-1"}))),t.h("p",{id:"sidebar-content-1",class:"hidden p-5 lg:block"},"This is a mobile responsive sticky bar, hidden by default on mobile."))}function B(){return t.h("main",{class:"mx-auto flex w-full max-w-5xl flex-col lg:flex-row-reverse lg:justify-evenly",role:"main"},t.h(H,null),t.h(I,null))}function G(){return t.h("footer",{class:"fixed bottom-0 left-0 w-full border-t-2 border-t-slate-200 bg-slate-50 p-5",role:"contentinfo"},t.h("p",null,"This is a fixed footer element."))}function q(){return t.h("section",{class:"mx-auto w-full"},t.h(C,null),t.h(B,null),t.h(G,null))}(function(){c("#app").append(q())})();
