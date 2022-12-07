// https://unpkg.com/mp4-wasm@1.0.6/build/mp4.js
// With the path to the wasm file changed. Search for CHANGED

var Module = (function () {
    var _ = import.meta.url;
    return function (t) {
      t = t || {};
      var t = typeof t != "undefined" ? t : {},
        u,
        h;
      (t.ready = new Promise(function (r, n) {
        (u = r), (h = n);
      })),
        (t.create_buffer = function (n) {
          return t._malloc(n);
        }),
        (t.free_buffer = function (n) {
          return t._free(n);
        }),
        (t.locateFile = function (n, e) {
          return (
            t.simd && (n = n.replace(/\.wasm$/i, ".simd.wasm")),
            t.getWasmPath ? t.getWasmPath(n, e, t.simd) : e + n
          );
        }),
        (t.createWebCodecsEncoder = function (n) {
          return createWebCodecsEncoderWithModule(t, n);
        });
      var m = {},
        l;
      for (l in t) t.hasOwnProperty(l) && (m[l] = t[l]);
      var p = [],
        j = "./this.program",
        N = function (r, n) {
          throw n;
        },
        W = !1,
        k = !1,
        x = !1,
        L = !1;
      (W = typeof window == "object"),
        (k = typeof importScripts == "function"),
        (x =
          typeof process == "object" &&
          typeof process.versions == "object" &&
          typeof process.versions.node == "string"),
        (L = !W && !x && !k);
      var y = "";
      function z(r) {
        return t.locateFile ? t.locateFile(r, y) : y + r;
      }
      var sr, nr, J, lr;
      (W || k) &&
        (k
          ? (y = self.location.href)
          : typeof document != "undefined" &&
            document.currentScript &&
            (y = document.currentScript.src),
        _ && (y = _),
        y.indexOf("blob:") !== 0
          ? (y = y.substr(0, y.lastIndexOf("/") + 1))
          : (y = ""),
        (sr = function (r) {
          var n = new XMLHttpRequest();
          return n.open("GET", r, !1), n.send(null), n.responseText;
        }),
        k &&
          (J = function (r) {
            var n = new XMLHttpRequest();
            return (
              n.open("GET", r, !1),
              (n.responseType = "arraybuffer"),
              n.send(null),
              new Uint8Array(n.response)
            );
          }),
        (nr = function (r, n, e) {
          var i = new XMLHttpRequest();
          i.open("GET", r, !0),
            (i.responseType = "arraybuffer"),
            (i.onload = function () {
              if (i.status == 200 || (i.status == 0 && i.response)) {
                n(i.response);
                return;
              }
              e();
            }),
            (i.onerror = e),
            i.send(null);
        }),
        (lr = function (r) {
          document.title = r;
        }));
      var er = t.print || console.log.bind(console),
        P = t.printErr || console.warn.bind(console);
      for (l in m) m.hasOwnProperty(l) && (t[l] = m[l]);
      (m = null),
        t.arguments && (p = t.arguments),
        t.thisProgram && (j = t.thisProgram),
        t.quit && (N = t.quit);
      var X;
      t.wasmBinary && (X = t.wasmBinary);
      var Wr = t.noExitRuntime || !0;
      typeof WebAssembly != "object" && ar("no native wasm support detected");
      var K,
        w = !1,
        b;
      function I(r, n, e) {
        for (var i = n + e, a = ""; !(n >= i); ) {
          var f = r[n++];
          if (!f) return a;
          if (!(f & 128)) {
            a += String.fromCharCode(f);
            continue;
          }
          var c = r[n++] & 63;
          if ((f & 224) == 192) {
            a += String.fromCharCode(((f & 31) << 6) | c);
            continue;
          }
          var o = r[n++] & 63;
          if (
            ((f & 240) == 224
              ? (f = ((f & 15) << 12) | (c << 6) | o)
              : (f = ((f & 7) << 18) | (c << 12) | (o << 6) | (r[n++] & 63)),
            f < 65536)
          )
            a += String.fromCharCode(f);
          else {
            var s = f - 65536;
            a += String.fromCharCode(55296 | (s >> 10), 56320 | (s & 1023));
          }
        }
        return a;
      }
      function A(r, n) {
        return r ? I(U, r, n) : "";
      }
      function O(r, n, e, i) {
        if (!(i > 0)) return 0;
        for (var a = e, f = e + i - 1, c = 0; c < r.length; ++c) {
          var o = r.charCodeAt(c);
          if (o >= 55296 && o <= 57343) {
            var s = r.charCodeAt(++c);
            o = (65536 + ((o & 1023) << 10)) | (s & 1023);
          }
          if (o <= 127) {
            if (e >= f) break;
            n[e++] = o;
          } else if (o <= 2047) {
            if (e + 1 >= f) break;
            (n[e++] = 192 | (o >> 6)), (n[e++] = 128 | (o & 63));
          } else if (o <= 65535) {
            if (e + 2 >= f) break;
            (n[e++] = 224 | (o >> 12)),
              (n[e++] = 128 | ((o >> 6) & 63)),
              (n[e++] = 128 | (o & 63));
          } else {
            if (e + 3 >= f) break;
            (n[e++] = 240 | (o >> 18)),
              (n[e++] = 128 | ((o >> 12) & 63)),
              (n[e++] = 128 | ((o >> 6) & 63)),
              (n[e++] = 128 | (o & 63));
          }
        }
        return (n[e] = 0), e - a;
      }
      function E(r, n, e) {
        return O(r, U, n, e);
      }
      function vr(r) {
        for (var n = 0, e = 0; e < r.length; ++e) {
          var i = r.charCodeAt(e);
          i >= 55296 &&
            i <= 57343 &&
            (i = (65536 + ((i & 1023) << 10)) | (r.charCodeAt(++e) & 1023)),
            i <= 127
              ? ++n
              : i <= 2047
              ? (n += 2)
              : i <= 65535
              ? (n += 3)
              : (n += 4);
        }
        return n;
      }
      function Zr(r, n) {
        for (var e = "", i = 0; !(i >= n / 2); ++i) {
          var a = Z[(r + i * 2) >> 1];
          if (a == 0) break;
          e += String.fromCharCode(a);
        }
        return e;
      }
      function Qr(r, n, e) {
        if ((e === void 0 && (e = 2147483647), e < 2)) return 0;
        e -= 2;
        for (
          var i = n, a = e < r.length * 2 ? e / 2 : r.length, f = 0;
          f < a;
          ++f
        ) {
          var c = r.charCodeAt(f);
          (Z[n >> 1] = c), (n += 2);
        }
        return (Z[n >> 1] = 0), n - i;
      }
      function Mr(r) {
        return r.length * 2;
      }
      function rn(r, n) {
        for (var e = 0, i = ""; !(e >= n / 4); ) {
          var a = V[(r + e * 4) >> 2];
          if (a == 0) break;
          if ((++e, a >= 65536)) {
            var f = a - 65536;
            i += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023));
          } else i += String.fromCharCode(a);
        }
        return i;
      }
      function nn(r, n, e) {
        if ((e === void 0 && (e = 2147483647), e < 4)) return 0;
        for (var i = n, a = i + e - 4, f = 0; f < r.length; ++f) {
          var c = r.charCodeAt(f);
          if (c >= 55296 && c <= 57343) {
            var o = r.charCodeAt(++f);
            c = (65536 + ((c & 1023) << 10)) | (o & 1023);
          }
          if (((V[n >> 2] = c), (n += 4), n + 4 > a)) break;
        }
        return (V[n >> 2] = 0), n - i;
      }
      function en(r) {
        for (var n = 0, e = 0; e < r.length; ++e) {
          var i = r.charCodeAt(e);
          i >= 55296 && i <= 57343 && ++e, (n += 4);
        }
        return n;
      }
      function tn(r, n) {
        return r % n > 0 && (r += n - (r % n)), r;
      }
      var pr, _r, U, Z, hr, V, D, kr, Ir;
      function Or(r) {
        (pr = r),
          (t.HEAP8 = _r = new Int8Array(r)),
          (t.HEAP16 = Z = new Int16Array(r)),
          (t.HEAP32 = V = new Int32Array(r)),
          (t.HEAPU8 = U = new Uint8Array(r)),
          (t.HEAPU16 = hr = new Uint16Array(r)),
          (t.HEAPU32 = D = new Uint32Array(r)),
          (t.HEAPF32 = kr = new Float32Array(r)),
          (t.HEAPF64 = Ir = new Float64Array(r));
      }
      var me = t.INITIAL_MEMORY || 16777216,
        tr,
        Lr = [],
        Vr = [],
        Dr = [],
        an = !1;
      function on() {
        if (t.preRun)
          for (
            typeof t.preRun == "function" && (t.preRun = [t.preRun]);
            t.preRun.length;

          )
            cn(t.preRun.shift());
        yr(Lr);
      }
      function fn() {
        (an = !0), yr(Vr);
      }
      function sn() {
        if (t.postRun)
          for (
            typeof t.postRun == "function" && (t.postRun = [t.postRun]);
            t.postRun.length;

          )
            ln(t.postRun.shift());
        yr(Dr);
      }
      function cn(r) {
        Lr.unshift(r);
      }
      function un(r) {
        Vr.unshift(r);
      }
      function ln(r) {
        Dr.unshift(r);
      }
      var G = 0,
        gr = null,
        ir = null;
      function vn(r) {
        G++, t.monitorRunDependencies && t.monitorRunDependencies(G);
      }
      function pn(r) {
        if (
          (G--,
          t.monitorRunDependencies && t.monitorRunDependencies(G),
          G == 0 && (gr !== null && (clearInterval(gr), (gr = null)), ir))
        ) {
          var n = ir;
          (ir = null), n();
        }
      }
      (t.preloadedImages = {}), (t.preloadedAudios = {});
      function ar(r) {
        t.onAbort && t.onAbort(r),
          (r += ""),
          P(r),
          (w = !0),
          (b = 1),
          (r = "abort(" + r + "). Build with -s ASSERTIONS=1 for more info.");
        var n = new WebAssembly.RuntimeError(r);
        throw (h(n), n);
      }
      var _n = "data:application/octet-stream;base64,";
      function Hr(r) {
        return r.startsWith(_n);
      }

// START CHANGED

      var R = 'https://unpkg.com/mp4-wasm@1.0.6/build/mp4.wasm';
/*
      t.locateFile
        ? ((R = "mp4.wasm"), Hr(R) || (R = z(R)))
        : (R = new URL("mp4.wasm", import.meta.url).toString());
*/

// END CHANGED

      function Br(r) {
        try {
          if (r == R && X) return new Uint8Array(X);
          if (J) return J(r);
          throw "both async and sync fetching of the wasm failed";
        } catch (n) {
          ar(n);
        }
      }
      function hn() {
        return !X && (W || k) && typeof fetch == "function"
          ? fetch(R, { credentials: "same-origin" })
              .then(function (r) {
                if (!r.ok)
                  throw "failed to load wasm binary file at '" + R + "'";
                return r.arrayBuffer();
              })
              .catch(function () {
                return Br(R);
              })
          : Promise.resolve().then(function () {
              return Br(R);
            });
      }
      function gn() {
        var r = { a: ce };
        function n(c, o) {
          var s = c.exports;
          (t.asm = s),
            (K = t.asm.x),
            Or(K.buffer),
            (tr = t.asm.B),
            un(t.asm.y),
            pn("wasm-instantiate");
        }
        vn("wasm-instantiate");
        function e(c) {
          n(c.instance);
        }
        function i(c) {
          return hn()
            .then(function (o) {
              var s = WebAssembly.instantiate(o, r);
              return s;
            })
            .then(c, function (o) {
              P("failed to asynchronously prepare wasm: " + o), ar(o);
            });
        }
        function a() {
          return !X &&
            typeof WebAssembly.instantiateStreaming == "function" &&
            !Hr(R) &&
            typeof fetch == "function"
            ? fetch(R, { credentials: "same-origin" }).then(function (c) {
                var o = WebAssembly.instantiateStreaming(c, r);
                return o.then(e, function (s) {
                  return (
                    P("wasm streaming compile failed: " + s),
                    P("falling back to ArrayBuffer instantiation"),
                    i(e)
                  );
                });
              })
            : i(e);
        }
        if (t.instantiateWasm)
          try {
            var f = t.instantiateWasm(r, n);
            return f;
          } catch (c) {
            return (
              P("Module.instantiateWasm callback failed with error: " + c), !1
            );
          }
        return a().catch(h), {};
      }
      function yr(r) {
        for (; r.length > 0; ) {
          var n = r.shift();
          if (typeof n == "function") {
            n(t);
            continue;
          }
          var e = n.func;
          typeof e == "number"
            ? n.arg === void 0
              ? tr.get(e)()
              : tr.get(e)(n.arg)
            : e(n.arg === void 0 ? null : n.arg);
        }
      }
      function yn(r, n, e, i) {
        ar(
          "Assertion failed: " +
            A(r) +
            ", at: " +
            [n ? A(n) : "unknown filename", e, i ? A(i) : "unknown function"]
        );
      }
      function dn(r, n, e, i, a) {}
      function dr(r) {
        switch (r) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + r);
        }
      }
      function mn() {
        for (var r = new Array(256), n = 0; n < 256; ++n)
          r[n] = String.fromCharCode(n);
        jr = r;
      }
      var jr = void 0;
      function S(r) {
        for (var n = "", e = r; U[e]; ) n += jr[U[e++]];
        return n;
      }
      var Q = {},
        Y = {},
        cr = {},
        wn = 48,
        bn = 57;
      function Nr(r) {
        if (r === void 0) return "_unknown";
        r = r.replace(/[^a-zA-Z0-9_]/g, "$");
        var n = r.charCodeAt(0);
        return n >= wn && n <= bn ? "_" + r : r;
      }
      function qr(r, n) {
        return (
          (r = Nr(r)),
          new Function(
            "body",
            "return function " +
              r +
              `() {
    "use strict";    return body.apply(this, arguments);
};
`
          )(n)
        );
      }
      function mr(r, n) {
        var e = qr(n, function (i) {
          (this.name = n), (this.message = i);
          var a = new Error(i).stack;
          a !== void 0 &&
            (this.stack =
              this.toString() +
              `
` +
              a.replace(/^Error(:[^\n]*)?\n/, ""));
        });
        return (
          (e.prototype = Object.create(r.prototype)),
          (e.prototype.constructor = e),
          (e.prototype.toString = function () {
            return this.message === void 0
              ? this.name
              : this.name + ": " + this.message;
          }),
          e
        );
      }
      var xr = void 0;
      function T(r) {
        throw new xr(r);
      }
      var zr = void 0;
      function Xr(r) {
        throw new zr(r);
      }
      function An(r, n, e) {
        r.forEach(function (o) {
          cr[o] = n;
        });
        function i(o) {
          var s = e(o);
          s.length !== r.length && Xr("Mismatched type converter count");
          for (var v = 0; v < r.length; ++v) H(r[v], s[v]);
        }
        var a = new Array(n.length),
          f = [],
          c = 0;
        n.forEach(function (o, s) {
          Y.hasOwnProperty(o)
            ? (a[s] = Y[o])
            : (f.push(o),
              Q.hasOwnProperty(o) || (Q[o] = []),
              Q[o].push(function () {
                (a[s] = Y[o]), ++c, c === f.length && i(a);
              }));
        }),
          f.length === 0 && i(a);
      }
      function H(r, n, e) {
        if (((e = e || {}), !("argPackAdvance" in n)))
          throw new TypeError(
            "registerType registeredInstance requires argPackAdvance"
          );
        var i = n.name;
        if (
          (r ||
            T('type "' + i + '" must have a positive integer typeid pointer'),
          Y.hasOwnProperty(r))
        ) {
          if (e.ignoreDuplicateRegistrations) return;
          T("Cannot register type '" + i + "' twice");
        }
        if (((Y[r] = n), delete cr[r], Q.hasOwnProperty(r))) {
          var a = Q[r];
          delete Q[r],
            a.forEach(function (f) {
              f();
            });
        }
      }
      function En(r, n, e, i, a) {
        var f = dr(e);
        (n = S(n)),
          H(r, {
            name: n,
            fromWireType: function (c) {
              return !!c;
            },
            toWireType: function (c, o) {
              return o ? i : a;
            },
            argPackAdvance: 8,
            readValueFromPointer: function (c) {
              var o;
              if (e === 1) o = _r;
              else if (e === 2) o = Z;
              else if (e === 4) o = V;
              else throw new TypeError("Unknown boolean type size: " + n);
              return this.fromWireType(o[c >> f]);
            },
            destructorFunction: null,
          });
      }
      var wr = [],
        C = [
          {},
          { value: void 0 },
          { value: null },
          { value: !0 },
          { value: !1 },
        ];
      function br(r) {
        r > 4 && --C[r].refcount == 0 && ((C[r] = void 0), wr.push(r));
      }
      function Tn() {
        for (var r = 0, n = 5; n < C.length; ++n) C[n] !== void 0 && ++r;
        return r;
      }
      function Cn() {
        for (var r = 5; r < C.length; ++r) if (C[r] !== void 0) return C[r];
        return null;
      }
      function Fn() {
        (t.count_emval_handles = Tn), (t.get_first_emval = Cn);
      }
      function M(r) {
        switch (r) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default: {
            var n = wr.length ? wr.pop() : C.length;
            return (C[n] = { refcount: 1, value: r }), n;
          }
        }
      }
      function Ar(r) {
        return this.fromWireType(D[r >> 2]);
      }
      function Pn(r, n) {
        (n = S(n)),
          H(r, {
            name: n,
            fromWireType: function (e) {
              var i = C[e].value;
              return br(e), i;
            },
            toWireType: function (e, i) {
              return M(i);
            },
            argPackAdvance: 8,
            readValueFromPointer: Ar,
            destructorFunction: null,
          });
      }
      function Er(r) {
        if (r === null) return "null";
        var n = typeof r;
        return n === "object" || n === "array" || n === "function"
          ? r.toString()
          : "" + r;
      }
      function Un(r, n) {
        switch (n) {
          case 2:
            return function (e) {
              return this.fromWireType(kr[e >> 2]);
            };
          case 3:
            return function (e) {
              return this.fromWireType(Ir[e >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + r);
        }
      }
      function Rn(r, n, e) {
        var i = dr(e);
        (n = S(n)),
          H(r, {
            name: n,
            fromWireType: function (a) {
              return a;
            },
            toWireType: function (a, f) {
              if (typeof f != "number" && typeof f != "boolean")
                throw new TypeError(
                  'Cannot convert "' + Er(f) + '" to ' + this.name
                );
              return f;
            },
            argPackAdvance: 8,
            readValueFromPointer: Un(n, i),
            destructorFunction: null,
          });
      }
      function Sn(r, n) {
        if (!(r instanceof Function))
          throw new TypeError(
            "new_ called with constructor type " +
              typeof r +
              " which is not a function"
          );
        var e = qr(r.name || "unknownFunctionName", function () {});
        e.prototype = r.prototype;
        var i = new e(),
          a = r.apply(i, n);
        return a instanceof Object ? a : i;
      }
      function Gr(r) {
        for (; r.length; ) {
          var n = r.pop(),
            e = r.pop();
          e(n);
        }
      }
      function Wn(r, n, e, i, a) {
        var f = n.length;
        f < 2 &&
          T(
            "argTypes array size mismatch! Must at least get return value and 'this' types!"
          );
        for (
          var c = n[1] !== null && e !== null, o = !1, s = 1;
          s < n.length;
          ++s
        )
          if (n[s] !== null && n[s].destructorFunction === void 0) {
            o = !0;
            break;
          }
        for (
          var v = n[0].name !== "void", g = "", d = "", s = 0;
          s < f - 2;
          ++s
        )
          (g += (s !== 0 ? ", " : "") + "arg" + s),
            (d += (s !== 0 ? ", " : "") + "arg" + s + "Wired");
        var F =
          "return function " +
          Nr(r) +
          "(" +
          g +
          `) {
if (arguments.length !== ` +
          (f - 2) +
          `) {
throwBindingError('function ` +
          r +
          " called with ' + arguments.length + ' arguments, expected " +
          (f - 2) +
          ` args!');
}
`;
        o &&
          (F += `var destructors = [];
`);
        var $ = o ? "destructors" : "null",
          q = [
            "throwBindingError",
            "invoker",
            "fn",
            "runDestructors",
            "retType",
            "classParam",
          ],
          fr = [T, i, a, Gr, n[0], n[1]];
        c &&
          (F +=
            "var thisWired = classParam.toWireType(" +
            $ +
            `, this);
`);
        for (var s = 0; s < f - 2; ++s)
          (F +=
            "var arg" +
            s +
            "Wired = argType" +
            s +
            ".toWireType(" +
            $ +
            ", arg" +
            s +
            "); // " +
            n[s + 2].name +
            `
`),
            q.push("argType" + s),
            fr.push(n[s + 2]);
        if (
          (c && (d = "thisWired" + (d.length > 0 ? ", " : "") + d),
          (F +=
            (v ? "var rv = " : "") +
            "invoker(fn" +
            (d.length > 0 ? ", " : "") +
            d +
            `);
`),
          o)
        )
          F += `runDestructors(destructors);
`;
        else
          for (var s = c ? 1 : 2; s < n.length; ++s) {
            var rr = s === 1 ? "thisWired" : "arg" + (s - 2) + "Wired";
            n[s].destructorFunction !== null &&
              ((F +=
                rr +
                "_dtor(" +
                rr +
                "); // " +
                n[s].name +
                `
`),
              q.push(rr + "_dtor"),
              fr.push(n[s].destructorFunction));
          }
        v &&
          (F += `var ret = retType.fromWireType(rv);
return ret;
`),
          (F += `}
`),
          q.push(F);
        var pe = Sn(Function, q).apply(null, fr);
        return pe;
      }
      function kn(r, n, e) {
        if (r[n].overloadTable === void 0) {
          var i = r[n];
          (r[n] = function () {
            return (
              r[n].overloadTable.hasOwnProperty(arguments.length) ||
                T(
                  "Function '" +
                    e +
                    "' called with an invalid number of arguments (" +
                    arguments.length +
                    ") - expects one of (" +
                    r[n].overloadTable +
                    ")!"
                ),
              r[n].overloadTable[arguments.length].apply(this, arguments)
            );
          }),
            (r[n].overloadTable = []),
            (r[n].overloadTable[i.argCount] = i);
        }
      }
      function In(r, n, e) {
        t.hasOwnProperty(r)
          ? ((e === void 0 ||
              (t[r].overloadTable !== void 0 &&
                t[r].overloadTable[e] !== void 0)) &&
              T("Cannot register public name '" + r + "' twice"),
            kn(t, r, r),
            t.hasOwnProperty(e) &&
              T(
                "Cannot register multiple overloads of a function with the same number of arguments (" +
                  e +
                  ")!"
              ),
            (t[r].overloadTable[e] = n))
          : ((t[r] = n), e !== void 0 && (t[r].numArguments = e));
      }
      function On(r, n) {
        for (var e = [], i = 0; i < r; i++) e.push(V[(n >> 2) + i]);
        return e;
      }
      function Ln(r, n, e) {
        t.hasOwnProperty(r) || Xr("Replacing nonexistant public symbol"),
          t[r].overloadTable !== void 0 && e !== void 0
            ? (t[r].overloadTable[e] = n)
            : ((t[r] = n), (t[r].argCount = e));
      }
      function Vn(r, n, e) {
        var i = t["dynCall_" + r];
        return e && e.length ? i.apply(null, [n].concat(e)) : i.call(null, n);
      }
      function Dn(r, n, e) {
        return r.includes("j") ? Vn(r, n, e) : tr.get(n).apply(null, e);
      }
      function Hn(r, n) {
        var e = [];
        return function () {
          e.length = arguments.length;
          for (var i = 0; i < arguments.length; i++) e[i] = arguments[i];
          return Dn(r, n, e);
        };
      }
      function Bn(r, n) {
        r = S(r);
        function e() {
          return r.includes("j") ? Hn(r, n) : tr.get(n);
        }
        var i = e();
        return (
          typeof i != "function" &&
            T("unknown function pointer with signature " + r + ": " + n),
          i
        );
      }
      var Yr = void 0;
      function $r(r) {
        var n = Jr(r),
          e = S(n);
        return B(n), e;
      }
      function jn(r, n) {
        var e = [],
          i = {};
        function a(f) {
          if (!i[f] && !Y[f]) {
            if (cr[f]) {
              cr[f].forEach(a);
              return;
            }
            e.push(f), (i[f] = !0);
          }
        }
        throw (n.forEach(a), new Yr(r + ": " + e.map($r).join([", "])));
      }
      function Nn(r, n, e, i, a, f) {
        var c = On(n, e);
        (r = S(r)),
          (a = Bn(i, a)),
          In(
            r,
            function () {
              jn("Cannot call " + r + " due to unbound types", c);
            },
            n - 1
          ),
          An([], c, function (o) {
            var s = [o[0], null].concat(o.slice(1));
            return Ln(r, Wn(r, s, null, a, f), n - 1), [];
          });
      }
      function qn(r, n, e) {
        switch (n) {
          case 0:
            return e
              ? function (a) {
                  return _r[a];
                }
              : function (a) {
                  return U[a];
                };
          case 1:
            return e
              ? function (a) {
                  return Z[a >> 1];
                }
              : function (a) {
                  return hr[a >> 1];
                };
          case 2:
            return e
              ? function (a) {
                  return V[a >> 2];
                }
              : function (a) {
                  return D[a >> 2];
                };
          default:
            throw new TypeError("Unknown integer type: " + r);
        }
      }
      function xn(r, n, e, i, a) {
        (n = S(n)), a === -1 && (a = 4294967295);
        var f = dr(e),
          c = function (v) {
            return v;
          };
        if (i === 0) {
          var o = 32 - 8 * e;
          c = function (v) {
            return (v << o) >>> o;
          };
        }
        var s = n.includes("unsigned");
        H(r, {
          name: n,
          fromWireType: c,
          toWireType: function (v, g) {
            if (typeof g != "number" && typeof g != "boolean")
              throw new TypeError(
                'Cannot convert "' + Er(g) + '" to ' + this.name
              );
            if (g < i || g > a)
              throw new TypeError(
                'Passing a number "' +
                  Er(g) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  n +
                  '", which is outside the valid range [' +
                  i +
                  ", " +
                  a +
                  "]!"
              );
            return s ? g >>> 0 : g | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: qn(n, f, i !== 0),
          destructorFunction: null,
        });
      }
      function zn(r, n, e) {
        var i = [
            Int8Array,
            Uint8Array,
            Int16Array,
            Uint16Array,
            Int32Array,
            Uint32Array,
            Float32Array,
            Float64Array,
          ],
          a = i[n];
        function f(c) {
          c = c >> 2;
          var o = D,
            s = o[c],
            v = o[c + 1];
          return new a(pr, v, s);
        }
        (e = S(e)),
          H(
            r,
            {
              name: e,
              fromWireType: f,
              argPackAdvance: 8,
              readValueFromPointer: f,
            },
            { ignoreDuplicateRegistrations: !0 }
          );
      }
      function Xn(r, n) {
        n = S(n);
        var e = n === "std::string";
        H(r, {
          name: n,
          fromWireType: function (i) {
            var a = D[i >> 2],
              f;
            if (e)
              for (var c = i + 4, o = 0; o <= a; ++o) {
                var s = i + 4 + o;
                if (o == a || U[s] == 0) {
                  var v = s - c,
                    g = A(c, v);
                  f === void 0
                    ? (f = g)
                    : ((f += String.fromCharCode(0)), (f += g)),
                    (c = s + 1);
                }
              }
            else {
              for (var d = new Array(a), o = 0; o < a; ++o)
                d[o] = String.fromCharCode(U[i + 4 + o]);
              f = d.join("");
            }
            return B(i), f;
          },
          toWireType: function (i, a) {
            a instanceof ArrayBuffer && (a = new Uint8Array(a));
            var f,
              c = typeof a == "string";
            c ||
              a instanceof Uint8Array ||
              a instanceof Uint8ClampedArray ||
              a instanceof Int8Array ||
              T("Cannot pass non-string to std::string"),
              e && c
                ? (f = function () {
                    return vr(a);
                  })
                : (f = function () {
                    return a.length;
                  });
            var o = f(),
              s = Cr(4 + o + 1);
            if (((D[s >> 2] = o), e && c)) E(a, s + 4, o + 1);
            else if (c)
              for (var v = 0; v < o; ++v) {
                var g = a.charCodeAt(v);
                g > 255 &&
                  (B(s),
                  T("String has UTF-16 code units that do not fit in 8 bits")),
                  (U[s + 4 + v] = g);
              }
            else for (var v = 0; v < o; ++v) U[s + 4 + v] = a[v];
            return i !== null && i.push(B, s), s;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ar,
          destructorFunction: function (i) {
            B(i);
          },
        });
      }
      function Gn(r, n, e) {
        e = S(e);
        var i, a, f, c, o;
        n === 2
          ? ((i = Zr),
            (a = Qr),
            (c = Mr),
            (f = function () {
              return hr;
            }),
            (o = 1))
          : n === 4 &&
            ((i = rn),
            (a = nn),
            (c = en),
            (f = function () {
              return D;
            }),
            (o = 2)),
          H(r, {
            name: e,
            fromWireType: function (s) {
              for (
                var v = D[s >> 2], g = f(), d, F = s + 4, $ = 0;
                $ <= v;
                ++$
              ) {
                var q = s + 4 + $ * n;
                if ($ == v || g[q >> o] == 0) {
                  var fr = q - F,
                    rr = i(F, fr);
                  d === void 0
                    ? (d = rr)
                    : ((d += String.fromCharCode(0)), (d += rr)),
                    (F = q + n);
                }
              }
              return B(s), d;
            },
            toWireType: function (s, v) {
              typeof v != "string" &&
                T("Cannot pass non-string to C++ string type " + e);
              var g = c(v),
                d = Cr(4 + g + n);
              return (
                (D[d >> 2] = g >> o),
                a(v, d + 4, g + n),
                s !== null && s.push(B, d),
                d
              );
            },
            argPackAdvance: 8,
            readValueFromPointer: Ar,
            destructorFunction: function (s) {
              B(s);
            },
          });
      }
      function Yn(r, n) {
        (n = S(n)),
          H(r, {
            isVoid: !0,
            name: n,
            argPackAdvance: 0,
            fromWireType: function () {},
            toWireType: function (e, i) {},
          });
      }
      function or(r) {
        return r || T("Cannot use deleted val. handle = " + r), C[r].value;
      }
      function Tr(r, n) {
        var e = Y[r];
        return e === void 0 && T(n + " has unknown type " + $r(r)), e;
      }
      function $n(r, n, e) {
        (r = or(r)), (n = Tr(n, "emval::as"));
        var i = [],
          a = M(i);
        return (V[e >> 2] = a), n.toWireType(i, r);
      }
      function Jn(r, n) {
        for (var e = new Array(r), i = 0; i < r; ++i)
          e[i] = Tr(V[(n >> 2) + i], "parameter " + i);
        return e;
      }
      function Kn(r, n, e, i) {
        r = or(r);
        for (var a = Jn(n, e), f = new Array(n), c = 0; c < n; ++c) {
          var o = a[c];
          (f[c] = o.readValueFromPointer(i)), (i += o.argPackAdvance);
        }
        var s = r.apply(void 0, f);
        return M(s);
      }
      function Zn(r, n) {
        return (r = or(r)), (n = or(n)), M(r[n]);
      }
      function Qn(r) {
        r > 4 && (C[r].refcount += 1);
      }
      function Mn(r) {
        return (r = or(r)), typeof r == "number";
      }
      var re = {};
      function ne(r) {
        var n = re[r];
        return n === void 0 ? S(r) : n;
      }
      function ee(r) {
        return M(ne(r));
      }
      function te(r) {
        var n = C[r].value;
        Gr(n), br(r);
      }
      function ie(r, n) {
        r = Tr(r, "_emval_take_value");
        var e = r.readValueFromPointer(n);
        return M(e);
      }
      function ae() {
        ar();
      }
      function oe(r, n, e) {
        U.copyWithin(r, n, n + e);
      }
      function fe(r) {
        try {
          return K.grow((r - pr.byteLength + 65535) >>> 16), Or(K.buffer), 1;
        } catch (n) {}
      }
      function se(r) {
        var n = U.length;
        r = r >>> 0;
        var e = 2147483648;
        if (r > e) return !1;
        for (var i = 1; i <= 4; i *= 2) {
          var a = n * (1 + 0.2 / i);
          a = Math.min(a, r + 100663296);
          var f = Math.min(e, tn(Math.max(r, a), 65536)),
            c = fe(f);
          if (c) return !0;
        }
        return !1;
      }
      mn(),
        (xr = t.BindingError = mr(Error, "BindingError")),
        (zr = t.InternalError = mr(Error, "InternalError")),
        Fn(),
        (Yr = t.UnboundTypeError = mr(Error, "UnboundTypeError"));
      var ce = {
          a: yn,
          q: dn,
          u: En,
          t: Pn,
          m: Rn,
          k: Nn,
          d: xn,
          c: zn,
          n: Xn,
          l: Gn,
          v: Yn,
          j: $n,
          w: Kn,
          b: br,
          e: Zn,
          g: Qn,
          p: Mn,
          f: ee,
          i: te,
          h: ie,
          o: ae,
          r: oe,
          s: se,
        },
        we = gn(),
        ue = (t.___wasm_call_ctors = function () {
          return (ue = t.___wasm_call_ctors = t.asm.y).apply(null, arguments);
        }),
        Cr = (t._malloc = function () {
          return (Cr = t._malloc = t.asm.z).apply(null, arguments);
        }),
        B = (t._free = function () {
          return (B = t._free = t.asm.A).apply(null, arguments);
        }),
        Jr = (t.___getTypeName = function () {
          return (Jr = t.___getTypeName = t.asm.C).apply(null, arguments);
        }),
        le = (t.___embind_register_native_and_builtin_types = function () {
          return (le = t.___embind_register_native_and_builtin_types =
            t.asm.D).apply(null, arguments);
        }),
        ve = (t.dynCall_ijiii = function () {
          return (ve = t.dynCall_ijiii = t.asm.E).apply(null, arguments);
        }),
        ur;
      ir = function r() {
        ur || Fr(), ur || (ir = r);
      };
      function Fr(r) {
        if (((r = r || p), G > 0 || (on(), G > 0))) return;
        function n() {
          ur ||
            ((ur = !0),
            (t.calledRun = !0),
            !w &&
              (fn(),
              u(t),
              t.onRuntimeInitialized && t.onRuntimeInitialized(),
              sn()));
        }
        t.setStatus
          ? (t.setStatus("Running..."),
            setTimeout(function () {
              setTimeout(function () {
                t.setStatus("");
              }, 1),
                n();
            }, 1))
          : n();
      }
      if (((t.run = Fr), t.preInit))
        for (
          typeof t.preInit == "function" && (t.preInit = [t.preInit]);
          t.preInit.length > 0;

        )
          t.preInit.pop()();
      return Fr(), t.ready;
    };
  })();

/* post code */
const START_CODE = new Uint8Array([0, 0, 0, 1]);

function defaultError(error) {
  console.error(error);
}

Module.createFile = createFile;
export function createFile(initialCapacity = 256) {
  let cursor = 0;
  let usedBytes = 0;
  let contents = new Uint8Array(initialCapacity);
  return {
    contents: function () {
      return contents.slice(0, usedBytes);
    },
    seek: function (offset) {
      // offset in bytes
      cursor = offset;
    },
    write: function (data) {
      const size = data.byteLength;
      expand(cursor + size);
      contents.set(data, cursor);
      cursor += size;
      usedBytes = Math.max(usedBytes, cursor);
      return size;
    },
  };

  function expand(newCapacity) {
    var prevCapacity = contents.length;
    if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
    // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
    // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
    // avoid overshooting the allocation cap by a very large margin.
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>>
        0
    );
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
    const oldContents = contents;
    contents = new Uint8Array(newCapacity); // Allocate new storage.
    if (usedBytes > 0) contents.set(oldContents.subarray(0, usedBytes), 0);
  }
}

