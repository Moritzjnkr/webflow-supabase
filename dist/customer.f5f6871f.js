!function(e,t,o,n,r){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a="function"==typeof s[n]&&s[n],i=a.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,o){if(!i[t]){if(!e[t]){var r="function"==typeof s[n]&&s[n];if(!o&&r)return r(t,!0);if(a)return a(t,!0);if(u&&"string"==typeof t)return u(t);var p=Error("Cannot find module '"+t+"'");throw p.code="MODULE_NOT_FOUND",p}c.resolve=function(o){var n=e[t][1][o];return null!=n?n:o},c.cache={};var f=i[t]=new l.Module(t);e[t][0].call(f.exports,c,f,f.exports,this)}return i[t].exports;function c(e){var t=c.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=i,l.parent=a,l.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]},Object.defineProperty(l,"root",{get:function(){return s[n]}}),s[n]=l;for(var p=0;p<t.length;p++)l(t[p])}({"5wgJw":[function(e,t,o){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(o),n.export(o,"customerDetails",()=>l);var r=e("@xatom/core"),s=e("../auth"),a=e("../supbase"),i=n.interopDefault(a);let u=()=>{let e=new r.WFComponent("[xa-type=cta-btn]");e.on("click",t=>{t.preventDefault(),e.setTextContent("Please wait..."),(0,s.logout)()}),e.setTextContent("Logga ut")},l=async()=>{u();let e=(0,s.userAuth).getUser().id,t=new r.WFComponent('[xa-type="customer-details"]'),o=null;try{let{data:n,error:r}=await (0,i.default).from("Customer").select("*").eq("user_id",e).single();if(r||!n){t.setHTML("<p>No active order found.</p>");return}o=n;let{firstname:s,lastname:a,adress:u,postalcode:l,postalort:p,uppgiftemail:f,uppgiftphone:c}=t.getManyChildAsComponents({firstname:"[xa-type=firstname]",lastname:"[xa-type=lastname]",adress:"[xa-type=adress]",postalcode:"[xa-type=postalcode]",postalort:"[xa-type=postalort]",uppgiftemail:"[xa-type=uppgiftemail]",uppgiftphone:"[xa-type=uppgiftphone]"});s.setTextContent(o.First_name),a.setTextContent(o.Last_name),u.setTextContent(o.gatuadress),l.setTextContent(o.postnummer),p.setTextContent(o.postort),f.setTextContent(o.email),c.setTextContent(o.phone)}catch(e){console.error("Error fetching order details or status:",e)}};l()},{"@xatom/core":"5eqAK","../auth":"apxUl","../supbase":"54PYi","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=customer.f5f6871f.js.map
