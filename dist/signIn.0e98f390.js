!function(e,t,r,o,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[o]&&i[o],s=a.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,r){if(!s[t]){if(!e[t]){var n="function"==typeof i[o]&&i[o];if(!r&&n)return n(t,!0);if(a)return a(t,!0);if(u&&"string"==typeof t)return u(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}p.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},p.cache={};var f=s[t]=new l.Module(t);e[t][0].call(f.exports,p,f,f.exports,this)}return s[t].exports;function p(e){var t=p.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=s,l.parent=a,l.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return i[o]}}),i[o]=l;for(var d=0;d<t.length;d++)l(t[d])}({jOZyB:[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"signIn",()=>u);var n=e("@xatom/core"),i=e("../supbase"),a=o.interopDefault(i),s=e("../../config");let u=()=>{let e=new n.WFFormComponent("[xa-type=main-form]");e.getChildAsComponent('[xa-type="google-btn"]').on("click",()=>{(0,a.default).auth.signInWithOAuth({provider:"google",options:{redirectTo:s.SUPABASE_REDIRECT_URL}})}),e.onFormSubmit(t=>{e.showForm(),e.disableForm(),e.updateSubmitButtonText("Please wait..."),(0,a.default).auth.signInWithPassword({email:t.email,password:t.password}).then(t=>{if(t.error){e.updateTextViaAttrVar({error:t.error.message||"Unable to login please try again"}),e.showErrorState(),e.updateSubmitButtonText("Login");return}e.updateSubmitButtonText("Redirecting..."),(0,n.navigate)("/dashboard/task-list")}).catch(t=>{e.updateTextViaAttrVar({error:t.message||"Unable to login please try again"}),e.showErrorState(),e.updateSubmitButtonText("Login")}).finally(()=>{e.enableForm()})})}},{"@xatom/core":"5eqAK","../supbase":"54PYi","../../config":"dwh13","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}],dwh13:[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"SUPABASE_REDIRECT_URL",()=>n);let n=`${location.protocol}//${location.host}/auth/verify`},{"@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=signIn.0e98f390.js.map