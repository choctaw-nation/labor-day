!function(){"use strict";var e=window.wp.element;function t(){return(0,e.createElement)("div",{className:"lds-ring"},[1,2,3,4].map((t=>(0,e.createElement)("div",null))))}const{postsPerPage:n,rootUrl:s}=cnoSiteData,r=`${s}/graphql`,i={keys:[{name:"title",weight:1},{name:"event_info.description",weight:.5},{name:"event_info.info.day",weight:.03},{name:"type.name",weight:.8},{name:"locations.name",weight:.8}]};var c=new class{async makeRequest(e){try{const t=await fetch(`${r}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),{data:n}=await t.json();return n}catch(e){throw console.error("makeRequest error:",e),e}}async getPosts(){const e={query:'query Events($first: Int = 4, $after: String = "", $include: [MediaItemSizeEnum] = [LARGE], $size: MediaItemSizeEnum = LARGE) {\n  events(after: $after, first: $first) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    nodes {\n      eventLocations {\n        nodes {\n          name\n          link\n          event_locationId\n        }\n      }\n      event_info {\n        description\n        info {\n          day\n          endTime\n          startTime\n        }\n      }\n      featuredImage {\n        node {\n          altText\n          mediaDetails {\n            sizes(include: $include) {\n              height\n              name\n              width\n              sourceUrl\n            }\n          }\n          srcSet(size: $size)\n\t\t  sizes(size: $size)\n        }\n      }\n      title(format: RENDERED)\n      link\n\t  eventId\n      eventTypes {\n        nodes {\n          event_typeId\n          name\n          link\n        }\n      }\n    }\n  }\n  eventTypes {\n    nodes {\n      event_typeId\n      name\n\t  link\n    }\n  }\n  eventLocations {\n    nodes {\n      name\n      link\n      event_locationId\n    }\n  }\n}',variables:{first:Number(n),after:"",include:["LARGE"],size:"LARGE"}};try{return await this.makeRequest(e)}catch(e){console.error(e)}}};function a(t){let{filters:n,checkedFilters:s,setCheckedFilters:r}=t;return(0,e.createElement)("div",{className:"cno-event-search-filters"},n.map((t=>{let{type:{name:n,filters:i}}=t;return(0,e.createElement)("div",{className:"cno-event-search-filters__container",onClick:e=>{!function(e,t){let{target:n}=t;n.id&&(s.includes(n.id)?r(s.filter((e=>e!==n.id))):r((e=>[...e,n.id])))}(0,e)}},(0,e.createElement)("h4",{className:"cno-event-search-filters__title"},n),i.map((t=>(0,e.createElement)("div",{className:"cno-event-search-filters__filter"},(0,e.createElement)("input",{type:"checkbox",name:t.link,id:t.name,checked:s.includes(t.name),onChange:()=>{}}),(0,e.createElement)("label",{htmlFor:t.name},t.name)))))})))}function o(t){let{search:n,handleSearchInput:s}=t;return(0,e.createElement)("input",{type:"text",name:"search",id:"search",placeholder:"Find an Event",className:"cno-event-search__search-bar",value:n,onChange:s})}function l(t){let{filters:n,checkedFilters:s,setCheckedFilters:r,handleSearchInput:i,search:c}=t;const[l,h]=(0,e.useState)(!1);return(0,e.createElement)("section",{className:"cno-event-search"},(0,e.createElement)("div",{className:"container"},(0,e.createElement)("h2",{className:"cno-event-search__title"},"Search Events"),(0,e.createElement)(o,{search:c,handleSearchInput:i}),(0,e.createElement)("div",{className:"cno-event-search__filters"},(0,e.createElement)("div",{className:"cno-event-search__filters--header"},(0,e.createElement)("h3",{className:"cno-event-search__filters--title"},"Filters"),(0,e.createElement)("button",{className:"btn__outline--secondary",onClick:()=>{h(!l)}},l?"Hide Filters":"Show Filters")),l&&(0,e.createElement)(a,{filters:n,checkedFilters:s,setCheckedFilters:r}))))}var h=new class{getSchedule(){const e=localStorage.getItem("schedule"),t=e?JSON.parse(e):null;return null===t?{friday:[],saturday:[],sunday:[]}:t}addToSchedule(e){let{target:t}=e;return new Promise(((e,n)=>{try{this.checkTargetElement(t);const s=Number(t.dataset.id),r=this.getSchedule();try{this.getEventData(s).then((t=>{const n=t.day.toLowerCase(),s=r[n].filter((e=>e.id===t.id));0===s.length?(r[n].push(t),localStorage.setItem("schedule",JSON.stringify(r)),e("success")):s&&e("info")}))}catch(e){n(e)}}catch(e){console.error(e)}}))}checkTargetElement(e){if(!e)throw new Error("No target element provided");if("false"===e.dataset.addToSchedule)throw new Error("This button doesn't control scheduling!");if(void 0===e.dataset.id)throw new Error(`id or route is undefined! \n id: ${e.dataset.id} `)}getEventData=async e=>{try{const t=await fetch(`${cnoSiteData.rootUrl}/wp-json/wp/v2/events/${e}?_fields=acf,title,link`),n=await t.json(),{acf:{info:s}}=n;return{id:e,link:n.link,title:n.title.rendered,description:n.acf.description,day:s.day,start_time:s.start_time,end_time:s.end_time}}catch(e){throw new Error(e)}}};function d(t){let{eventId:n,link:s}=t;const[r,i]=(0,e.useState)("");return(0,e.useEffect)((()=>{const e=setTimeout((()=>{i("")}),7e3);return()=>clearTimeout(e)}),[r]),(0,e.createElement)("div",{className:"cno-event__buttons"},(0,e.createElement)("button",{className:"btn__fill--primary","data-add-to-schedule":"true","data-id":n,onClick:function(e){h.addToSchedule(e).then((e=>{let t="";"success"===e&&(t="Added to your schedule!"),"info"===e&&(t="This is already in your schedule."),i(`<div class="alert alert-${e}" role="alert">\n\t\t\t\t\t${t}\n\t\t\t\t</div>`)})).catch((e=>{console.error(e)}))}},"Add to Schedule"),(0,e.createElement)("a",{href:s,className:"btn__outline--primary"},"Learn More"),(0,e.createElement)("div",{className:"cno-event-schedule-confirmation",dangerouslySetInnerHTML:{__html:r}}))}function u(t){let{data:n}=t;const{locations:s,eventId:r,link:i,title:c,event_info:a,altText:o,srcSet:l,size:h,sizes:u,type:m}=n;return(0,e.createElement)("article",{className:"cno-event"},(0,e.createElement)("figure",{className:"cno-event__image"},(0,e.createElement)("img",{width:h.width,height:h.height,src:"",className:"attachment-large size-large wp-post-image",alt:o,decoding:"async",srcSet:l,sizes:u})),(0,e.createElement)("h2",null,c),(0,e.createElement)("aside",{className:"event-meta"},(0,e.createElement)("div",{className:"event-meta__day"},(0,e.createElement)("strong",null,"When: "),a.info.day,", ",function(e){let t="";switch(e){case"Friday":return t="September 1",t;case"Saturday":return t="September 2",t;case"Sunday":return t="September 3",t;default:return t="",t}}(a.info.day)),s&&s.length>0&&(0,e.createElement)("div",{className:"event-meta__location"},(0,e.createElement)("strong",null,"Where:")," ",(0,e.createElement)("a",{href:s[0].link,rel:"tag"},s[0].name)),(0,e.createElement)("div",{className:"event-meta__start-time"},(0,e.createElement)("strong",null,"Start Time:")," "+a.info.startTime),a.info.endTime&&(0,e.createElement)("div",{className:"event-meta__end-time"},(0,e.createElement)("strong",null,"End Time:")," ",a.info.endTime),(0,e.createElement)("div",{className:"event-meta__type"},(0,e.createElement)("strong",null,"Event Type:")," ",(0,e.createElement)("a",{href:"${type[0].link}",rel:"tag"},m[0].name))),(0,e.createElement)("div",{className:"about"},a.description),(0,e.createElement)(d,{eventId:r,link:i}))}function m(t){let{posts:n,checkedFilters:s}=t;return(0,e.createElement)("section",{className:"cno-events"},n.map((t=>{if(0===s.length)return(0,e.createElement)(u,{data:t});if([s,t.locations,t.type].every((e=>e.length>0))){if(s.includes(t.locations?.[0]?.name)||s.includes(t.type[0]?.name))return(0,e.createElement)(u,{data:t})}else if(s.includes(t.locations?.[0]?.name)&&s.includes(t.type[0]?.name))return(0,e.createElement)(u,{data:t});return null})))}function f(e){return Array.isArray?Array.isArray(e):"[object Array]"===M(e)}function g(e){return"string"==typeof e}function p(e){return"number"==typeof e}function y(e){return"object"==typeof e}function v(e){return null!=e}function E(e){return!e.trim().length}function M(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const _=e=>`Missing ${e} property in key`,x=e=>`Property 'weight' in key '${e}' must be a positive integer`,k=Object.prototype.hasOwnProperty;class S{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach((e=>{let n=w(e);t+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,t+=n.weight})),this._keys.forEach((e=>{e.weight/=t}))}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function w(e){let t=null,n=null,s=null,r=1,i=null;if(g(e)||f(e))s=e,t=L(e),n=I(e);else{if(!k.call(e,"name"))throw new Error(_("name"));const c=e.name;if(s=c,k.call(e,"weight")&&(r=e.weight,r<=0))throw new Error(x(c));t=L(c),n=I(c),i=e.getFn}return{path:t,id:n,weight:r,src:s,getFn:i}}function L(e){return f(e)?e:e.split(".")}function I(e){return f(e)?e.join("."):e}var N={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(e,t){let n=[],s=!1;const r=(e,t,i)=>{if(v(e))if(t[i]){const c=e[t[i]];if(!v(c))return;if(i===t.length-1&&(g(c)||p(c)||function(e){return!0===e||!1===e||function(e){return y(e)&&null!==e}(e)&&"[object Boolean]"==M(e)}(c)))n.push(function(e){return null==e?"":function(e){if("string"==typeof e)return e;let t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)}(c));else if(f(c)){s=!0;for(let e=0,n=c.length;e<n;e+=1)r(c[e],t,i+1)}else t.length&&r(c,t,i+1)}else n.push(e)};return r(e,g(t)?t.split("."):t,0),s?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const $=/[^ ]+/g;class C{constructor({getFn:e=N.getFn,fieldNormWeight:t=N.fieldNormWeight}={}){this.norm=function(e=1,t=3){const n=new Map,s=Math.pow(10,t);return{get(t){const r=t.match($).length;if(n.has(r))return n.get(r);const i=1/Math.pow(r,.5*e),c=parseFloat(Math.round(i*s)/s);return n.set(r,c),c},clear(){n.clear()}}}(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach(((e,t)=>{this._keysMap[e.id]=t}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,g(this.docs[0])?this.docs.forEach(((e,t)=>{this._addString(e,t)})):this.docs.forEach(((e,t)=>{this._addObject(e,t)})),this.norm.clear())}add(e){const t=this.size();g(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!v(e)||E(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach(((t,s)=>{let r=t.getFn?t.getFn(e):this.getFn(e,t.path);if(v(r))if(f(r)){let e=[];const t=[{nestedArrIndex:-1,value:r}];for(;t.length;){const{nestedArrIndex:n,value:s}=t.pop();if(v(s))if(g(s)&&!E(s)){let t={v:s,i:n,n:this.norm.get(s)};e.push(t)}else f(s)&&s.forEach(((e,n)=>{t.push({nestedArrIndex:n,value:e})}))}n.$[s]=e}else if(g(r)&&!E(r)){let e={v:r,n:this.norm.get(r)};n.$[s]=e}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function b(e,t,{getFn:n=N.getFn,fieldNormWeight:s=N.fieldNormWeight}={}){const r=new C({getFn:n,fieldNormWeight:s});return r.setKeys(e.map(w)),r.setSources(t),r.create(),r}function F(e,{errors:t=0,currentLocation:n=0,expectedLocation:s=0,distance:r=N.distance,ignoreLocation:i=N.ignoreLocation}={}){const c=t/e.length;if(i)return c;const a=Math.abs(s-n);return r?c+a/r:a?1:c}const A=32;function R(e){let t={};for(let n=0,s=e.length;n<s;n+=1){const r=e.charAt(n);t[r]=(t[r]||0)|1<<s-n-1}return t}class T{constructor(e,{location:t=N.location,threshold:n=N.threshold,distance:s=N.distance,includeMatches:r=N.includeMatches,findAllMatches:i=N.findAllMatches,minMatchCharLength:c=N.minMatchCharLength,isCaseSensitive:a=N.isCaseSensitive,ignoreLocation:o=N.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:o},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(e,t)=>{this.chunks.push({pattern:e,alphabet:R(e),startIndex:t})},h=this.pattern.length;if(h>A){let e=0;const t=h%A,n=h-t;for(;e<n;)l(this.pattern.substr(e,A),e),e+=A;if(t){const e=h-A;l(this.pattern.substr(e),e)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let t={isMatch:!0,score:0};return n&&(t.indices=[[0,e.length-1]]),t}const{location:s,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:a,ignoreLocation:o}=this.options;let l=[],h=0,d=!1;this.chunks.forEach((({pattern:t,alphabet:u,startIndex:m})=>{const{isMatch:f,score:g,indices:p}=function(e,t,n,{location:s=N.location,distance:r=N.distance,threshold:i=N.threshold,findAllMatches:c=N.findAllMatches,minMatchCharLength:a=N.minMatchCharLength,includeMatches:o=N.includeMatches,ignoreLocation:l=N.ignoreLocation}={}){if(t.length>A)throw new Error("Pattern length exceeds max of 32.");const h=t.length,d=e.length,u=Math.max(0,Math.min(s,d));let m=i,f=u;const g=a>1||o,p=g?Array(d):[];let y;for(;(y=e.indexOf(t,f))>-1;){let e=F(t,{currentLocation:y,expectedLocation:u,distance:r,ignoreLocation:l});if(m=Math.min(e,m),f=y+h,g){let e=0;for(;e<h;)p[y+e]=1,e+=1}}f=-1;let v=[],E=1,M=h+d;const _=1<<h-1;for(let s=0;s<h;s+=1){let i=0,a=M;for(;i<a;)F(t,{errors:s,currentLocation:u+a,expectedLocation:u,distance:r,ignoreLocation:l})<=m?i=a:M=a,a=Math.floor((M-i)/2+i);M=a;let o=Math.max(1,u-a+1),y=c?d:Math.min(u+a,d)+h,x=Array(y+2);x[y+1]=(1<<s)-1;for(let i=y;i>=o;i-=1){let c=i-1,a=n[e.charAt(c)];if(g&&(p[c]=+!!a),x[i]=(x[i+1]<<1|1)&a,s&&(x[i]|=(v[i+1]|v[i])<<1|1|v[i+1]),x[i]&_&&(E=F(t,{errors:s,currentLocation:c,expectedLocation:u,distance:r,ignoreLocation:l}),E<=m)){if(m=E,f=c,f<=u)break;o=Math.max(1,2*u-f)}}if(F(t,{errors:s+1,currentLocation:u,expectedLocation:u,distance:r,ignoreLocation:l})>m)break;v=x}const x={isMatch:f>=0,score:Math.max(.001,E)};if(g){const e=function(e=[],t=N.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let c=e.length;i<c;i+=1){let c=e[i];c&&-1===s?s=i:c||-1===s||(r=i-1,r-s+1>=t&&n.push([s,r]),s=-1)}return e[i-1]&&i-s>=t&&n.push([s,i-1]),n}(p,a);e.length?o&&(x.indices=e):x.isMatch=!1}return x}(e,t,u,{location:s+m,distance:r,threshold:i,findAllMatches:c,minMatchCharLength:a,includeMatches:n,ignoreLocation:o});f&&(d=!0),h+=g,f&&p&&(l=[...l,...p])}));let u={isMatch:d,score:d?h/this.chunks.length:1};return d&&n&&(u.indices=l),u}}class z{constructor(e){this.pattern=e}static isMultiMatch(e){return O(e,this.multiRegex)}static isSingleMatch(e){return O(e,this.singleRegex)}search(){}}function O(e,t){const n=e.match(t);return n?n[1]:null}class j extends z{constructor(e,{location:t=N.location,threshold:n=N.threshold,distance:s=N.distance,includeMatches:r=N.includeMatches,findAllMatches:i=N.findAllMatches,minMatchCharLength:c=N.minMatchCharLength,isCaseSensitive:a=N.isCaseSensitive,ignoreLocation:o=N.ignoreLocation}={}){super(e),this._bitapSearch=new T(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:o})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class W extends z{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t,n=0;const s=[],r=this.pattern.length;for(;(t=e.indexOf(this.pattern,n))>-1;)n=t+r,s.push([t,n-1]);const i=!!s.length;return{isMatch:i,score:i?0:1,indices:s}}}const P=[class extends z{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},W,class extends z{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},class extends z{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends z{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},class extends z{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},class extends z{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const t=-1===e.indexOf(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},j],q=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,D=new Set([j.type,W.type]);const J=[];function K(e,t){for(let n=0,s=J.length;n<s;n+=1){let s=J[n];if(s.condition(e,t))return new s(e,t)}return new T(e,t)}const G="$and",U="$path",B=e=>!(!e[G]&&!e.$or),H=e=>({[G]:Object.keys(e).map((t=>({[t]:e[t]})))});function V(e,t,{auto:n=!0}={}){const s=e=>{let r=Object.keys(e);const i=(e=>!!e[U])(e);if(!i&&r.length>1&&!B(e))return s(H(e));if((e=>!f(e)&&y(e)&&!B(e))(e)){const s=i?e[U]:r[0],c=i?e.$val:e[s];if(!g(c))throw new Error((e=>`Invalid value for key ${e}`)(s));const a={keyId:I(s),pattern:c};return n&&(a.searcher=K(c,t)),a}let c={children:[],operator:r[0]};return r.forEach((t=>{const n=e[t];f(n)&&n.forEach((e=>{c.children.push(s(e))}))})),c};return B(e)||(e=H(e)),s(e)}function Q(e,t){const n=e.matches;t.matches=[],v(n)&&n.forEach((e=>{if(!v(e.indices)||!e.indices.length)return;const{indices:n,value:s}=e;let r={indices:n,value:s};e.key&&(r.key=e.key.src),e.idx>-1&&(r.refIndex=e.idx),t.matches.push(r)}))}function X(e,t){t.score=e.score}class Y{constructor(e,t={},n){this.options={...N,...t},this.options.useExtendedSearch,this._keyStore=new S(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof C))throw new Error("Incorrect 'index' type");this._myIndex=t||b(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){v(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=(()=>!1)){const t=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:r,sortFn:i,ignoreFieldNorm:c}=this.options;let a=g(e)?g(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return function(e,{ignoreFieldNorm:t=N.ignoreFieldNorm}){e.forEach((e=>{let n=1;e.matches.forEach((({key:e,norm:s,score:r})=>{const i=e?e.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(t?1:s))})),e.score=n}))}(a,{ignoreFieldNorm:c}),r&&a.sort(i),p(t)&&t>-1&&(a=a.slice(0,t)),function(e,t,{includeMatches:n=N.includeMatches,includeScore:s=N.includeScore}={}){const r=[];return n&&r.push(Q),s&&r.push(X),e.map((e=>{const{idx:n}=e,s={item:t[n],refIndex:n};return r.length&&r.forEach((t=>{t(e,s)})),s}))}(a,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){const t=K(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:e,i:n,n:r})=>{if(!v(e))return;const{isMatch:i,score:c,indices:a}=t.searchIn(e);i&&s.push({item:e,idx:n,matches:[{score:c,value:e,norm:r,indices:a}]})})),s}_searchLogical(e){const t=V(e,this.options),n=(e,t,s)=>{if(!e.children){const{keyId:n,searcher:r}=e,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(t,n),searcher:r});return i&&i.length?[{idx:s,item:t,matches:i}]:[]}const r=[];for(let i=0,c=e.children.length;i<c;i+=1){const c=e.children[i],a=n(c,t,s);if(a.length)r.push(...a);else if(e.operator===G)return[]}return r},s=this._myIndex.records,r={},i=[];return s.forEach((({$:e,i:s})=>{if(v(e)){let c=n(t,e,s);c.length&&(r[s]||(r[s]={idx:s,item:e,matches:[]},i.push(r[s])),c.forEach((({matches:e})=>{r[s].matches.push(...e)})))}})),i}_searchObjectList(e){const t=K(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:e,i:s})=>{if(!v(e))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:e[s],searcher:t}))})),i.length&&r.push({idx:s,item:e,matches:i})})),r}_findMatches({key:e,value:t,searcher:n}){if(!v(t))return[];let s=[];if(f(t))t.forEach((({v:t,i:r,n:i})=>{if(!v(t))return;const{isMatch:c,score:a,indices:o}=n.searchIn(t);c&&s.push({score:a,key:e,value:t,idx:r,norm:i,indices:o})}));else{const{v:r,n:i}=t,{isMatch:c,score:a,indices:o}=n.searchIn(r);c&&s.push({score:a,key:e,value:r,norm:i,indices:o})}return s}}Y.version="6.6.2",Y.createIndex=b,Y.parseIndex=function(e,{getFn:t=N.getFn,fieldNormWeight:n=N.fieldNormWeight}={}){const{keys:s,records:r}=e,i=new C({getFn:t,fieldNormWeight:n});return i.setKeys(s),i.setIndexRecords(r),i},Y.config=N,Y.parseQuery=V,function(...e){J.push(...e)}(class{constructor(e,{isCaseSensitive:t=N.isCaseSensitive,includeMatches:n=N.includeMatches,minMatchCharLength:s=N.minMatchCharLength,ignoreLocation:r=N.ignoreLocation,findAllMatches:i=N.findAllMatches,location:c=N.location,threshold:a=N.threshold,distance:o=N.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:c,threshold:a,distance:o},this.pattern=t?e:e.toLowerCase(),this.query=function(e,t={}){return e.split("|").map((e=>{let n=e.trim().split(q).filter((e=>e&&!!e.trim())),s=[];for(let e=0,r=n.length;e<r;e+=1){const r=n[e];let i=!1,c=-1;for(;!i&&++c<8;){const e=P[c];let n=e.isMultiMatch(r);n&&(s.push(new e(n,t)),i=!0)}if(!i)for(c=-1;++c<8;){const e=P[c];let n=e.isSingleMatch(r);if(n){s.push(new e(n,t));break}}}return s}))}(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,i=[],c=0;for(let s=0,a=t.length;s<a;s+=1){const a=t[s];i.length=0,r=0;for(let t=0,s=a.length;t<s;t+=1){const s=a[t],{isMatch:o,indices:l,score:h}=s.search(e);if(!o){c=0,r=0,i.length=0;break}if(r+=1,c+=h,n){const e=s.constructor.type;D.has(e)?i=[...i,...l]:i.push(l)}}if(r){let e={isMatch:!0,score:c/r};return n&&(e.indices=i),e}}return{isMatch:!1,score:1}}});const Z=document.getElementById("app");Z&&(0,e.createRoot)(Z).render((0,e.createElement)((function(){const[n,s]=(0,e.useState)(!0),[r,a]=(0,e.useState)([]),[o,h]=(0,e.useState)([]),[d,u]=(0,e.useState)("");(0,e.useEffect)((()=>{""===d&&c.getPosts().then((e=>{let{eventLocations:t,eventTypes:n,events:r}=e;a(r.nodes.map((e=>function(e){const{eventLocations:{nodes:t}}=e,{eventTypes:{nodes:n}}=e,{eventId:s,link:r,title:i}=e,{event_info:c}=e,{featuredImage:{node:{altText:a,srcSet:o,mediaDetails:l,sizes:h}}}=e;return{locations:t,type:n,sizes:h,eventId:s,link:r,title:i,event_info:c,altText:a,srcSet:o,size:l.sizes[0]}}(e))));const i=[{type:{name:"Event Types",filters:[...n.nodes]}},{type:{name:"Locations",filters:[...t.nodes]}}];h(i),s(!1)}))}),[d]),(0,e.useEffect)((()=>{if(""===d)return;s(!0);const e=setTimeout((()=>{const e=new Y(r,{...i}).search(d);a(e.map((e=>e.item))),s(!1)}),500);return()=>clearTimeout(e)}),[d]);const[f,g]=(0,e.useState)([]);return(0,e.createElement)("div",{className:"cno-search"},(0,e.createElement)(l,{filters:o,search:d,checkedFilters:f,setCheckedFilters:g,handleSearchInput:function(e){let{target:t}=e;u(t.value)}}),(0,e.createElement)("div",{className:"container"},n?(0,e.createElement)(t,null):(0,e.createElement)(m,{posts:r,checkedFilters:f})))}),null))}();