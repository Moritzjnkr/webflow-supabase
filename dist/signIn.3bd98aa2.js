!function(e,r,t,o,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof i[o]&&i[o],u=a.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(r,t){if(!u[r]){if(!e[r]){var n="function"==typeof i[o]&&i[o];if(!t&&n)return n(r,!0);if(a)return a(r,!0);if(l&&"string"==typeof r)return l(r);var c=Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}d.resolve=function(t){var o=e[r][1][t];return null!=o?o:t},d.cache={};var f=u[r]=new s.Module(r);e[r][0].call(f.exports,d,f,f.exports,this)}return u[r].exports;function d(e){var r=d.resolve(e);return!1===r?{}:s(r)}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=u,s.parent=a,s.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(s,"root",{get:function(){return i[o]}}),i[o]=s;for(var c=0;c<r.length;c++)s(r[c])}({jOZyB:[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"signIn",()=>l);var n=e("@xatom/core"),i=e("../supbase"),a=o.interopDefault(i),u=e("../../config");let l=()=>{let e=new n.WFFormComponent("[xa-type=main-form]");e.onFormSubmit(r=>{e.showForm(),e.disableForm(),e.updateSubmitButtonText("Sending Magic Link..."),(0,a.default).auth.signInWithOtp({email:r.email,options:{shouldCreateUser:!1,emailRedirectTo:u.SUPABASE_REDIRECT_URL}}).then(r=>{if(r.error){e.updateTextViaAttrVar({error:r.error.message||"Unable to send magic link, please try again"}),e.showErrorState(),e.updateSubmitButtonText("Send Magic Link");return}e.updateSubmitButtonText("Check your email for the magic link"),(0,n.navigate)("/auth/check-email")}).catch(r=>{e.updateTextViaAttrVar({error:r.message||"Unable to send magic link, please try again"}),e.showErrorState(),e.updateSubmitButtonText("Send Magic Link")}).finally(()=>{e.enableForm()})})}},{"@xatom/core":"5eqAK","../supbase":"54PYi","../../config":"dwh13","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}],dwh13:[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"SUPABASE_REDIRECT_URL",()=>n);let n=`${location.protocol}//${location.host}/auth/verify`},{"@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=signIn.3bd98aa2.js.map