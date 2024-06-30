// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hNkb0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "orderDetails", ()=>orderDetails);
var _core = require("@xatom/core");
var _auth = require("../auth");
var _supbase = require("../supbase");
var _supbaseDefault = parcelHelpers.interopDefault(_supbase);
const renderLogoutBtn = ()=>{
    //logout button
    const btn = new (0, _core.WFComponent)(`[xa-type=cta-btn]`);
    //on click setting up button text and calling logout function
    btn.on("click", (e)=>{
        e.preventDefault();
        btn.setTextContent("Please wait...");
        (0, _auth.logout)();
    });
    //changing create account text to logout text
    btn.setTextContent("Logga ut");
};
const orderDetails = async ()=>{
    renderLogoutBtn();
    const userId = (0, _auth.userAuth).getUser().id;
    const orderDetailsContainer = new (0, _core.WFComponent)(`[xa-type="order-details"]`);
    let order = null;
    // Fetch and Render Order Details (Combined)
    try {
        const { data, error } = await (0, _supbaseDefault.default).from("Order").select("*").eq("user_id", userId).eq("is_complete", false).single();
        if (error || !data) {
            orderDetailsContainer.setHTML("<p>No active order found.</p>");
            return;
        }
        order = data;
        // Update Text Content using a similar approach to the working code
        const { bestallning, datum, varderingsnummer, summa, angeratt, totalgrampurchased, kvittolink } = orderDetailsContainer.getManyChildAsComponents({
            kvittolink: "[xa-type=pdf-link]",
            bestallning: "[xa-type=bestallning]",
            datum: "[xa-type=datum]",
            varderingsnummer: "[xa-type=varderingsnummer]",
            summa: "[xa-type=summa]",
            angeratt: "[xa-type=angerr\xe4tt]",
            totalgrampurchased: "[xa-type=totalgrampurchased]"
        });
        //Update inner text of the elements
        bestallning.setTextContent(order.barcodeid.toFixed(0));
        datum.setTextContent(order.order_date);
        varderingsnummer.setTextContent(order.valuation_number);
        summa.setTextContent(order.amount != null ? order.amount.toFixed(2) : "0.00");
        angeratt.setTextContent(order.cancellation_right_period);
        totalgrampurchased.setTextContent(order.total_gram_purchased != null ? order.total_gram_purchased.toFixed(2) : "0.00");
        kvittolink.setAttribute("href", order.recipe_download_link);
        const { data: statusData, error: statusError } = await (0, _supbaseDefault.default).from("order_status").select("*").eq("order_id", order.id) // Filter by the Order's id (primary key)
        .order("created_at", {
            ascending: false
        }) // Get the latest status
        .single();
        if (statusError) {
            console.error("Error fetching order status:", statusError);
            return;
        }
        const formatDateTime = (isoString)=>{
            const date = new Date(isoString);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${day}.${month}.${year} ${hours}:${minutes}`;
        };
        const step = statusData.step || 1;
        const substep = statusData.substep || 1;
        const kuvertMottagen = statusData.kuvert_mottagen ? formatDateTime(statusData.kuvert_mottagen) : "Not available";
        // Update elements with the step and substep information
        const stepElement = new (0, _core.WFComponent)(`[xa-type="step"]`);
        stepElement.setTextContent(`${step}`);
        const substepElement = new (0, _core.WFComponent)(`[xa-type="substep"]`);
        substepElement.setTextContent(`${substep}`);
        // Update the kuvert_mottagen element with the date
        const kuvertMottagenElement = new (0, _core.WFComponent)(`[xa-type="kuvertmottagen"]`);
        kuvertMottagenElement.setTextContent(kuvertMottagen);
    } catch (error) {
        console.error("Error fetching order details or status:", error);
    // Handle error appropriately
    }
};
orderDetails();

},{"@xatom/core":"8w4K8","../auth":"du3Bh","../supbase":"anyOU","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}]},[], null, "parcelRequire89a0")

//# sourceMappingURL=orderDetail.c19c28fe.js.map
