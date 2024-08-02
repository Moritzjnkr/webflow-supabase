!function(e,t,r,o,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a[o]&&a[o],i=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,r){if(!i[t]){if(!e[t]){var n="function"==typeof a[o]&&a[o];if(!r&&n)return n(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}p.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},p.cache={};var c=i[t]=new u.Module(t);e[t][0].call(c.exports,p,c,c.exports,this)}return i[t].exports;function p(e){var t=p.resolve(e);return!1===t?{}:u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=i,u.parent=s,u.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(u,"root",{get:function(){return a[o]}}),a[o]=u;for(var d=0;d<t.length;d++)u(t[d])}({gxkHk:[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"orderDetails",()=>p);var n=e("@xatom/core"),a=e("../auth"),s=e("../supbase"),i=o.interopDefault(s);let l=()=>{let e=new n.WFComponent("[xa-type=cta-btn]");e.on("click",t=>{t.preventDefault(),e.setTextContent("Please wait..."),(0,a.logout)()}),e.setTextContent("Logga ut")},u=async()=>{let e=new n.WFDynamicList("[xa-type='history-list']",{rowSelector:"[xa-type='history-item']",emptySelector:"[xa-type='no-previous-order']"});e.rowRenderer(({rowData:e,rowElement:t})=>{if(!e||!t)return console.error("Row data or element is missing",e,t),t;console.log("Rendering row with data",e);let r=t.getChildAsComponent("[xa-type='history-vard-nr']"),o=t.getChildAsComponent("[xa-type='history-belopp']");if(r&&o){r.setTextContent(e.valuation_number);let t=null!=e.amount?e.amount.toFixed(2)+" SEK":"0.00 SEK";o.setTextContent(t)}else console.error("One or more components not found in row element",r,o);return t});try{let{data:t,error:r}=await (0,i.default).from("Order").select("*").eq("user_id",(0,a.userAuth).getUser().id).eq("is_complete",!0).order("order_date",{ascending:!1});if(r){console.error("Error fetching order history:",r);return}console.log("Setting data for history",t),e.setData(t||[])}catch(e){console.error("Failed to fetch or render order history:",e)}},d=async e=>{try{let{data:t,error:r}=await (0,i.default).from("Order").select("*").eq("user_id",e).eq("is_complete",!1).order("order_date",{ascending:!1}).limit(1).single();if(r||!t)return console.error("Error fetching latest incomplete order or no such order exists",r),null;return console.log("Fetched latest incomplete order",t),t}catch(e){return console.error("Error fetching latest incomplete order:",e),null}},c=async e=>{try{let{data:t,error:r}=await (0,i.default).from("order_status").select("*").eq("order_id",e).order("created_at",{ascending:!1}).limit(1).single();if(r)return console.error("Error fetching order status:",r),null;return console.log("Fetched latest order status",t),t}catch(e){return console.error("Error fetching order status:",e),null}},p=async()=>{l(),u();let e=(0,a.userAuth).getUser().id,t=new n.WFComponent('[xa-type="order-details"]'),r=await d(e);if(!r){t.setHTML("<p>No active order found.</p>");return}let o=t.getManyChildAsComponents({kvittolink:"[xa-type=pdf-link]",bestallning:"[xa-type=bestallning]",datum:"[xa-type=datum]",varderingsnummer:"[xa-type=varderingsnummer]",summa:"[xa-type=summa]",angeratt:"[xa-type=angerrätt]",totalgrampurchased:"[xa-type=totalgrampurchased]"});if(o.bestallning&&o.datum&&o.varderingsnummer&&o.summa&&o.angeratt&&o.totalgrampurchased&&o.kvittolink)o.bestallning.setTextContent(r.barcodeid.toFixed(0)),o.datum.setTextContent(r.order_date),o.varderingsnummer.setTextContent(r.valuation_number),o.summa.setTextContent(null!=r.amount?r.amount.toFixed(2):"0.00"),o.angeratt.setTextContent(r.cancellation_right_period),o.totalgrampurchased.setTextContent(null!=r.total_gram_purchased?r.total_gram_purchased.toFixed(2):"0.00"),o.kvittolink.setAttribute("href",r.recipe_download_link);else{console.error("One or more components not found in order details container",o);return}let s=await c(r.id);if(!s)return;let i=s.step||1,p=s.substep||1,m=s.kuvert_mottagen?(e=>{let t=new Date(e),r=t.getDate().toString().padStart(2,"0"),o=(t.getMonth()+1).toString().padStart(2,"0"),n=t.getFullYear(),a=t.getHours().toString().padStart(2,"0"),s=t.getMinutes().toString().padStart(2,"0");return`${r}.${o}.${n} ${a}:${s}`})(s.kuvert_mottagen):"Not available",f=new n.WFComponent('[xa-type="step"]'),g=new n.WFComponent('[xa-type="substep"]'),h=new n.WFComponent('[xa-type="kuvertmottagen"]');f&&g&&h?(f.setTextContent(`${i}`),g.setTextContent(`${p}`),h.setTextContent(m)):console.error("One or more step-related components not found",{stepElement:f,substepElement:g,kuvertMottagenElement:h})};p()},{"@xatom/core":"5eqAK","../auth":"apxUl","../supbase":"54PYi","@parcel/transformer-js/src/esmodule-helpers.js":"jiucr"}]},[],0,"parcelRequire89a0");
//# sourceMappingURL=orderDetail.684f169d.js.map