Module.isWebCodecsSupported = isWebCodecsSupported;
export function isWebCodecsSupported() {
  return (
    typeof window !== "undefined" && typeof window.VideoEncoder === "function"
  );
}

export function createWebCodecsEncoderWithModule(MP4, opts = {}) {
  const {
    width,
    height,
    groupOfPictures = 20,
    fps = 30,
    fragmentation = false,
    sequential = false,
    hevc = false,
    format = "annexb",
    // codec = "avc1.420034", // Baseline 4.2
    codec = "avc1.4d0034", // Main 5.2
    acceleration,
    bitrate,
    error = defaultError,
    encoderOptions = {},
    flushFrequency = 10,
  } = opts;

  if (!isWebCodecsSupported()) {
    throw new Error(
      "MP4 H264 encoding/decoding depends on WebCodecs API which is not supported in this environment"
    );
  }

  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error("Must specify { width, height } options");
  }

  if (!isFinite(width) || width < 0 || !isFinite(height) || height < 0) {
    throw new Error("{ width, height } options must be positive integers");
  }

  const file = createFile();
  const mux = MP4.create_muxer(
    {
      width,
      height,
      fps,
      fragmentation,
      sequential,
      hevc,
    },
    mux_write
  );

  const config = {
    codec,
    width: width,
    height: height,
    avc: {
      format,
    },
    hardwareAcceleration: acceleration,
    // There is a bug on macOS if this is greater than 30 fps
    // framerate: fps,
    bitrate,
    ...encoderOptions,
  };

  let frameIndex = 0;

  const encoder = new window.VideoEncoder({
    output(chunk, opts) {
      writeAVC(chunk, opts);
    },
    error,
  });
  encoder.configure(config);

  return {
    async end() {
      await encoder.flush();
      encoder.close();
      MP4.finalize_muxer(mux);
      return file.contents();
    },
    async addFrame(bitmap) {
      const timestamp = (1 / fps) * frameIndex * 1000000;
      const keyFrame = frameIndex % groupOfPictures === 0;
      let frame = new VideoFrame(bitmap, { timestamp });
      encoder.encode(frame, { keyFrame });
      frame.close();
      if (flushFrequency != null && (frameIndex + 1) % flushFrequency === 0) {
        await encoder.flush();
      }
      frameIndex++;
    },
    async flush() {
      return encoder.flush();
    },
  };

  function mux_write(data_ptr, size, offset) {
    // seek to byte offset in file
    file.seek(offset);
    // get subarray of memory we are writing
    const data = MP4.HEAPU8.subarray(data_ptr, data_ptr + size);
    // write into virtual file
    return file.write(data) !== data.byteLength;
  }

  function write_nal(uint8) {
    const p = MP4._malloc(uint8.byteLength);
    MP4.HEAPU8.set(uint8, p);
    MP4.mux_nal(mux, p, uint8.byteLength);
    MP4._free(p);
  }

  function writeAVC(chunk, opts) {
    let avccConfig = null;

    let description;
    if (opts) {
      if (opts.description) {
        description = opts.description;
      }
      if (opts.decoderConfig && opts.decoderConfig.description) {
        description = opts.decoderConfig.description;
      }
    }

    if (description) {
      try {
        avccConfig = parseAVCC(description);
      } catch (err) {
        error(err);
        return;
      }
    }

    const nal = [];
    if (avccConfig) {
      avccConfig.sps_list.forEach((sps) => {
        nal.push(START_CODE);
        nal.push(sps);
      });
      avccConfig.pps_list.forEach((pps) => {
        nal.push(START_CODE);
        nal.push(pps);
      });
    }

    if (format === "annexb") {
      const uint8 = new Uint8Array(chunk.byteLength);
      chunk.copyTo(uint8);
      nal.push(uint8);
    } else {
      try {
        const arrayBuf = new ArrayBuffer(chunk.byteLength);
        chunk.copyTo(arrayBuf);
        convertAVCToAnnexBInPlaceForLength4(arrayBuf).forEach((sub) => {
          nal.push(START_CODE);
          nal.push(sub);
        });
      } catch (err) {
        error(err);
        return;
      }
    }

    write_nal(concatBuffers(nal));
  }
}

