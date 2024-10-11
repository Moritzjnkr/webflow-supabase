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
})({"bPNs5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "customerDetails", ()=>customerDetails);
var _core = require("@xatom/core");
var _auth = require("../auth");
var _supbase = require("../supbase");
var _supbaseDefault = parcelHelpers.interopDefault(_supbase);
const renderLogoutBtn = ()=>{
    // Logout button
    const btn = new (0, _core.WFComponent)(`[xa-type=cta-btn]`);
    btn.on("click", (e)=>{
        e.preventDefault();
        btn.setTextContent("...");
        (0, _auth.logout)();
    });
    btn.setTextContent("Logga ut");
};
const customerDetails = async ()=>{
    renderLogoutBtn();
    const userId = (0, _auth.userAuth).getUser().id;
    const customerDetailsContainer = new (0, _core.WFComponent)(`[xa-type="customer-details"]`);
    const form = new (0, _core.WFFormComponent)(`[xa-type="bank-form"]`);
    let customer = null;
    // Fetch and Render Customer Details
    try {
        const { data, error } = await (0, _supbaseDefault.default).from("Customer").select("*").eq("user_id", userId).single();
        if (error || !data) {
            customerDetailsContainer.setHTML("<p>No active customer found.</p>");
            return;
        }
        customer = data;
        // Update Text Content for static fields
        const { firstname, lastname, adress, postalcode, postalort, uppgiftemail, uppgiftphone } = customerDetailsContainer.getManyChildAsComponents({
            firstname: "[xa-type=firstname]",
            lastname: "[xa-type=lastname]",
            adress: "[xa-type=adress]",
            postalcode: "[xa-type=postalcode]",
            postalort: "[xa-type=postalort]",
            uppgiftemail: "[xa-type=uppgiftemail]",
            uppgiftphone: "[xa-type=uppgiftphone]"
        });
        firstname.setTextContent(customer.First_name);
        lastname.setTextContent(customer.Last_name);
        adress.setTextContent(customer.gatuadress);
        postalcode.setTextContent(customer.postnummer);
        postalort.setTextContent(customer.postort);
        uppgiftemail.setTextContent(customer.email);
        uppgiftphone.setTextContent(customer.phone);
        // Set input fields for numeric bank details using `value`
        const clearingInput = document.querySelector(`[xa-type="clearingnumber"]`);
        const accountInput = document.querySelector(`[xa-type="bankaccountnumber"]`);
        if (clearingInput) clearingInput.value = customer.clearingnumber?.toString() || "";
        if (accountInput) accountInput.value = customer.bankaccountnumber?.toString() || "";
        form.onFormSubmit(async (formData)=>{
            form.disableForm(); // Disable the form to prevent multiple submissions
            const clearingNumberValue = formData.clearingnumber;
            const bankAccountNumberValue = formData.bankaccountnumber;
            try {
                const { data: updatedData, error } = await (0, _supbaseDefault.default).from("Customer").update({
                    clearingnumber: clearingNumberValue,
                    bankaccountnumber: bankAccountNumberValue
                }).eq("user_id", userId).select(); // Explicitly select the updated rows
                if (error) {
                    console.error("Error updating customer data:", error.message);
                    form.showErrorState(); // Custom error message
                } else {
                    console.log("Customer data updated successfully", updatedData);
                    form.showSuccessState(); // Custom success message
                    const successMessage = document.querySelector(`[xa-type="success-message"]`);
                    if (successMessage) {
                        successMessage.style.display = "block";
                        let countdown = 3;
                        const countdownSpan = document.getElementById("countdown");
                        const interval = setInterval(()=>{
                            countdown -= 1;
                            if (countdownSpan) countdownSpan.textContent = countdown.toString();
                            if (countdown <= 0) {
                                clearInterval(interval);
                                location.reload(); // Reload the page after countdown
                            }
                        }, 1000); // Reduce countdown every second
                    }
                }
            } catch (updateError) {
                console.error("Error during form submission:", updateError.message);
                form.showErrorState();
            } finally{
                form.enableForm(); // Re-enable the form after submission
            }
        });
    } catch (error) {
        console.error("Error fetching customer details:", error);
        customerDetailsContainer.setHTML("<p>Error fetching customer data.</p>");
    }
};
customerDetails();

},{"@xatom/core":"8w4K8","../auth":"du3Bh","../supbase":"anyOU","@parcel/transformer-js/src/esmodule-helpers.js":"5oERU"}]},[], null, "parcelRequire89a0")

//# sourceMappingURL=customer.aa6ad221.js.map
