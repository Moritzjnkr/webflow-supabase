!function(e,r,n,o,t){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},u="function"==typeof i[o]&&i[o],a=u.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(r,n){if(!a[r]){if(!e[r]){var t="function"==typeof i[o]&&i[o];if(!n&&t)return t(r,!0);if(u)return u(r,!0);if(s&&"string"==typeof r)return s(r);var f=Error("Cannot find module '"+r+"'");throw f.code="MODULE_NOT_FOUND",f}d.resolve=function(n){var o=e[r][1][n];return null!=o?o:n},d.cache={};var c=a[r]=new l.Module(r);e[r][0].call(c.exports,d,c,c.exports,this)}return a[r].exports;function d(e){var r=d.resolve(e);return!1===r?{}:l(r)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=a,l.parent=u,l.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]},Object.defineProperty(l,"root",{get:function(){return i[o]}}),i[o]=l;for(var f=0;f<r.length;f++)l(r[f])}({dRyYX:[function(e,r,n){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"verify",()=>a);var t=e("@xatom/core"),i=e("../supbase"),u=o.interopDefault(i);let a=()=>{(0,u.default).auth.getSession().then(e=>{if(e.data&&!e.error)(0,t.navigate)("/mina-sidor/forsaljningar");else{let{data:e}=(0,u.default).auth.onAuthStateChange((r,n)=>{console.log(r,n),n&&((0,t.navigate)("/mina-sidor/forsaljningar"),e.subscription.unsubscribe())})}}).catch(console.log)}},{"@xatom/core":"5eqAK","../supbase":"54PYi","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=verify.c00a65f1.js.map
