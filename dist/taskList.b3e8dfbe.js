!function(e,t,r,o,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[o]&&a[o],i=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(t,r){if(!i[t]){if(!e[t]){var n="function"==typeof a[o]&&a[o];if(!r&&n)return n(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}f.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},f.cache={};var c=i[t]=new d.Module(t);e[t][0].call(c.exports,f,c,c.exports,this)}return i[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:d(t)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=i,d.parent=s,d.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(d,"root",{get:function(){return a[o]}}),a[o]=d;for(var u=0;u<t.length;u++)d(t[u])}({"2nMYY":[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"taskList",()=>d);var n=e("@xatom/core"),a=e("../auth"),s=e("../supbase"),i=o.interopDefault(s);let l=()=>{let e=new n.WFComponent("[xa-type=cta-btn]");e.on("click",t=>{t.preventDefault(),e.setTextContent("Please wait..."),(0,a.logout)()}),e.setTextContent("Logout")},d=()=>{l();let e=new n.WFFormComponent('[xa-type="task-list"]'),t=[],r=new n.WFDynamicList('[xa-type="list"]',{rowSelector:'[xa-type="item"]',emptySelector:'[xa-type="list-empty"]',loaderSelector:'[xa-type="list-loading"]'}),o=!0,s=()=>{o=!0,e.disableForm(),r.changeLoadingStatus(!0),(0,i.default).from("todos").select().then(n=>{console.log(n),e.enableForm(),t=n.data.sort((e,t)=>e.id-t.id),r.changeLoadingStatus(!1),r.setData(t),o=!1})},d=t=>{o=!0,e.disableForm(),r.changeLoadingStatus(!0),(0,i.default).from("todos").insert({task:t,done:!1,user_id:(0,a.userAuth).getUser().id}).then(t=>{if(t.error){e.enableForm(),alert(t.error.message||"Something went wrong!"),o=!1;return}e.resetForm(),s()})},u=(t,n)=>{o=!0,e.disableForm(),r.changeLoadingStatus(!0),(0,i.default).from("todos").update({done:n}).eq("id",t).eq("user_id",(0,a.userAuth).getUser().id).then(t=>{if(t.error){e.enableForm(),alert(t.error.message||"Something went wrong!"),o=!1;return}e.resetForm(),s()})},c=t=>{o=!0,e.disableForm(),r.changeLoadingStatus(!0),(0,i.default).from("todos").delete().eq("id",t).eq("user_id",(0,a.userAuth).getUser().id).then(t=>{if(t.error){e.enableForm(),alert(t.error.message||"Something went wrong!"),o=!1;return}e.resetForm(),s()})};r.rowRenderer(({rowData:e,rowElement:t})=>{let{doneBtn:r,deleteBtn:n,taskText:a}=t.getManyChildAsComponents({doneBtn:"[xa-type=done]",deleteBtn:"[xa-type=delete]",taskText:"[xa-type=item-text]"});return t.updateTextViaAttrVar({"task-text":e.task}),e.done?(r.addCssClass("active"),a.addCssClass("active")):(r.removeCssClass("active"),a.removeCssClass("active")),r.on("click",()=>{o||u(e.id,!e.done)}),n.on("click",()=>{o||c(e.id)}),t}),r.setData([]),e.onFormSubmit(e=>{e.task&&0!==e.task.trim().length&&d(e.task)}),s()}},{"@xatom/core":"5eqAK","../auth":"apxUl","../supbase":"54PYi","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=taskList.b3e8dfbe.js.map
