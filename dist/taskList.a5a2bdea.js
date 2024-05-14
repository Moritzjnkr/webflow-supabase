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
})({"9fECp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "orderList", ()=>orderList);
var _core = require("@xatom/core");
var _auth = require("../auth"); // Import for potential future auth checks
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
    btn.setTextContent("Logout");
};
const orderList = ()=>{
    renderLogoutBtn();
    // Get references to elements using xa-types (these must exist in your HTML)
    const tableHeaders = new (0, _core.WFComponent)(`[xa-type="table-headers"]`);
    const listContainer = new (0, _core.WFComponent)(`[xa-type="order-list"]`);
    // Fetch the order data from Supabase
    const fetchOrders = async ()=>{
        try {
            const { data, error } = await (0, _supbaseDefault.default).from("orders").select("*");
            if (error) throw error;
            renderOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error.message);
        // Consider displaying an error message to the user here
        }
    };
    // Function to render order data into the HTML
    const renderOrders = (orders)=>{
        listContainer.removeAllChildren(); // Clear previous content
        for (const order of orders){
            // Create a new row element for each order
            const row = new (0, _core.WFComponent)(`<div xa-type="order-item"></div>`);
            // Update text content within the row using xa-types
            row.updateTextViaAttrVar({
                "order-id": order.order_id,
                "order-date": order.order_date,
                "valuation-number": order.valuation_number,
                "amount": order.amount
            });
            listContainer.appendChild(row);
        }
    };
    // Initial fetch of order data when the page loads
    fetchOrders();
};

},{"@xatom/core":"8w4K8","../auth":"du3Bh","../supbase":"anyOU","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}]},[], null, "parcelRequire89a0")

//# sourceMappingURL=taskList.a5a2bdea.js.map