function concatBuffers(arrays) {
  // Calculate byteSize from all arrays
  const size = arrays.reduce((a, b) => a + b.byteLength, 0);
  // Allcolate a new buffer
  const result = new Uint8Array(size);
  let offset = 0;
  for (let i = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, offset);
    offset += arr.byteLength;
  }
  return result;
}

function convertAVCToAnnexBInPlaceForLength4(arrayBuf) {
  const kLengthSize = 4;
  let pos = 0;
  const chunks = [];
  const size = arrayBuf.byteLength;
  const uint8 = new Uint8Array(arrayBuf);
  while (pos + kLengthSize < size) {
    // read uint 32, 4 byte NAL length
    let nal_length = uint8[pos];
    nal_length = (nal_length << 8) + uint8[pos + 1];
    nal_length = (nal_length << 8) + uint8[pos + 2];
    nal_length = (nal_length << 8) + uint8[pos + 3];

    chunks.push(new Uint8Array(arrayBuf, pos + kLengthSize, nal_length));
    if (nal_length == 0) throw new Error("Error: invalid nal_length 0");
    pos += kLengthSize + nal_length;
  }
  return chunks;
}

function parseAVCC(avcc) {
  const view = new DataView(avcc);
  let off = 0;
  const version = view.getUint8(off++);
  const profile = view.getUint8(off++);
  const compat = view.getUint8(off++);
  const level = view.getUint8(off++);
  const length_size = (view.getUint8(off++) & 0x3) + 1;
  if (length_size !== 4)
    throw new Error("Expected length_size to indicate 4 bytes");
  const numSPS = view.getUint8(off++) & 0x1f;
  const sps_list = [];
  for (let i = 0; i < numSPS; i++) {
    const sps_len = view.getUint16(off, false);
    off += 2;
    const sps = new Uint8Array(view.buffer, off, sps_len);
    sps_list.push(sps);
    off += sps_len;
  }
  const numPPS = view.getUint8(off++);
  const pps_list = [];
  for (let i = 0; i < numPPS; i++) {
    const pps_len = view.getUint16(off, false);
    off += 2;
    const pps = new Uint8Array(view.buffer, off, pps_len);
    pps_list.push(pps);
    off += pps_len;
  }
  return {
    offset: off,
    version,
    profile,
    compat,
    level,
    length_size,
    pps_list,
    sps_list,
    numSPS,
  };
}

export {Module as default};
