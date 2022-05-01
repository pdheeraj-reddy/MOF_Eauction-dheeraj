(function(n, t) { typeof exports == "object" && typeof module != "undefined" ? module.exports = t() : typeof define == "function" && define.amd ? define(t) : n.moment = t() })(this, function() {
    "use strict";

    function r() { return to.apply(null, arguments) }

    function tl(n) { to = n }

    function oi(n) { return Object.prototype.toString.call(n) === "[object Array]" }

    function uu(n) { return n instanceof Date || Object.prototype.toString.call(n) === "[object Date]" }

    function io(n, t) { for (var r = [], i = 0; i < n.length; ++i) r.push(t(n[i], i)); return r }

    function pt(n, t) { return Object.prototype.hasOwnProperty.call(n, t) }

    function fu(n, t) { for (var i in t) pt(t, i) && (n[i] = t[i]); return pt(t, "toString") && (n.toString = t.toString), pt(t, "valueOf") && (n.valueOf = t.valueOf), n }

    function ki(n, t, i, r) { return hs(n, t, i, r, !0).utc() }

    function il() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1 } }

    function o(n) { return n._pf == null && (n._pf = il()), n._pf }

    function lf(n) {
        if (n._isValid == null) {
            var t = o(n);
            n._isValid = !isNaN(n._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.nullInput && !t.invalidFormat && !t.userInvalidated;
            n._strict && (n._isValid = n._isValid && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === undefined)
        }
        return n._isValid
    }

    function eu(n) { var t = ki(NaN); return n != null ? fu(o(t), n) : o(t).userInvalidated = !0, t }

    function y(n) { return n === void 0 }

    function vf(n, t) {
        var u, i, r;
        if (y(t._isAMomentObject) || (n._isAMomentObject = t._isAMomentObject), y(t._i) || (n._i = t._i), y(t._f) || (n._f = t._f), y(t._l) || (n._l = t._l), y(t._strict) || (n._strict = t._strict), y(t._tzm) || (n._tzm = t._tzm), y(t._isUTC) || (n._isUTC = t._isUTC), y(t._offset) || (n._offset = t._offset), y(t._pf) || (n._pf = o(t)), y(t._locale) || (n._locale = t._locale), af.length > 0)
            for (u in af) i = af[u], r = t[i], y(r) || (n[i] = r);
        return n
    }

    function or(n) {
        vf(this, n);
        this._d = new Date(n._d != null ? n._d.getTime() : NaN);
        yf === !1 && (yf = !0, r.updateOffset(this), yf = !1)
    }

    function ni(n) { return n instanceof or || n != null && n._isAMomentObject != null }

    function p(n) { return n < 0 ? Math.ceil(n) : Math.floor(n) }

    function e(n) {
        var t = +n,
            i = 0;
        return t !== 0 && isFinite(t) && (i = p(t)), i
    }

    function ro(n, t, i) { for (var f = Math.min(n.length, t.length), o = Math.abs(n.length - t.length), u = 0, r = 0; r < f; r++)(i && n[r] !== t[r] || !i && e(n[r]) !== e(t[r])) && u++; return u + o }

    function uo() {}

    function fo(n) { return n ? n.toLowerCase().replace("_", "-") : n }

    function rl(n) {
        for (var r = 0, i, t, f, u; r < n.length;) {
            for (u = fo(n[r]).split("-"), i = u.length, t = fo(n[r + 1]), t = t ? t.split("-") : null; i > 0;) {
                if (f = eo(u.slice(0, i).join("-")), f) return f;
                if (t && t.length >= i && ro(u, t, !0) >= i - 1) break;
                i--
            }
            r++
        }
        return null
    }

    function eo(n) {
        var t = null;
        if (!si[n] && typeof module != "undefined" && module && module.exports) try {
            t = ou._abbr;
            require("./locale/" + n);
            sr(t)
        } catch (i) {}
        return si[n]
    }

    function sr(n, t) { var i; return n && (i = y(t) ? hi(n) : oo(n, t), i && (ou = i)), ou._abbr }

    function oo(n, t) { return t !== null ? (t.abbr = n, si[n] = si[n] || new uo, si[n].set(t), sr(n), si[n]) : (delete si[n], null) }

    function hi(n) {
        var t;
        if (n && n._locale && n._locale._abbr && (n = n._locale._abbr), !n) return ou;
        if (!oi(n)) {
            if (t = eo(n), t) return t;
            n = [n]
        }
        return rl(n)
    }

    function v(n, t) {
        var i = n.toLowerCase();
        hr[i] = hr[i + "s"] = hr[t] = n
    }

    function b(n) { return typeof n == "string" ? hr[n] || hr[n.toLowerCase()] : undefined }

    function so(n) {
        var r = {},
            t;
        for (var i in n) pt(n, i) && (t = b(i), t && (r[t] = n[i]));
        return r
    }

    function wt(n) { return n instanceof Function || Object.prototype.toString.call(n) === "[object Function]" }

    function di(n, t) { return function(i) { return i != null ? (ho(this, n, i), r.updateOffset(this, t), this) : su(this, n) } }

    function su(n, t) { return n.isValid() ? n._d["get" + (n._isUTC ? "UTC" : "") + t]() : NaN }

    function ho(n, t, i) { n.isValid() && n._d["set" + (n._isUTC ? "UTC" : "") + t](i) }

    function co(n, t) {
        var i;
        if (typeof n == "object")
            for (i in n) this.set(i, n[i]);
        else if (n = b(n), wt(this[n])) return this[n](t);
        return this
    }

    function bt(n, t, i) {
        var r = "" + Math.abs(n),
            u = t - r.length,
            f = n >= 0;
        return (f ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, u)).toString().substr(1) + r
    }

    function u(n, t, i, r) {
        var u = r;
        typeof r == "string" && (u = function() { return this[r]() });
        n && (gi[n] = u);
        t && (gi[t[0]] = function() { return bt(u.apply(this, arguments), t[1], t[2]) });
        i && (gi[i] = function() { return this.localeData().ordinal(u.apply(this, arguments), n) })
    }

    function ul(n) { return n.match(/\[[\s\S]/) ? n.replace(/^\[|\]$/g, "") : n.replace(/\\/g, "") }

    function fl(n) { for (var i = n.match(lo), t = 0, r = i.length; t < r; t++) i[t] = gi[i[t]] ? gi[i[t]] : ul(i[t]); return function(u) { var f = ""; for (t = 0; t < r; t++) f += i[t] instanceof Function ? i[t].call(u, n) : i[t]; return f } }

    function wf(n, t) { return n.isValid() ? (t = ao(t, n.localeData()), pf[t] = pf[t] || fl(t), pf[t](n)) : n.localeData().invalidDate() }

    function ao(n, t) {
        function r(n) { return t.longDateFormat(n) || n }
        var i = 5;
        for (hu.lastIndex = 0; i >= 0 && hu.test(n);) n = n.replace(hu, r), hu.lastIndex = 0, i -= 1;
        return n
    }

    function i(n, t, i) { df[n] = wt(t) ? t : function(n) { return n && i ? i : t } }

    function ol(n, t) { return pt(df, n) ? df[n](t._strict, t._locale) : new RegExp(sl(n)) }

    function sl(n) { return pu(n.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(n, t, i, r, u) { return t || i || r || u })) }

    function pu(n) { return n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") }

    function h(n, t) { var i, r = t; for (typeof n == "string" && (n = [n]), typeof t == "number" && (r = function(n, i) { i[t] = e(n) }), i = 0; i < n.length; i++) gf[n[i]] = r }

    function lr(n, t) {
        h(n, function(n, i, r, u) {
            r._w = r._w || {};
            t(n, r._w, r, u)
        })
    }

    function hl(n, t, i) { t != null && pt(gf, n) && gf[n](t, i._a, i, n) }

    function ne(n, t) { return new Date(Date.UTC(n, t + 1, 0)).getUTCDate() }

    function al(n, t) { return oi(this._months) ? this._months[n.month()] : this._months[te.test(t) ? "format" : "standalone"][n.month()] }

    function vl(n, t) { return oi(this._monthsShort) ? this._monthsShort[n.month()] : this._monthsShort[te.test(t) ? "format" : "standalone"][n.month()] }

    function yl(n, t, i) {
        var r, u, f;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), r = 0; r < 12; r++)
            if ((u = ki([2e3, r]), i && !this._longMonthsParse[r] && (this._longMonthsParse[r] = new RegExp("^" + this.months(u, "").replace(".", "") + "$", "i"), this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(u, "").replace(".", "") + "$", "i")), i || this._monthsParse[r] || (f = "^" + this.months(u, "") + "|^" + this.monthsShort(u, ""), this._monthsParse[r] = new RegExp(f.replace(".", ""), "i")), i && t === "MMMM" && this._longMonthsParse[r].test(n)) || i && t === "MMM" && this._shortMonthsParse[r].test(n) || !i && this._monthsParse[r].test(n)) return r
    }

    function go(n, t) { var i; return n.isValid() ? typeof t == "string" && (t = n.localeData().monthsParse(t), typeof t != "number") ? n : (i = Math.min(n.date(), ne(n.year(), t)), n._d["set" + (n._isUTC ? "UTC" : "") + "Month"](t, i), n) : n }

    function ns(n) { return n != null ? (go(this, n), r.updateOffset(this, !0), this) : su(this, "Month") }

    function pl() { return ne(this.year(), this.month()) }

    function wl(n) { return this._monthsParseExact ? (pt(this, "_monthsRegex") || rs.call(this), n ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && n ? this._monthsShortStrictRegex : this._monthsShortRegex }

    function bl(n) { return this._monthsParseExact ? (pt(this, "_monthsRegex") || rs.call(this), n ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && n ? this._monthsStrictRegex : this._monthsRegex }

    function rs() {
        function f(n, t) { return t.length - n.length }
        for (var i = [], r = [], t = [], u, n = 0; n < 12; n++) u = ki([2e3, n]), i.push(this.monthsShort(u, "")), r.push(this.months(u, "")), t.push(this.months(u, "")), t.push(this.monthsShort(u, ""));
        for (i.sort(f), r.sort(f), t.sort(f), n = 0; n < 12; n++) i[n] = pu(i[n]), r[n] = pu(r[n]), t[n] = pu(t[n]);
        this._monthsRegex = new RegExp("^(" + t.join("|") + ")", "i");
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")$", "i");
        this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")$", "i")
    }

    function ie(n) { var i, t = n._a; return t && o(n).overflow === -2 && (i = t[kt] < 0 || t[kt] > 11 ? kt : t[st] < 1 || t[st] > ne(t[k], t[kt]) ? st : t[a] < 0 || t[a] > 24 || t[a] === 24 && (t[d] !== 0 || t[dt] !== 0 || t[ci] !== 0) ? a : t[d] < 0 || t[d] > 59 ? d : t[dt] < 0 || t[dt] > 59 ? dt : t[ci] < 0 || t[ci] > 999 ? ci : -1, o(n)._overflowDayOfYear && (i < k || i > st) && (i = st), o(n)._overflowWeeks && i === -1 && (i = cl), o(n)._overflowWeekday && i === -1 && (i = ll), o(n).overflow = i), n }

    function us(n) { r.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + n) }

    function g(n, t) { var i = !0; return fu(function() { return i && (us(n + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), i = !1), t.apply(this, arguments) }, t) }

    function kl(n, t) { re[n] || (us(t), re[n] = !0) }

    function fs(n) {
        var t, r, e = n._i,
            i = dl.exec(e) || gl.exec(e),
            s, f, u, h;
        if (i) {
            for (o(n).iso = !0, t = 0, r = wu.length; t < r; t++)
                if (wu[t][1].exec(i[1])) {
                    f = wu[t][0];
                    s = wu[t][2] !== !1;
                    break
                }
            if (f == null) { n._isValid = !1; return }
            if (i[3]) {
                for (t = 0, r = ue.length; t < r; t++)
                    if (ue[t][1].exec(i[3])) { u = (i[2] || " ") + ue[t][0]; break }
                if (u == null) { n._isValid = !1; return }
            }
            if (!s && u != null) { n._isValid = !1; return }
            if (i[4])
                if (na.exec(i[4])) h = "Z";
                else { n._isValid = !1; return }
            n._f = f + (u || "") + (h || "");
            oe(n)
        } else n._isValid = !1
    }

    function ia(n) {
        var t = ta.exec(n._i);
        if (t !== null) { n._d = new Date(+t[1]); return }
        fs(n);
        n._isValid === !1 && (delete n._isValid, r.createFromInputFallback(n))
    }

    function ra(n, t, i, r, u, f, e) { var o = new Date(n, t, i, r, u, f, e); return n < 100 && n >= 0 && isFinite(o.getFullYear()) && o.setFullYear(n), o }

    function bu(n) { var t = new Date(Date.UTC.apply(null, arguments)); return n < 100 && n >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(n), t }

    function ar(n) { return es(n) ? 366 : 365 }

    function es(n) { return n % 4 == 0 && n % 100 != 0 || n % 400 == 0 }

    function ua() { return es(this.year()) }

    function ku(n, t, i) {
        var r = 7 + t - i,
            u = (7 + bu(n, 0, r).getUTCDay() - t) % 7;
        return -u + r - 1
    }

    function os(n, t, i, r, u) {
        var s = (7 + i - r) % 7,
            h = ku(n, r, u),
            f = 1 + 7 * (t - 1) + s + h,
            e, o;
        return f <= 0 ? (e = n - 1, o = ar(e) + f) : f > ar(n) ? (e = n + 1, o = f - ar(n)) : (e = n, o = f), { year: e, dayOfYear: o }
    }

    function vr(n, t, i) {
        var e = ku(n.year(), t, i),
            r = Math.floor((n.dayOfYear() - e - 1) / 7) + 1,
            f, u;
        return r < 1 ? (u = n.year() - 1, f = r + li(u, t, i)) : r > li(n.year(), t, i) ? (f = r - li(n.year(), t, i), u = n.year() + 1) : (u = n.year(), f = r), { week: f, year: u }
    }

    function li(n, t, i) {
        var r = ku(n, t, i),
            u = ku(n + 1, t, i);
        return (ar(n) - r + u) / 7
    }

    function nr(n, t, i) { return n != null ? n : t != null ? t : i }

    function fa(n) { var t = new Date(r.now()); return n._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()] }

    function ee(n) {
        var t, i, r = [],
            u, f;
        if (!n._d) {
            for (u = fa(n), n._w && n._a[st] == null && n._a[kt] == null && ea(n), n._dayOfYear && (f = nr(n._a[k], u[k]), n._dayOfYear > ar(f) && (o(n)._overflowDayOfYear = !0), i = bu(f, 0, n._dayOfYear), n._a[kt] = i.getUTCMonth(), n._a[st] = i.getUTCDate()), t = 0; t < 3 && n._a[t] == null; ++t) n._a[t] = r[t] = u[t];
            for (; t < 7; t++) n._a[t] = r[t] = n._a[t] == null ? t === 2 ? 1 : 0 : n._a[t];
            n._a[a] === 24 && n._a[d] === 0 && n._a[dt] === 0 && n._a[ci] === 0 && (n._nextDay = !0, n._a[a] = 0);
            n._d = (n._useUTC ? bu : ra).apply(null, r);
            n._tzm != null && n._d.setUTCMinutes(n._d.getUTCMinutes() - n._tzm);
            n._nextDay && (n._a[a] = 24)
        }
    }

    function ea(n) {
        var t, e, u, i, r, f, h, s;
        t = n._w;
        t.GG != null || t.W != null || t.E != null ? (r = 1, f = 4, e = nr(t.GG, n._a[k], vr(c(), 1, 4).year), u = nr(t.W, 1), i = nr(t.E, 1), (i < 1 || i > 7) && (s = !0)) : (r = n._locale._week.dow, f = n._locale._week.doy, e = nr(t.gg, n._a[k], vr(c(), r, f).year), u = nr(t.w, 1), t.d != null ? (i = t.d, (i < 0 || i > 6) && (s = !0)) : t.e != null ? (i = t.e + r, (t.e < 0 || t.e > 6) && (s = !0)) : i = r);
        u < 1 || u > li(e, r, f) ? o(n)._overflowWeeks = !0 : s != null ? o(n)._overflowWeekday = !0 : (h = os(e, u, i, r, f), n._a[k] = h.year, n._dayOfYear = h.dayOfYear)
    }

    function oe(n) {
        if (n._f === r.ISO_8601) { fs(n); return }
        n._a = [];
        o(n).empty = !0;
        for (var t = "" + n._i, i, u, s, c = t.length, h = 0, e = ao(n._f, n._locale).match(lo) || [], f = 0; f < e.length; f++) u = e[f], i = (t.match(ol(u, n)) || [])[0], i && (s = t.substr(0, t.indexOf(i)), s.length > 0 && o(n).unusedInput.push(s), t = t.slice(t.indexOf(i) + i.length), h += i.length), gi[u] ? (i ? o(n).empty = !1 : o(n).unusedTokens.push(u), hl(u, i, n)) : n._strict && !i && o(n).unusedTokens.push(u);
        o(n).charsLeftOver = c - h;
        t.length > 0 && o(n).unusedInput.push(t);
        o(n).bigHour === !0 && n._a[a] <= 12 && n._a[a] > 0 && (o(n).bigHour = undefined);
        n._a[a] = oa(n._locale, n._a[a], n._meridiem);
        ee(n);
        ie(n)
    }

    function oa(n, t, i) { var r; return i == null ? t : n.meridiemHour != null ? n.meridiemHour(t, i) : n.isPM != null ? (r = n.isPM(i), r && t < 12 && (t += 12), r || t !== 12 || (t = 0), t) : t }

    function sa(n) {
        var t, f, u, r, i;
        if (n._f.length === 0) {
            o(n).invalidFormat = !0;
            n._d = new Date(NaN);
            return
        }
        for (r = 0; r < n._f.length; r++)(i = 0, t = vf({}, n), n._useUTC != null && (t._useUTC = n._useUTC), t._f = n._f[r], oe(t), lf(t)) && (i += o(t).charsLeftOver, i += o(t).unusedTokens.length * 10, o(t).score = i, (u == null || i < u) && (u = i, f = t));
        fu(n, f || t)
    }

    function ha(n) {
        if (!n._d) {
            var t = so(n._i);
            n._a = io([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(n) { return n && parseInt(n, 10) });
            ee(n)
        }
    }

    function ca(n) { var t = new or(ie(ss(n))); return t._nextDay && (t.add(1, "d"), t._nextDay = undefined), t }

    function ss(n) {
        var t = n._i,
            i = n._f;
        return (n._locale = n._locale || hi(n._l), t === null || i === undefined && t === "") ? eu({ nullInput: !0 }) : (typeof t == "string" && (n._i = t = n._locale.preparse(t)), ni(t)) ? new or(ie(t)) : (oi(i) ? sa(n) : i ? oe(n) : uu(t) ? n._d = t : la(n), lf(n) || (n._d = null), n)
    }

    function la(n) {
        var t = n._i;
        t === undefined ? n._d = new Date(r.now()) : uu(t) ? n._d = new Date(+t) : typeof t == "string" ? ia(n) : oi(t) ? (n._a = io(t.slice(0), function(n) { return parseInt(n, 10) }), ee(n)) : typeof t == "object" ? ha(n) : typeof t == "number" ? n._d = new Date(t) : r.createFromInputFallback(n)
    }

    function hs(n, t, i, r, u) { var f = {}; return typeof i == "boolean" && (r = i, i = undefined), f._isAMomentObject = !0, f._useUTC = f._isUTC = u, f._l = i, f._i = n, f._f = t, f._strict = r, ca(f) }

    function c(n, t, i, r) { return hs(n, t, i, r, !1) }

    function as(n, t) { var r, i; if (t.length === 1 && oi(t[0]) && (t = t[0]), !t.length) return c(); for (r = t[0], i = 1; i < t.length; ++i)(!t[i].isValid() || t[i][n](r)) && (r = t[i]); return r }

    function aa() { var n = [].slice.call(arguments, 0); return as("isBefore", n) }

    function va() { var n = [].slice.call(arguments, 0); return as("isAfter", n) }

    function du(n) {
        var t = so(n),
            i = t.year || 0,
            r = t.quarter || 0,
            u = t.month || 0,
            f = t.week || 0,
            e = t.day || 0,
            o = t.hour || 0,
            s = t.minute || 0,
            h = t.second || 0,
            c = t.millisecond || 0;
        this._milliseconds = +c + h * 1e3 + s * 6e4 + o * 36e5;
        this._days = +e + f * 7;
        this._months = +u + r * 3 + i * 12;
        this._data = {};
        this._locale = hi();
        this._bubble()
    }

    function se(n) { return n instanceof du }

    function ys(n, t) {
        u(n, 0, 0, function() {
            var n = this.utcOffset(),
                i = "+";
            return n < 0 && (n = -n, i = "-"), i + bt(~~(n / 60), 2) + t + bt(~~n % 60, 2)
        })
    }

    function he(n, t) {
        var r = (t || "").match(n) || [],
            f = r[r.length - 1] || [],
            i = (f + "").match(ps) || ["-", 0, 0],
            u = +(i[1] * 60) + e(i[2]);
        return i[0] === "+" ? u : -u
    }

    function ce(n, t) { var i, u; return t._isUTC ? (i = t.clone(), u = (ni(n) || uu(n) ? +n : +c(n)) - +i, i._d.setTime(+i._d + u), r.updateOffset(i, !1), i) : c(n).local() }

    function le(n) { return -Math.round(n._d.getTimezoneOffset() / 15) * 15 }

    function ya(n, t) {
        var i = this._offset || 0,
            u;
        return this.isValid() ? n != null ? (typeof n == "string" ? n = he(yu, n) : Math.abs(n) < 16 && (n = n * 60), !this._isUTC && t && (u = le(this)), this._offset = n, this._isUTC = !0, u != null && this.add(u, "m"), i !== n && (!t || this._changeInProgress ? nh(this, ti(n - i, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, r.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? i : le(this) : n != null ? this : NaN
    }

    function pa(n, t) { return n != null ? (typeof n != "string" && (n = -n), this.utcOffset(n, t), this) : -this.utcOffset() }

    function wa(n) { return this.utcOffset(0, n) }

    function ba(n) { return this._isUTC && (this.utcOffset(0, n), this._isUTC = !1, n && this.subtract(le(this), "m")), this }

    function ka() { return this._tzm ? this.utcOffset(this._tzm) : typeof this._i == "string" && this.utcOffset(he(el, this._i)), this }

    function da(n) { return this.isValid() ? (n = n ? c(n).utcOffset() : 0, (this.utcOffset() - n) % 60 == 0) : !1 }

    function ga() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset() }

    function nv() { var n, t; return y(this._isDSTShifted) ? (n = {}, vf(n, this), n = ss(n), n._a ? (t = n._isUTC ? ki(n._a) : c(n._a), this._isDSTShifted = this.isValid() && ro(n._a, t.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted) : this._isDSTShifted }

    function tv() { return this.isValid() ? !this._isUTC : !1 }

    function iv() { return this.isValid() ? this._isUTC : !1 }

    function ws() { return this.isValid() ? this._isUTC && this._offset === 0 : !1 }

    function ti(n, t) {
        var i = n,
            r = null,
            u, f, o;
        return se(n) ? i = { ms: n._milliseconds, d: n._days, M: n._months } : typeof n == "number" ? (i = {}, t ? i[t] = n : i.milliseconds = n) : (r = bs.exec(n)) ? (u = r[1] === "-" ? -1 : 1, i = { y: 0, d: e(r[st]) * u, h: e(r[a]) * u, m: e(r[d]) * u, s: e(r[dt]) * u, ms: e(r[ci]) * u }) : (r = ks.exec(n)) ? (u = r[1] === "-" ? -1 : 1, i = { y: ai(r[2], u), M: ai(r[3], u), d: ai(r[4], u), h: ai(r[5], u), m: ai(r[6], u), s: ai(r[7], u), w: ai(r[8], u) }) : i == null ? i = {} : typeof i == "object" && ("from" in i || "to" in i) && (o = rv(c(i.from), c(i.to)), i = {}, i.ms = o.milliseconds, i.M = o.months), f = new du(i), se(n) && pt(n, "_locale") && (f._locale = n._locale), f
    }

    function ai(n, t) { var i = n && parseFloat(n.replace(",", ".")); return (isNaN(i) ? 0 : i) * t }

    function ds(n, t) { var i = { milliseconds: 0, months: 0 }; return i.months = t.month() - n.month() + (t.year() - n.year()) * 12, n.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +n.clone().add(i.months, "M"), i }

    function rv(n, t) { var i; return (n.isValid() && t.isValid()) ? (t = ce(t, n), n.isBefore(t) ? i = ds(n, t) : (i = ds(t, n), i.milliseconds = -i.milliseconds, i.months = -i.months), i) : { milliseconds: 0, months: 0 } }

    function gs(n, t) { return function(i, r) { var u, f; return r === null || isNaN(+r) || (kl(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period)."), f = i, i = r, r = f), i = typeof i == "string" ? +i : i, u = ti(i, r), nh(this, u, n), this } }

    function nh(n, t, i, u) {
        var o = t._milliseconds,
            f = t._days,
            e = t._months;
        n.isValid() && (u = u == null ? !0 : u, o && n._d.setTime(+n._d + o * i), f && ho(n, "Date", su(n, "Date") + f * i), e && go(n, su(n, "Month") + e * i), u && r.updateOffset(n, f || e))
    }

    function uv(n, t) {
        var u = n || c(),
            f = ce(u, this).startOf("day"),
            i = this.diff(f, "days", !0),
            r = i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse",
            e = t && (wt(t[r]) ? t[r]() : t[r]);
        return this.format(e || this.localeData().calendar(r, this, c(u)))
    }

    function fv() { return new or(this) }

    function ev(n, t) { var i = ni(n) ? n : c(n); return (this.isValid() && i.isValid()) ? (t = b(y(t) ? "millisecond" : t), t === "millisecond" ? +this > +i : +i < +this.clone().startOf(t)) : !1 }

    function ov(n, t) { var i = ni(n) ? n : c(n); return (this.isValid() && i.isValid()) ? (t = b(y(t) ? "millisecond" : t), t === "millisecond" ? +this < +i : +this.clone().endOf(t) < +i) : !1 }

    function sv(n, t, i) { return this.isAfter(n, i) && this.isBefore(t, i) }

    function hv(n, t) {
        var i = ni(n) ? n : c(n),
            r;
        return (this.isValid() && i.isValid()) ? (t = b(t || "millisecond"), t === "millisecond" ? +this == +i : (r = +i, +this.clone().startOf(t) <= r && r <= +this.clone().endOf(t))) : !1
    }

    function cv(n, t) { return this.isSame(n, t) || this.isAfter(n, t) }

    function lv(n, t) { return this.isSame(n, t) || this.isBefore(n, t) }

    function av(n, t, i) { var f, e, u, r; return this.isValid() ? (f = ce(n, this), !f.isValid()) ? NaN : (e = (f.utcOffset() - this.utcOffset()) * 6e4, t = b(t), t === "year" || t === "month" || t === "quarter" ? (r = vv(this, f), t === "quarter" ? r = r / 3 : t === "year" && (r = r / 12)) : (u = this - f, r = t === "second" ? u / 1e3 : t === "minute" ? u / 6e4 : t === "hour" ? u / 36e5 : t === "day" ? (u - e) / 864e5 : t === "week" ? (u - e) / 6048e5 : u), i ? r : p(r)) : NaN }

    function vv(n, t) {
        var r = (t.year() - n.year()) * 12 + (t.month() - n.month()),
            i = n.clone().add(r, "months"),
            u, f;
        return t - i < 0 ? (u = n.clone().add(r - 1, "months"), f = (t - i) / (i - u)) : (u = n.clone().add(r + 1, "months"), f = (t - i) / (u - i)), -(r + f)
    }

    function yv() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") }

    function pv() { var n = this.clone().utc(); return 0 < n.year() && n.year() <= 9999 ? wt(Date.prototype.toISOString) ? this.toDate().toISOString() : wf(n, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : wf(n, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") }

    function wv(n) { var t = wf(this, n || r.defaultFormat); return this.localeData().postformat(t) }

    function bv(n, t) { return this.isValid() && (ni(n) && n.isValid() || c(n).isValid()) ? ti({ to: this, from: n }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate() }

    function kv(n) { return this.from(c(), n) }

    function dv(n, t) { return this.isValid() && (ni(n) && n.isValid() || c(n).isValid()) ? ti({ from: this, to: n }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate() }

    function gv(n) { return this.to(c(), n) }

    function rh(n) { var t; return n === undefined ? this._locale._abbr : (t = hi(n), t != null && (this._locale = t), this) }

    function uh() { return this._locale }

    function ny(n) {
        n = b(n);
        switch (n) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return n === "week" && this.weekday(0), n === "isoWeek" && this.isoWeekday(1), n === "quarter" && this.month(Math.floor(this.month() / 3) * 3), this
    }

    function ty(n) { return (n = b(n), n === undefined || n === "millisecond") ? this : this.startOf(n).add(1, n === "isoWeek" ? "week" : n).subtract(1, "ms") }

    function iy() { return +this._d - (this._offset || 0) * 6e4 }

    function ry() { return Math.floor(+this / 1e3) }

    function uy() { return this._offset ? new Date(+this) : this._d }

    function fy() { var n = this; return [n.year(), n.month(), n.date(), n.hour(), n.minute(), n.second(), n.millisecond()] }

    function ey() { var n = this; return { years: n.year(), months: n.month(), date: n.date(), hours: n.hours(), minutes: n.minutes(), seconds: n.seconds(), milliseconds: n.milliseconds() } }

    function oy() { return this.isValid() ? this.toISOString() : "null" }

    function sy() { return lf(this) }

    function hy() { return fu({}, o(this)) }

    function cy() { return o(this).overflow }

    function ly() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict } }

    function gu(n, t) { u(0, [n, n.length], 0, t) }

    function ay(n) { return fh.call(this, n, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy) }

    function vy(n) { return fh.call(this, n, this.isoWeek(), this.isoWeekday(), 1, 4) }

    function yy() { return li(this.year(), 1, 4) }

    function py() { var n = this.localeData()._week; return li(this.year(), n.dow, n.doy) }

    function fh(n, t, i, r, u) { var f; return n == null ? vr(this, r, u).year : (f = li(n, r, u), t > f && (t = f), wy.call(this, n, t, i, r, u)) }

    function wy(n, t, i, r, u) {
        var e = os(n, t, i, r, u),
            f = bu(e.year, 0, e.dayOfYear);
        return this.year(f.getUTCFullYear()), this.month(f.getUTCMonth()), this.date(f.getUTCDate()), this
    }

    function by(n) { return n == null ? Math.ceil((this.month() + 1) / 3) : this.month((n - 1) * 3 + this.month() % 3) }

    function ky(n) { return vr(n, this._week.dow, this._week.doy).week }

    function dy() { return this._week.dow }

    function gy() { return this._week.doy }

    function np(n) { var t = this.localeData().week(this); return n == null ? t : this.add((n - t) * 7, "d") }

    function tp(n) { var t = vr(this, 1, 4).week; return n == null ? t : this.add((n - t) * 7, "d") }

    function ip(n, t) { return typeof n != "string" ? n : isNaN(n) ? (n = t.weekdaysParse(n), typeof n == "number") ? n : null : parseInt(n, 10) }

    function rp(n, t) { return oi(this._weekdays) ? this._weekdays[n.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][n.day()] }

    function up(n) { return this._weekdaysShort[n.day()] }

    function fp(n) { return this._weekdaysMin[n.day()] }

    function ep(n, t, i) {
        var r, u, f;
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), r = 0; r < 7; r++)
            if ((u = c([2e3, 1]).day(r), i && !this._fullWeekdaysParse[r] && (this._fullWeekdaysParse[r] = new RegExp("^" + this.weekdays(u, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[r] = new RegExp("^" + this.weekdaysShort(u, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[r] = new RegExp("^" + this.weekdaysMin(u, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[r] || (f = "^" + this.weekdays(u, "") + "|^" + this.weekdaysShort(u, "") + "|^" + this.weekdaysMin(u, ""), this._weekdaysParse[r] = new RegExp(f.replace(".", ""), "i")), i && t === "dddd" && this._fullWeekdaysParse[r].test(n)) || i && t === "ddd" && this._shortWeekdaysParse[r].test(n) || i && t === "dd" && this._minWeekdaysParse[r].test(n) || !i && this._weekdaysParse[r].test(n)) return r
    }

    function op(n) { if (!this.isValid()) return n != null ? this : NaN; var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return n != null ? (n = ip(n, this.localeData()), this.add(n - t, "d")) : t }

    function sp(n) { if (!this.isValid()) return n != null ? this : NaN; var t = (this.day() + 7 - this.localeData()._week.dow) % 7; return n == null ? t : this.add(n - t, "d") }

    function hp(n) { return this.isValid() ? n == null ? this.day() || 7 : this.day(this.day() % 7 ? n : n - 7) : n != null ? this : NaN }

    function cp(n) { var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return n == null ? t : this.add(n - t, "d") }

    function ye() { return this.hours() % 12 || 12 }

    function ch(n, t) { u(n, 0, 0, function() { return this.localeData().meridiem(this.hours(), this.minutes(), t) }) }

    function lh(n, t) { return t._meridiemParse }

    function lp(n) { return (n + "").toLowerCase().charAt(0) === "p" }

    function ap(n, t, i) { return n > 11 ? i ? "pm" : "PM" : i ? "am" : "AM" }

    function vp(n, t) { t[ci] = e(("0." + n) * 1e3) }

    function yp() { return this._isUTC ? "UTC" : "" }

    function pp() { return this._isUTC ? "Coordinated Universal Time" : "" }

    function wp(n) { return c(n * 1e3) }

    function bp() { return c.apply(null, arguments).parseZone() }

    function kp(n, t, i) { var r = this._calendar[n]; return wt(r) ? r.call(t, i) : r }

    function dp(n) {
        var t = this._longDateFormat[n],
            i = this._longDateFormat[n.toUpperCase()];
        return t || !i ? t : (this._longDateFormat[n] = i.replace(/MMMM|MM|DD|dddd/g, function(n) { return n.slice(1) }), this._longDateFormat[n])
    }

    function gp() { return this._invalidDate }

    function nw(n) { return this._ordinal.replace("%d", n) }

    function tc(n) { return n }

    function tw(n, t, i, r) { var u = this._relativeTime[i]; return wt(u) ? u(n, t, i, r) : u.replace(/%d/i, n) }

    function iw(n, t) { var i = this._relativeTime[n > 0 ? "future" : "past"]; return wt(i) ? i(t) : i.replace(/%s/i, t) }

    function rw(n) {
        var t;
        for (var i in n) t = n[i], wt(t) ? this[i] = t : this["_" + i] = t;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function rc(n, t, i, r) {
        var u = hi(),
            f = ki().set(r, t);
        return u[i](f, n)
    }

    function yr(n, t, i, r, u) { if (typeof n == "number" && (t = n, n = undefined), n = n || "", t != null) return rc(n, t, i, u); for (var e = [], f = 0; f < r; f++) e[f] = rc(n, f, i, u); return e }

    function uw(n, t) { return yr(n, t, "months", 12, "month") }

    function fw(n, t) { return yr(n, t, "monthsShort", 12, "month") }

    function ew(n, t) { return yr(n, t, "weekdays", 7, "day") }

    function ow(n, t) { return yr(n, t, "weekdaysShort", 7, "day") }

    function sw(n, t) { return yr(n, t, "weekdaysMin", 7, "day") }

    function hw() { var n = this._data; return this._milliseconds = ht(this._milliseconds), this._days = ht(this._days), this._months = ht(this._months), n.milliseconds = ht(n.milliseconds), n.seconds = ht(n.seconds), n.minutes = ht(n.minutes), n.hours = ht(n.hours), n.months = ht(n.months), n.years = ht(n.years), this }

    function uc(n, t, i, r) { var u = ti(t, i); return n._milliseconds += r * u._milliseconds, n._days += r * u._days, n._months += r * u._months, n._bubble() }

    function cw(n, t) { return uc(this, n, t, 1) }

    function lw(n, t) { return uc(this, n, t, -1) }

    function fc(n) { return n < 0 ? Math.floor(n) : Math.ceil(n) }

    function aw() {
        var r = this._milliseconds,
            n = this._days,
            t = this._months,
            i = this._data,
            u, f, e, s, o;
        return r >= 0 && n >= 0 && t >= 0 || r <= 0 && n <= 0 && t <= 0 || (r += fc(we(t) + n) * 864e5, n = 0, t = 0), i.milliseconds = r % 1e3, u = p(r / 1e3), i.seconds = u % 60, f = p(u / 60), i.minutes = f % 60, e = p(f / 60), i.hours = e % 24, n += p(e / 24), o = p(ec(n)), t += o, n -= fc(we(o)), s = p(t / 12), t %= 12, i.days = n, i.months = t, i.years = s, this
    }

    function ec(n) { return n * 4800 / 146097 }

    function we(n) { return n * 146097 / 4800 }

    function vw(n) {
        var t, r, i = this._milliseconds;
        if (n = b(n), n === "month" || n === "year") return t = this._days + i / 864e5, r = this._months + ec(t), n === "month" ? r : r / 12;
        t = this._days + Math.round(we(this._months));
        switch (n) {
            case "week":
                return t / 7 + i / 6048e5;
            case "day":
                return t + i / 864e5;
            case "hour":
                return t * 24 + i / 36e5;
            case "minute":
                return t * 1440 + i / 6e4;
            case "second":
                return t * 86400 + i / 1e3;
            case "millisecond":
                return Math.floor(t * 864e5) + i;
            default:
                throw new Error("Unknown unit " + n);
        }
    }

    function yw() { return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + e(this._months / 12) * 31536e6 }

    function ri(n) { return function() { return this.as(n) } }

    function ib(n) { return n = b(n), this[n + "s"]() }

    function vi(n) { return function() { return this._data[n] } }

    function cb() { return p(this.days() / 7) }

    function lb(n, t, i, r, u) { return u.relativeTime(t || 1, !!i, n, r) }

    function ab(n, t, i) {
        var r = ti(n).abs(),
            h = yi(r.as("s")),
            f = yi(r.as("m")),
            e = yi(r.as("h")),
            o = yi(r.as("d")),
            s = yi(r.as("M")),
            c = yi(r.as("y")),
            u = h < gt.s && ["s", h] || f <= 1 && ["m"] || f < gt.m && ["mm", f] || e <= 1 && ["h"] || e < gt.h && ["hh", e] || o <= 1 && ["d"] || o < gt.d && ["dd", o] || s <= 1 && ["M"] || s < gt.M && ["MM", s] || c <= 1 && ["y"] || ["yy", c];
        return u[2] = t, u[3] = +n > 0, u[4] = i, lb.apply(null, u)
    }

    function vb(n, t) { return gt[n] === undefined ? !1 : t === undefined ? gt[n] : (gt[n] = t, !0) }

    function yb(n) {
        var t = this.localeData(),
            i = ab(this, !n, t);
        return n && (i = t.pastFuture(+this, i)), t.postformat(i)
    }

    function tf() {
        var t = nf(this._milliseconds) / 1e3,
            a = nf(this._days),
            i = nf(this._months),
            n, e, o;
        n = p(t / 60);
        e = p(n / 60);
        t %= 60;
        n %= 60;
        o = p(i / 12);
        i %= 12;
        var s = o,
            h = i,
            c = a,
            r = e,
            u = n,
            f = t,
            l = this.asSeconds();
        return l ? (l < 0 ? "-" : "") + "P" + (s ? s + "Y" : "") + (h ? h + "M" : "") + (c ? c + "D" : "") + (r || u || f ? "T" : "") + (r ? r + "H" : "") + (u ? u + "M" : "") + (f ? f + "S" : "") : "P0D"
    }

    function rk(n, t) { var i = n.split("_"); return t % 10 == 1 && t % 100 != 11 ? i[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i[1] : i[2] }

    function pi(n, t, i) { var r = { mm: t ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ_Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñ‹_Ñ…Ð²Ñ–Ð»Ñ–Ð½", hh: t ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ_Ð³Ð°Ð´Ð·Ñ–Ð½Ñ‹_Ð³Ð°Ð´Ð·Ñ–Ð½", dd: "Ð´Ð·ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð·Ñ‘Ð½", MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ñ‹_Ð¼ÐµÑÑÑ†Ð°Ñž", yy: "Ð³Ð¾Ð´_Ð³Ð°Ð´Ñ‹_Ð³Ð°Ð´Ð¾Ñž" }; return i === "m" ? t ? "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ð°" : "Ñ…Ð²Ñ–Ð»Ñ–Ð½Ñƒ" : i === "h" ? t ? "Ð³Ð°Ð´Ð·Ñ–Ð½Ð°" : "Ð³Ð°Ð´Ð·Ñ–Ð½Ñƒ" : n + " " + rk(r[i], +n) }

    function be(n, t, i) { return n + " " + lk({ mm: "munutenn", MM: "miz", dd: "devezh" }[i], n) }

    function ck(n) {
        switch (hc(n)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
                return n + " bloaz";
            default:
                return n + " vloaz"
        }
    }

    function hc(n) { return n > 9 ? hc(n % 10) : n }

    function lk(n, t) { return t === 2 ? ak(n) : n }

    function ak(n) { var t = { m: "v", b: "v", d: "z" }; return t[n.charAt(0)] === undefined ? n : t[n.charAt(0)] + n.substring(1) }

    function wi(n, t, i) {
        var r = n + " ";
        switch (i) {
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return r + (n === 1 ? "minuta" : n === 2 || n === 3 || n === 4 ? "minute" : "minuta");
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return r + (n === 1 ? "sat" : n === 2 || n === 3 || n === 4 ? "sata" : "sati");
            case "dd":
                return r + (n === 1 ? "dan" : "dana");
            case "MM":
                return r + (n === 1 ? "mjesec" : n === 2 || n === 3 || n === 4 ? "mjeseca" : "mjeseci");
            case "yy":
                return r + (n === 1 ? "godina" : n === 2 || n === 3 || n === 4 ? "godine" : "godina")
        }
    }

    function pr(n) { return n > 1 && n < 5 && ~~(n / 10) != 1 }

    function tt(n, t, i, r) {
        var u = n + " ";
        switch (i) {
            case "s":
                return t || r ? "pÃ¡r sekund" : "pÃ¡r sekundami";
            case "m":
                return t ? "minuta" : r ? "minutu" : "minutou";
            case "mm":
                return t || r ? u + (pr(n) ? "minuty" : "minut") : u + "minutami";
            case "h":
                return t ? "hodina" : r ? "hodinu" : "hodinou";
            case "hh":
                return t || r ? u + (pr(n) ? "hodiny" : "hodin") : u + "hodinami";
            case "d":
                return t || r ? "den" : "dnem";
            case "dd":
                return t || r ? u + (pr(n) ? "dny" : "dnÃ­") : u + "dny";
            case "M":
                return t || r ? "mÄ›sÃ­c" : "mÄ›sÃ­cem";
            case "MM":
                return t || r ? u + (pr(n) ? "mÄ›sÃ­ce" : "mÄ›sÃ­cÅ¯") : u + "mÄ›sÃ­ci";
            case "y":
                return t || r ? "rok" : "rokem";
            case "yy":
                return t || r ? u + (pr(n) ? "roky" : "let") : u + "lety"
        }
    }

    function ui(n, t, i) { var r = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [n + " Tage", n + " Tagen"], M: ["ein Monat", "einem Monat"], MM: [n + " Monate", n + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [n + " Jahre", n + " Jahren"] }; return t ? r[i][0] : r[i][1] }

    function fi(n, t, i) { var r = { m: ["eine Minute", "einer Minute"], h: ["eine Stunde", "einer Stunde"], d: ["ein Tag", "einem Tag"], dd: [n + " Tage", n + " Tagen"], M: ["ein Monat", "einem Monat"], MM: [n + " Monate", n + " Monaten"], y: ["ein Jahr", "einem Jahr"], yy: [n + " Jahre", n + " Jahren"] }; return t ? r[i][0] : r[i][1] }

    function ct(n, t, i, r) { var u = { s: ["mÃµne sekundi", "mÃµni sekund", "paar sekundit"], m: ["Ã¼he minuti", "Ã¼ks minut"], mm: [n + " minuti", n + " minutit"], h: ["Ã¼he tunni", "tund aega", "Ã¼ks tund"], hh: [n + " tunni", n + " tundi"], d: ["Ã¼he pÃ¤eva", "Ã¼ks pÃ¤ev"], M: ["kuu aja", "kuu aega", "Ã¼ks kuu"], MM: [n + " kuu", n + " kuud"], y: ["Ã¼he aasta", "aasta", "Ã¼ks aasta"], yy: [n + " aasta", n + " aastat"] }; return t ? u[i][2] ? u[i][2] : u[i][1] : r ? u[i][0] : u[i][1] }

    function it(n, t, i, r) {
        var u = "";
        switch (i) {
            case "s":
                return r ? "muutaman sekunnin" : "muutama sekunti";
            case "m":
                return r ? "minuutin" : "minuutti";
            case "mm":
                u = r ? "minuutin" : "minuuttia";
                break;
            case "h":
                return r ? "tunnin" : "tunti";
            case "hh":
                u = r ? "tunnin" : "tuntia";
                break;
            case "d":
                return r ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤";
            case "dd":
                u = r ? "pÃ¤ivÃ¤n" : "pÃ¤ivÃ¤Ã¤";
                break;
            case "M":
                return r ? "kuukauden" : "kuukausi";
            case "MM":
                u = r ? "kuukauden" : "kuukautta";
                break;
            case "y":
                return r ? "vuoden" : "vuosi";
            case "yy":
                u = r ? "vuoden" : "vuotta"
        }
        return yd(n, r) + " " + u
    }

    function yd(n, t) { return n < 10 ? t ? ac[n] : wr[n] : n }

    function bi(n, t, i) {
        var r = n + " ";
        switch (i) {
            case "m":
                return t ? "jedna minuta" : "jedne minute";
            case "mm":
                return r + (n === 1 ? "minuta" : n === 2 || n === 3 || n === 4 ? "minute" : "minuta");
            case "h":
                return t ? "jedan sat" : "jednog sata";
            case "hh":
                return r + (n === 1 ? "sat" : n === 2 || n === 3 || n === 4 ? "sata" : "sati");
            case "dd":
                return r + (n === 1 ? "dan" : "dana");
            case "MM":
                return r + (n === 1 ? "mjesec" : n === 2 || n === 3 || n === 4 ? "mjeseca" : "mjeseci");
            case "yy":
                return r + (n === 1 ? "godina" : n === 2 || n === 3 || n === 4 ? "godine" : "godina")
        }
    }

    function rt(n, t, i, r) {
        var u = n;
        switch (i) {
            case "s":
                return r || t ? "nÃ©hÃ¡ny mÃ¡sodperc" : "nÃ©hÃ¡ny mÃ¡sodperce";
            case "m":
                return "egy" + (r || t ? " perc" : " perce");
            case "mm":
                return u + (r || t ? " perc" : " perce");
            case "h":
                return "egy" + (r || t ? " Ã³ra" : " Ã³rÃ¡ja");
            case "hh":
                return u + (r || t ? " Ã³ra" : " Ã³rÃ¡ja");
            case "d":
                return "egy" + (r || t ? " nap" : " napja");
            case "dd":
                return u + (r || t ? " nap" : " napja");
            case "M":
                return "egy" + (r || t ? " hÃ³nap" : " hÃ³napja");
            case "MM":
                return u + (r || t ? " hÃ³nap" : " hÃ³napja");
            case "y":
                return "egy" + (r || t ? " Ã©v" : " Ã©ve");
            case "yy":
                return u + (r || t ? " Ã©v" : " Ã©ve")
        }
        return ""
    }

    function yc(n) { return (n ? "" : "[mÃºlt] ") + "[" + vc[this.day()] + "] LT[-kor]" }

    function br(n) { return n % 100 == 11 ? !0 : n % 10 == 1 ? !1 : !0 }

    function lt(n, t, i, r) {
        var u = n + " ";
        switch (i) {
            case "s":
                return t || r ? "nokkrar sekÃºndur" : "nokkrum sekÃºndum";
            case "m":
                return t ? "mÃ­nÃºta" : "mÃ­nÃºtu";
            case "mm":
                return br(n) ? u + (t || r ? "mÃ­nÃºtur" : "mÃ­nÃºtum") : t ? u + "mÃ­nÃºta" : u + "mÃ­nÃºtu";
            case "hh":
                return br(n) ? u + (t || r ? "klukkustundir" : "klukkustundum") : u + "klukkustund";
            case "d":
                return t ? "dagur" : r ? "dag" : "degi";
            case "dd":
                return br(n) ? t ? u + "dagar" : u + (r ? "daga" : "dÃ¶gum") : t ? u + "dagur" : u + (r ? "dag" : "degi");
            case "M":
                return t ? "mÃ¡nuÃ°ur" : r ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i";
            case "MM":
                return br(n) ? t ? u + "mÃ¡nuÃ°ir" : u + (r ? "mÃ¡nuÃ°i" : "mÃ¡nuÃ°um") : t ? u + "mÃ¡nuÃ°ur" : u + (r ? "mÃ¡nuÃ°" : "mÃ¡nuÃ°i");
            case "y":
                return t || r ? "Ã¡r" : "Ã¡ri";
            case "yy":
                return br(n) ? u + (t || r ? "Ã¡r" : "Ã¡rum") : u + (t || r ? "Ã¡r" : "Ã¡ri")
        }
    }

    function kr(n, t, i) { var r = { m: ["eng Minutt", "enger Minutt"], h: ["eng Stonn", "enger Stonn"], d: ["een Dag", "engem Dag"], M: ["ee Mount", "engem Mount"], y: ["ee Joer", "engem Joer"] }; return t ? r[i][0] : r[i][1] }

    function bg(n) { var t = n.substr(0, n.indexOf(" ")); return tr(t) ? "a " + n : "an " + n }

    function kg(n) { var t = n.substr(0, n.indexOf(" ")); return tr(t) ? "viru " + n : "virun " + n }

    function tr(n) {
        if (n = parseInt(n, 10), isNaN(n)) return !1;
        if (n < 0) return !0;
        if (n < 10) return 4 <= n && n <= 7 ? !0 : !1;
        if (n < 100) {
            var t = n % 10,
                i = n / 10;
            return t === 0 ? tr(i) : tr(t)
        }
        if (n < 1e4) { while (n >= 10) n = n / 10; return tr(n) }
        return n = n / 1e3, tr(n)
    }

    function nn(n, t, i, r) { return t ? "kelios sekundÄ—s" : r ? "keliÅ³ sekundÅ¾iÅ³" : "kelias sekundes" }

    function ir(n, t, i, r) { return t ? ei(i)[0] : r ? ei(i)[1] : ei(i)[2] }

    function wc(n) { return n % 10 == 0 || n > 10 && n < 20 }

    function ei(n) { return pc[n].split("_") }

    function dr(n, t, i, r) { var u = n + " "; return n === 1 ? u + ir(n, t, i[0], r) : t ? u + (wc(n) ? ei(i)[1] : ei(i)[0]) : r ? u + ei(i)[1] : u + (wc(n) ? ei(i)[1] : ei(i)[2]) }

    function bc(n, t, i) { return i ? t % 10 == 1 && t !== 11 ? n[2] : n[3] : t % 10 == 1 && t !== 11 ? n[0] : n[1] }

    function gr(n, t, i) { return n + " " + bc(ke[i], n, t) }

    function nu(n, t, i) { return bc(ke[i], n, t) }

    function rn(n, t) { return t ? "daÅ¾as sekundes" : "daÅ¾Äm sekundÄ“m" }

    function ut(n, t, i) {
        var r = "";
        if (t) switch (i) {
            case "s":
                r = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦";
                break;
            case "m":
                r = "à¤à¤• à¤®à¤¿à¤¨à¤¿à¤Ÿ";
                break;
            case "mm":
                r = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡";
                break;
            case "h":
                r = "à¤à¤• à¤¤à¤¾à¤¸";
                break;
            case "hh":
                r = "%d à¤¤à¤¾à¤¸";
                break;
            case "d":
                r = "à¤à¤• à¤¦à¤¿à¤µà¤¸";
                break;
            case "dd":
                r = "%d à¤¦à¤¿à¤µà¤¸";
                break;
            case "M":
                r = "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾";
                break;
            case "MM":
                r = "%d à¤®à¤¹à¤¿à¤¨à¥‡";
                break;
            case "y":
                r = "à¤à¤• à¤µà¤°à¥à¤·";
                break;
            case "yy":
                r = "%d à¤µà¤°à¥à¤·à¥‡"
        } else switch (i) {
            case "s":
                r = "à¤•à¤¾à¤¹à¥€ à¤¸à¥‡à¤•à¤‚à¤¦à¤¾à¤‚";
                break;
            case "m":
                r = "à¤à¤•à¤¾ à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾";
                break;
            case "mm":
                r = "%d à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚";
                break;
            case "h":
                r = "à¤à¤•à¤¾ à¤¤à¤¾à¤¸à¤¾";
                break;
            case "hh":
                r = "%d à¤¤à¤¾à¤¸à¤¾à¤‚";
                break;
            case "d":
                r = "à¤à¤•à¤¾ à¤¦à¤¿à¤µà¤¸à¤¾";
                break;
            case "dd":
                r = "%d à¤¦à¤¿à¤µà¤¸à¤¾à¤‚";
                break;
            case "M":
                r = "à¤à¤•à¤¾ à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾";
                break;
            case "MM":
                r = "%d à¤®à¤¹à¤¿à¤¨à¥à¤¯à¤¾à¤‚";
                break;
            case "y":
                r = "à¤à¤•à¤¾ à¤µà¤°à¥à¤·à¤¾";
                break;
            case "yy":
                r = "%d à¤µà¤°à¥à¤·à¤¾à¤‚"
        }
        return r.replace(/%d/i, n)
    }

    function of(n) { return n % 10 < 5 && n % 10 > 1 && ~~(n / 10) % 10 != 1 }

    function rr(n, t, i) {
        var r = n + " ";
        switch (i) {
            case "m":
                return t ? "minuta" : "minutÄ™";
            case "mm":
                return r + (of(n) ? "minuty" : "minut");
            case "h":
                return t ? "godzina" : "godzinÄ™";
            case "hh":
                return r + (of(n) ? "godziny" : "godzin");
            case "MM":
                return r + (of(n) ? "miesiÄ…ce" : "miesiÄ™cy");
            case "yy":
                return r + (of(n) ? "lata" : "lat")
        }
    }

    function tu(n, t, i) { var r = " "; return (n % 100 >= 20 || n >= 100 && n % 100 == 0) && (r = " de "), n + r + { mm: "minute", hh: "ore", dd: "zile", MM: "luni", yy: "ani" }[i] }

    function itt(n, t) { var i = n.split("_"); return t % 10 == 1 && t % 100 != 11 ? i[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i[1] : i[2] }

    function ur(n, t, i) { var r = { mm: t ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ_Ð¼Ð¸Ð½ÑƒÑ‚Ñ‹_Ð¼Ð¸Ð½ÑƒÑ‚", hh: "Ñ‡Ð°Ñ_Ñ‡Ð°ÑÐ°_Ñ‡Ð°ÑÐ¾Ð²", dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ_Ð´Ð½ÐµÐ¹", MM: "Ð¼ÐµÑÑÑ†_Ð¼ÐµÑÑÑ†Ð°_Ð¼ÐµÑÑÑ†ÐµÐ²", yy: "Ð³Ð¾Ð´_Ð³Ð¾Ð´Ð°_Ð»ÐµÑ‚" }; return i === "m" ? t ? "Ð¼Ð¸Ð½ÑƒÑ‚Ð°" : "Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ" : n + " " + itt(r[i], +n) }

    function iu(n) { return n > 1 && n < 5 }

    function ft(n, t, i, r) {
        var u = n + " ";
        switch (i) {
            case "s":
                return t || r ? "pÃ¡r sekÃºnd" : "pÃ¡r sekundami";
            case "m":
                return t ? "minÃºta" : r ? "minÃºtu" : "minÃºtou";
            case "mm":
                return t || r ? u + (iu(n) ? "minÃºty" : "minÃºt") : u + "minÃºtami";
            case "h":
                return t ? "hodina" : r ? "hodinu" : "hodinou";
            case "hh":
                return t || r ? u + (iu(n) ? "hodiny" : "hodÃ­n") : u + "hodinami";
            case "d":
                return t || r ? "deÅˆ" : "dÅˆom";
            case "dd":
                return t || r ? u + (iu(n) ? "dni" : "dnÃ­") : u + "dÅˆami";
            case "M":
                return t || r ? "mesiac" : "mesiacom";
            case "MM":
                return t || r ? u + (iu(n) ? "mesiace" : "mesiacov") : u + "mesiacmi";
            case "y":
                return t || r ? "rok" : "rokom";
            case "yy":
                return t || r ? u + (iu(n) ? "roky" : "rokov") : u + "rokmi"
        }
    }

    function et(n, t, i, r) {
        var u = n + " ";
        switch (i) {
            case "s":
                return t || r ? "nekaj sekund" : "nekaj sekundami";
            case "m":
                return t ? "ena minuta" : "eno minuto";
            case "mm":
                return u + (n === 1 ? t ? "minuta" : "minuto" : n === 2 ? t || r ? "minuti" : "minutama" : n < 5 ? t || r ? "minute" : "minutami" : t || r ? "minut" : "minutami");
            case "h":
                return t ? "ena ura" : "eno uro";
            case "hh":
                return u + (n === 1 ? t ? "ura" : "uro" : n === 2 ? t || r ? "uri" : "urama" : n < 5 ? t || r ? "ure" : "urami" : t || r ? "ur" : "urami");
            case "d":
                return t || r ? "en dan" : "enim dnem";
            case "dd":
                return u + (n === 1 ? t || r ? "dan" : "dnem" : n === 2 ? t || r ? "dni" : "dnevoma" : t || r ? "dni" : "dnevi");
            case "M":
                return t || r ? "en mesec" : "enim mesecem";
            case "MM":
                return u + (n === 1 ? t || r ? "mesec" : "mesecem" : n === 2 ? t || r ? "meseca" : "mesecema" : n < 5 ? t || r ? "mesece" : "meseci" : t || r ? "mesecev" : "meseci");
            case "y":
                return t || r ? "eno leto" : "enim letom";
            case "yy":
                return u + (n === 1 ? t || r ? "leto" : "letom" : n === 2 ? t || r ? "leti" : "letoma" : n < 5 ? t || r ? "leta" : "leti" : t || r ? "let" : "leti")
        }
    }

    function ktt(n) { var t = n; return n.indexOf("jaj") !== -1 ? t.slice(0, -3) + "leS" : n.indexOf("jar") !== -1 ? t.slice(0, -3) + "waQ" : n.indexOf("DIS") !== -1 ? t.slice(0, -3) + "nem" : t + " pIq" }

    function dtt(n) { var t = n; return n.indexOf("jaj") !== -1 ? t.slice(0, -3) + "Huâ€™" : n.indexOf("jar") !== -1 ? t.slice(0, -3) + "wen" : n.indexOf("DIS") !== -1 ? t.slice(0, -3) + "ben" : t + " ret" }

    function ru(n, t, i) {
        var r = gtt(n);
        switch (i) {
            case "mm":
                return r + " tup";
            case "hh":
                return r + " rep";
            case "dd":
                return r + " jaj";
            case "MM":
                return r + " jar";
            case "yy":
                return r + " DIS"
        }
    }

    function gtt(n) {
        var i = Math.floor(n % 1e3 / 100),
            r = Math.floor(n % 100 / 10),
            u = n % 10,
            t = "";
        return i > 0 && (t += hf[i] + "vatlh"), r > 0 && (t += (t !== "" ? " " : "") + hf[r] + "maH"), u > 0 && (t += (t !== "" ? " " : "") + hf[u]), t === "" ? "pagh" : t
    }

    function ot(n, t, i, r) { var u = { s: ["viensas secunds", "'iensas secunds"], m: ["'n mÃ­ut", "'iens mÃ­ut"], mm: [n + " mÃ­uts", "" + n + " mÃ­uts"], h: ["'n Ã¾ora", "'iensa Ã¾ora"], hh: [n + " Ã¾oras", "" + n + " Ã¾oras"], d: ["'n ziua", "'iensa ziua"], dd: [n + " ziuas", "" + n + " ziuas"], M: ["'n mes", "'iens mes"], MM: [n + " mesen", "" + n + " mesen"], y: ["'n ar", "'iens ar"], yy: [n + " ars", "" + n + " ars"] }; return r ? u[i][0] : t ? u[i][0] : u[i][1] }

    function fit(n, t) { var i = n.split("_"); return t % 10 == 1 && t % 100 != 11 ? i[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? i[1] : i[2] }

    function fr(n, t, i) { var r = { mm: t ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ_Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð¸_Ñ…Ð²Ð¸Ð»Ð¸Ð½", hh: t ? "Ð³Ð¾Ð´Ð¸Ð½Ð°_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ_Ð³Ð¾Ð´Ð¸Ð½Ð¸_Ð³Ð¾Ð´Ð¸Ð½", dd: "Ð´ÐµÐ½ÑŒ_Ð´Ð½Ñ–_Ð´Ð½Ñ–Ð²", MM: "Ð¼Ñ–ÑÑÑ†ÑŒ_Ð¼Ñ–ÑÑÑ†Ñ–_Ð¼Ñ–ÑÑÑ†Ñ–Ð²", yy: "Ñ€Ñ–Ðº_Ñ€Ð¾ÐºÐ¸_Ñ€Ð¾ÐºÑ–Ð²" }; return i === "m" ? t ? "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ð°" : "Ñ…Ð²Ð¸Ð»Ð¸Ð½Ñƒ" : i === "h" ? t ? "Ð³Ð¾Ð´Ð¸Ð½Ð°" : "Ð³Ð¾Ð´Ð¸Ð½Ñƒ" : n + " " + fit(r[i], +n) }

    function eit(n, t) {
        var i = { nominative: "Ð½ÐµÐ´Ñ–Ð»Ñ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"), accusative: "Ð½ÐµÐ´Ñ–Ð»ÑŽ_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»Ð¾Ðº_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€Ð¾Ðº_ÑÐµÑ€ÐµÐ´Ñƒ_Ñ‡ÐµÑ‚Ð²ÐµÑ€_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†ÑŽ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"), genitive: "Ð½ÐµÐ´Ñ–Ð»Ñ–_Ð¿Ð¾Ð½ÐµÐ´Ñ–Ð»ÐºÐ°_Ð²Ñ–Ð²Ñ‚Ð¾Ñ€ÐºÐ°_ÑÐµÑ€ÐµÐ´Ð¸_Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³Ð°_Ð¿â€™ÑÑ‚Ð½Ð¸Ñ†Ñ–_ÑÑƒÐ±Ð¾Ñ‚Ð¸".split("_") },
            r = /(\[[Ð’Ð²Ð£Ñƒ]\]) ?dddd/.test(t) ? "accusative" : /\[?(?:Ð¼Ð¸Ð½ÑƒÐ»Ð¾Ñ—|Ð½Ð°ÑÑ‚ÑƒÐ¿Ð½Ð¾Ñ—)? ?\] ?dddd/.test(t) ? "genitive" : "nominative";
        return i[r][n.day()]
    }

    function er(n) { return function() { return n + "Ð¾" + (this.hours() === 11 ? "Ð±" : "") + "] LT" } }
    var to, af = r.momentProperties = [],
        yf = !1,
        si = {},
        ou, hr = {},
        lo = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        hu = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        pf = {},
        gi = {},
        vo = /\d/,
        w = /\d\d/,
        yo = /\d{3}/,
        bf = /\d{4}/,
        cu = /[+-]?\d{6}/,
        l = /\d\d?/,
        po = /\d\d\d\d?/,
        wo = /\d\d\d\d\d\d?/,
        lu = /\d{1,3}/,
        kf = /\d{1,4}/,
        au = /[+-]?\d{1,6}/,
        vu = /[+-]?\d+/,
        el = /Z|[+-]\d\d:?\d\d/gi,
        yu = /Z|[+-]\d\d(?::?\d\d)?/gi,
        cr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        df = {},
        gf = {},
        k = 0,
        kt = 1,
        st = 2,
        a = 3,
        d = 4,
        dt = 5,
        ci = 6,
        cl = 7,
        ll = 8,
        te, bo, ko, ts, is, re, fe, cs, ls, vs, ps, bs, ks, th, ih, ae, eh, ve, oh, sh, hh, ah, vh, yh, ph, ii, wh, t, pe, bh, kh, dh, gh, nc, ic, f, ht, yi, gt, nf, s, n, pb, wb, db, rf, ik, uk, fk, vk, yk, pk, uf, ff, wk, bk, kk, dk, gk, nd, td, id, rd, ud, fd, ed, od, cd, ld, wr, ac, pd, wd, bd, kd, dd, tg, ig, fg, vc, eg, og, sg, hg, cg, lg, ag, vg, ef, yg, pg, wg, dg, gg, pc, tn, ke, un, at, fn, en, on, kc, dc, sn, hn, cn, vn, kn, de, ge, dn, gn, ntt, ttt, sf, rtt, utt, ftt, gc, nl, ett, ott, stt, vt, htt, yt, ctt, ltt, att, ptt, wtt, btt, hf, nit, cf, tit, iit, rit, uit, oit, sit, hit, cit, lit, no;
    u("M", ["MM", 2], "Mo", function() { return this.month() + 1 });
    u("MMM", 0, 0, function(n) { return this.localeData().monthsShort(this, n) });
    u("MMMM", 0, 0, function(n) { return this.localeData().months(this, n) });
    v("month", "M");
    i("M", l);
    i("MM", l, w);
    i("MMM", function(n, t) { return t.monthsShortRegex(n) });
    i("MMMM", function(n, t) { return t.monthsRegex(n) });
    h(["M", "MM"], function(n, t) { t[kt] = e(n) - 1 });
    h(["MMM", "MMMM"], function(n, t, i, r) {
        var u = i._locale.monthsParse(n, r, i._strict);
        u != null ? t[kt] = u : o(i).invalidMonth = n
    });
    te = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    bo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
    ko = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
    ts = cr;
    is = cr;
    re = {};
    r.suppressDeprecationWarnings = !1;
    var dl = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        gl = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        na = /Z|[+-]\d\d(?::?\d\d)?/,
        wu = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        ue = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        ta = /^\/?Date\((\-?\d+)/i;
    for (r.createFromInputFallback = g("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(n) { n._d = new Date(n._i + (n._useUTC ? " UTC" : "")) }), u("Y", 0, 0, function() { var n = this.year(); return n <= 9999 ? "" + n : "+" + n }), u(0, ["YY", 2], 0, function() { return this.year() % 100 }), u(0, ["YYYY", 4], 0, "year"), u(0, ["YYYYY", 5], 0, "year"), u(0, ["YYYYYY", 6, !0], 0, "year"), v("year", "y"), i("Y", vu), i("YY", l, w), i("YYYY", kf, bf), i("YYYYY", au, cu), i("YYYYYY", au, cu), h(["YYYYY", "YYYYYY"], k), h("YYYY", function(n, t) { t[k] = n.length === 2 ? r.parseTwoDigitYear(n) : e(n) }), h("YY", function(n, t) { t[k] = r.parseTwoDigitYear(n) }), h("Y", function(n, t) { t[k] = parseInt(n, 10) }), r.parseTwoDigitYear = function(n) { return e(n) + (e(n) > 68 ? 1900 : 2e3) }, fe = di("FullYear", !1), r.ISO_8601 = function() {}, cs = g("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() { var n = c.apply(null, arguments); return this.isValid() && n.isValid() ? n < this ? this : n : eu() }), ls = g("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() { var n = c.apply(null, arguments); return this.isValid() && n.isValid() ? n > this ? this : n : eu() }), vs = function() { return Date.now ? Date.now() : +new Date }, ys("Z", ":"), ys("ZZ", ""), i("Z", yu), i("ZZ", yu), h(["Z", "ZZ"], function(n, t, i) {
            i._useUTC = !0;
            i._tzm = he(yu, n)
        }), ps = /([\+\-]|\d\d)/gi, r.updateOffset = function() {}, bs = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/, ks = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, ti.fn = du.prototype, th = gs(1, "add"), ih = gs(-1, "subtract"), r.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", ae = g("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(n) { return n === undefined ? this.localeData() : this.locale(n) }), u(0, ["gg", 2], 0, function() { return this.weekYear() % 100 }), u(0, ["GG", 2], 0, function() { return this.isoWeekYear() % 100 }), gu("gggg", "weekYear"), gu("ggggg", "weekYear"), gu("GGGG", "isoWeekYear"), gu("GGGGG", "isoWeekYear"), v("weekYear", "gg"), v("isoWeekYear", "GG"), i("G", vu), i("g", vu), i("GG", l, w), i("gg", l, w), i("GGGG", kf, bf), i("gggg", kf, bf), i("GGGGG", au, cu), i("ggggg", au, cu), lr(["gggg", "ggggg", "GGGG", "GGGGG"], function(n, t, i, r) { t[r.substr(0, 2)] = e(n) }), lr(["gg", "GG"], function(n, t, i, u) { t[u] = r.parseTwoDigitYear(n) }), u("Q", 0, "Qo", "quarter"), v("quarter", "Q"), i("Q", vo), h("Q", function(n, t) { t[kt] = (e(n) - 1) * 3 }), u("w", ["ww", 2], "wo", "week"), u("W", ["WW", 2], "Wo", "isoWeek"), v("week", "w"), v("isoWeek", "W"), i("w", l), i("ww", l, w), i("W", l), i("WW", l, w), lr(["w", "ww", "W", "WW"], function(n, t, i, r) { t[r.substr(0, 1)] = e(n) }), eh = { dow: 0, doy: 6 }, u("D", ["DD", 2], "Do", "date"), v("date", "D"), i("D", l), i("DD", l, w), i("Do", function(n, t) { return n ? t._ordinalParse : t._ordinalParseLenient }), h(["D", "DD"], st), h("Do", function(n, t) { t[st] = e(n.match(l)[0], 10) }), ve = di("Date", !0), u("d", 0, "do", "day"), u("dd", 0, 0, function(n) { return this.localeData().weekdaysMin(this, n) }), u("ddd", 0, 0, function(n) { return this.localeData().weekdaysShort(this, n) }), u("dddd", 0, 0, function(n) { return this.localeData().weekdays(this, n) }), u("e", 0, 0, "weekday"), u("E", 0, 0, "isoWeekday"), v("day", "d"), v("weekday", "e"), v("isoWeekday", "E"), i("d", l), i("e", l), i("E", l), i("dd", cr), i("ddd", cr), i("dddd", cr), lr(["dd", "ddd", "dddd"], function(n, t, i, r) {
            var u = i._locale.weekdaysParse(n, r, i._strict);
            u != null ? t.d = u : o(i).invalidWeekday = n
        }), lr(["d", "e", "E"], function(n, t, i, r) { t[r] = e(n) }), oh = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), sh = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), hh = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), u("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), v("dayOfYear", "DDD"), i("DDD", lu), i("DDDD", yo), h(["DDD", "DDDD"], function(n, t, i) { i._dayOfYear = e(n) }), u("H", ["HH", 2], 0, "hour"), u("h", ["hh", 2], 0, ye), u("hmm", 0, 0, function() { return "" + ye.apply(this) + bt(this.minutes(), 2) }), u("hmmss", 0, 0, function() { return "" + ye.apply(this) + bt(this.minutes(), 2) + bt(this.seconds(), 2) }), u("Hmm", 0, 0, function() { return "" + this.hours() + bt(this.minutes(), 2) }), u("Hmmss", 0, 0, function() { return "" + this.hours() + bt(this.minutes(), 2) + bt(this.seconds(), 2) }), ch("a", !0), ch("A", !1), v("hour", "h"), i("a", lh), i("A", lh), i("H", l), i("h", l), i("HH", l, w), i("hh", l, w), i("hmm", po), i("hmmss", wo), i("Hmm", po), i("Hmmss", wo), h(["H", "HH"], a), h(["a", "A"], function(n, t, i) {
            i._isPm = i._locale.isPM(n);
            i._meridiem = n
        }), h(["h", "hh"], function(n, t, i) {
            t[a] = e(n);
            o(i).bigHour = !0
        }), h("hmm", function(n, t, i) {
            var r = n.length - 2;
            t[a] = e(n.substr(0, r));
            t[d] = e(n.substr(r));
            o(i).bigHour = !0
        }), h("hmmss", function(n, t, i) {
            var r = n.length - 4,
                u = n.length - 2;
            t[a] = e(n.substr(0, r));
            t[d] = e(n.substr(r, 2));
            t[dt] = e(n.substr(u));
            o(i).bigHour = !0
        }), h("Hmm", function(n, t) {
            var i = n.length - 2;
            t[a] = e(n.substr(0, i));
            t[d] = e(n.substr(i))
        }), h("Hmmss", function(n, t) {
            var i = n.length - 4,
                r = n.length - 2;
            t[a] = e(n.substr(0, i));
            t[d] = e(n.substr(i, 2));
            t[dt] = e(n.substr(r))
        }), ah = /[ap]\.?m?\.?/i, vh = di("Hours", !0), u("m", ["mm", 2], 0, "minute"), v("minute", "m"), i("m", l), i("mm", l, w), h(["m", "mm"], d), yh = di("Minutes", !1), u("s", ["ss", 2], 0, "second"), v("second", "s"), i("s", l), i("ss", l, w), h(["s", "ss"], dt), ph = di("Seconds", !1), u("S", 0, 0, function() { return ~~(this.millisecond() / 100) }), u(0, ["SS", 2], 0, function() { return ~~(this.millisecond() / 10) }), u(0, ["SSS", 3], 0, "millisecond"), u(0, ["SSSS", 4], 0, function() { return this.millisecond() * 10 }), u(0, ["SSSSS", 5], 0, function() { return this.millisecond() * 100 }), u(0, ["SSSSSS", 6], 0, function() { return this.millisecond() * 1e3 }), u(0, ["SSSSSSS", 7], 0, function() { return this.millisecond() * 1e4 }), u(0, ["SSSSSSSS", 8], 0, function() { return this.millisecond() * 1e5 }), u(0, ["SSSSSSSSS", 9], 0, function() { return this.millisecond() * 1e6 }), v("millisecond", "ms"), i("S", lu, vo), i("SS", lu, w), i("SSS", lu, yo), ii = "SSSS"; ii.length <= 9; ii += "S") i(ii, /\d+/);
    for (ii = "S"; ii.length <= 9; ii += "S") h(ii, vp);
    wh = di("Milliseconds", !1);
    u("z", 0, 0, "zoneAbbr");
    u("zz", 0, 0, "zoneName");
    t = or.prototype;
    t.add = th;
    t.calendar = uv;
    t.clone = fv;
    t.diff = av;
    t.endOf = ty;
    t.format = wv;
    t.from = bv;
    t.fromNow = kv;
    t.to = dv;
    t.toNow = gv;
    t.get = co;
    t.invalidAt = cy;
    t.isAfter = ev;
    t.isBefore = ov;
    t.isBetween = sv;
    t.isSame = hv;
    t.isSameOrAfter = cv;
    t.isSameOrBefore = lv;
    t.isValid = sy;
    t.lang = ae;
    t.locale = rh;
    t.localeData = uh;
    t.max = ls;
    t.min = cs;
    t.parsingFlags = hy;
    t.set = co;
    t.startOf = ny;
    t.subtract = ih;
    t.toArray = fy;
    t.toObject = ey;
    t.toDate = uy;
    t.toISOString = pv;
    t.toJSON = oy;
    t.toString = yv;
    t.unix = ry;
    t.valueOf = iy;
    t.creationData = ly;
    t.year = fe;
    t.isLeapYear = ua;
    t.weekYear = ay;
    t.isoWeekYear = vy;
    t.quarter = t.quarters = by;
    t.month = ns;
    t.daysInMonth = pl;
    t.week = t.weeks = np;
    t.isoWeek = t.isoWeeks = tp;
    t.weeksInYear = py;
    t.isoWeeksInYear = yy;
    t.date = ve;
    t.day = t.days = op;
    t.weekday = sp;
    t.isoWeekday = hp;
    t.dayOfYear = cp;
    t.hour = t.hours = vh;
    t.minute = t.minutes = yh;
    t.second = t.seconds = ph;
    t.millisecond = t.milliseconds = wh;
    t.utcOffset = ya;
    t.utc = wa;
    t.local = ba;
    t.parseZone = ka;
    t.hasAlignedHourOffset = da;
    t.isDST = ga;
    t.isDSTShifted = nv;
    t.isLocal = tv;
    t.isUtcOffset = iv;
    t.isUtc = ws;
    t.isUTC = ws;
    t.zoneAbbr = yp;
    t.zoneName = pp;
    t.dates = g("dates accessor is deprecated. Use date instead.", ve);
    t.months = g("months accessor is deprecated. Use month instead", ns);
    t.years = g("years accessor is deprecated. Use year instead", fe);
    t.zone = g("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", pa);
    pe = t;
    bh = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
    kh = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    dh = "Invalid date";
    gh = "%d";
    nc = /\d{1,2}/;
    ic = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
    f = uo.prototype;
    f._calendar = bh;
    f.calendar = kp;
    f._longDateFormat = kh;
    f.longDateFormat = dp;
    f._invalidDate = dh;
    f.invalidDate = gp;
    f._ordinal = gh;
    f.ordinal = nw;
    f._ordinalParse = nc;
    f.preparse = tc;
    f.postformat = tc;
    f._relativeTime = ic;
    f.relativeTime = tw;
    f.pastFuture = iw;
    f.set = rw;
    f.months = al;
    f._months = bo;
    f.monthsShort = vl;
    f._monthsShort = ko;
    f.monthsParse = yl;
    f._monthsRegex = is;
    f.monthsRegex = bl;
    f._monthsShortRegex = ts;
    f.monthsShortRegex = wl;
    f.week = ky;
    f._week = eh;
    f.firstDayOfYear = gy;
    f.firstDayOfWeek = dy;
    f.weekdays = rp;
    f._weekdays = oh;
    f.weekdaysMin = fp;
    f._weekdaysMin = hh;
    f.weekdaysShort = up;
    f._weekdaysShort = sh;
    f.weekdaysParse = ep;
    f.isPM = lp;
    f._meridiemParse = ah;
    f.meridiem = ap;
    sr("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(n) {
            var t = n % 10,
                i = e(n % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        }
    });
    r.lang = g("moment.lang is deprecated. Use moment.locale instead.", sr);
    r.langData = g("moment.langData is deprecated. Use moment.localeData instead.", hi);
    ht = Math.abs;
    var pw = ri("ms"),
        ww = ri("s"),
        bw = ri("m"),
        kw = ri("h"),
        dw = ri("d"),
        gw = ri("w"),
        nb = ri("M"),
        tb = ri("y");
    var rb = vi("milliseconds"),
        ub = vi("seconds"),
        fb = vi("minutes"),
        eb = vi("hours"),
        ob = vi("days"),
        sb = vi("months"),
        hb = vi("years");
    yi = Math.round;
    gt = { s: 45, m: 45, h: 22, d: 26, M: 11 };
    nf = Math.abs;
    s = du.prototype;
    s.abs = hw;
    s.add = cw;
    s.subtract = lw;
    s.as = vw;
    s.asMilliseconds = pw;
    s.asSeconds = ww;
    s.asMinutes = bw;
    s.asHours = kw;
    s.asDays = dw;
    s.asWeeks = gw;
    s.asMonths = nb;
    s.asYears = tb;
    s.valueOf = yw;
    s._bubble = aw;
    s.get = ib;
    s.milliseconds = rb;
    s.seconds = ub;
    s.minutes = fb;
    s.hours = eb;
    s.days = ob;
    s.weeks = cb;
    s.months = sb;
    s.years = hb;
    s.humanize = yb;
    s.toISOString = tf;
    s.toString = tf;
    s.toJSON = tf;
    s.locale = rh;
    s.localeData = uh;
    s.toIsoString = g("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", tf);
    s.lang = ae;
    u("X", 0, 0, "unix");
    u("x", 0, 0, "valueOf");
    i("x", vu);
    i("X", /[+-]?\d+(\.\d{1,3})?/);
    h("X", function(n, t, i) { i._d = new Date(parseFloat(n, 10) * 1e3) });
    h("x", function(n, t, i) { i._d = new Date(e(n)) });
    //! moment.js
    //! version : 2.11.2
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    r.version = "2.11.2";
    tl(c);
    r.fn = pe;
    r.min = aa;
    r.max = va;
    r.now = vs;
    r.utc = ki;
    r.unix = wp;
    r.months = uw;
    r.isDate = uu;
    r.locale = sr;
    r.invalid = eu;
    r.duration = ti;
    r.isMoment = ni;
    r.weekdays = ew;
    r.parseZone = bp;
    r.localeData = hi;
    r.isDuration = se;
    r.monthsShort = fw;
    r.weekdaysMin = sw;
    r.defineLocale = oo;
    r.weekdaysShort = ow;
    r.normalizeUnits = b;
    r.relativeTimeThreshold = vb;
    r.prototype = pe;
    n = r;
    //! moment.js locale configuration
    //! locale : afrikaans (af)
    //! author : Werner Mollentze : https://github.com/wernerm
    pb = n.defineLocale("af", { months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"), weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"), weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"), weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"), meridiemParse: /vm|nm/i, isPM: function(n) { return /^nm$/i.test(n) }, meridiem: function(n, t, i) { return n < 12 ? i ? "vm" : "VM" : i ? "nm" : "NM" }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Vandag om] LT", nextDay: "[MÃ´re om] LT", nextWeek: "dddd [om] LT", lastDay: "[Gister om] LT", lastWeek: "[Laas] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oor %s", past: "%s gelede", s: "'n paar sekondes", m: "'n minuut", mm: "%d minute", h: "'n uur", hh: "%d ure", d: "'n dag", dd: "%d dae", M: "'n maand", MM: "%d maande", y: "'n jaar", yy: "%d jaar" }, ordinalParse: /\d{1,2}(ste|de)/, ordinal: function(n) { return n + (n === 1 || n === 8 || n >= 20 ? "ste" : "de") }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Moroccan Arabic (ar-ma)
    //! author : ElFadili Yassine : https://github.com/ElFadiliY
    //! author : Abdel Said : https://github.com/abdelsaid
    wb = n.defineLocale("ar-ma", { months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"), monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆØ²_ØºØ´Øª_Ø´ØªÙ†Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙ†Ø¨Ø±_Ø¯Ø¬Ù†Ø¨Ø±".split("_"), weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥ØªÙ†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"), weekdaysShort: "Ø§Ø­Ø¯_Ø§ØªÙ†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"), weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", sameElse: "L" }, relativeTime: { future: "ÙÙŠ %s", past: "Ù…Ù†Ø° %s", s: "Ø«ÙˆØ§Ù†", m: "Ø¯Ù‚ÙŠÙ‚Ø©", mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚", h: "Ø³Ø§Ø¹Ø©", hh: "%d Ø³Ø§Ø¹Ø§Øª", d: "ÙŠÙˆÙ…", dd: "%d Ø£ÙŠØ§Ù…", M: "Ø´Ù‡Ø±", MM: "%d Ø£Ø´Ù‡Ø±", y: "Ø³Ù†Ø©", yy: "%d Ø³Ù†ÙˆØ§Øª" }, week: { dow: 0, doy: 12 } });
    //! moment.js locale configuration
    //! locale : Arabic Saudi Arabia (ar-sa)
    //! author : Suhail Alkowaileet : https://github.com/xsoh
    var bb = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "0": "0" },
        kb = { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "0": "0" },
        ait = n.defineLocale("ar-sa", { months: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"), monthsShort: "ÙŠÙ†Ø§ÙŠØ±_ÙØ¨Ø±Ø§ÙŠØ±_Ù…Ø§Ø±Ø³_Ø£Ø¨Ø±ÙŠÙ„_Ù…Ø§ÙŠÙˆ_ÙŠÙˆÙ†ÙŠÙˆ_ÙŠÙˆÙ„ÙŠÙˆ_Ø£ØºØ³Ø·Ø³_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"), weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"), weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"), weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /Øµ|Ù…/, isPM: function(n) { return "Ù…" === n }, meridiem: function(n) { return n < 12 ? "Øµ" : "Ù…" }, calendar: { sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", sameElse: "L" }, relativeTime: { future: "ÙÙŠ %s", past: "Ù…Ù†Ø° %s", s: "Ø«ÙˆØ§Ù†", m: "Ø¯Ù‚ÙŠÙ‚Ø©", mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚", h: "Ø³Ø§Ø¹Ø©", hh: "%d Ø³Ø§Ø¹Ø§Øª", d: "ÙŠÙˆÙ…", dd: "%d Ø£ÙŠØ§Ù…", M: "Ø´Ù‡Ø±", MM: "%d Ø£Ø´Ù‡Ø±", y: "Ø³Ù†Ø©", yy: "%d Ø³Ù†ÙˆØ§Øª" }, preparse: function(n) { return n.replace(/[Ù¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©Ù ]/g, function(n) { return kb[n] }).replace(/ØŒ/g, ",") }, postformat: function(n) { return n.replace(/\d/g, function(n) { return bb[n] }).replace(/,/g, "ØŒ") }, week: { dow: 0, doy: 12 } });
    //! moment.js locale configuration
    //! locale  : Tunisian Arabic (ar-tn)
    db = n.defineLocale("ar-tn", { months: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"), monthsShort: "Ø¬Ø§Ù†ÙÙŠ_ÙÙŠÙØ±ÙŠ_Ù…Ø§Ø±Ø³_Ø£ÙØ±ÙŠÙ„_Ù…Ø§ÙŠ_Ø¬ÙˆØ§Ù†_Ø¬ÙˆÙŠÙ„ÙŠØ©_Ø£ÙˆØª_Ø³Ø¨ØªÙ…Ø¨Ø±_Ø£ÙƒØªÙˆØ¨Ø±_Ù†ÙˆÙÙ…Ø¨Ø±_Ø¯ÙŠØ³Ù…Ø¨Ø±".split("_"), weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"), weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"), weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextDay: "[ØºØ¯Ø§ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastDay: "[Ø£Ù…Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastWeek: "dddd [Ø¹Ù„Ù‰ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", sameElse: "L" }, relativeTime: { future: "ÙÙŠ %s", past: "Ù…Ù†Ø° %s", s: "Ø«ÙˆØ§Ù†", m: "Ø¯Ù‚ÙŠÙ‚Ø©", mm: "%d Ø¯Ù‚Ø§Ø¦Ù‚", h: "Ø³Ø§Ø¹Ø©", hh: "%d Ø³Ø§Ø¹Ø§Øª", d: "ÙŠÙˆÙ…", dd: "%d Ø£ÙŠØ§Ù…", M: "Ø´Ù‡Ø±", MM: "%d Ø£Ø´Ù‡Ø±", y: "Ø³Ù†Ø©", yy: "%d Ø³Ù†ÙˆØ§Øª" }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! Locale: Arabic (ar)
    //! Author: Abdel Said: https://github.com/abdelsaid
    //! Changes in months, weekdays: Ahmed Elkhatib
    //! Native plural forms: forabi https://github.com/forabi
    var gb = { "1": "Ù¡", "2": "Ù¢", "3": "Ù£", "4": "Ù¤", "5": "Ù¥", "6": "Ù¦", "7": "Ù§", "8": "Ù¨", "9": "Ù©", "0": "Ù " },
        nk = { "Ù¡": "1", "Ù¢": "2", "Ù£": "3", "Ù¤": "4", "Ù¥": "5", "Ù¦": "6", "Ù§": "7", "Ù¨": "8", "Ù©": "9", "Ù ": "0" },
        oc = function(n) { return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5 },
        tk = { s: ["Ø£Ù‚Ù„ Ù…Ù† Ø«Ø§Ù†ÙŠØ©", "Ø«Ø§Ù†ÙŠØ© ÙˆØ§Ø­Ø¯Ø©", ["Ø«Ø§Ù†ÙŠØªØ§Ù†", "Ø«Ø§Ù†ÙŠØªÙŠÙ†"], "%d Ø«ÙˆØ§Ù†", "%d Ø«Ø§Ù†ÙŠØ©", "%d Ø«Ø§Ù†ÙŠØ©"], m: ["Ø£Ù‚Ù„ Ù…Ù† Ø¯Ù‚ÙŠÙ‚Ø©", "Ø¯Ù‚ÙŠÙ‚Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø¯Ù‚ÙŠÙ‚ØªØ§Ù†", "Ø¯Ù‚ÙŠÙ‚ØªÙŠÙ†"], "%d Ø¯Ù‚Ø§Ø¦Ù‚", "%d Ø¯Ù‚ÙŠÙ‚Ø©", "%d Ø¯Ù‚ÙŠÙ‚Ø©"], h: ["Ø£Ù‚Ù„ Ù…Ù† Ø³Ø§Ø¹Ø©", "Ø³Ø§Ø¹Ø© ÙˆØ§Ø­Ø¯Ø©", ["Ø³Ø§Ø¹ØªØ§Ù†", "Ø³Ø§Ø¹ØªÙŠÙ†"], "%d Ø³Ø§Ø¹Ø§Øª", "%d Ø³Ø§Ø¹Ø©", "%d Ø³Ø§Ø¹Ø©"], d: ["Ø£Ù‚Ù„ Ù…Ù† ÙŠÙˆÙ…", "ÙŠÙˆÙ… ÙˆØ§Ø­Ø¯", ["ÙŠÙˆÙ…Ø§Ù†", "ÙŠÙˆÙ…ÙŠÙ†"], "%d Ø£ÙŠØ§Ù…", "%d ÙŠÙˆÙ…Ù‹Ø§", "%d ÙŠÙˆÙ…"], M: ["Ø£Ù‚Ù„ Ù…Ù† Ø´Ù‡Ø±", "Ø´Ù‡Ø± ÙˆØ§Ø­Ø¯", ["Ø´Ù‡Ø±Ø§Ù†", "Ø´Ù‡Ø±ÙŠÙ†"], "%d Ø£Ø´Ù‡Ø±", "%d Ø´Ù‡Ø±Ø§", "%d Ø´Ù‡Ø±"], y: ["Ø£Ù‚Ù„ Ù…Ù† Ø¹Ø§Ù…", "Ø¹Ø§Ù… ÙˆØ§Ø­Ø¯", ["Ø¹Ø§Ù…Ø§Ù†", "Ø¹Ø§Ù…ÙŠÙ†"], "%d Ø£Ø¹ÙˆØ§Ù…", "%d Ø¹Ø§Ù…Ù‹Ø§", "%d Ø¹Ø§Ù…"] },
        nt = function(n) {
            return function(t, i) {
                var u = oc(t),
                    r = tk[n][oc(t)];
                return u === 2 && (r = r[i ? 0 : 1]), r.replace(/%d/i, t)
            }
        },
        sc = ["ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ ÙŠÙ†Ø§ÙŠØ±", "Ø´Ø¨Ø§Ø· ÙØ¨Ø±Ø§ÙŠØ±", "Ø¢Ø°Ø§Ø± Ù…Ø§Ø±Ø³", "Ù†ÙŠØ³Ø§Ù† Ø£Ø¨Ø±ÙŠÙ„", "Ø£ÙŠØ§Ø± Ù…Ø§ÙŠÙˆ", "Ø­Ø²ÙŠØ±Ø§Ù† ÙŠÙˆÙ†ÙŠÙˆ", "ØªÙ…ÙˆØ² ÙŠÙˆÙ„ÙŠÙˆ", "Ø¢Ø¨ Ø£ØºØ³Ø·Ø³", "Ø£ÙŠÙ„ÙˆÙ„ Ø³Ø¨ØªÙ…Ø¨Ø±", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø£ÙˆÙ„ Ø£ÙƒØªÙˆØ¨Ø±", "ØªØ´Ø±ÙŠÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ Ù†ÙˆÙÙ…Ø¨Ø±", "ÙƒØ§Ù†ÙˆÙ† Ø§Ù„Ø£ÙˆÙ„ Ø¯ÙŠØ³Ù…Ø¨Ø±"],
        vit = n.defineLocale("ar", { months: sc, monthsShort: sc, weekdays: "Ø§Ù„Ø£Ø­Ø¯_Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†_Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡_Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø§Ù„Ø®Ù…ÙŠØ³_Ø§Ù„Ø¬Ù…Ø¹Ø©_Ø§Ù„Ø³Ø¨Øª".split("_"), weekdaysShort: "Ø£Ø­Ø¯_Ø¥Ø«Ù†ÙŠÙ†_Ø«Ù„Ø§Ø«Ø§Ø¡_Ø£Ø±Ø¨Ø¹Ø§Ø¡_Ø®Ù…ÙŠØ³_Ø¬Ù…Ø¹Ø©_Ø³Ø¨Øª".split("_"), weekdaysMin: "Ø­_Ù†_Ø«_Ø±_Ø®_Ø¬_Ø³".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/â€M/â€YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /Øµ|Ù…/, isPM: function(n) { return "Ù…" === n }, meridiem: function(n) { return n < 12 ? "Øµ" : "Ù…" }, calendar: { sameDay: "[Ø§Ù„ÙŠÙˆÙ… Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextDay: "[ØºØ¯Ù‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", nextWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastDay: "[Ø£Ù…Ø³ Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", lastWeek: "dddd [Ø¹Ù†Ø¯ Ø§Ù„Ø³Ø§Ø¹Ø©] LT", sameElse: "L" }, relativeTime: { future: "Ø¨Ø¹Ø¯ %s", past: "Ù…Ù†Ø° %s", s: nt("s"), m: nt("m"), mm: nt("m"), h: nt("h"), hh: nt("h"), d: nt("d"), dd: nt("d"), M: nt("M"), MM: nt("M"), y: nt("y"), yy: nt("y") }, preparse: function(n) { return n.replace(/\u200f/g, "").replace(/[Ù¡Ù¢Ù£Ù¤Ù¥Ù¦Ù§Ù¨Ù©Ù ]/g, function(n) { return nk[n] }).replace(/ØŒ/g, ",") }, postformat: function(n) { return n.replace(/\d/g, function(n) { return gb[n] }).replace(/,/g, "ØŒ") }, week: { dow: 0, doy: 12 } });
    //! moment.js locale configuration
    //! locale : azerbaijani (az)
    //! author : topchiyev : https://github.com/topchiyev
    rf = { 1: "-inci", 5: "-inci", 8: "-inci", 70: "-inci", 80: "-inci", 2: "-nci", 7: "-nci", 20: "-nci", 50: "-nci", 3: "-Ã¼ncÃ¼", 4: "-Ã¼ncÃ¼", 100: "-Ã¼ncÃ¼", 6: "-ncÄ±", 9: "-uncu", 10: "-uncu", 30: "-uncu", 60: "-Ä±ncÄ±", 90: "-Ä±ncÄ±" };
    ik = n.defineLocale("az", {
        months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekdays: "Bazar_Bazar ertÉ™si_Ã‡É™rÅŸÉ™nbÉ™ axÅŸamÄ±_Ã‡É™rÅŸÉ™nbÉ™_CÃ¼mÉ™ axÅŸamÄ±_CÃ¼mÉ™_ÅžÉ™nbÉ™".split("_"),
        weekdaysShort: "Baz_BzE_Ã‡Ax_Ã‡É™r_CAx_CÃ¼m_ÅžÉ™n".split("_"),
        weekdaysMin: "Bz_BE_Ã‡A_Ã‡É™_CA_CÃ¼_ÅžÉ™".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[bugÃ¼n saat] LT", nextDay: "[sabah saat] LT", nextWeek: "[gÉ™lÉ™n hÉ™ftÉ™] dddd [saat] LT", lastDay: "[dÃ¼nÉ™n] LT", lastWeek: "[keÃ§É™n hÉ™ftÉ™] dddd [saat] LT", sameElse: "L" },
        relativeTime: { future: "%s sonra", past: "%s É™vvÉ™l", s: "birneÃ§É™ saniyyÉ™", m: "bir dÉ™qiqÉ™", mm: "%d dÉ™qiqÉ™", h: "bir saat", hh: "%d saat", d: "bir gÃ¼n", dd: "%d gÃ¼n", M: "bir ay", MM: "%d ay", y: "bir il", yy: "%d il" },
        meridiemParse: /gecÉ™|sÉ™hÉ™r|gÃ¼ndÃ¼z|axÅŸam/,
        isPM: function(n) { return /^(gÃ¼ndÃ¼z|axÅŸam)$/.test(n) },
        meridiem: function(n) { return n < 4 ? "gecÉ™" : n < 12 ? "sÉ™hÉ™r" : n < 17 ? "gÃ¼ndÃ¼z" : "axÅŸam" },
        ordinalParse: /\d{1,2}-(Ä±ncÄ±|inci|nci|Ã¼ncÃ¼|ncÄ±|uncu)/,
        ordinal: function(n) {
            if (n === 0) return n + "-Ä±ncÄ±";
            var t = n % 10,
                i = n % 100 - t,
                r = n >= 100 ? 100 : null;
            return n + (rf[t] || rf[i] || rf[r])
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : belarusian (be)
    //! author : Dmitry Demidov : https://github.com/demidov91
    //! author: Praleska: http://praleska.pro/
    //! Author : Menelion ElensÃºle : https://github.com/Oire
    uk = n.defineLocale("be", {
        months: { format: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½Ñ_Ð»ÑŽÑ‚Ð°Ð³Ð°_ÑÐ°ÐºÐ°Ð²Ñ–ÐºÐ°_ÐºÑ€Ð°ÑÐ°Ð²Ñ–ÐºÐ°_Ñ‚Ñ€Ð°ÑžÐ½Ñ_Ñ‡ÑÑ€Ð²ÐµÐ½Ñ_Ð»Ñ–Ð¿ÐµÐ½Ñ_Ð¶Ð½Ñ–ÑžÐ½Ñ_Ð²ÐµÑ€Ð°ÑÐ½Ñ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–ÐºÐ°_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´Ð°_ÑÐ½ÐµÐ¶Ð½Ñ".split("_"), standalone: "ÑÑ‚ÑƒÐ´Ð·ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ñ‹_ÑÐ°ÐºÐ°Ð²Ñ–Ðº_ÐºÑ€Ð°ÑÐ°Ð²Ñ–Ðº_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÑÑ€Ð²ÐµÐ½ÑŒ_Ð»Ñ–Ð¿ÐµÐ½ÑŒ_Ð¶Ð½Ñ–Ð²ÐµÐ½ÑŒ_Ð²ÐµÑ€Ð°ÑÐµÐ½ÑŒ_ÐºÐ°ÑÑ‚Ñ€Ñ‹Ñ‡Ð½Ñ–Ðº_Ð»Ñ–ÑÑ‚Ð°Ð¿Ð°Ð´_ÑÐ½ÐµÐ¶Ð°Ð½ÑŒ".split("_") },
        monthsShort: "ÑÑ‚ÑƒÐ´_Ð»ÑŽÑ‚_ÑÐ°Ðº_ÐºÑ€Ð°Ñ_Ñ‚Ñ€Ð°Ð²_Ñ‡ÑÑ€Ð²_Ð»Ñ–Ð¿_Ð¶Ð½Ñ–Ð²_Ð²ÐµÑ€_ÐºÐ°ÑÑ‚_Ð»Ñ–ÑÑ‚_ÑÐ½ÐµÐ¶".split("_"),
        weekdays: { format: "Ð½ÑÐ´Ð·ÐµÐ»ÑŽ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ñƒ_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ñƒ_ÑÑƒÐ±Ð¾Ñ‚Ñƒ".split("_"), standalone: "Ð½ÑÐ´Ð·ÐµÐ»Ñ_Ð¿Ð°Ð½ÑÐ´Ð·ÐµÐ»Ð°Ðº_Ð°ÑžÑ‚Ð¾Ñ€Ð°Ðº_ÑÐµÑ€Ð°Ð´Ð°_Ñ‡Ð°Ñ†Ð²ÐµÑ€_Ð¿ÑÑ‚Ð½Ñ–Ñ†Ð°_ÑÑƒÐ±Ð¾Ñ‚Ð°".split("_"), isFormat: /\[ ?[Ð’Ð²] ?(?:Ð¼Ñ–Ð½ÑƒÐ»ÑƒÑŽ|Ð½Ð°ÑÑ‚ÑƒÐ¿Ð½ÑƒÑŽ)? ?\] ?dddd/ },
        weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð°Ñ‚_ÑÑ€_Ñ‡Ñ†_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY Ð³.", LLL: "D MMMM YYYY Ð³., HH:mm", LLLL: "dddd, D MMMM YYYY Ð³., HH:mm" },
        calendar: {
            sameDay: "[Ð¡Ñ‘Ð½Ð½Ñ Ñž] LT",
            nextDay: "[Ð—Ð°ÑžÑ‚Ñ€Ð° Ñž] LT",
            lastDay: "[Ð£Ñ‡Ð¾Ñ€Ð° Ñž] LT",
            nextWeek: function() { return "[Ð£] dddd [Ñž] LT" },
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»ÑƒÑŽ] dddd [Ñž] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð£ Ð¼Ñ–Ð½ÑƒÐ»Ñ‹] dddd [Ñž] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "Ð¿Ñ€Ð°Ð· %s", past: "%s Ñ‚Ð°Ð¼Ñƒ", s: "Ð½ÐµÐºÐ°Ð»ÑŒÐºÑ– ÑÐµÐºÑƒÐ½Ð´", m: pi, mm: pi, h: pi, hh: pi, d: "Ð´Ð·ÐµÐ½ÑŒ", dd: pi, M: "Ð¼ÐµÑÑÑ†", MM: pi, y: "Ð³Ð¾Ð´", yy: pi },
        meridiemParse: /Ð½Ð¾Ñ‡Ñ‹|Ñ€Ð°Ð½Ñ–Ñ†Ñ‹|Ð´Ð½Ñ|Ð²ÐµÑ‡Ð°Ñ€Ð°/,
        isPM: function(n) { return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡Ð°Ñ€Ð°)$/.test(n) },
        meridiem: function(n) { return n < 4 ? "Ð½Ð¾Ñ‡Ñ‹" : n < 12 ? "Ñ€Ð°Ð½Ñ–Ñ†Ñ‹" : n < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð°Ñ€Ð°" },
        ordinalParse: /\d{1,2}-(Ñ–|Ñ‹|Ð³Ð°)/,
        ordinal: function(n, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return (n % 10 == 2 || n % 10 == 3) && n % 100 != 12 && n % 100 != 13 ? n + "-Ñ–" : n + "-Ñ‹";
                case "D":
                    return n + "-Ð³Ð°";
                default:
                    return n
            }
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : bulgarian (bg)
    //! author : Krasen Borisov : https://github.com/kraz
    fk = n.defineLocale("bg", {
        months: "ÑÐ½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
        monthsShort: "ÑÐ½Ñ€_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_ÑŽÐ½Ð¸_ÑŽÐ»Ð¸_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð½ÐµÐ´ÐµÐ»Ñ_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÑÐ´Ð°_Ñ‡ÐµÑ‚Ð²ÑŠÑ€Ñ‚ÑŠÐº_Ð¿ÐµÑ‚ÑŠÐº_ÑÑŠÐ±Ð¾Ñ‚Ð°".split("_"),
        weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ñ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÑŠÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[Ð”Ð½ÐµÑ Ð²] LT",
            nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²] LT",
            nextWeek: "dddd [Ð²] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð°Ñ‚Ð°] dddd [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ð’ Ð¸Ð·Ð¼Ð¸Ð½Ð°Ð»Ð¸Ñ] dddd [Ð²] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "ÑÐ»ÐµÐ´ %s", past: "Ð¿Ñ€ÐµÐ´Ð¸ %s", s: "Ð½ÑÐºÐ¾Ð»ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸", m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°", mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸", h: "Ñ‡Ð°Ñ", hh: "%d Ñ‡Ð°ÑÐ°", d: "Ð´ÐµÐ½", dd: "%d Ð´Ð½Ð¸", M: "Ð¼ÐµÑÐµÑ†", MM: "%d Ð¼ÐµÑÐµÑ†Ð°", y: "Ð³Ð¾Ð´Ð¸Ð½Ð°", yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸" },
        ordinalParse: /\d{1,2}-(ÐµÐ²|ÐµÐ½|Ñ‚Ð¸|Ð²Ð¸|Ñ€Ð¸|Ð¼Ð¸)/,
        ordinal: function(n) {
            var t = n % 10,
                i = n % 100;
            return n === 0 ? n + "-ÐµÐ²" : i === 0 ? n + "-ÐµÐ½" : i > 10 && i < 20 ? n + "-Ñ‚Ð¸" : t === 1 ? n + "-Ð²Ð¸" : t === 2 ? n + "-Ñ€Ð¸" : t === 7 || t === 8 ? n + "-Ð¼Ð¸" : n + "-Ñ‚Ð¸"
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : Bengali (bn)
    //! author : Kaushik Gandhi : https://github.com/kaushikgandhi
    var ek = { "1": "à§§", "2": "à§¨", "3": "à§©", "4": "à§ª", "5": "à§«", "6": "à§¬", "7": "à§­", "8": "à§®", "9": "à§¯", "0": "à§¦" },
        ok = { "à§§": "1", "à§¨": "2", "à§©": "3", "à§ª": "4", "à§«": "5", "à§¬": "6", "à§­": "7", "à§®": "8", "à§¯": "9", "à§¦": "0" },
        yit = n.defineLocale("bn", { months: "à¦œà¦¾à¦¨à§à§Ÿà¦¾à¦°à§€_à¦«à§‡à¦¬à§à§Ÿà¦¾à¦°à§€_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà§à¦°à¦¿à¦²_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²à¦¾à¦‡_à¦…à¦—à¦¾à¦¸à§à¦Ÿ_à¦¸à§‡à¦ªà§à¦Ÿà§‡à¦®à§à¦¬à¦°_à¦…à¦•à§à¦Ÿà§‹à¦¬à¦°_à¦¨à¦­à§‡à¦®à§à¦¬à¦°_à¦¡à¦¿à¦¸à§‡à¦®à§à¦¬à¦°".split("_"), monthsShort: "à¦œà¦¾à¦¨à§_à¦«à§‡à¦¬_à¦®à¦¾à¦°à§à¦š_à¦à¦ªà¦°_à¦®à§‡_à¦œà§à¦¨_à¦œà§à¦²_à¦…à¦—_à¦¸à§‡à¦ªà§à¦Ÿ_à¦…à¦•à§à¦Ÿà§‹_à¦¨à¦­_à¦¡à¦¿à¦¸à§‡à¦®à§".split("_"), weekdays: "à¦°à¦¬à¦¿à¦¬à¦¾à¦°_à¦¸à§‹à¦®à¦¬à¦¾à¦°_à¦®à¦™à§à¦—à¦²à¦¬à¦¾à¦°_à¦¬à§à¦§à¦¬à¦¾à¦°_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à§à¦¤à¦¿à¦¬à¦¾à¦°_à¦¶à§à¦•à§à¦°à¦¬à¦¾à¦°_à¦¶à¦¨à¦¿à¦¬à¦¾à¦°".split("_"), weekdaysShort: "à¦°à¦¬à¦¿_à¦¸à§‹à¦®_à¦®à¦™à§à¦—à¦²_à¦¬à§à¦§_à¦¬à§ƒà¦¹à¦¸à§à¦ªà¦¤à§à¦¤à¦¿_à¦¶à§à¦•à§à¦°_à¦¶à¦¨à¦¿".split("_"), weekdaysMin: "à¦°à¦¬_à¦¸à¦®_à¦®à¦™à§à¦—_à¦¬à§_à¦¬à§à¦°à¦¿à¦¹_à¦¶à§_à¦¶à¦¨à¦¿".split("_"), longDateFormat: { LT: "A h:mm à¦¸à¦®à§Ÿ", LTS: "A h:mm:ss à¦¸à¦®à§Ÿ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ", LLLL: "dddd, D MMMM YYYY, A h:mm à¦¸à¦®à§Ÿ" }, calendar: { sameDay: "[à¦†à¦œ] LT", nextDay: "[à¦†à¦—à¦¾à¦®à§€à¦•à¦¾à¦²] LT", nextWeek: "dddd, LT", lastDay: "[à¦—à¦¤à¦•à¦¾à¦²] LT", lastWeek: "[à¦—à¦¤] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à¦ªà¦°à§‡", past: "%s à¦†à¦—à§‡", s: "à¦•à§Ÿà§‡à¦• à¦¸à§‡à¦•à§‡à¦¨à§à¦¡", m: "à¦à¦• à¦®à¦¿à¦¨à¦¿à¦Ÿ", mm: "%d à¦®à¦¿à¦¨à¦¿à¦Ÿ", h: "à¦à¦• à¦˜à¦¨à§à¦Ÿà¦¾", hh: "%d à¦˜à¦¨à§à¦Ÿà¦¾", d: "à¦à¦• à¦¦à¦¿à¦¨", dd: "%d à¦¦à¦¿à¦¨", M: "à¦à¦• à¦®à¦¾à¦¸", MM: "%d à¦®à¦¾à¦¸", y: "à¦à¦• à¦¬à¦›à¦°", yy: "%d à¦¬à¦›à¦°" }, preparse: function(n) { return n.replace(/[à§§à§¨à§©à§ªà§«à§¬à§­à§®à§¯à§¦]/g, function(n) { return ok[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return ek[n] }) }, meridiemParse: /à¦°à¦¾à¦¤|à¦¸à¦•à¦¾à¦²|à¦¦à§à¦ªà§à¦°|à¦¬à¦¿à¦•à¦¾à¦²|à¦°à¦¾à¦¤/, isPM: function(n) { return /^(à¦¦à§à¦ªà§à¦°|à¦¬à¦¿à¦•à¦¾à¦²|à¦°à¦¾à¦¤)$/.test(n) }, meridiem: function(n) { return n < 4 ? "à¦°à¦¾à¦¤" : n < 10 ? "à¦¸à¦•à¦¾à¦²" : n < 17 ? "à¦¦à§à¦ªà§à¦°" : n < 20 ? "à¦¬à¦¿à¦•à¦¾à¦²" : "à¦°à¦¾à¦¤" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : tibetan (bo)
    //! author : Thupten N. Chakrishar : https://github.com/vajradog
    var sk = { "1": "à¼¡", "2": "à¼¢", "3": "à¼£", "4": "à¼¤", "5": "à¼¥", "6": "à¼¦", "7": "à¼§", "8": "à¼¨", "9": "à¼©", "0": "à¼ " },
        hk = { "à¼¡": "1", "à¼¢": "2", "à¼£": "3", "à¼¤": "4", "à¼¥": "5", "à¼¦": "6", "à¼§": "7", "à¼¨": "8", "à¼©": "9", "à¼ ": "0" },
        pit = n.defineLocale("bo", { months: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"), monthsShort: "à½Ÿà¾³à¼‹à½–à¼‹à½‘à½„à¼‹à½”à½¼_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½‰à½²à½¦à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‚à½¦à½´à½˜à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½žà½²à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½£à¾”à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à¾²à½´à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½‘à½´à½“à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½¢à¾’à¾±à½‘à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½‘à½‚à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½…à½²à½‚à¼‹à½”_à½Ÿà¾³à¼‹à½–à¼‹à½–à½…à½´à¼‹à½‚à½‰à½²à½¦à¼‹à½”".split("_"), weekdays: "à½‚à½Ÿà½ à¼‹à½‰à½²à¼‹à½˜à¼‹_à½‚à½Ÿà½ à¼‹à½Ÿà¾³à¼‹à½–à¼‹_à½‚à½Ÿà½ à¼‹à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½‚à½Ÿà½ à¼‹à½£à¾·à½‚à¼‹à½”à¼‹_à½‚à½Ÿà½ à¼‹à½•à½´à½¢à¼‹à½–à½´_à½‚à½Ÿà½ à¼‹à½”à¼‹à½¦à½„à½¦à¼‹_à½‚à½Ÿà½ à¼‹à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"), weekdaysShort: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"), weekdaysMin: "à½‰à½²à¼‹à½˜à¼‹_à½Ÿà¾³à¼‹à½–à¼‹_à½˜à½²à½‚à¼‹à½‘à½˜à½¢à¼‹_à½£à¾·à½‚à¼‹à½”à¼‹_à½•à½´à½¢à¼‹à½–à½´_à½”à¼‹à½¦à½„à½¦à¼‹_à½¦à¾¤à½ºà½“à¼‹à½”à¼‹".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[à½‘à½²à¼‹à½¢à½²à½„] LT", nextDay: "[à½¦à½„à¼‹à½‰à½²à½“] LT", nextWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½¢à¾—à½ºà½¦à¼‹à½˜], LT", lastDay: "[à½à¼‹à½¦à½„] LT", lastWeek: "[à½–à½‘à½´à½“à¼‹à½•à¾²à½‚à¼‹à½˜à½à½ à¼‹à½˜] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à½£à¼‹", past: "%s à½¦à¾”à½“à¼‹à½£", s: "à½£à½˜à¼‹à½¦à½„", m: "à½¦à¾à½¢à¼‹à½˜à¼‹à½‚à½…à½²à½‚", mm: "%d à½¦à¾à½¢à¼‹à½˜", h: "à½†à½´à¼‹à½šà½¼à½‘à¼‹à½‚à½…à½²à½‚", hh: "%d à½†à½´à¼‹à½šà½¼à½‘", d: "à½‰à½²à½“à¼‹à½‚à½…à½²à½‚", dd: "%d à½‰à½²à½“à¼‹", M: "à½Ÿà¾³à¼‹à½–à¼‹à½‚à½…à½²à½‚", MM: "%d à½Ÿà¾³à¼‹à½–", y: "à½£à½¼à¼‹à½‚à½…à½²à½‚", yy: "%d à½£à½¼" }, preparse: function(n) { return n.replace(/[à¼¡à¼¢à¼£à¼¤à¼¥à¼¦à¼§à¼¨à¼©à¼ ]/g, function(n) { return hk[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return sk[n] }) }, meridiemParse: /à½˜à½šà½“à¼‹à½˜à½¼|à½žà½¼à½‚à½¦à¼‹à½€à½¦|à½‰à½²à½“à¼‹à½‚à½´à½„|à½‘à½‚à½¼à½„à¼‹à½‘à½‚|à½˜à½šà½“à¼‹à½˜à½¼/, isPM: function(n) { return /^(à½‰à½²à½“à¼‹à½‚à½´à½„|à½‘à½‚à½¼à½„à¼‹à½‘à½‚|à½˜à½šà½“à¼‹à½˜à½¼)$/.test(n) }, meridiem: function(n) { return n < 4 ? "à½˜à½šà½“à¼‹à½˜à½¼" : n < 10 ? "à½žà½¼à½‚à½¦à¼‹à½€à½¦" : n < 17 ? "à½‰à½²à½“à¼‹à½‚à½´à½„" : n < 20 ? "à½‘à½‚à½¼à½„à¼‹à½‘à½‚" : "à½˜à½šà½“à¼‹à½˜à½¼" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : breton (br)
    //! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou
    vk = n.defineLocale("br", { months: "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"), monthsShort: "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"), weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"), weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"), weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"), longDateFormat: { LT: "h[e]mm A", LTS: "h[e]mm:ss A", L: "DD/MM/YYYY", LL: "D [a viz] MMMM YYYY", LLL: "D [a viz] MMMM YYYY h[e]mm A", LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A" }, calendar: { sameDay: "[Hiziv da] LT", nextDay: "[Warc'hoazh da] LT", nextWeek: "dddd [da] LT", lastDay: "[Dec'h da] LT", lastWeek: "dddd [paset da] LT", sameElse: "L" }, relativeTime: { future: "a-benn %s", past: "%s 'zo", s: "un nebeud segondennoÃ¹", m: "ur vunutenn", mm: be, h: "un eur", hh: "%d eur", d: "un devezh", dd: be, M: "ur miz", MM: be, y: "ur bloaz", yy: ck }, ordinalParse: /\d{1,2}(aÃ±|vet)/, ordinal: function(n) { var t = n === 1 ? "aÃ±" : "vet"; return n + t }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : bosnian (bs)
    //! author : Nedim Cholich : https://github.com/frontyard
    //! based on (hr) translation by Bojan MarkoviÄ‡
    yk = n.defineLocale("bs", {
        months: "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split("_"),
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[proÅ¡lu] dddd [u] LT";
                    case 6:
                        return "[proÅ¡le] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[proÅ¡li] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", m: wi, mm: wi, h: wi, hh: wi, d: "dan", dd: wi, M: "mjesec", MM: wi, y: "godinu", yy: wi },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : catalan (ca)
    //! author : Juan G. Hurtado : https://github.com/juanghurtado
    pk = n.defineLocale("ca", { months: "gener_febrer_marÃ§_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split("_"), monthsShort: "gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.".split("_"), weekdays: "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split("_"), weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"), weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd D MMMM YYYY H:mm" }, calendar: { sameDay: function() { return "[avui a " + (this.hours() !== 1 ? "les" : "la") + "] LT" }, nextDay: function() { return "[demÃ  a " + (this.hours() !== 1 ? "les" : "la") + "] LT" }, nextWeek: function() { return "dddd [a " + (this.hours() !== 1 ? "les" : "la") + "] LT" }, lastDay: function() { return "[ahir a " + (this.hours() !== 1 ? "les" : "la") + "] LT" }, lastWeek: function() { return "[el] dddd [passat a " + (this.hours() !== 1 ? "les" : "la") + "] LT" }, sameElse: "L" }, relativeTime: { future: "en %s", past: "fa %s", s: "uns segons", m: "un minut", mm: "%d minuts", h: "una hora", hh: "%d hores", d: "un dia", dd: "%d dies", M: "un mes", MM: "%d mesos", y: "un any", yy: "%d anys" }, ordinalParse: /\d{1,2}(r|n|t|Ã¨|a)/, ordinal: function(n, t) { var i = n === 1 ? "r" : n === 2 ? "n" : n === 3 ? "r" : n === 4 ? "t" : "Ã¨"; return (t === "w" || t === "W") && (i = "a"), n + i }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : czech (cs)
    //! author : petrbela : https://github.com/petrbela
    uf = "leden_Ãºnor_bÅ™ezen_duben_kvÄ›ten_Äerven_Äervenec_srpen_zÃ¡Å™Ã­_Å™Ã­jen_listopad_prosinec".split("_");
    ff = "led_Ãºno_bÅ™e_dub_kvÄ›_Ävn_Ävc_srp_zÃ¡Å™_Å™Ã­j_lis_pro".split("_");
    wk = n.defineLocale("cs", {
        months: uf,
        monthsShort: ff,
        monthsParse: function(n, t) { for (var r = [], i = 0; i < 12; i++) r[i] = new RegExp("^" + n[i] + "$|^" + t[i] + "$", "i"); return r }(uf, ff),
        shortMonthsParse: function(n) { for (var i = [], t = 0; t < 12; t++) i[t] = new RegExp("^" + n[t] + "$", "i"); return i }(ff),
        longMonthsParse: function(n) { for (var i = [], t = 0; t < 12; t++) i[t] = new RegExp("^" + n[t] + "$", "i"); return i }(uf),
        weekdays: "nedÄ›le_pondÄ›lÃ­_ÃºterÃ½_stÅ™eda_Ätvrtek_pÃ¡tek_sobota".split("_"),
        weekdaysShort: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
        weekdaysMin: "ne_po_Ãºt_st_Ät_pÃ¡_so".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[dnes v] LT",
            nextDay: "[zÃ­tra v] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v nedÄ›li v] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [v] LT";
                    case 3:
                        return "[ve stÅ™edu v] LT";
                    case 4:
                        return "[ve Ätvrtek v] LT";
                    case 5:
                        return "[v pÃ¡tek v] LT";
                    case 6:
                        return "[v sobotu v] LT"
                }
            },
            lastDay: "[vÄera v] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulou nedÄ›li v] LT";
                    case 1:
                    case 2:
                        return "[minulÃ©] dddd [v] LT";
                    case 3:
                        return "[minulou stÅ™edu v] LT";
                    case 4:
                    case 5:
                        return "[minulÃ½] dddd [v] LT";
                    case 6:
                        return "[minulou sobotu v] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "pÅ™ed %s", s: tt, m: tt, mm: tt, h: tt, hh: tt, d: tt, dd: tt, M: tt, MM: tt, y: tt, yy: tt },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : chuvash (cv)
    //! author : Anatoly Mironov : https://github.com/mirontoli
    bk = n.defineLocale("cv", { months: "ÐºÓ‘Ñ€Ð»Ð°Ñ‡_Ð½Ð°Ñ€Ó‘Ñ_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€Ñ‚Ð¼Ðµ_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€Ð»Ð°_Ð°Ð²Ó‘Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°ÑˆÑ‚Ð°Ð²".split("_"), monthsShort: "ÐºÓ‘Ñ€_Ð½Ð°Ñ€_Ð¿ÑƒÑˆ_Ð°ÐºÐ°_Ð¼Ð°Ð¹_Ò«Ó—Ñ€_ÑƒÑ‚Ó‘_Ò«ÑƒÑ€_Ð°Ð²Ð½_ÑŽÐ¿Ð°_Ñ‡Ó³Ðº_Ñ€Ð°Ñˆ".split("_"), weekdays: "Ð²Ñ‹Ñ€ÑÐ°Ñ€Ð½Ð¸ÐºÑƒÐ½_Ñ‚ÑƒÐ½Ñ‚Ð¸ÐºÑƒÐ½_Ñ‹Ñ‚Ð»Ð°Ñ€Ð¸ÐºÑƒÐ½_ÑŽÐ½ÐºÑƒÐ½_ÐºÓ—Ò«Ð½ÐµÑ€Ð½Ð¸ÐºÑƒÐ½_ÑÑ€Ð½ÐµÐºÑƒÐ½_ÑˆÓ‘Ð¼Ð°Ñ‚ÐºÑƒÐ½".split("_"), weekdaysShort: "Ð²Ñ‹Ñ€_Ñ‚ÑƒÐ½_Ñ‹Ñ‚Ð»_ÑŽÐ½_ÐºÓ—Ò«_ÑÑ€Ð½_ÑˆÓ‘Ð¼".split("_"), weekdaysMin: "Ð²Ñ€_Ñ‚Ð½_Ñ‹Ñ‚_ÑŽÐ½_ÐºÒ«_ÑÑ€_ÑˆÐ¼".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—]", LLL: "YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm", LLLL: "dddd, YYYY [Ò«ÑƒÐ»Ñ…Ð¸] MMMM [ÑƒÐ¹Ó‘Ñ…Ó—Ð½] D[-Ð¼Ó—ÑˆÓ—], HH:mm" }, calendar: { sameDay: "[ÐŸÐ°ÑÐ½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]", nextDay: "[Ð«Ñ€Ð°Ð½] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]", lastDay: "[Ó–Ð½ÐµÑ€] LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]", nextWeek: "[ÒªÐ¸Ñ‚ÐµÑ] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]", lastWeek: "[Ð˜Ñ€Ñ‚Ð½Ó—] dddd LT [ÑÐµÑ…ÐµÑ‚Ñ€Ðµ]", sameElse: "L" }, relativeTime: { future: function(n) { var t = /ÑÐµÑ…ÐµÑ‚$/i.exec(n) ? "Ñ€ÐµÐ½" : /Ò«ÑƒÐ»$/i.exec(n) ? "Ñ‚Ð°Ð½" : "Ñ€Ð°Ð½"; return n + t }, past: "%s ÐºÐ°ÑÐ»Ð»Ð°", s: "Ð¿Ó—Ñ€-Ð¸Ðº Ò«ÐµÐºÐºÑƒÐ½Ñ‚", m: "Ð¿Ó—Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚", mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚", h: "Ð¿Ó—Ñ€ ÑÐµÑ…ÐµÑ‚", hh: "%d ÑÐµÑ…ÐµÑ‚", d: "Ð¿Ó—Ñ€ ÐºÑƒÐ½", dd: "%d ÐºÑƒÐ½", M: "Ð¿Ó—Ñ€ ÑƒÐ¹Ó‘Ñ…", MM: "%d ÑƒÐ¹Ó‘Ñ…", y: "Ð¿Ó—Ñ€ Ò«ÑƒÐ»", yy: "%d Ò«ÑƒÐ»" }, ordinalParse: /\d{1,2}-Ð¼Ó—Ñˆ/, ordinal: "%d-Ð¼Ó—Ñˆ", week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Welsh (cy)
    //! author : Robert Allen
    kk = n.defineLocale("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[Heddiw am] LT", nextDay: "[Yfory am] LT", nextWeek: "dddd [am] LT", lastDay: "[Ddoe am] LT", lastWeek: "dddd [diwethaf am] LT", sameElse: "L" },
        relativeTime: { future: "mewn %s", past: "%s yn Ã´l", s: "ychydig eiliadau", m: "munud", mm: "%d munud", h: "awr", hh: "%d awr", d: "diwrnod", dd: "%d diwrnod", M: "mis", MM: "%d mis", y: "blwyddyn", yy: "%d flynedd" },
        ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        ordinal: function(n) {
            var t = n,
                i = "";
            return t > 20 ? i = t === 40 || t === 50 || t === 60 || t === 80 || t === 100 ? "fed" : "ain" : t > 0 && (i = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"][t]), n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : danish (da)
    //! author : Ulrik Nielsen : https://github.com/mrbase
    dk = n.defineLocale("da", { months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"), weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"), weekdaysShort: "sÃ¸n_man_tir_ons_tor_fre_lÃ¸r".split("_"), weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd [d.] D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[I dag kl.] LT", nextDay: "[I morgen kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[I gÃ¥r kl.] LT", lastWeek: "[sidste] dddd [kl] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "%s siden", s: "fÃ¥ sekunder", m: "et minut", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dage", M: "en mÃ¥ned", MM: "%d mÃ¥neder", y: "et Ã¥r", yy: "%d Ã¥r" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : austrian german (de-at)
    //! author : lluchs : https://github.com/lluchs
    //! author: Menelion ElensÃºle: https://github.com/Oire
    //! author : Martin Groller : https://github.com/MadMG
    //! author : Mikolaj Dadela : https://github.com/mik01aj
    gk = n.defineLocale("de-at", { months: "JÃ¤nner_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "JÃ¤n._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", m: ui, mm: "%d Minuten", h: ui, hh: "%d Stunden", d: ui, dd: ui, M: ui, MM: ui, y: ui, yy: ui }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : german (de)
    //! author : lluchs : https://github.com/lluchs
    //! author: Menelion ElensÃºle: https://github.com/Oire
    //! author : Mikolaj Dadela : https://github.com/mik01aj
    nd = n.defineLocale("de", { months: "Januar_Februar_MÃ¤rz_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"), monthsShort: "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"), weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"), weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"), weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY HH:mm", LLLL: "dddd, D. MMMM YYYY HH:mm" }, calendar: { sameDay: "[heute um] LT [Uhr]", sameElse: "L", nextDay: "[morgen um] LT [Uhr]", nextWeek: "dddd [um] LT [Uhr]", lastDay: "[gestern um] LT [Uhr]", lastWeek: "[letzten] dddd [um] LT [Uhr]" }, relativeTime: { future: "in %s", past: "vor %s", s: "ein paar Sekunden", m: fi, mm: "%d Minuten", h: fi, hh: "%d Stunden", d: fi, dd: fi, M: fi, MM: fi, y: fi, yy: fi }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : dhivehi (dv)
    //! author : Jawish Hameed : https://github.com/jawish
    var cc = ["Þ–Þ¬Þ‚ÞªÞ‡Þ¦ÞƒÞ©", "ÞŠÞ¬Þ„Þ°ÞƒÞªÞ‡Þ¦ÞƒÞ©", "Þ‰Þ§ÞƒÞ¨Þ—Þª", "Þ‡Þ­Þ•Þ°ÞƒÞ©ÞÞª", "Þ‰Þ­", "Þ–Þ«Þ‚Þ°", "Þ–ÞªÞÞ¦Þ‡Þ¨", "Þ‡Þ¯ÞŽÞ¦ÞÞ°Þ“Þª", "ÞÞ¬Þ•Þ°Þ“Þ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‡Þ®Þ†Þ°Þ“Þ¯Þ„Þ¦ÞƒÞª", "Þ‚Þ®ÞˆÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª", "Þ‘Þ¨ÞÞ¬Þ‰Þ°Þ„Þ¦ÞƒÞª"],
        lc = ["Þ‡Þ§Þ‹Þ¨Þ‡Þ°ÞŒÞ¦", "Þ€Þ¯Þ‰Þ¦", "Þ‡Þ¦Þ‚Þ°ÞŽÞ§ÞƒÞ¦", "Þ„ÞªÞ‹Þ¦", "Þ„ÞªÞƒÞ§ÞÞ°ÞŠÞ¦ÞŒÞ¨", "Þ€ÞªÞ†ÞªÞƒÞª", "Þ€Þ®Þ‚Þ¨Þ€Þ¨ÞƒÞª"],
        wit = n.defineLocale("dv", { months: cc, monthsShort: cc, weekdays: lc, weekdaysShort: lc, weekdaysMin: "Þ‡Þ§Þ‹Þ¨_Þ€Þ¯Þ‰Þ¦_Þ‡Þ¦Þ‚Þ°_Þ„ÞªÞ‹Þ¦_Þ„ÞªÞƒÞ§_Þ€ÞªÞ†Þª_Þ€Þ®Þ‚Þ¨".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "D/M/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, meridiemParse: /Þ‰Þ†|Þ‰ÞŠ/, isPM: function(n) { return "" === n }, meridiem: function(n) { return n < 12 ? "Þ‰Þ†" : "Þ‰ÞŠ" }, calendar: { sameDay: "[Þ‰Þ¨Þ‡Þ¦Þ‹Þª] LT", nextDay: "[Þ‰Þ§Þ‹Þ¦Þ‰Þ§] LT", nextWeek: "dddd LT", lastDay: "[Þ‡Þ¨Þ‡Þ°Þ”Þ¬] LT", lastWeek: "[ÞŠÞ§Þ‡Þ¨ÞŒÞªÞˆÞ¨] dddd LT", sameElse: "L" }, relativeTime: { future: "ÞŒÞ¬ÞƒÞ­ÞŽÞ¦Þ‡Þ¨ %s", past: "Þ†ÞªÞƒÞ¨Þ‚Þ° %s", s: "ÞÞ¨Þ†ÞªÞ‚Þ°ÞŒÞªÞ†Þ®Þ…Þ¬Þ‡Þ°", m: "Þ‰Þ¨Þ‚Þ¨Þ“Þ¬Þ‡Þ°", mm: "Þ‰Þ¨Þ‚Þ¨Þ“Þª %d", h: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞ¬Þ‡Þ°", hh: "ÞŽÞ¦Þ‘Þ¨Þ‡Þ¨ÞƒÞª %d", d: "Þ‹ÞªÞˆÞ¦Þ€Þ¬Þ‡Þ°", dd: "Þ‹ÞªÞˆÞ¦ÞÞ° %d", M: "Þ‰Þ¦Þ€Þ¬Þ‡Þ°", MM: "Þ‰Þ¦ÞÞ° %d", y: "Þ‡Þ¦Þ€Þ¦ÞƒÞ¬Þ‡Þ°", yy: "Þ‡Þ¦Þ€Þ¦ÞƒÞª %d" }, preparse: function(n) { return n.replace(/ØŒ/g, ",") }, postformat: function(n) { return n.replace(/,/g, "ØŒ") }, week: { dow: 7, doy: 12 } });
    //! moment.js locale configuration
    //! locale : modern greek (el)
    //! author : Aggelos Karalias : https://github.com/mehiel
    td = n.defineLocale("el", {
        monthsNominativeEl: "Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚_Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚_ÎœÎ¬ÏÏ„Î¹Î¿Ï‚_Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚_ÎœÎ¬Î¹Î¿Ï‚_Î™Î¿ÏÎ½Î¹Î¿Ï‚_Î™Î¿ÏÎ»Î¹Î¿Ï‚_Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚_Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚_ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚_ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚_Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚".split("_"),
        monthsGenitiveEl: "Î™Î±Î½Î¿Ï…Î±ÏÎ¯Î¿Ï…_Î¦ÎµÎ²ÏÎ¿Ï…Î±ÏÎ¯Î¿Ï…_ÎœÎ±ÏÏ„Î¯Î¿Ï…_Î‘Ï€ÏÎ¹Î»Î¯Î¿Ï…_ÎœÎ±ÎÎ¿Ï…_Î™Î¿Ï…Î½Î¯Î¿Ï…_Î™Î¿Ï…Î»Î¯Î¿Ï…_Î‘Ï…Î³Î¿ÏÏƒÏ„Î¿Ï…_Î£ÎµÏ€Ï„ÎµÎ¼Î²ÏÎ¯Î¿Ï…_ÎŸÎºÏ„Ï‰Î²ÏÎ¯Î¿Ï…_ÎÎ¿ÎµÎ¼Î²ÏÎ¯Î¿Ï…_Î”ÎµÎºÎµÎ¼Î²ÏÎ¯Î¿Ï…".split("_"),
        months: function(n, t) { return /D/.test(t.substring(0, t.indexOf("MMMM"))) ? this._monthsGenitiveEl[n.month()] : this._monthsNominativeEl[n.month()] },
        monthsShort: "Î™Î±Î½_Î¦ÎµÎ²_ÎœÎ±Ï_Î‘Ï€Ï_ÎœÎ±ÏŠ_Î™Î¿Ï…Î½_Î™Î¿Ï…Î»_Î‘Ï…Î³_Î£ÎµÏ€_ÎŸÎºÏ„_ÎÎ¿Îµ_Î”ÎµÎº".split("_"),
        weekdays: "ÎšÏ…ÏÎ¹Î±ÎºÎ®_Î”ÎµÏ…Ï„Î­ÏÎ±_Î¤ÏÎ¯Ï„Î·_Î¤ÎµÏ„Î¬ÏÏ„Î·_Î Î­Î¼Ï€Ï„Î·_Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®_Î£Î¬Î²Î²Î±Ï„Î¿".split("_"),
        weekdaysShort: "ÎšÏ…Ï_Î”ÎµÏ…_Î¤ÏÎ¹_Î¤ÎµÏ„_Î ÎµÎ¼_Î Î±Ï_Î£Î±Î²".split("_"),
        weekdaysMin: "ÎšÏ…_Î”Îµ_Î¤Ï_Î¤Îµ_Î Îµ_Î Î±_Î£Î±".split("_"),
        meridiem: function(n, t, i) { return n > 11 ? i ? "Î¼Î¼" : "ÎœÎœ" : i ? "Ï€Î¼" : "Î Îœ" },
        isPM: function(n) { return (n + "").toLowerCase()[0] === "Î¼" },
        meridiemParse: /[Î Îœ]\.?Îœ?\.?/i,
        longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" },
        calendarEl: {
            sameDay: "[Î£Î®Î¼ÎµÏÎ± {}] LT",
            nextDay: "[Î‘ÏÏÎ¹Î¿ {}] LT",
            nextWeek: "dddd [{}] LT",
            lastDay: "[Î§Î¸ÎµÏ‚ {}] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 6:
                        return "[Ï„Î¿ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î¿] dddd [{}] LT";
                    default:
                        return "[Ï„Î·Î½ Ï€ÏÎ¿Î·Î³Î¿ÏÎ¼ÎµÎ½Î·] dddd [{}] LT"
                }
            },
            sameElse: "L"
        },
        calendar: function(n, t) {
            var i = this._calendarEl[n],
                r = t && t.hours();
            return wt(i) && (i = i.apply(t)), i.replace("{}", r % 12 == 1 ? "ÏƒÏ„Î·" : "ÏƒÏ„Î¹Ï‚")
        },
        relativeTime: { future: "ÏƒÎµ %s", past: "%s Ï€ÏÎ¹Î½", s: "Î»Î¯Î³Î± Î´ÎµÏ…Ï„ÎµÏÏŒÎ»ÎµÏ€Ï„Î±", m: "Î­Î½Î± Î»ÎµÏ€Ï„ÏŒ", mm: "%d Î»ÎµÏ€Ï„Î¬", h: "Î¼Î¯Î± ÏŽÏÎ±", hh: "%d ÏŽÏÎµÏ‚", d: "Î¼Î¯Î± Î¼Î­ÏÎ±", dd: "%d Î¼Î­ÏÎµÏ‚", M: "Î­Î½Î±Ï‚ Î¼Î®Î½Î±Ï‚", MM: "%d Î¼Î®Î½ÎµÏ‚", y: "Î­Î½Î±Ï‚ Ï‡ÏÏŒÎ½Î¿Ï‚", yy: "%d Ï‡ÏÏŒÎ½Î¹Î±" },
        ordinalParse: /\d{1,2}Î·/,
        ordinal: "%dÎ·",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : australian english (en-au)
    id = n.defineLocale("en-au", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" },
        calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
        relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : canadian english (en-ca)
    //! author : Jonathan Abourbih : https://github.com/jonbca
    rd = n.defineLocale("en-ca", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "YYYY-MM-DD", LL: "D MMMM, YYYY", LLL: "D MMMM, YYYY h:mm A", LLLL: "dddd, D MMMM, YYYY h:mm A" },
        calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
        relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        }
    });
    //! moment.js locale configuration
    //! locale : great britain english (en-gb)
    //! author : Chris Gedrim : https://github.com/chrisgedrim
    ud = n.defineLocale("en-gb", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
        relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : Irish english (en-ie)
    //! author : Chris Cartlidge : https://github.com/chriscartlidge
    fd = n.defineLocale("en-ie", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
        relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : New Zealand english (en-nz)
    ed = n.defineLocale("en-nz", {
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" },
        calendar: { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" },
        relativeTime: { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : esperanto (eo)
    //! author : Colin Dean : https://github.com/colindean
    //! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
    //!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!
    od = n.defineLocale("eo", { months: "januaro_februaro_marto_aprilo_majo_junio_julio_aÅ­gusto_septembro_oktobro_novembro_decembro".split("_"), monthsShort: "jan_feb_mar_apr_maj_jun_jul_aÅ­g_sep_okt_nov_dec".split("_"), weekdays: "DimanÄ‰o_Lundo_Mardo_Merkredo_Ä´aÅ­do_Vendredo_Sabato".split("_"), weekdaysShort: "Dim_Lun_Mard_Merk_Ä´aÅ­_Ven_Sab".split("_"), weekdaysMin: "Di_Lu_Ma_Me_Ä´a_Ve_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D[-an de] MMMM, YYYY", LLL: "D[-an de] MMMM, YYYY HH:mm", LLLL: "dddd, [la] D[-an de] MMMM, YYYY HH:mm" }, meridiemParse: /[ap]\.t\.m/i, isPM: function(n) { return n.charAt(0).toLowerCase() === "p" }, meridiem: function(n, t, i) { return n > 11 ? i ? "p.t.m." : "P.T.M." : i ? "a.t.m." : "A.T.M." }, calendar: { sameDay: "[HodiaÅ­ je] LT", nextDay: "[MorgaÅ­ je] LT", nextWeek: "dddd [je] LT", lastDay: "[HieraÅ­ je] LT", lastWeek: "[pasinta] dddd [je] LT", sameElse: "L" }, relativeTime: { future: "je %s", past: "antaÅ­ %s", s: "sekundoj", m: "minuto", mm: "%d minutoj", h: "horo", hh: "%d horoj", d: "tago", dd: "%d tagoj", M: "monato", MM: "%d monatoj", y: "jaro", yy: "%d jaroj" }, ordinalParse: /\d{1,2}a/, ordinal: "%da", week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : spanish (es)
    //! author : Julio NapurÃ­ : https://github.com/julionc
    var sd = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        hd = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        bit = n.defineLocale("es", { months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), monthsShort: function(n, t) { return /-MMM-/.test(t) ? hd[n.month()] : sd[n.month()] }, weekdays: "domingo_lunes_martes_miÃ©rcoles_jueves_viernes_sÃ¡bado".split("_"), weekdaysShort: "dom._lun._mar._miÃ©._jue._vie._sÃ¡b.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sÃ¡".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, calendar: { sameDay: function() { return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT" }, nextDay: function() { return "[maÃ±ana a la" + (this.hours() !== 1 ? "s" : "") + "] LT" }, nextWeek: function() { return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT" }, lastDay: function() { return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT" }, lastWeek: function() { return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT" }, sameElse: "L" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un dÃ­a", dd: "%d dÃ­as", M: "un mes", MM: "%d meses", y: "un aÃ±o", yy: "%d aÃ±os" }, ordinalParse: /\d{1,2}Âº/, ordinal: "%dÂº", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : estonian (et)
    //! author : Henry Kehlmann : https://github.com/madhenry
    //! improvements : Illimar Tambek : https://github.com/ragulka
    cd = n.defineLocale("et", { months: "jaanuar_veebruar_mÃ¤rts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"), monthsShort: "jaan_veebr_mÃ¤rts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"), weekdays: "pÃ¼hapÃ¤ev_esmaspÃ¤ev_teisipÃ¤ev_kolmapÃ¤ev_neljapÃ¤ev_reede_laupÃ¤ev".split("_"), weekdaysShort: "P_E_T_K_N_R_L".split("_"), weekdaysMin: "P_E_T_K_N_R_L".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" }, calendar: { sameDay: "[TÃ¤na,] LT", nextDay: "[Homme,] LT", nextWeek: "[JÃ¤rgmine] dddd LT", lastDay: "[Eile,] LT", lastWeek: "[Eelmine] dddd LT", sameElse: "L" }, relativeTime: { future: "%s pÃ¤rast", past: "%s tagasi", s: ct, m: ct, mm: ct, h: ct, hh: ct, d: ct, dd: "%d pÃ¤eva", M: ct, MM: ct, y: ct, yy: ct }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : euskara (eu)
    //! author : Eneko Illarramendi : https://github.com/eillarra
    ld = n.defineLocale("eu", { months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"), monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"), weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"), weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"), weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY[ko] MMMM[ren] D[a]", LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm", LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm", l: "YYYY-M-D", ll: "YYYY[ko] MMM D[a]", lll: "YYYY[ko] MMM D[a] HH:mm", llll: "ddd, YYYY[ko] MMM D[a] HH:mm" }, calendar: { sameDay: "[gaur] LT[etan]", nextDay: "[bihar] LT[etan]", nextWeek: "dddd LT[etan]", lastDay: "[atzo] LT[etan]", lastWeek: "[aurreko] dddd LT[etan]", sameElse: "L" }, relativeTime: { future: "%s barru", past: "duela %s", s: "segundo batzuk", m: "minutu bat", mm: "%d minutu", h: "ordu bat", hh: "%d ordu", d: "egun bat", dd: "%d egun", M: "hilabete bat", MM: "%d hilabete", y: "urte bat", yy: "%d urte" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Persian (fa)
    //! author : Ebrahim Byagowi : https://github.com/ebraminio
    var ad = { "1": "Û±", "2": "Û²", "3": "Û³", "4": "Û´", "5": "Ûµ", "6": "Û¶", "7": "Û·", "8": "Û¸", "9": "Û¹", "0": "Û°" },
        vd = { "Û±": "1", "Û²": "2", "Û³": "3", "Û´": "4", "Ûµ": "5", "Û¶": "6", "Û·": "7", "Û¸": "8", "Û¹": "9", "Û°": "0" },
        kit = n.defineLocale("fa", { months: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"), monthsShort: "Ú˜Ø§Ù†ÙˆÛŒÙ‡_ÙÙˆØ±ÛŒÙ‡_Ù…Ø§Ø±Ø³_Ø¢ÙˆØ±ÛŒÙ„_Ù…Ù‡_Ú˜ÙˆØ¦Ù†_Ú˜ÙˆØ¦ÛŒÙ‡_Ø§ÙˆØª_Ø³Ù¾ØªØ§Ù…Ø¨Ø±_Ø§Ú©ØªØ¨Ø±_Ù†ÙˆØ§Ù…Ø¨Ø±_Ø¯Ø³Ø§Ù…Ø¨Ø±".split("_"), weekdays: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"), weekdaysShort: "ÛŒÚ©â€ŒØ´Ù†Ø¨Ù‡_Ø¯ÙˆØ´Ù†Ø¨Ù‡_Ø³Ù‡â€ŒØ´Ù†Ø¨Ù‡_Ú†Ù‡Ø§Ø±Ø´Ù†Ø¨Ù‡_Ù¾Ù†Ø¬â€ŒØ´Ù†Ø¨Ù‡_Ø¬Ù…Ø¹Ù‡_Ø´Ù†Ø¨Ù‡".split("_"), weekdaysMin: "ÛŒ_Ø¯_Ø³_Ú†_Ù¾_Ø¬_Ø´".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, meridiemParse: /Ù‚Ø¨Ù„ Ø§Ø² Ø¸Ù‡Ø±|Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±/, isPM: function(n) { return /Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±/.test(n) }, meridiem: function(n) { return n < 12 ? "Ù‚Ø¨Ù„ Ø§Ø² Ø¸Ù‡Ø±" : "Ø¨Ø¹Ø¯ Ø§Ø² Ø¸Ù‡Ø±" }, calendar: { sameDay: "[Ø§Ù…Ø±ÙˆØ² Ø³Ø§Ø¹Øª] LT", nextDay: "[ÙØ±Ø¯Ø§ Ø³Ø§Ø¹Øª] LT", nextWeek: "dddd [Ø³Ø§Ø¹Øª] LT", lastDay: "[Ø¯ÛŒØ±ÙˆØ² Ø³Ø§Ø¹Øª] LT", lastWeek: "dddd [Ù¾ÛŒØ´] [Ø³Ø§Ø¹Øª] LT", sameElse: "L" }, relativeTime: { future: "Ø¯Ø± %s", past: "%s Ù¾ÛŒØ´", s: "Ú†Ù†Ø¯ÛŒÙ† Ø«Ø§Ù†ÛŒÙ‡", m: "ÛŒÚ© Ø¯Ù‚ÛŒÙ‚Ù‡", mm: "%d Ø¯Ù‚ÛŒÙ‚Ù‡", h: "ÛŒÚ© Ø³Ø§Ø¹Øª", hh: "%d Ø³Ø§Ø¹Øª", d: "ÛŒÚ© Ø±ÙˆØ²", dd: "%d Ø±ÙˆØ²", M: "ÛŒÚ© Ù…Ø§Ù‡", MM: "%d Ù…Ø§Ù‡", y: "ÛŒÚ© Ø³Ø§Ù„", yy: "%d Ø³Ø§Ù„" }, preparse: function(n) { return n.replace(/[Û°-Û¹]/g, function(n) { return vd[n] }).replace(/ØŒ/g, ",") }, postformat: function(n) { return n.replace(/\d/g, function(n) { return ad[n] }).replace(/,/g, "ØŒ") }, ordinalParse: /\d{1,2}Ù…/, ordinal: "%dÙ…", week: { dow: 6, doy: 12 } });
    //! moment.js locale configuration
    //! locale : finnish (fi)
    //! author : Tarmo Aidantausta : https://github.com/bleadof
    wr = "nolla yksi kaksi kolme neljÃ¤ viisi kuusi seitsemÃ¤n kahdeksan yhdeksÃ¤n".split(" ");
    ac = ["nolla", "yhden", "kahden", "kolmen", "neljÃ¤n", "viiden", "kuuden", wr[7], wr[8], wr[9]];
    pd = n.defineLocale("fi", { months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesÃ¤kuu_heinÃ¤kuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"), monthsShort: "tammi_helmi_maalis_huhti_touko_kesÃ¤_heinÃ¤_elo_syys_loka_marras_joulu".split("_"), weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"), weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"), weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "Do MMMM[ta] YYYY", LLL: "Do MMMM[ta] YYYY, [klo] HH.mm", LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm", l: "D.M.YYYY", ll: "Do MMM YYYY", lll: "Do MMM YYYY, [klo] HH.mm", llll: "ddd, Do MMM YYYY, [klo] HH.mm" }, calendar: { sameDay: "[tÃ¤nÃ¤Ã¤n] [klo] LT", nextDay: "[huomenna] [klo] LT", nextWeek: "dddd [klo] LT", lastDay: "[eilen] [klo] LT", lastWeek: "[viime] dddd[na] [klo] LT", sameElse: "L" }, relativeTime: { future: "%s pÃ¤Ã¤stÃ¤", past: "%s sitten", s: it, m: it, mm: it, h: it, hh: it, d: it, dd: it, M: it, MM: it, y: it, yy: it }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : faroese (fo)
    //! author : Ragnar Johannesen : https://github.com/ragnar123
    wd = n.defineLocale("fo", { months: "januar_februar_mars_aprÃ­l_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays: "sunnudagur_mÃ¡nadagur_tÃ½sdagur_mikudagur_hÃ³sdagur_frÃ­ggjadagur_leygardagur".split("_"), weekdaysShort: "sun_mÃ¡n_tÃ½s_mik_hÃ³s_frÃ­_ley".split("_"), weekdaysMin: "su_mÃ¡_tÃ½_mi_hÃ³_fr_le".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D. MMMM, YYYY HH:mm" }, calendar: { sameDay: "[Ã dag kl.] LT", nextDay: "[Ã morgin kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[Ã gjÃ¡r kl.] LT", lastWeek: "[sÃ­Ã°stu] dddd [kl] LT", sameElse: "L" }, relativeTime: { future: "um %s", past: "%s sÃ­Ã°ani", s: "fÃ¡ sekund", m: "ein minutt", mm: "%d minuttir", h: "ein tÃ­mi", hh: "%d tÃ­mar", d: "ein dagur", dd: "%d dagar", M: "ein mÃ¡naÃ°i", MM: "%d mÃ¡naÃ°ir", y: "eitt Ã¡r", yy: "%d Ã¡r" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : canadian french (fr-ca)
    //! author : Jonathan Abourbih : https://github.com/jonbca
    bd = n.defineLocale("fr-ca", { months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"), monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"), weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd'hui Ã ] LT", nextDay: "[Demain Ã ] LT", nextWeek: "dddd [Ã ] LT", lastDay: "[Hier Ã ] LT", lastWeek: "dddd [dernier Ã ] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinalParse: /\d{1,2}(er|e)/, ordinal: function(n) { return n + (n === 1 ? "er" : "e") } });
    //! moment.js locale configuration
    //! locale : swiss french (fr)
    //! author : Gaspard Bucher : https://github.com/gaspard
    kd = n.defineLocale("fr-ch", { months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"), monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"), weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd'hui Ã ] LT", nextDay: "[Demain Ã ] LT", nextWeek: "dddd [Ã ] LT", lastDay: "[Hier Ã ] LT", lastWeek: "dddd [dernier Ã ] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinalParse: /\d{1,2}(er|e)/, ordinal: function(n) { return n + (n === 1 ? "er" : "e") }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : french (fr)
    //! author : John Fischer : https://github.com/jfroffice
    dd = n.defineLocale("fr", { months: "janvier_fÃ©vrier_mars_avril_mai_juin_juillet_aoÃ»t_septembre_octobre_novembre_dÃ©cembre".split("_"), monthsShort: "janv._fÃ©vr._mars_avr._mai_juin_juil._aoÃ»t_sept._oct._nov._dÃ©c.".split("_"), weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Aujourd'hui Ã ] LT", nextDay: "[Demain Ã ] LT", nextWeek: "dddd [Ã ] LT", lastDay: "[Hier Ã ] LT", lastWeek: "dddd [dernier Ã ] LT", sameElse: "L" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinalParse: /\d{1,2}(er|)/, ordinal: function(n) { return n + (n === 1 ? "er" : "") }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : frisian (fy)
    //! author : Robin van der Vliet : https://github.com/robin0van0der0v
    var gd = "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
        ng = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        dit = n.defineLocale("fy", { months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"), monthsShort: function(n, t) { return /-MMM-/.test(t) ? ng[n.month()] : gd[n.month()] }, weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"), weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"), weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[hjoed om] LT", nextDay: "[moarn om] LT", nextWeek: "dddd [om] LT", lastDay: "[juster om] LT", lastWeek: "[Ã´frÃ»ne] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "oer %s", past: "%s lyn", s: "in pear sekonden", m: "ien minÃºt", mm: "%d minuten", h: "ien oere", hh: "%d oeren", d: "ien dei", dd: "%d dagen", M: "ien moanne", MM: "%d moannen", y: "ien jier", yy: "%d jierren" }, ordinalParse: /\d{1,2}(ste|de)/, ordinal: function(n) { return n + (n === 1 || n === 8 || n >= 20 ? "ste" : "de") }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : great britain scottish gealic (gd)
    //! author : Jon Ashdown : https://github.com/jonashdown
    var git = n.defineLocale("gd", { months: ["Am Faoilleach", "An Gearran", "Am MÃ rt", "An Giblean", "An CÃ¨itean", "An t-Ã’gmhios", "An t-Iuchar", "An LÃ¹nastal", "An t-Sultain", "An DÃ mhair", "An t-Samhain", "An DÃ¹bhlachd"], monthsShort: ["Faoi", "Gear", "MÃ rt", "Gibl", "CÃ¨it", "Ã’gmh", "Iuch", "LÃ¹n", "Sult", "DÃ mh", "Samh", "DÃ¹bh"], monthsParseExact: !0, weekdays: ["DidÃ²mhnaich", "Diluain", "DimÃ irt", "Diciadain", "Diardaoin", "Dihaoine", "Disathairne"], weekdaysShort: ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"], weekdaysMin: ["DÃ²", "Lu", "MÃ ", "Ci", "Ar", "Ha", "Sa"], longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[An-diugh aig] LT", nextDay: "[A-mÃ ireach aig] LT", nextWeek: "dddd [aig] LT", lastDay: "[An-dÃ¨ aig] LT", lastWeek: "dddd [seo chaidh] [aig] LT", sameElse: "L" }, relativeTime: { future: "ann an %s", past: "bho chionn %s", s: "beagan diogan", m: "mionaid", mm: "%d mionaidean", h: "uair", hh: "%d uairean", d: "latha", dd: "%d latha", M: "mÃ¬os", MM: "%d mÃ¬osan", y: "bliadhna", yy: "%d bliadhna" }, ordinalParse: /\d{1,2}(d|na|mh)/, ordinal: function(n) { var t = n === 1 ? "d" : n % 10 == 2 ? "na" : "mh"; return n + t }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : galician (gl)
    //! author : Juan G. Hurtado : https://github.com/juanghurtado
    tg = n.defineLocale("gl", { months: "Xaneiro_Febreiro_Marzo_Abril_Maio_XuÃ±o_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"), monthsShort: "Xan._Feb._Mar._Abr._Mai._XuÃ±._Xul._Ago._Set._Out._Nov._Dec.".split("_"), weekdays: "Domingo_Luns_Martes_MÃ©rcores_Xoves_Venres_SÃ¡bado".split("_"), weekdaysShort: "Dom._Lun._Mar._MÃ©r._Xov._Ven._SÃ¡b.".split("_"), weekdaysMin: "Do_Lu_Ma_MÃ©_Xo_Ve_SÃ¡".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd D MMMM YYYY H:mm" }, calendar: { sameDay: function() { return "[hoxe " + (this.hours() !== 1 ? "Ã¡s" : "Ã¡") + "] LT" }, nextDay: function() { return "[maÃ±Ã¡ " + (this.hours() !== 1 ? "Ã¡s" : "Ã¡") + "] LT" }, nextWeek: function() { return "dddd [" + (this.hours() !== 1 ? "Ã¡s" : "a") + "] LT" }, lastDay: function() { return "[onte " + (this.hours() !== 1 ? "Ã¡" : "a") + "] LT" }, lastWeek: function() { return "[o] dddd [pasado " + (this.hours() !== 1 ? "Ã¡s" : "a") + "] LT" }, sameElse: "L" }, relativeTime: { future: function(n) { return n === "uns segundos" ? "nuns segundos" : "en " + n }, past: "hai %s", s: "uns segundos", m: "un minuto", mm: "%d minutos", h: "unha hora", hh: "%d horas", d: "un dÃ­a", dd: "%d dÃ­as", M: "un mes", MM: "%d meses", y: "un ano", yy: "%d anos" }, ordinalParse: /\d{1,2}Âº/, ordinal: "%dÂº", week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Hebrew (he)
    //! author : Tomer Cohen : https://github.com/tomer
    //! author : Moshe Simantov : https://github.com/DevelopmentIL
    //! author : Tal Ater : https://github.com/TalAter
    ig = n.defineLocale("he", { months: "×™× ×•××¨_×¤×‘×¨×•××¨_×ž×¨×¥_××¤×¨×™×œ_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×•×¡×˜_×¡×¤×˜×ž×‘×¨_××•×§×˜×•×‘×¨_× ×•×‘×ž×‘×¨_×“×¦×ž×‘×¨".split("_"), monthsShort: "×™× ×•×³_×¤×‘×¨×³_×ž×¨×¥_××¤×¨×³_×ž××™_×™×•× ×™_×™×•×œ×™_××•×’×³_×¡×¤×˜×³_××•×§×³_× ×•×‘×³_×“×¦×ž×³".split("_"), weekdays: "×¨××©×•×Ÿ_×©× ×™_×©×œ×™×©×™_×¨×‘×™×¢×™_×—×ž×™×©×™_×©×™×©×™_×©×‘×ª".split("_"), weekdaysShort: "××³_×‘×³_×’×³_×“×³_×”×³_×•×³_×©×³".split("_"), weekdaysMin: "×_×‘_×’_×“_×”_×•_×©".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [×‘]MMMM YYYY", LLL: "D [×‘]MMMM YYYY HH:mm", LLLL: "dddd, D [×‘]MMMM YYYY HH:mm", l: "D/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[×”×™×•× ×‘Ö¾]LT", nextDay: "[×ž×—×¨ ×‘Ö¾]LT", nextWeek: "dddd [×‘×©×¢×”] LT", lastDay: "[××ª×ž×•×œ ×‘Ö¾]LT", lastWeek: "[×‘×™×•×] dddd [×”××—×¨×•×Ÿ ×‘×©×¢×”] LT", sameElse: "L" }, relativeTime: { future: "×‘×¢×•×“ %s", past: "×œ×¤× ×™ %s", s: "×ž×¡×¤×¨ ×©× ×™×•×ª", m: "×“×§×”", mm: "%d ×“×§×•×ª", h: "×©×¢×”", hh: function(n) { return n === 2 ? "×©×¢×ª×™×™×" : n + " ×©×¢×•×ª" }, d: "×™×•×", dd: function(n) { return n === 2 ? "×™×•×ž×™×™×" : n + " ×™×ž×™×" }, M: "×—×•×“×©", MM: function(n) { return n === 2 ? "×—×•×“×©×™×™×" : n + " ×—×•×“×©×™×" }, y: "×©× ×”", yy: function(n) { return n === 2 ? "×©× ×ª×™×™×" : n % 10 == 0 && n !== 10 ? n + " ×©× ×”" : n + " ×©× ×™×" } } });
    //! moment.js locale configuration
    //! locale : hindi (hi)
    //! author : Mayank Singhal : https://github.com/mayanksinghal
    var rg = { "1": "à¥§", "2": "à¥¨", "3": "à¥©", "4": "à¥ª", "5": "à¥«", "6": "à¥¬", "7": "à¥­", "8": "à¥®", "9": "à¥¯", "0": "à¥¦" },
        ug = { "à¥§": "1", "à¥¨": "2", "à¥©": "3", "à¥ª": "4", "à¥«": "5", "à¥¬": "6", "à¥­": "7", "à¥®": "8", "à¥¯": "9", "à¥¦": "0" },
        nrt = n.defineLocale("hi", { months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¤¼à¤°à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆà¤²_à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤¸à¥à¤¤_à¤¸à¤¿à¤¤à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‚à¤¬à¤°_à¤¨à¤µà¤®à¥à¤¬à¤°_à¤¦à¤¿à¤¸à¤®à¥à¤¬à¤°".split("_"), monthsShort: "à¤œà¤¨._à¤«à¤¼à¤°._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¥ˆ._à¤®à¤ˆ_à¤œà¥‚à¤¨_à¤œà¥à¤²._à¤…à¤—._à¤¸à¤¿à¤¤._à¤…à¤•à¥à¤Ÿà¥‚._à¤¨à¤µ._à¤¦à¤¿à¤¸.".split("_"), weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤²à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"), weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤²_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"), weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"), longDateFormat: { LT: "A h:mm à¤¬à¤œà¥‡", LTS: "A h:mm:ss à¤¬à¤œà¥‡", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm à¤¬à¤œà¥‡", LLLL: "dddd, D MMMM YYYY, A h:mm à¤¬à¤œà¥‡" }, calendar: { sameDay: "[à¤†à¤œ] LT", nextDay: "[à¤•à¤²] LT", nextWeek: "dddd, LT", lastDay: "[à¤•à¤²] LT", lastWeek: "[à¤ªà¤¿à¤›à¤²à¥‡] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à¤®à¥‡à¤‚", past: "%s à¤ªà¤¹à¤²à¥‡", s: "à¤•à¥à¤› à¤¹à¥€ à¤•à¥à¤·à¤£", m: "à¤à¤• à¤®à¤¿à¤¨à¤Ÿ", mm: "%d à¤®à¤¿à¤¨à¤Ÿ", h: "à¤à¤• à¤˜à¤‚à¤Ÿà¤¾", hh: "%d à¤˜à¤‚à¤Ÿà¥‡", d: "à¤à¤• à¤¦à¤¿à¤¨", dd: "%d à¤¦à¤¿à¤¨", M: "à¤à¤• à¤®à¤¹à¥€à¤¨à¥‡", MM: "%d à¤®à¤¹à¥€à¤¨à¥‡", y: "à¤à¤• à¤µà¤°à¥à¤·", yy: "%d à¤µà¤°à¥à¤·" }, preparse: function(n) { return n.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function(n) { return ug[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return rg[n] }) }, meridiemParse: /à¤°à¤¾à¤¤|à¤¸à¥à¤¬à¤¹|à¤¦à¥‹à¤ªà¤¹à¤°|à¤¶à¤¾à¤®/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "à¤°à¤¾à¤¤") ? n < 4 ? n : n + 12 : t === "à¤¸à¥à¤¬à¤¹" ? n : t === "à¤¦à¥‹à¤ªà¤¹à¤°" ? n >= 10 ? n : n + 12 : t === "à¤¶à¤¾à¤®" ? n + 12 : void 0 }, meridiem: function(n) { return n < 4 ? "à¤°à¤¾à¤¤" : n < 10 ? "à¤¸à¥à¤¬à¤¹" : n < 17 ? "à¤¦à¥‹à¤ªà¤¹à¤°" : n < 20 ? "à¤¶à¤¾à¤®" : "à¤°à¤¾à¤¤" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : hrvatski (hr)
    //! author : Bojan MarkoviÄ‡ : https://github.com/bmarkovic
    fg = n.defineLocale("hr", {
        months: { format: "sijeÄnja_veljaÄe_oÅ¾ujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"), standalone: "sijeÄanj_veljaÄa_oÅ¾ujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_") },
        monthsShort: "sij._velj._oÅ¾u._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_Äetvrtak_petak_subota".split("_"),
        weekdaysShort: "ned._pon._uto._sri._Äet._pet._sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_Äe_pe_su".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄer u] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                        return "[proÅ¡lu] dddd [u] LT";
                    case 6:
                        return "[proÅ¡le] [subote] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[proÅ¡li] dddd [u] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "prije %s", s: "par sekundi", m: bi, mm: bi, h: bi, hh: bi, d: "dan", dd: bi, M: "mjesec", MM: bi, y: "godinu", yy: bi },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : hungarian (hu)
    //! author : Adam Brunner : https://github.com/adambrunner
    vc = "vasÃ¡rnap hÃ©tfÅ‘n kedden szerdÃ¡n csÃ¼tÃ¶rtÃ¶kÃ¶n pÃ©nteken szombaton".split(" ");
    eg = n.defineLocale("hu", { months: "januÃ¡r_februÃ¡r_mÃ¡rcius_Ã¡prilis_mÃ¡jus_jÃºnius_jÃºlius_augusztus_szeptember_oktÃ³ber_november_december".split("_"), monthsShort: "jan_feb_mÃ¡rc_Ã¡pr_mÃ¡j_jÃºn_jÃºl_aug_szept_okt_nov_dec".split("_"), weekdays: "vasÃ¡rnap_hÃ©tfÅ‘_kedd_szerda_csÃ¼tÃ¶rtÃ¶k_pÃ©ntek_szombat".split("_"), weekdaysShort: "vas_hÃ©t_kedd_sze_csÃ¼t_pÃ©n_szo".split("_"), weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY. MMMM D.", LLL: "YYYY. MMMM D. H:mm", LLLL: "YYYY. MMMM D., dddd H:mm" }, meridiemParse: /de|du/i, isPM: function(n) { return n.charAt(1).toLowerCase() === "u" }, meridiem: function(n, t, i) { return n < 12 ? i === !0 ? "de" : "DE" : i === !0 ? "du" : "DU" }, calendar: { sameDay: "[ma] LT[-kor]", nextDay: "[holnap] LT[-kor]", nextWeek: function() { return yc.call(this, !0) }, lastDay: "[tegnap] LT[-kor]", lastWeek: function() { return yc.call(this, !1) }, sameElse: "L" }, relativeTime: { future: "%s mÃºlva", past: "%s", s: rt, m: rt, mm: rt, h: rt, hh: rt, d: rt, dd: rt, M: rt, MM: rt, y: rt, yy: rt }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Armenian (hy-am)
    //! author : Armendarabyan : https://github.com/armendarabyan
    og = n.defineLocale("hy-am", {
        months: { format: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€Õ«_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€Õ«_Õ´Õ¡Ö€Õ¿Õ«_Õ¡ÕºÖ€Õ«Õ¬Õ«_Õ´Õ¡ÕµÕ«Õ½Õ«_Õ°Õ¸Ö‚Õ¶Õ«Õ½Õ«_Õ°Õ¸Ö‚Õ¬Õ«Õ½Õ«_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½Õ«_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€Õ«_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€Õ«".split("_"), standalone: "Õ°Õ¸Ö‚Õ¶Õ¾Õ¡Ö€_ÖƒÕ¥Õ¿Ö€Õ¾Õ¡Ö€_Õ´Õ¡Ö€Õ¿_Õ¡ÕºÖ€Õ«Õ¬_Õ´Õ¡ÕµÕ«Õ½_Õ°Õ¸Ö‚Õ¶Õ«Õ½_Õ°Õ¸Ö‚Õ¬Õ«Õ½_Ö…Õ£Õ¸Õ½Õ¿Õ¸Õ½_Õ½Õ¥ÕºÕ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ°Õ¸Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€_Õ¶Õ¸ÕµÕ¥Õ´Õ¢Õ¥Ö€_Õ¤Õ¥Õ¯Õ¿Õ¥Õ´Õ¢Õ¥Ö€".split("_") },
        monthsShort: "Õ°Õ¶Õ¾_ÖƒÕ¿Ö€_Õ´Ö€Õ¿_Õ¡ÕºÖ€_Õ´ÕµÕ½_Õ°Õ¶Õ½_Õ°Õ¬Õ½_Ö…Õ£Õ½_Õ½ÕºÕ¿_Õ°Õ¯Õ¿_Õ¶Õ´Õ¢_Õ¤Õ¯Õ¿".split("_"),
        weekdays: "Õ¯Õ«Ö€Õ¡Õ¯Õ«_Õ¥Ö€Õ¯Õ¸Ö‚Õ·Õ¡Õ¢Õ©Õ«_Õ¥Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ¹Õ¸Ö€Õ¥Ö„Õ·Õ¡Õ¢Õ©Õ«_Õ°Õ«Õ¶Õ£Õ·Õ¡Õ¢Õ©Õ«_Õ¸Ö‚Ö€Õ¢Õ¡Õ©_Õ·Õ¡Õ¢Õ¡Õ©".split("_"),
        weekdaysShort: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
        weekdaysMin: "Õ¯Ö€Õ¯_Õ¥Ö€Õ¯_Õ¥Ö€Ö„_Õ¹Ö€Ö„_Õ°Õ¶Õ£_Õ¸Ö‚Ö€Õ¢_Õ·Õ¢Õ©".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY Õ©.", LLL: "D MMMM YYYY Õ©., HH:mm", LLLL: "dddd, D MMMM YYYY Õ©., HH:mm" },
        calendar: { sameDay: "[Õ¡ÕµÕ½Ö…Ö€] LT", nextDay: "[Õ¾Õ¡Õ²Õ¨] LT", lastDay: "[Õ¥Ö€Õ¥Õ¯] LT", nextWeek: function() { return "dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT" }, lastWeek: function() { return "[Õ¡Õ¶ÖÕ¡Õ®] dddd [Ö…Ö€Õ¨ ÕªÕ¡Õ´Õ¨] LT" }, sameElse: "L" },
        relativeTime: { future: "%s Õ°Õ¥Õ¿Õ¸", past: "%s Õ¡Õ¼Õ¡Õ»", s: "Õ´Õ« Ö„Õ¡Õ¶Õ« Õ¾Õ¡ÕµÖ€Õ¯ÕµÕ¡Õ¶", m: "Ö€Õ¸ÕºÕ¥", mm: "%d Ö€Õ¸ÕºÕ¥", h: "ÕªÕ¡Õ´", hh: "%d ÕªÕ¡Õ´", d: "Ö…Ö€", dd: "%d Ö…Ö€", M: "Õ¡Õ´Õ«Õ½", MM: "%d Õ¡Õ´Õ«Õ½", y: "Õ¿Õ¡Ö€Õ«", yy: "%d Õ¿Õ¡Ö€Õ«" },
        meridiemParse: /Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡|Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡|ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶/,
        isPM: function(n) { return /^(ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡|Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶)$/.test(n) },
        meridiem: function(n) { return n < 4 ? "Õ£Õ«Õ·Õ¥Ö€Õ¾Õ¡" : n < 12 ? "Õ¡Õ¼Õ¡Õ¾Õ¸Õ¿Õ¾Õ¡" : n < 17 ? "ÖÕ¥Ö€Õ¥Õ¯Õ¾Õ¡" : "Õ¥Ö€Õ¥Õ¯Õ¸ÕµÕ¡Õ¶" },
        ordinalParse: /\d{1,2}|\d{1,2}-(Õ«Õ¶|Ö€Õ¤)/,
        ordinal: function(n, t) {
            switch (t) {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                    return n === 1 ? n + "-Õ«Õ¶" : n + "-Ö€Õ¤";
                default:
                    return n
            }
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : Bahasa Indonesia (id)
    //! author : Mohammad Satrio Utomo : https://github.com/tyok
    //! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan
    sg = n.defineLocale("id", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"), weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"), weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|siang|sore|malam/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "pagi") ? n : t === "siang" ? n >= 11 ? n : n + 12 : t === "sore" || t === "malam" ? n + 12 : void 0 }, meridiem: function(n) { return n < 11 ? "pagi" : n < 15 ? "siang" : n < 19 ? "sore" : "malam" }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Besok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kemarin pukul] LT", lastWeek: "dddd [lalu pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lalu", s: "beberapa detik", m: "semenit", mm: "%d menit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : icelandic (is)
    //! author : Hinrik Ã–rn SigurÃ°sson : https://github.com/hinrik
    hg = n.defineLocale("is", { months: "janÃºar_febrÃºar_mars_aprÃ­l_maÃ­_jÃºnÃ­_jÃºlÃ­_Ã¡gÃºst_september_oktÃ³ber_nÃ³vember_desember".split("_"), monthsShort: "jan_feb_mar_apr_maÃ­_jÃºn_jÃºl_Ã¡gÃº_sep_okt_nÃ³v_des".split("_"), weekdays: "sunnudagur_mÃ¡nudagur_Ã¾riÃ°judagur_miÃ°vikudagur_fimmtudagur_fÃ¶studagur_laugardagur".split("_"), weekdaysShort: "sun_mÃ¡n_Ã¾ri_miÃ°_fim_fÃ¶s_lau".split("_"), weekdaysMin: "Su_MÃ¡_Ãžr_Mi_Fi_FÃ¶_La".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd, D. MMMM YYYY [kl.] H:mm" }, calendar: { sameDay: "[Ã­ dag kl.] LT", nextDay: "[Ã¡ morgun kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[Ã­ gÃ¦r kl.] LT", lastWeek: "[sÃ­Ã°asta] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "eftir %s", past: "fyrir %s sÃ­Ã°an", s: lt, m: lt, mm: lt, h: "klukkustund", hh: lt, d: lt, dd: lt, M: lt, MM: lt, y: lt, yy: lt }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : italian (it)
    //! author : Lorenzo : https://github.com/aliem
    //! author: Mattia Larentis: https://github.com/nostalgiaz
    cg = n.defineLocale("it", {
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdays: "Domenica_LunedÃ¬_MartedÃ¬_MercoledÃ¬_GiovedÃ¬_VenerdÃ¬_Sabato".split("_"),
        weekdaysShort: "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
        weekdaysMin: "Do_Lu_Ma_Me_Gi_Ve_Sa".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: {
            sameDay: "[Oggi alle] LT",
            nextDay: "[Domani alle] LT",
            nextWeek: "dddd [alle] LT",
            lastDay: "[Ieri alle] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[la scorsa] dddd [alle] LT";
                    default:
                        return "[lo scorso] dddd [alle] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: function(n) { return (/^[0-9].+$/.test(n) ? "tra" : "in") + " " + n }, past: "%s fa", s: "alcuni secondi", m: "un minuto", mm: "%d minuti", h: "un'ora", hh: "%d ore", d: "un giorno", dd: "%d giorni", M: "un mese", MM: "%d mesi", y: "un anno", yy: "%d anni" },
        ordinalParse: /\d{1,2}Âº/,
        ordinal: "%dÂº",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : japanese (ja)
    //! author : LI Long : https://github.com/baryon
    lg = n.defineLocale("ja", { months: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"), monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"), weekdays: "æ—¥æ›œæ—¥_æœˆæ›œæ—¥_ç«æ›œæ—¥_æ°´æ›œæ—¥_æœ¨æ›œæ—¥_é‡‘æ›œæ—¥_åœŸæ›œæ—¥".split("_"), weekdaysShort: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"), weekdaysMin: "æ—¥_æœˆ_ç«_æ°´_æœ¨_é‡‘_åœŸ".split("_"), longDateFormat: { LT: "Ahæ™‚måˆ†", LTS: "Ahæ™‚måˆ†sç§’", L: "YYYY/MM/DD", LL: "YYYYå¹´MæœˆDæ—¥", LLL: "YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ†", LLLL: "YYYYå¹´MæœˆDæ—¥Ahæ™‚måˆ† dddd" }, meridiemParse: /åˆå‰|åˆå¾Œ/i, isPM: function(n) { return n === "åˆå¾Œ" }, meridiem: function(n) { return n < 12 ? "åˆå‰" : "åˆå¾Œ" }, calendar: { sameDay: "[ä»Šæ—¥] LT", nextDay: "[æ˜Žæ—¥] LT", nextWeek: "[æ¥é€±]dddd LT", lastDay: "[æ˜¨æ—¥] LT", lastWeek: "[å‰é€±]dddd LT", sameElse: "L" }, relativeTime: { future: "%så¾Œ", past: "%så‰", s: "æ•°ç§’", m: "1åˆ†", mm: "%dåˆ†", h: "1æ™‚é–“", hh: "%dæ™‚é–“", d: "1æ—¥", dd: "%dæ—¥", M: "1ãƒ¶æœˆ", MM: "%dãƒ¶æœˆ", y: "1å¹´", yy: "%då¹´" } });
    //! moment.js locale configuration
    //! locale : Boso Jowo (jv)
    //! author : Rony Lantip : https://github.com/lantip
    //! reference: http://jv.wikipedia.org/wiki/Basa_Jawa
    ag = n.defineLocale("jv", { months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"), monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"), weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"), weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"), weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /enjing|siyang|sonten|ndalu/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "enjing") ? n : t === "siyang" ? n >= 11 ? n : n + 12 : t === "sonten" || t === "ndalu" ? n + 12 : void 0 }, meridiem: function(n) { return n < 11 ? "enjing" : n < 15 ? "siyang" : n < 19 ? "sonten" : "ndalu" }, calendar: { sameDay: "[Dinten puniko pukul] LT", nextDay: "[Mbenjang pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kala wingi pukul] LT", lastWeek: "dddd [kepengker pukul] LT", sameElse: "L" }, relativeTime: { future: "wonten ing %s", past: "%s ingkang kepengker", s: "sawetawis detik", m: "setunggal menit", mm: "%d menit", h: "setunggal jam", hh: "%d jam", d: "sedinten", dd: "%d dinten", M: "sewulan", MM: "%d wulan", y: "setaun", yy: "%d taun" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Georgian (ka)
    //! author : Irakli Janiashvili : https://github.com/irakli-janiashvili
    vg = n.defineLocale("ka", { months: { standalone: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ˜_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ˜_áƒ›áƒáƒ áƒ¢áƒ˜_áƒáƒžáƒ áƒ˜áƒšáƒ˜_áƒ›áƒáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ˜_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ˜_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ˜_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ˜".split("_"), format: "áƒ˜áƒáƒœáƒ•áƒáƒ áƒ¡_áƒ—áƒ”áƒ‘áƒ”áƒ áƒ•áƒáƒšáƒ¡_áƒ›áƒáƒ áƒ¢áƒ¡_áƒáƒžáƒ áƒ˜áƒšáƒ˜áƒ¡_áƒ›áƒáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒœáƒ˜áƒ¡áƒ¡_áƒ˜áƒ•áƒšáƒ˜áƒ¡áƒ¡_áƒáƒ’áƒ•áƒ˜áƒ¡áƒ¢áƒ¡_áƒ¡áƒ”áƒ¥áƒ¢áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒáƒ¥áƒ¢áƒáƒ›áƒ‘áƒ”áƒ áƒ¡_áƒœáƒáƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡_áƒ“áƒ”áƒ™áƒ”áƒ›áƒ‘áƒ”áƒ áƒ¡".split("_") }, monthsShort: "áƒ˜áƒáƒœ_áƒ—áƒ”áƒ‘_áƒ›áƒáƒ _áƒáƒžáƒ _áƒ›áƒáƒ˜_áƒ˜áƒ•áƒœ_áƒ˜áƒ•áƒš_áƒáƒ’áƒ•_áƒ¡áƒ”áƒ¥_áƒáƒ¥áƒ¢_áƒœáƒáƒ”_áƒ“áƒ”áƒ™".split("_"), weekdays: { standalone: "áƒ™áƒ•áƒ˜áƒ áƒ_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ˜_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ˜_áƒ¨áƒáƒ‘áƒáƒ—áƒ˜".split("_"), format: "áƒ™áƒ•áƒ˜áƒ áƒáƒ¡_áƒáƒ áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ¡áƒáƒ›áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒáƒ—áƒ®áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒ®áƒ£áƒ—áƒ¨áƒáƒ‘áƒáƒ—áƒ¡_áƒžáƒáƒ áƒáƒ¡áƒ™áƒ”áƒ•áƒ¡_áƒ¨áƒáƒ‘áƒáƒ—áƒ¡".split("_"), isFormat: /(áƒ¬áƒ˜áƒœáƒ|áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’)/ }, weekdaysShort: "áƒ™áƒ•áƒ˜_áƒáƒ áƒ¨_áƒ¡áƒáƒ›_áƒáƒ—áƒ®_áƒ®áƒ£áƒ—_áƒžáƒáƒ _áƒ¨áƒáƒ‘".split("_"), weekdaysMin: "áƒ™áƒ•_áƒáƒ _áƒ¡áƒ_áƒáƒ—_áƒ®áƒ£_áƒžáƒ_áƒ¨áƒ".split("_"), longDateFormat: { LT: "h:mm A", LTS: "h:mm:ss A", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY h:mm A", LLLL: "dddd, D MMMM YYYY h:mm A" }, calendar: { sameDay: "[áƒ“áƒ¦áƒ”áƒ¡] LT[-áƒ–áƒ”]", nextDay: "[áƒ®áƒ•áƒáƒš] LT[-áƒ–áƒ”]", lastDay: "[áƒ’áƒ£áƒ¨áƒ˜áƒœ] LT[-áƒ–áƒ”]", nextWeek: "[áƒ¨áƒ”áƒ›áƒ“áƒ”áƒ’] dddd LT[-áƒ–áƒ”]", lastWeek: "[áƒ¬áƒ˜áƒœáƒ] dddd LT-áƒ–áƒ”", sameElse: "L" }, relativeTime: { future: function(n) { return /(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ¬áƒ”áƒšáƒ˜)/.test(n) ? n.replace(/áƒ˜$/, "áƒ¨áƒ˜") : n + "áƒ¨áƒ˜" }, past: function(n) { return /(áƒ¬áƒáƒ›áƒ˜|áƒ¬áƒ£áƒ—áƒ˜|áƒ¡áƒáƒáƒ—áƒ˜|áƒ“áƒ¦áƒ”|áƒ—áƒ•áƒ”)/.test(n) ? n.replace(/(áƒ˜|áƒ”)$/, "áƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : /áƒ¬áƒ”áƒšáƒ˜/.test(n) ? n.replace(/áƒ¬áƒ”áƒšáƒ˜$/, "áƒ¬áƒšáƒ˜áƒ¡ áƒ¬áƒ˜áƒœ") : void 0 }, s: "áƒ áƒáƒ›áƒ“áƒ”áƒœáƒ˜áƒ›áƒ” áƒ¬áƒáƒ›áƒ˜", m: "áƒ¬áƒ£áƒ—áƒ˜", mm: "%d áƒ¬áƒ£áƒ—áƒ˜", h: "áƒ¡áƒáƒáƒ—áƒ˜", hh: "%d áƒ¡áƒáƒáƒ—áƒ˜", d: "áƒ“áƒ¦áƒ”", dd: "%d áƒ“áƒ¦áƒ”", M: "áƒ—áƒ•áƒ”", MM: "%d áƒ—áƒ•áƒ”", y: "áƒ¬áƒ”áƒšáƒ˜", yy: "%d áƒ¬áƒ”áƒšáƒ˜" }, ordinalParse: /0|1-áƒšáƒ˜|áƒ›áƒ”-\d{1,2}|\d{1,2}-áƒ”/, ordinal: function(n) { return n === 0 ? n : n === 1 ? n + "-áƒšáƒ˜" : n < 20 || n <= 100 && n % 20 == 0 || n % 100 == 0 ? "áƒ›áƒ”-" + n : n + "-áƒ”" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : kazakh (kk)
    //! authors : Nurlan Rakhimzhanov : https://github.com/nurlan
    ef = { 0: "-ÑˆÑ–", 1: "-ÑˆÑ–", 2: "-ÑˆÑ–", 3: "-ÑˆÑ–", 4: "-ÑˆÑ–", 5: "-ÑˆÑ–", 6: "-ÑˆÑ‹", 7: "-ÑˆÑ–", 8: "-ÑˆÑ–", 9: "-ÑˆÑ‹", 10: "-ÑˆÑ‹", 20: "-ÑˆÑ‹", 30: "-ÑˆÑ‹", 40: "-ÑˆÑ‹", 50: "-ÑˆÑ–", 60: "-ÑˆÑ‹", 70: "-ÑˆÑ–", 80: "-ÑˆÑ–", 90: "-ÑˆÑ‹", 100: "-ÑˆÑ–" };
    yg = n.defineLocale("kk", {
        months: "ÒšÐ°Ò£Ñ‚Ð°Ñ€_ÐÒ›Ð¿Ð°Ð½_ÐÐ°ÑƒÑ€Ñ‹Ð·_Ð¡Ó™ÑƒÑ–Ñ€_ÐœÐ°Ð¼Ñ‹Ñ€_ÐœÐ°ÑƒÑÑ‹Ð¼_Ð¨Ñ–Ð»Ð´Ðµ_Ð¢Ð°Ð¼Ñ‹Ð·_ÒšÑ‹Ñ€ÐºÒ¯Ð¹ÐµÐº_ÒšÐ°Ð·Ð°Ð½_ÒšÐ°Ñ€Ð°ÑˆÐ°_Ð–ÐµÐ»Ñ‚Ð¾Ò›ÑÐ°Ð½".split("_"),
        monthsShort: "ÒšÐ°Ò£_ÐÒ›Ð¿_ÐÐ°Ñƒ_Ð¡Ó™Ñƒ_ÐœÐ°Ð¼_ÐœÐ°Ñƒ_Ð¨Ñ–Ð»_Ð¢Ð°Ð¼_ÒšÑ‹Ñ€_ÒšÐ°Ð·_ÒšÐ°Ñ€_Ð–ÐµÐ»".split("_"),
        weekdays: "Ð–ÐµÐºÑÐµÐ½Ð±Ñ–_Ð”Ò¯Ð¹ÑÐµÐ½Ð±Ñ–_Ð¡ÐµÐ¹ÑÐµÐ½Ð±Ñ–_Ð¡Ó™Ñ€ÑÐµÐ½Ð±Ñ–_Ð‘ÐµÐ¹ÑÐµÐ½Ð±Ñ–_Ð–Ò±Ð¼Ð°_Ð¡ÐµÐ½Ð±Ñ–".split("_"),
        weekdaysShort: "Ð–ÐµÐº_Ð”Ò¯Ð¹_Ð¡ÐµÐ¹_Ð¡Ó™Ñ€_Ð‘ÐµÐ¹_Ð–Ò±Ð¼_Ð¡ÐµÐ½".split("_"),
        weekdaysMin: "Ð–Ðº_Ð”Ð¹_Ð¡Ð¹_Ð¡Ñ€_Ð‘Ð¹_Ð–Ð¼_Ð¡Ð½".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[Ð‘Ò¯Ð³Ñ–Ð½ ÑÐ°Ò“Ð°Ñ‚] LT", nextDay: "[Ð•Ñ€Ñ‚ÐµÒ£ ÑÐ°Ò“Ð°Ñ‚] LT", nextWeek: "dddd [ÑÐ°Ò“Ð°Ñ‚] LT", lastDay: "[ÐšÐµÑˆÐµ ÑÐ°Ò“Ð°Ñ‚] LT", lastWeek: "[Ó¨Ñ‚ÐºÐµÐ½ Ð°Ð¿Ñ‚Ð°Ð½Ñ‹Ò£] dddd [ÑÐ°Ò“Ð°Ñ‚] LT", sameElse: "L" },
        relativeTime: { future: "%s Ñ–ÑˆÑ–Ð½Ð´Ðµ", past: "%s Ð±Ò±Ñ€Ñ‹Ð½", s: "Ð±Ñ–Ñ€Ð½ÐµÑˆÐµ ÑÐµÐºÑƒÐ½Ð´", m: "Ð±Ñ–Ñ€ Ð¼Ð¸Ð½ÑƒÑ‚", mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚", h: "Ð±Ñ–Ñ€ ÑÐ°Ò“Ð°Ñ‚", hh: "%d ÑÐ°Ò“Ð°Ñ‚", d: "Ð±Ñ–Ñ€ ÐºÒ¯Ð½", dd: "%d ÐºÒ¯Ð½", M: "Ð±Ñ–Ñ€ Ð°Ð¹", MM: "%d Ð°Ð¹", y: "Ð±Ñ–Ñ€ Ð¶Ñ‹Ð»", yy: "%d Ð¶Ñ‹Ð»" },
        ordinalParse: /\d{1,2}-(ÑˆÑ–|ÑˆÑ‹)/,
        ordinal: function(n) {
            var t = n % 10,
                i = n >= 100 ? 100 : null;
            return n + (ef[n] || ef[t] || ef[i])
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : khmer (km)
    //! author : Kruy Vanna : https://github.com/kruyvanna
    pg = n.defineLocale("km", { months: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž·áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"), monthsShort: "áž˜áž€ážšáž¶_áž€áž»áž˜áŸ’áž—áŸˆ_áž˜áž·áž“áž¶_áž˜áŸážŸáž¶_áž§ážŸáž—áž¶_áž˜áž·ážáž»áž“áž¶_áž€áž€áŸ’áž€ážŠáž¶_ážŸáž¸áž áž¶_áž€áž‰áŸ’áž‰áž¶_ážáž»áž›áž¶_ážœáž·áž…áŸ’áž†áž·áž€áž¶_áž’áŸ’áž“áž¼".split("_"), weekdays: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"), weekdaysShort: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"), weekdaysMin: "áž¢áž¶áž‘áž·ážáŸ’áž™_áž…áŸáž“áŸ’áž‘_áž¢áž„áŸ’áž‚áž¶ážš_áž–áž»áž’_áž–áŸ’ážšáž ážŸáŸ’áž”ážáž·áŸ_ážŸáž»áž€áŸ’ážš_ážŸáŸ…ážšáŸ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[ážáŸ’áž„áŸƒáž“áŸáŸ‡ áž˜áŸ‰áŸ„áž„] LT", nextDay: "[ážŸáŸ’áž¢áŸ‚áž€ áž˜áŸ‰áŸ„áž„] LT", nextWeek: "dddd [áž˜áŸ‰áŸ„áž„] LT", lastDay: "[áž˜áŸ’ážŸáž·áž›áž˜áž·áž‰ áž˜áŸ‰áŸ„áž„] LT", lastWeek: "dddd [ážŸáž”áŸ’ážáž¶áž áŸáž˜áž»áž“] [áž˜áŸ‰áŸ„áž„] LT", sameElse: "L" }, relativeTime: { future: "%sáž‘áŸ€áž", past: "%sáž˜áž»áž“", s: "áž”áŸ‰áž»áž“áŸ’áž˜áž¶áž“ážœáž·áž“áž¶áž‘áž¸", m: "áž˜áž½áž™áž“áž¶áž‘áž¸", mm: "%d áž“áž¶áž‘áž¸", h: "áž˜áž½áž™áž˜áŸ‰áŸ„áž„", hh: "%d áž˜áŸ‰áŸ„áž„", d: "áž˜áž½áž™ážáŸ’áž„áŸƒ", dd: "%d ážáŸ’áž„áŸƒ", M: "áž˜áž½áž™ážáŸ‚", MM: "%d ážáŸ‚", y: "áž˜áž½áž™áž†áŸ’áž“áž¶áŸ†", yy: "%d áž†áŸ’áž“áž¶áŸ†" }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : korean (ko)
    //!
    //! authors
    //!
    //! - Kyungwook, Park : https://github.com/kyungw00k
    //! - Jeeeyul Lee <jeeeyul@gmail.com>
    wg = n.defineLocale("ko", { months: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"), monthsShort: "1ì›”_2ì›”_3ì›”_4ì›”_5ì›”_6ì›”_7ì›”_8ì›”_9ì›”_10ì›”_11ì›”_12ì›”".split("_"), weekdays: "ì¼ìš”ì¼_ì›”ìš”ì¼_í™”ìš”ì¼_ìˆ˜ìš”ì¼_ëª©ìš”ì¼_ê¸ˆìš”ì¼_í† ìš”ì¼".split("_"), weekdaysShort: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"), weekdaysMin: "ì¼_ì›”_í™”_ìˆ˜_ëª©_ê¸ˆ_í† ".split("_"), longDateFormat: { LT: "A hì‹œ më¶„", LTS: "A hì‹œ më¶„ sì´ˆ", L: "YYYY.MM.DD", LL: "YYYYë…„ MMMM Dì¼", LLL: "YYYYë…„ MMMM Dì¼ A hì‹œ më¶„", LLLL: "YYYYë…„ MMMM Dì¼ dddd A hì‹œ më¶„" }, calendar: { sameDay: "ì˜¤ëŠ˜ LT", nextDay: "ë‚´ì¼ LT", nextWeek: "dddd LT", lastDay: "ì–´ì œ LT", lastWeek: "ì§€ë‚œì£¼ dddd LT", sameElse: "L" }, relativeTime: { future: "%s í›„", past: "%s ì „", s: "ëª‡ì´ˆ", ss: "%dì´ˆ", m: "ì¼ë¶„", mm: "%dë¶„", h: "í•œì‹œê°„", hh: "%dì‹œê°„", d: "í•˜ë£¨", dd: "%dì¼", M: "í•œë‹¬", MM: "%dë‹¬", y: "ì¼ë…„", yy: "%dë…„" }, ordinalParse: /\d{1,2}ì¼/, ordinal: "%dì¼", meridiemParse: /ì˜¤ì „|ì˜¤í›„/, isPM: function(n) { return n === "ì˜¤í›„" }, meridiem: function(n) { return n < 12 ? "ì˜¤ì „" : "ì˜¤í›„" } });
    //! moment.js locale configuration
    //! locale : Luxembourgish (lb)
    //! author : mweimerskirch : https://github.com/mweimerskirch, David Raison : https://github.com/kwisatz
    dg = n.defineLocale("lb", {
        months: "Januar_Februar_MÃ¤erz_AbrÃ«ll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdays: "Sonndeg_MÃ©indeg_DÃ«nschdeg_MÃ«ttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        weekdaysShort: "So._MÃ©._DÃ«._MÃ«._Do._Fr._Sa.".split("_"),
        weekdaysMin: "So_MÃ©_DÃ«_MÃ«_Do_Fr_Sa".split("_"),
        longDateFormat: { LT: "H:mm [Auer]", LTS: "H:mm:ss [Auer]", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm [Auer]", LLLL: "dddd, D. MMMM YYYY H:mm [Auer]" },
        calendar: {
            sameDay: "[Haut um] LT",
            sameElse: "L",
            nextDay: "[Muer um] LT",
            nextWeek: "dddd [um] LT",
            lastDay: "[GÃ«schter um] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 2:
                    case 4:
                        return "[Leschten] dddd [um] LT";
                    default:
                        return "[Leschte] dddd [um] LT"
                }
            }
        },
        relativeTime: { future: bg, past: kg, s: "e puer Sekonnen", m: kr, mm: "%d Minutten", h: kr, hh: "%d Stonnen", d: kr, dd: "%d Deeg", M: kr, MM: "%d MÃ©int", y: kr, yy: "%d Joer" },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : lao (lo)
    //! author : Ryan Hart : https://github.com/ryanhart2
    gg = n.defineLocale("lo", { months: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"), monthsShort: "àº¡àº±àº‡àºàº­àº™_àºàº¸àº¡àºžàº²_àº¡àºµàº™àº²_à»€àº¡àºªàº²_àºžàº¶àº”àºªàº°àºžàº²_àº¡àº´àº–àº¸àº™àº²_àºà»àº¥àº°àºàº»àº”_àºªàº´àº‡àº«àº²_àºàº±àº™àºàº²_àº•àº¸àº¥àº²_àºžàº°àºˆàº´àº_àº—àº±àº™àº§àº²".split("_"), weekdays: "àº­àº²àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"), weekdaysShort: "àº—àº´àº”_àºˆàº±àº™_àº­àº±àº‡àº„àº²àº™_àºžàº¸àº”_àºžàº°àº«àº±àº”_àºªàº¸àº_à»€àºªàº»àº²".split("_"), weekdaysMin: "àº—_àºˆ_àº­àº„_àºž_àºžàº«_àºªàº_àºª".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "àº§àº±àº™dddd D MMMM YYYY HH:mm" }, meridiemParse: /àº•àº­àº™à»€àºŠàº»à»‰àº²|àº•àº­àº™à»àº¥àº‡/, isPM: function(n) { return n === "àº•àº­àº™à»àº¥àº‡" }, meridiem: function(n) { return n < 12 ? "àº•àº­àº™à»€àºŠàº»à»‰àº²" : "àº•àº­àº™à»àº¥àº‡" }, calendar: { sameDay: "[àº¡àº·à»‰àº™àºµà»‰à»€àº§àº¥àº²] LT", nextDay: "[àº¡àº·à»‰àº­àº·à»ˆàº™à»€àº§àº¥àº²] LT", nextWeek: "[àº§àº±àº™]dddd[à»œà»‰àº²à»€àº§àº¥àº²] LT", lastDay: "[àº¡àº·à»‰àº§àº²àº™àº™àºµà»‰à»€àº§àº¥àº²] LT", lastWeek: "[àº§àº±àº™]dddd[à»àº¥à»‰àº§àº™àºµà»‰à»€àº§àº¥àº²] LT", sameElse: "L" }, relativeTime: { future: "àº­àºµàº %s", past: "%sàºœà»ˆàº²àº™àº¡àº²", s: "àºšà»à»ˆà»€àº—àº»à»ˆàº²à»ƒàº”àº§àº´àº™àº²àº—àºµ", m: "1 àº™àº²àº—àºµ", mm: "%d àº™àº²àº—àºµ", h: "1 àºŠàº»à»ˆàº§à»‚àº¡àº‡", hh: "%d àºŠàº»à»ˆàº§à»‚àº¡àº‡", d: "1 àº¡àº·à»‰", dd: "%d àº¡àº·à»‰", M: "1 à»€àº”àº·àº­àº™", MM: "%d à»€àº”àº·àº­àº™", y: "1 àº›àºµ", yy: "%d àº›àºµ" }, ordinalParse: /(àº—àºµà»ˆ)\d{1,2}/, ordinal: function(n) { return "àº—àºµà»ˆ" + n } });
    //! moment.js locale configuration
    //! locale : Lithuanian (lt)
    //! author : Mindaugas MozÅ«ras : https://github.com/mmozuras
    pc = { m: "minutÄ—_minutÄ—s_minutÄ™", mm: "minutÄ—s_minuÄiÅ³_minutes", h: "valanda_valandos_valandÄ…", hh: "valandos_valandÅ³_valandas", d: "diena_dienos_dienÄ…", dd: "dienos_dienÅ³_dienas", M: "mÄ—nuo_mÄ—nesio_mÄ—nesÄ¯", MM: "mÄ—nesiai_mÄ—nesiÅ³_mÄ—nesius", y: "metai_metÅ³_metus", yy: "metai_metÅ³_metus" };
    tn = n.defineLocale("lt", { months: { format: "sausio_vasario_kovo_balandÅ¾io_geguÅ¾Ä—s_birÅ¾elio_liepos_rugpjÅ«Äio_rugsÄ—jo_spalio_lapkriÄio_gruodÅ¾io".split("_"), standalone: "sausis_vasaris_kovas_balandis_geguÅ¾Ä—_birÅ¾elis_liepa_rugpjÅ«tis_rugsÄ—jis_spalis_lapkritis_gruodis".split("_") }, monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"), weekdays: { format: "sekmadienÄ¯_pirmadienÄ¯_antradienÄ¯_treÄiadienÄ¯_ketvirtadienÄ¯_penktadienÄ¯_Å¡eÅ¡tadienÄ¯".split("_"), standalone: "sekmadienis_pirmadienis_antradienis_treÄiadienis_ketvirtadienis_penktadienis_Å¡eÅ¡tadienis".split("_"), isFormat: /dddd HH:mm/ }, weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Å eÅ¡".split("_"), weekdaysMin: "S_P_A_T_K_Pn_Å ".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "YYYY [m.] MMMM D [d.]", LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]", LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]", l: "YYYY-MM-DD", ll: "YYYY [m.] MMMM D [d.]", lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]", llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]" }, calendar: { sameDay: "[Å iandien] LT", nextDay: "[Rytoj] LT", nextWeek: "dddd LT", lastDay: "[Vakar] LT", lastWeek: "[PraÄ—jusÄ¯] dddd LT", sameElse: "L" }, relativeTime: { future: "po %s", past: "prieÅ¡ %s", s: nn, m: ir, mm: dr, h: ir, hh: dr, d: ir, dd: dr, M: ir, MM: dr, y: ir, yy: dr }, ordinalParse: /\d{1,2}-oji/, ordinal: function(n) { return n + "-oji" }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : latvian (lv)
    //! author : Kristaps Karlsons : https://github.com/skakri
    //! author : JÄnis Elmeris : https://github.com/JanisE
    ke = { m: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"), mm: "minÅ«tes_minÅ«tÄ“m_minÅ«te_minÅ«tes".split("_"), h: "stundas_stundÄm_stunda_stundas".split("_"), hh: "stundas_stundÄm_stunda_stundas".split("_"), d: "dienas_dienÄm_diena_dienas".split("_"), dd: "dienas_dienÄm_diena_dienas".split("_"), M: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"), MM: "mÄ“neÅ¡a_mÄ“neÅ¡iem_mÄ“nesis_mÄ“neÅ¡i".split("_"), y: "gada_gadiem_gads_gadi".split("_"), yy: "gada_gadiem_gads_gadi".split("_") };
    un = n.defineLocale("lv", { months: "janvÄris_februÄris_marts_aprÄ«lis_maijs_jÅ«nijs_jÅ«lijs_augusts_septembris_oktobris_novembris_decembris".split("_"), monthsShort: "jan_feb_mar_apr_mai_jÅ«n_jÅ«l_aug_sep_okt_nov_dec".split("_"), weekdays: "svÄ“tdiena_pirmdiena_otrdiena_treÅ¡diena_ceturtdiena_piektdiena_sestdiena".split("_"), weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"), weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY.", LL: "YYYY. [gada] D. MMMM", LLL: "YYYY. [gada] D. MMMM, HH:mm", LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm" }, calendar: { sameDay: "[Å odien pulksten] LT", nextDay: "[RÄ«t pulksten] LT", nextWeek: "dddd [pulksten] LT", lastDay: "[Vakar pulksten] LT", lastWeek: "[PagÄjuÅ¡Ä] dddd [pulksten] LT", sameElse: "L" }, relativeTime: { future: "pÄ“c %s", past: "pirms %s", s: rn, m: nu, mm: gr, h: nu, hh: gr, d: nu, dd: gr, M: nu, MM: gr, y: nu, yy: gr }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Montenegrin (me)
    //! author : Miodrag NikaÄ <miodrag@restartit.me> : https://github.com/miodragnikac
    at = { words: { m: ["jedan minut", "jednog minuta"], mm: ["minut", "minuta", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mjesec", "mjeseca", "mjeseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function(n, t) { return n === 1 ? t[0] : n >= 2 && n <= 4 ? t[1] : t[2] }, translate: function(n, t, i) { var r = at.words[i]; return i.length === 1 ? t ? r[0] : r[1] : n + " " + at.correctGrammaticalCase(n, r) } };
    fn = n.defineLocale("me", {
        months: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"],
        monthsShort: ["jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec."],
        weekdays: ["nedjelja", "ponedjeljak", "utorak", "srijeda", "Äetvrtak", "petak", "subota"],
        weekdaysShort: ["ned.", "pon.", "uto.", "sri.", "Äet.", "pet.", "sub."],
        weekdaysMin: ["ne", "po", "ut", "sr", "Äe", "pe", "su"],
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sjutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedjelju] [u] LT";
                    case 3:
                        return "[u] [srijedu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄe u] LT",
            lastWeek: function() { return ["[proÅ¡le] [nedjelje] [u] LT", "[proÅ¡log] [ponedjeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srijede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"][this.day()] },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "prije %s", s: "nekoliko sekundi", m: at.translate, mm: at.translate, h: at.translate, hh: at.translate, d: "dan", dd: at.translate, M: "mjesec", MM: at.translate, y: "godinu", yy: at.translate },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : macedonian (mk)
    //! author : Borislav Mickov : https://github.com/B0k0
    en = n.defineLocale("mk", {
        months: "Ñ˜Ð°Ð½ÑƒÐ°Ñ€Ð¸_Ñ„ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€Ð¸Ð»_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½Ð¸_Ñ˜ÑƒÐ»Ð¸_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸_Ð¾ÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸_Ð½Ð¾ÐµÐ¼Ð²Ñ€Ð¸_Ð´ÐµÐºÐµÐ¼Ð²Ñ€Ð¸".split("_"),
        monthsShort: "Ñ˜Ð°Ð½_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ˜_Ñ˜ÑƒÐ½_Ñ˜ÑƒÐ»_Ð°Ð²Ð³_ÑÐµÐ¿_Ð¾ÐºÑ‚_Ð½Ð¾Ðµ_Ð´ÐµÐº".split("_"),
        weekdays: "Ð½ÐµÐ´ÐµÐ»Ð°_Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº_Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_ÑÑ€ÐµÐ´Ð°_Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð¾Ðº_Ð¿ÐµÑ‚Ð¾Ðº_ÑÐ°Ð±Ð¾Ñ‚Ð°".split("_"),
        weekdaysShort: "Ð½ÐµÐ´_Ð¿Ð¾Ð½_Ð²Ñ‚Ð¾_ÑÑ€Ðµ_Ñ‡ÐµÑ‚_Ð¿ÐµÑ‚_ÑÐ°Ð±".split("_"),
        weekdaysMin: "Ð½e_Ð¿o_Ð²Ñ‚_ÑÑ€_Ñ‡Ðµ_Ð¿Ðµ_Ña".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "D.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[Ð”ÐµÐ½ÐµÑ Ð²Ð¾] LT",
            nextDay: "[Ð£Ñ‚Ñ€Ðµ Ð²Ð¾] LT",
            nextWeek: "[Ð’Ð¾] dddd [Ð²Ð¾] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²Ð¾] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 6:
                        return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð°Ñ‚Ð°] dddd [Ð²Ð¾] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ð˜Ð·Ð¼Ð¸Ð½Ð°Ñ‚Ð¸Ð¾Ñ‚] dddd [Ð²Ð¾] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "Ð¿Ð¾ÑÐ»Ðµ %s", past: "Ð¿Ñ€ÐµÐ´ %s", s: "Ð½ÐµÐºÐ¾Ð»ÐºÑƒ ÑÐµÐºÑƒÐ½Ð´Ð¸", m: "Ð¼Ð¸Ð½ÑƒÑ‚Ð°", mm: "%d Ð¼Ð¸Ð½ÑƒÑ‚Ð¸", h: "Ñ‡Ð°Ñ", hh: "%d Ñ‡Ð°ÑÐ°", d: "Ð´ÐµÐ½", dd: "%d Ð´ÐµÐ½Ð°", M: "Ð¼ÐµÑÐµÑ†", MM: "%d Ð¼ÐµÑÐµÑ†Ð¸", y: "Ð³Ð¾Ð´Ð¸Ð½Ð°", yy: "%d Ð³Ð¾Ð´Ð¸Ð½Ð¸" },
        ordinalParse: /\d{1,2}-(ÐµÐ²|ÐµÐ½|Ñ‚Ð¸|Ð²Ð¸|Ñ€Ð¸|Ð¼Ð¸)/,
        ordinal: function(n) {
            var t = n % 10,
                i = n % 100;
            return n === 0 ? n + "-ÐµÐ²" : i === 0 ? n + "-ÐµÐ½" : i > 10 && i < 20 ? n + "-Ñ‚Ð¸" : t === 1 ? n + "-Ð²Ð¸" : t === 2 ? n + "-Ñ€Ð¸" : t === 7 || t === 8 ? n + "-Ð¼Ð¸" : n + "-Ñ‚Ð¸"
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : malayalam (ml)
    //! author : Floyd Pink : https://github.com/floydpink
    on = n.defineLocale("ml", { months: "à´œà´¨àµà´µà´°à´¿_à´«àµ†à´¬àµà´°àµà´µà´°à´¿_à´®à´¾àµ¼à´šàµà´šàµ_à´à´ªàµà´°à´¿àµ½_à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ_à´“à´—à´¸àµà´±àµà´±àµ_à´¸àµ†à´ªàµà´±àµà´±à´‚à´¬àµ¼_à´’à´•àµà´Ÿàµ‹à´¬àµ¼_à´¨à´µà´‚à´¬àµ¼_à´¡à´¿à´¸à´‚à´¬àµ¼".split("_"), monthsShort: "à´œà´¨àµ._à´«àµ†à´¬àµà´°àµ._à´®à´¾àµ¼._à´à´ªàµà´°à´¿._à´®àµ‡à´¯àµ_à´œàµ‚àµº_à´œàµ‚à´²àµˆ._à´“à´—._à´¸àµ†à´ªàµà´±àµà´±._à´’à´•àµà´Ÿàµ‹._à´¨à´µà´‚._à´¡à´¿à´¸à´‚.".split("_"), weekdays: "à´žà´¾à´¯à´±à´¾à´´àµà´š_à´¤à´¿à´™àµà´•à´³à´¾à´´àµà´š_à´šàµŠà´µàµà´µà´¾à´´àµà´š_à´¬àµà´§à´¨à´¾à´´àµà´š_à´µàµà´¯à´¾à´´à´¾à´´àµà´š_à´µàµ†à´³àµà´³à´¿à´¯à´¾à´´àµà´š_à´¶à´¨à´¿à´¯à´¾à´´àµà´š".split("_"), weekdaysShort: "à´žà´¾à´¯àµ¼_à´¤à´¿à´™àµà´•àµ¾_à´šàµŠà´µàµà´µ_à´¬àµà´§àµ»_à´µàµà´¯à´¾à´´à´‚_à´µàµ†à´³àµà´³à´¿_à´¶à´¨à´¿".split("_"), weekdaysMin: "à´žà´¾_à´¤à´¿_à´šàµŠ_à´¬àµ_à´µàµà´¯à´¾_à´µàµ†_à´¶".split("_"), longDateFormat: { LT: "A h:mm -à´¨àµ", LTS: "A h:mm:ss -à´¨àµ", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm -à´¨àµ", LLLL: "dddd, D MMMM YYYY, A h:mm -à´¨àµ" }, calendar: { sameDay: "[à´‡à´¨àµà´¨àµ] LT", nextDay: "[à´¨à´¾à´³àµ†] LT", nextWeek: "dddd, LT", lastDay: "[à´‡à´¨àµà´¨à´²àµ†] LT", lastWeek: "[à´•à´´à´¿à´žàµà´ž] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à´•à´´à´¿à´žàµà´žàµ", past: "%s à´®àµàµ»à´ªàµ", s: "à´…àµ½à´ª à´¨à´¿à´®à´¿à´·à´™àµà´™àµ¾", m: "à´’à´°àµ à´®à´¿à´¨à´¿à´±àµà´±àµ", mm: "%d à´®à´¿à´¨à´¿à´±àµà´±àµ", h: "à´’à´°àµ à´®à´£à´¿à´•àµà´•àµ‚àµ¼", hh: "%d à´®à´£à´¿à´•àµà´•àµ‚àµ¼", d: "à´’à´°àµ à´¦à´¿à´µà´¸à´‚", dd: "%d à´¦à´¿à´µà´¸à´‚", M: "à´’à´°àµ à´®à´¾à´¸à´‚", MM: "%d à´®à´¾à´¸à´‚", y: "à´’à´°àµ à´µàµ¼à´·à´‚", yy: "%d à´µàµ¼à´·à´‚" }, meridiemParse: /à´°à´¾à´¤àµà´°à´¿|à´°à´¾à´µà´¿à´²àµ†|à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ|à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚|à´°à´¾à´¤àµà´°à´¿/i, isPM: function(n) { return /^(à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ|à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚|à´°à´¾à´¤àµà´°à´¿)$/.test(n) }, meridiem: function(n) { return n < 4 ? "à´°à´¾à´¤àµà´°à´¿" : n < 12 ? "à´°à´¾à´µà´¿à´²àµ†" : n < 17 ? "à´‰à´šàµà´š à´•à´´à´¿à´žàµà´žàµ" : n < 20 ? "à´µàµˆà´•àµà´¨àµà´¨àµ‡à´°à´‚" : "à´°à´¾à´¤àµà´°à´¿" } });
    //! moment.js locale configuration
    //! locale : Marathi (mr)
    //! author : Harshad Kale : https://github.com/kalehv
    //! author : Vivek Athalye : https://github.com/vnathalye
    kc = { "1": "à¥§", "2": "à¥¨", "3": "à¥©", "4": "à¥ª", "5": "à¥«", "6": "à¥¬", "7": "à¥­", "8": "à¥®", "9": "à¥¯", "0": "à¥¦" };
    dc = { "à¥§": "1", "à¥¨": "2", "à¥©": "3", "à¥ª": "4", "à¥«": "5", "à¥¬": "6", "à¥­": "7", "à¥®": "8", "à¥¯": "9", "à¥¦": "0" };
    sn = n.defineLocale("mr", { months: "à¤œà¤¾à¤¨à¥‡à¤µà¤¾à¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤¾à¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤à¤ªà¥à¤°à¤¿à¤²_à¤®à¥‡_à¤œà¥‚à¤¨_à¤œà¥à¤²à¥ˆ_à¤‘à¤—à¤¸à¥à¤Ÿ_à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚à¤¬à¤°_à¤‘à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤‚à¤¬à¤°".split("_"), monthsShort: "à¤œà¤¾à¤¨à¥‡._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š._à¤à¤ªà¥à¤°à¤¿._à¤®à¥‡._à¤œà¥‚à¤¨._à¤œà¥à¤²à¥ˆ._à¤‘à¤—._à¤¸à¤ªà¥à¤Ÿà¥‡à¤‚._à¤‘à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤µà¥à¤¹à¥‡à¤‚._à¤¡à¤¿à¤¸à¥‡à¤‚.".split("_"), weekdays: "à¤°à¤µà¤¿à¤µà¤¾à¤°_à¤¸à¥‹à¤®à¤µà¤¾à¤°_à¤®à¤‚à¤—à¤³à¤µà¤¾à¤°_à¤¬à¥à¤§à¤µà¤¾à¤°_à¤—à¥à¤°à¥‚à¤µà¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°_à¤¶à¤¨à¤¿à¤µà¤¾à¤°".split("_"), weekdaysShort: "à¤°à¤µà¤¿_à¤¸à¥‹à¤®_à¤®à¤‚à¤—à¤³_à¤¬à¥à¤§_à¤—à¥à¤°à¥‚_à¤¶à¥à¤•à¥à¤°_à¤¶à¤¨à¤¿".split("_"), weekdaysMin: "à¤°_à¤¸à¥‹_à¤®à¤‚_à¤¬à¥_à¤—à¥_à¤¶à¥_à¤¶".split("_"), longDateFormat: { LT: "A h:mm à¤µà¤¾à¤œà¤¤à¤¾", LTS: "A h:mm:ss à¤µà¤¾à¤œà¤¤à¤¾", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾", LLLL: "dddd, D MMMM YYYY, A h:mm à¤µà¤¾à¤œà¤¤à¤¾" }, calendar: { sameDay: "[à¤†à¤œ] LT", nextDay: "[à¤‰à¤¦à¥à¤¯à¤¾] LT", nextWeek: "dddd, LT", lastDay: "[à¤•à¤¾à¤²] LT", lastWeek: "[à¤®à¤¾à¤—à¥€à¤²] dddd, LT", sameElse: "L" }, relativeTime: { future: "%sà¤®à¤§à¥à¤¯à¥‡", past: "%sà¤ªà¥‚à¤°à¥à¤µà¥€", s: ut, m: ut, mm: ut, h: ut, hh: ut, d: ut, dd: ut, M: ut, MM: ut, y: ut, yy: ut }, preparse: function(n) { return n.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function(n) { return dc[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return kc[n] }) }, meridiemParse: /à¤°à¤¾à¤¤à¥à¤°à¥€|à¤¸à¤•à¤¾à¤³à¥€|à¤¦à¥à¤ªà¤¾à¤°à¥€|à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "à¤°à¤¾à¤¤à¥à¤°à¥€") ? n < 4 ? n : n + 12 : t === "à¤¸à¤•à¤¾à¤³à¥€" ? n : t === "à¤¦à¥à¤ªà¤¾à¤°à¥€" ? n >= 10 ? n : n + 12 : t === "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" ? n + 12 : void 0 }, meridiem: function(n) { return n < 4 ? "à¤°à¤¾à¤¤à¥à¤°à¥€" : n < 10 ? "à¤¸à¤•à¤¾à¤³à¥€" : n < 17 ? "à¤¦à¥à¤ªà¤¾à¤°à¥€" : n < 20 ? "à¤¸à¤¾à¤¯à¤‚à¤•à¤¾à¤³à¥€" : "à¤°à¤¾à¤¤à¥à¤°à¥€" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : Bahasa Malaysia (ms-MY)
    //! author : Weldan Jamili : https://github.com/weldan
    hn = n.defineLocale("ms-my", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "pagi") ? n : t === "tengahari" ? n >= 11 ? n : n + 12 : t === "petang" || t === "malam" ? n + 12 : void 0 }, meridiem: function(n) { return n < 11 ? "pagi" : n < 15 ? "tengahari" : n < 19 ? "petang" : "malam" }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Bahasa Malaysia (ms-MY)
    //! author : Weldan Jamili : https://github.com/weldan
    cn = n.defineLocale("ms", { months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"), weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"), weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"), weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY [pukul] HH.mm", LLLL: "dddd, D MMMM YYYY [pukul] HH.mm" }, meridiemParse: /pagi|tengahari|petang|malam/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "pagi") ? n : t === "tengahari" ? n >= 11 ? n : n + 12 : t === "petang" || t === "malam" ? n + 12 : void 0 }, meridiem: function(n) { return n < 11 ? "pagi" : n < 15 ? "tengahari" : n < 19 ? "petang" : "malam" }, calendar: { sameDay: "[Hari ini pukul] LT", nextDay: "[Esok pukul] LT", nextWeek: "dddd [pukul] LT", lastDay: "[Kelmarin pukul] LT", lastWeek: "dddd [lepas pukul] LT", sameElse: "L" }, relativeTime: { future: "dalam %s", past: "%s yang lepas", s: "beberapa saat", m: "seminit", mm: "%d minit", h: "sejam", hh: "%d jam", d: "sehari", dd: "%d hari", M: "sebulan", MM: "%d bulan", y: "setahun", yy: "%d tahun" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : Burmese (my)
    //! author : Squar team, mysquar.com
    var ln = { "1": "á", "2": "á‚", "3": "áƒ", "4": "á„", "5": "á…", "6": "á†", "7": "á‡", "8": "áˆ", "9": "á‰", "0": "á€" },
        an = { "á": "1", "á‚": "2", "áƒ": "3", "á„": "4", "á…": "5", "á†": "6", "á‡": "7", "áˆ": "8", "á‰": "9", "á€": "0" },
        trt = n.defineLocale("my", { months: "á€‡á€”á€ºá€”á€á€«á€›á€®_á€–á€±á€–á€±á€¬á€ºá€á€«á€›á€®_á€™á€á€º_á€§á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€‡á€°á€œá€­á€¯á€„á€º_á€žá€¼á€‚á€¯á€á€º_á€…á€€á€ºá€á€„á€ºá€˜á€¬_á€¡á€±á€¬á€€á€ºá€á€­á€¯á€˜á€¬_á€”á€­á€¯á€á€„á€ºá€˜á€¬_á€’á€®á€‡á€„á€ºá€˜á€¬".split("_"), monthsShort: "á€‡á€”á€º_á€–á€±_á€™á€á€º_á€•á€¼á€®_á€™á€±_á€‡á€½á€”á€º_á€œá€­á€¯á€„á€º_á€žá€¼_á€…á€€á€º_á€¡á€±á€¬á€€á€º_á€”á€­á€¯_á€’á€®".split("_"), weekdays: "á€á€”á€„á€ºá€¹á€‚á€”á€½á€±_á€á€”á€„á€ºá€¹á€œá€¬_á€¡á€„á€ºá€¹á€‚á€«_á€—á€¯á€’á€¹á€“á€Ÿá€°á€¸_á€€á€¼á€¬á€žá€•á€á€±á€¸_á€žá€±á€¬á€€á€¼á€¬_á€…á€”á€±".split("_"), weekdaysShort: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"), weekdaysMin: "á€”á€½á€±_á€œá€¬_á€‚á€«_á€Ÿá€°á€¸_á€€á€¼á€¬_á€žá€±á€¬_á€”á€±".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[á€šá€”á€±.] LT [á€™á€¾á€¬]", nextDay: "[á€™á€”á€€á€ºá€–á€¼á€”á€º] LT [á€™á€¾á€¬]", nextWeek: "dddd LT [á€™á€¾á€¬]", lastDay: "[á€™á€”á€±.á€€] LT [á€™á€¾á€¬]", lastWeek: "[á€•á€¼á€®á€¸á€á€²á€·á€žá€±á€¬] dddd LT [á€™á€¾á€¬]", sameElse: "L" }, relativeTime: { future: "á€œá€¬á€™á€Šá€ºá€· %s á€™á€¾á€¬", past: "á€œá€½á€”á€ºá€á€²á€·á€žá€±á€¬ %s á€€", s: "á€…á€€á€¹á€€á€”á€º.á€¡á€”á€Šá€ºá€¸á€„á€šá€º", m: "á€á€…á€ºá€™á€­á€”á€…á€º", mm: "%d á€™á€­á€”á€…á€º", h: "á€á€…á€ºá€”á€¬á€›á€®", hh: "%d á€”á€¬á€›á€®", d: "á€á€…á€ºá€›á€€á€º", dd: "%d á€›á€€á€º", M: "á€á€…á€ºá€œ", MM: "%d á€œ", y: "á€á€…á€ºá€”á€¾á€…á€º", yy: "%d á€”á€¾á€…á€º" }, preparse: function(n) { return n.replace(/[áá‚áƒá„á…á†á‡áˆá‰á€]/g, function(n) { return an[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return ln[n] }) }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : norwegian bokmÃ¥l (nb)
    //! authors : Espen Hovlandsdal : https://github.com/rexxars
    //!           Sigurd Gartmann : https://github.com/sigurdga
    vn = n.defineLocale("nb", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"), weekdays: "sÃ¸ndag_mandag_tirsdag_onsdag_torsdag_fredag_lÃ¸rdag".split("_"), weekdaysShort: "sÃ¸._ma._ti._on._to._fr._lÃ¸.".split("_"), weekdaysMin: "sÃ¸_ma_ti_on_to_fr_lÃ¸".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] HH:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[i dag kl.] LT", nextDay: "[i morgen kl.] LT", nextWeek: "dddd [kl.] LT", lastDay: "[i gÃ¥r kl.] LT", lastWeek: "[forrige] dddd [kl.] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "for %s siden", s: "noen sekunder", m: "ett minutt", mm: "%d minutter", h: "en time", hh: "%d timer", d: "en dag", dd: "%d dager", M: "en mÃ¥ned", MM: "%d mÃ¥neder", y: "ett Ã¥r", yy: "%d Ã¥r" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : nepali/nepalese
    //! author : suvash : https://github.com/suvash
    var yn = { "1": "à¥§", "2": "à¥¨", "3": "à¥©", "4": "à¥ª", "5": "à¥«", "6": "à¥¬", "7": "à¥­", "8": "à¥®", "9": "à¥¯", "0": "à¥¦" },
        pn = { "à¥§": "1", "à¥¨": "2", "à¥©": "3", "à¥ª": "4", "à¥«": "5", "à¥¬": "6", "à¥­": "7", "à¥®": "8", "à¥¯": "9", "à¥¦": "0" },
        irt = n.defineLocale("ne", { months: "à¤œà¤¨à¤µà¤°à¥€_à¤«à¥‡à¤¬à¥à¤°à¥à¤µà¤°à¥€_à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿à¤²_à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ_à¤…à¤—à¤·à¥à¤Ÿ_à¤¸à¥‡à¤ªà¥à¤Ÿà¥‡à¤®à¥à¤¬à¤°_à¤…à¤•à¥à¤Ÿà¥‹à¤¬à¤°_à¤¨à¥‹à¤­à¥‡à¤®à¥à¤¬à¤°_à¤¡à¤¿à¤¸à¥‡à¤®à¥à¤¬à¤°".split("_"), monthsShort: "à¤œà¤¨._à¤«à¥‡à¤¬à¥à¤°à¥._à¤®à¤¾à¤°à¥à¤š_à¤…à¤ªà¥à¤°à¤¿._à¤®à¤ˆ_à¤œà¥à¤¨_à¤œà¥à¤²à¤¾à¤ˆ._à¤…à¤—._à¤¸à¥‡à¤ªà¥à¤Ÿ._à¤…à¤•à¥à¤Ÿà¥‹._à¤¨à¥‹à¤­à¥‡._à¤¡à¤¿à¤¸à¥‡.".split("_"), weekdays: "à¤†à¤‡à¤¤à¤¬à¤¾à¤°_à¤¸à¥‹à¤®à¤¬à¤¾à¤°_à¤®à¤™à¥à¤—à¤²à¤¬à¤¾à¤°_à¤¬à¥à¤§à¤¬à¤¾à¤°_à¤¬à¤¿à¤¹à¤¿à¤¬à¤¾à¤°_à¤¶à¥à¤•à¥à¤°à¤¬à¤¾à¤°_à¤¶à¤¨à¤¿à¤¬à¤¾à¤°".split("_"), weekdaysShort: "à¤†à¤‡à¤¤._à¤¸à¥‹à¤®._à¤®à¤™à¥à¤—à¤²._à¤¬à¥à¤§._à¤¬à¤¿à¤¹à¤¿._à¤¶à¥à¤•à¥à¤°._à¤¶à¤¨à¤¿.".split("_"), weekdaysMin: "à¤†._à¤¸à¥‹._à¤®à¤‚._à¤¬à¥._à¤¬à¤¿._à¤¶à¥._à¤¶.".split("_"), longDateFormat: { LT: "Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡", LTS: "Aà¤•à¥‹ h:mm:ss à¤¬à¤œà¥‡", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡", LLLL: "dddd, D MMMM YYYY, Aà¤•à¥‹ h:mm à¤¬à¤œà¥‡" }, preparse: function(n) { return n.replace(/[à¥§à¥¨à¥©à¥ªà¥«à¥¬à¥­à¥®à¥¯à¥¦]/g, function(n) { return pn[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return yn[n] }) }, meridiemParse: /à¤°à¤¾à¤¤à¤¿|à¤¬à¤¿à¤¹à¤¾à¤¨|à¤¦à¤¿à¤‰à¤à¤¸à¥‹|à¤¸à¤¾à¤à¤/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "à¤°à¤¾à¤¤à¤¿") ? n < 4 ? n : n + 12 : t === "à¤¬à¤¿à¤¹à¤¾à¤¨" ? n : t === "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" ? n >= 10 ? n : n + 12 : t === "à¤¸à¤¾à¤à¤" ? n + 12 : void 0 }, meridiem: function(n) { return n < 3 ? "à¤°à¤¾à¤¤à¤¿" : n < 12 ? "à¤¬à¤¿à¤¹à¤¾à¤¨" : n < 16 ? "à¤¦à¤¿à¤‰à¤à¤¸à¥‹" : n < 20 ? "à¤¸à¤¾à¤à¤" : "à¤°à¤¾à¤¤à¤¿" }, calendar: { sameDay: "[à¤†à¤œ] LT", nextDay: "[à¤­à¥‹à¤²à¤¿] LT", nextWeek: "[à¤†à¤‰à¤à¤¦à¥‹] dddd[,] LT", lastDay: "[à¤¹à¤¿à¤œà¥‹] LT", lastWeek: "[à¤—à¤à¤•à¥‹] dddd[,] LT", sameElse: "L" }, relativeTime: { future: "%sà¤®à¤¾", past: "%s à¤…à¤—à¤¾à¤¡à¤¿", s: "à¤•à¥‡à¤¹à¥€ à¤•à¥à¤·à¤£", m: "à¤à¤• à¤®à¤¿à¤¨à¥‡à¤Ÿ", mm: "%d à¤®à¤¿à¤¨à¥‡à¤Ÿ", h: "à¤à¤• à¤˜à¤£à¥à¤Ÿà¤¾", hh: "%d à¤˜à¤£à¥à¤Ÿà¤¾", d: "à¤à¤• à¤¦à¤¿à¤¨", dd: "%d à¤¦à¤¿à¤¨", M: "à¤à¤• à¤®à¤¹à¤¿à¤¨à¤¾", MM: "%d à¤®à¤¹à¤¿à¤¨à¤¾", y: "à¤à¤• à¤¬à¤°à¥à¤·", yy: "%d à¤¬à¤°à¥à¤·" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : dutch (nl)
    //! author : Joris RÃ¶ling : https://github.com/jjupiter
    var wn = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        bn = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        rrt = n.defineLocale("nl", { months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"), monthsShort: function(n, t) { return /-MMM-/.test(t) ? bn[n.month()] : wn[n.month()] }, weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"), weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"), weekdaysMin: "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD-MM-YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[vandaag om] LT", nextDay: "[morgen om] LT", nextWeek: "dddd [om] LT", lastDay: "[gisteren om] LT", lastWeek: "[afgelopen] dddd [om] LT", sameElse: "L" }, relativeTime: { future: "over %s", past: "%s geleden", s: "een paar seconden", m: "Ã©Ã©n minuut", mm: "%d minuten", h: "Ã©Ã©n uur", hh: "%d uur", d: "Ã©Ã©n dag", dd: "%d dagen", M: "Ã©Ã©n maand", MM: "%d maanden", y: "Ã©Ã©n jaar", yy: "%d jaar" }, ordinalParse: /\d{1,2}(ste|de)/, ordinal: function(n) { return n + (n === 1 || n === 8 || n >= 20 ? "ste" : "de") }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : norwegian nynorsk (nn)
    //! author : https://github.com/mechuwind
    kn = n.defineLocale("nn", { months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"), monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"), weekdays: "sundag_mÃ¥ndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"), weekdaysShort: "sun_mÃ¥n_tys_ons_tor_fre_lau".split("_"), weekdaysMin: "su_mÃ¥_ty_on_to_fr_lÃ¸".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY [kl.] H:mm", LLLL: "dddd D. MMMM YYYY [kl.] HH:mm" }, calendar: { sameDay: "[I dag klokka] LT", nextDay: "[I morgon klokka] LT", nextWeek: "dddd [klokka] LT", lastDay: "[I gÃ¥r klokka] LT", lastWeek: "[FÃ¸regÃ¥ande] dddd [klokka] LT", sameElse: "L" }, relativeTime: { future: "om %s", past: "for %s sidan", s: "nokre sekund", m: "eit minutt", mm: "%d minutt", h: "ein time", hh: "%d timar", d: "ein dag", dd: "%d dagar", M: "ein mÃ¥nad", MM: "%d mÃ¥nader", y: "eit Ã¥r", yy: "%d Ã¥r" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : polish (pl)
    //! author : Rafal Hirsz : https://github.com/evoL
    de = "styczeÅ„_luty_marzec_kwiecieÅ„_maj_czerwiec_lipiec_sierpieÅ„_wrzesieÅ„_paÅºdziernik_listopad_grudzieÅ„".split("_");
    ge = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_wrzeÅ›nia_paÅºdziernika_listopada_grudnia".split("_");
    dn = n.defineLocale("pl", {
        months: function(n, t) { return t === "" ? "(" + ge[n.month()] + "|" + de[n.month()] + ")" : /D MMMM/.test(t) ? ge[n.month()] : de[n.month()] },
        monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paÅº_lis_gru".split("_"),
        weekdays: "niedziela_poniedziaÅ‚ek_wtorek_Å›roda_czwartek_piÄ…tek_sobota".split("_"),
        weekdaysShort: "nie_pon_wt_Å›r_czw_pt_sb".split("_"),
        weekdaysMin: "Nd_Pn_Wt_Åšr_Cz_Pt_So".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: {
            sameDay: "[DziÅ› o] LT",
            nextDay: "[Jutro o] LT",
            nextWeek: "[W] dddd [o] LT",
            lastDay: "[Wczoraj o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[W zeszÅ‚Ä… niedzielÄ™ o] LT";
                    case 3:
                        return "[W zeszÅ‚Ä… Å›rodÄ™ o] LT";
                    case 6:
                        return "[W zeszÅ‚Ä… sobotÄ™ o] LT";
                    default:
                        return "[W zeszÅ‚y] dddd [o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "%s temu", s: "kilka sekund", m: rr, mm: rr, h: rr, hh: rr, d: "1 dzieÅ„", dd: "%d dni", M: "miesiÄ…c", MM: rr, y: "rok", yy: rr },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : brazilian portuguese (pt-br)
    //! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
    gn = n.defineLocale("pt-br", { months: "Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingo_Segunda-Feira_TerÃ§a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_SÃ¡bado".split("_"), weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"), weekdaysMin: "Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY [Ã s] HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY [Ã s] HH:mm" }, calendar: { sameDay: "[Hoje Ã s] LT", nextDay: "[AmanhÃ£ Ã s] LT", nextWeek: "dddd [Ã s] LT", lastDay: "[Ontem Ã s] LT", lastWeek: function() { return this.day() === 0 || this.day() === 6 ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT" }, sameElse: "L" }, relativeTime: { future: "em %s", past: "%s atrÃ¡s", s: "poucos segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mÃªs", MM: "%d meses", y: "um ano", yy: "%d anos" }, ordinalParse: /\d{1,2}Âº/, ordinal: "%dÂº" });
    //! moment.js locale configuration
    //! locale : portuguese (pt)
    //! author : Jefferson : https://github.com/jalex79
    ntt = n.defineLocale("pt", { months: "Janeiro_Fevereiro_MarÃ§o_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"), monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"), weekdays: "Domingo_Segunda-Feira_TerÃ§a-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_SÃ¡bado".split("_"), weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_SÃ¡b".split("_"), weekdaysMin: "Dom_2Âª_3Âª_4Âª_5Âª_6Âª_SÃ¡b".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY HH:mm", LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm" }, calendar: { sameDay: "[Hoje Ã s] LT", nextDay: "[AmanhÃ£ Ã s] LT", nextWeek: "dddd [Ã s] LT", lastDay: "[Ontem Ã s] LT", lastWeek: function() { return this.day() === 0 || this.day() === 6 ? "[Ãšltimo] dddd [Ã s] LT" : "[Ãšltima] dddd [Ã s] LT" }, sameElse: "L" }, relativeTime: { future: "em %s", past: "hÃ¡ %s", s: "segundos", m: "um minuto", mm: "%d minutos", h: "uma hora", hh: "%d horas", d: "um dia", dd: "%d dias", M: "um mÃªs", MM: "%d meses", y: "um ano", yy: "%d anos" }, ordinalParse: /\d{1,2}Âº/, ordinal: "%dÂº", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : romanian (ro)
    //! author : Vlad Gurdiga : https://github.com/gurdiga
    //! author : Valentin Agachi : https://github.com/avaly
    ttt = n.defineLocale("ro", { months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"), monthsShort: "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"), weekdays: "duminicÄƒ_luni_marÈ›i_miercuri_joi_vineri_sÃ¢mbÄƒtÄƒ".split("_"), weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_SÃ¢m".split("_"), weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_SÃ¢".split("_"), longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY H:mm", LLLL: "dddd, D MMMM YYYY H:mm" }, calendar: { sameDay: "[azi la] LT", nextDay: "[mÃ¢ine la] LT", nextWeek: "dddd [la] LT", lastDay: "[ieri la] LT", lastWeek: "[fosta] dddd [la] LT", sameElse: "L" }, relativeTime: { future: "peste %s", past: "%s Ã®n urmÄƒ", s: "cÃ¢teva secunde", m: "un minut", mm: tu, h: "o orÄƒ", hh: tu, d: "o zi", dd: tu, M: "o lunÄƒ", MM: tu, y: "un an", yy: tu }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : russian (ru)
    //! author : Viktorminator : https://github.com/Viktorminator
    //! Author : Menelion ElensÃºle : https://github.com/Oire
    sf = [/^ÑÐ½Ð²/i, /^Ñ„ÐµÐ²/i, /^Ð¼Ð°Ñ€/i, /^Ð°Ð¿Ñ€/i, /^Ð¼Ð°[Ð¹|Ñ]/i, /^Ð¸ÑŽÐ½/i, /^Ð¸ÑŽÐ»/i, /^Ð°Ð²Ð³/i, /^ÑÐµÐ½/i, /^Ð¾ÐºÑ‚/i, /^Ð½Ð¾Ñ/i, /^Ð´ÐµÐº/i];
    rtt = n.defineLocale("ru", {
        months: { format: "Ð¯Ð½Ð²Ð°Ñ€Ñ_Ð¤ÐµÐ²Ñ€Ð°Ð»Ñ_ÐœÐ°Ñ€Ñ‚Ð°_ÐÐ¿Ñ€ÐµÐ»Ñ_ÐœÐ°Ñ_Ð˜ÑŽÐ½Ñ_Ð˜ÑŽÐ»Ñ_ÐÐ²Ð³ÑƒÑÑ‚Ð°_Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€Ñ_ÐžÐºÑ‚ÑÐ±Ñ€Ñ_ÐÐ¾ÑÐ±Ñ€Ñ_Ð”ÐµÐºÐ°Ð±Ñ€Ñ".split("_"), standalone: "Ð¯Ð½Ð²Ð°Ñ€ÑŒ_Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ_ÐœÐ°Ñ€Ñ‚_ÐÐ¿Ñ€ÐµÐ»ÑŒ_ÐœÐ°Ð¹_Ð˜ÑŽÐ½ÑŒ_Ð˜ÑŽÐ»ÑŒ_ÐÐ²Ð³ÑƒÑÑ‚_Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ_ÐžÐºÑ‚ÑÐ±Ñ€ÑŒ_ÐÐ¾ÑÐ±Ñ€ÑŒ_Ð”ÐµÐºÐ°Ð±Ñ€ÑŒ".split("_") },
        monthsShort: { format: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ñ_Ð¸ÑŽÐ½Ñ_Ð¸ÑŽÐ»Ñ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"), standalone: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½ÑŒ_Ð¸ÑŽÐ»ÑŒ_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_") },
        weekdays: { standalone: "Ð’Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_Ð¡Ñ€ÐµÐ´Ð°_Ð§ÐµÑ‚Ð²ÐµÑ€Ð³_ÐŸÑÑ‚Ð½Ð¸Ñ†Ð°_Ð¡ÑƒÐ±Ð±Ð¾Ñ‚Ð°".split("_"), format: "Ð’Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ_ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº_Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº_Ð¡Ñ€ÐµÐ´Ñƒ_Ð§ÐµÑ‚Ð²ÐµÑ€Ð³_ÐŸÑÑ‚Ð½Ð¸Ñ†Ñƒ_Ð¡ÑƒÐ±Ð±Ð¾Ñ‚Ñƒ".split("_"), isFormat: /\[ ?[Ð’Ð²] ?(?:Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ|ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ|ÑÑ‚Ñƒ)? ?\] ?dddd/ },
        weekdaysShort: "Ð’Ñ_ÐŸÐ½_Ð’Ñ‚_Ð¡Ñ€_Ð§Ñ‚_ÐŸÑ‚_Ð¡Ð±".split("_"),
        weekdaysMin: "Ð’Ñ_ÐŸÐ½_Ð’Ñ‚_Ð¡Ñ€_Ð§Ñ‚_ÐŸÑ‚_Ð¡Ð±".split("_"),
        monthsParse: sf,
        longMonthsParse: sf,
        shortMonthsParse: sf,
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY Ð³.", LLL: "D MMMM YYYY Ð³., HH:mm", LLLL: "dddd, D MMMM YYYY Ð³., HH:mm" },
        calendar: {
            sameDay: "[Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ Ð²] LT",
            nextDay: "[Ð—Ð°Ð²Ñ‚Ñ€Ð° Ð²] LT",
            lastDay: "[Ð’Ñ‡ÐµÑ€Ð° Ð²] LT",
            nextWeek: function(n) {
                if (n.week() !== this.week()) switch (this.day()) {
                    case 0:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐµ] dddd [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰Ð¸Ð¹] dddd [Ð²] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð’ ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÑƒÑŽ] dddd [Ð²] LT"
                } else return this.day() === 2 ? "[Ð’Ð¾] dddd [Ð²] LT" : "[Ð’] dddd [Ð²] LT"
            },
            lastWeek: function(n) {
                if (n.week() !== this.week()) switch (this.day()) {
                    case 0:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ðµ] dddd [Ð²] LT";
                    case 1:
                    case 2:
                    case 4:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»Ñ‹Ð¹] dddd [Ð²] LT";
                    case 3:
                    case 5:
                    case 6:
                        return "[Ð’ Ð¿Ñ€Ð¾ÑˆÐ»ÑƒÑŽ] dddd [Ð²] LT"
                } else return this.day() === 2 ? "[Ð’Ð¾] dddd [Ð²] LT" : "[Ð’] dddd [Ð²] LT"
            },
            sameElse: "L"
        },
        relativeTime: { future: "Ñ‡ÐµÑ€ÐµÐ· %s", past: "%s Ð½Ð°Ð·Ð°Ð´", s: "Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´", m: ur, mm: ur, h: "Ñ‡Ð°Ñ", hh: ur, d: "Ð´ÐµÐ½ÑŒ", dd: ur, M: "Ð¼ÐµÑÑÑ†", MM: ur, y: "Ð³Ð¾Ð´", yy: ur },
        meridiemParse: /Ð½Ð¾Ñ‡Ð¸|ÑƒÑ‚Ñ€Ð°|Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°/i,
        isPM: function(n) { return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡ÐµÑ€Ð°)$/.test(n) },
        meridiem: function(n) { return n < 4 ? "Ð½Ð¾Ñ‡Ð¸" : n < 12 ? "ÑƒÑ‚Ñ€Ð°" : n < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡ÐµÑ€Ð°" },
        ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾|Ñ)/,
        ordinal: function(n, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                    return n + "-Ð¹";
                case "D":
                    return n + "-Ð³Ð¾";
                case "w":
                case "W":
                    return n + "-Ñ";
                default:
                    return n
            }
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : Northern Sami (se)
    //! authors : BÃ¥rd Rolstad Henriksen : https://github.com/karamell
    utt = n.defineLocale("se", { months: "oÄ‘Ä‘ajagemÃ¡nnu_guovvamÃ¡nnu_njukÄamÃ¡nnu_cuoÅ‹omÃ¡nnu_miessemÃ¡nnu_geassemÃ¡nnu_suoidnemÃ¡nnu_borgemÃ¡nnu_ÄakÄamÃ¡nnu_golggotmÃ¡nnu_skÃ¡bmamÃ¡nnu_juovlamÃ¡nnu".split("_"), monthsShort: "oÄ‘Ä‘j_guov_njuk_cuo_mies_geas_suoi_borg_ÄakÄ_golg_skÃ¡b_juov".split("_"), weekdays: "sotnabeaivi_vuossÃ¡rga_maÅ‹Å‹ebÃ¡rga_gaskavahkku_duorastat_bearjadat_lÃ¡vvardat".split("_"), weekdaysShort: "sotn_vuos_maÅ‹_gask_duor_bear_lÃ¡v".split("_"), weekdaysMin: "s_v_m_g_d_b_L".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "MMMM D. [b.] YYYY", LLL: "MMMM D. [b.] YYYY [ti.] HH:mm", LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm" }, calendar: { sameDay: "[otne ti] LT", nextDay: "[ihttin ti] LT", nextWeek: "dddd [ti] LT", lastDay: "[ikte ti] LT", lastWeek: "[ovddit] dddd [ti] LT", sameElse: "L" }, relativeTime: { future: "%s geaÅ¾es", past: "maÅ‹it %s", s: "moadde sekunddat", m: "okta minuhta", mm: "%d minuhtat", h: "okta diimmu", hh: "%d diimmut", d: "okta beaivi", dd: "%d beaivvit", M: "okta mÃ¡nnu", MM: "%d mÃ¡nut", y: "okta jahki", yy: "%d jagit" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Sinhalese (si)
    //! author : Sampath Sitinamaluwa : https://github.com/sampathsris
    ftt = n.defineLocale("si", { months: "à¶¢à¶±à·€à·à¶»à·’_à¶´à·™à¶¶à¶»à·€à·à¶»à·’_à¶¸à·à¶»à·Šà¶­à·”_à¶…à¶´à·Šâ€à¶»à·šà¶½à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·à·ƒà·Šà¶­à·”_à·ƒà·à¶´à·Šà¶­à·à¶¸à·Šà¶¶à¶»à·Š_à¶”à¶šà·Šà¶­à·à¶¶à¶»à·Š_à¶±à·œà·€à·à¶¸à·Šà¶¶à¶»à·Š_à¶¯à·™à·ƒà·à¶¸à·Šà¶¶à¶»à·Š".split("_"), monthsShort: "à¶¢à¶±_à¶´à·™à¶¶_à¶¸à·à¶»à·Š_à¶…à¶´à·Š_à¶¸à·à¶ºà·’_à¶¢à·–à¶±à·’_à¶¢à·–à¶½à·’_à¶…à¶œà·_à·ƒà·à¶´à·Š_à¶”à¶šà·Š_à¶±à·œà·€à·_à¶¯à·™à·ƒà·".split("_"), weekdays: "à¶‰à¶»à·’à¶¯à·_à·ƒà¶³à·”à¶¯à·_à¶…à¶Ÿà·„à¶»à·”à·€à·à¶¯à·_à¶¶à¶¯à·à¶¯à·_à¶¶à·Šâ€à¶»à·„à·ƒà·Šà¶´à¶­à·’à¶±à·Šà¶¯à·_à·ƒà·’à¶šà·”à¶»à·à¶¯à·_à·ƒà·™à¶±à·ƒà·”à¶»à·à¶¯à·".split("_"), weekdaysShort: "à¶‰à¶»à·’_à·ƒà¶³à·”_à¶…à¶Ÿ_à¶¶à¶¯à·_à¶¶à·Šâ€à¶»à·„_à·ƒà·’à¶šà·”_à·ƒà·™à¶±".split("_"), weekdaysMin: "à¶‰_à·ƒ_à¶…_à¶¶_à¶¶à·Šâ€à¶»_à·ƒà·’_à·ƒà·™".split("_"), longDateFormat: { LT: "a h:mm", LTS: "a h:mm:ss", L: "YYYY/MM/DD", LL: "YYYY MMMM D", LLL: "YYYY MMMM D, a h:mm", LLLL: "YYYY MMMM D [à·€à·à¶±à·’] dddd, a h:mm:ss" }, calendar: { sameDay: "[à¶…à¶¯] LT[à¶§]", nextDay: "[à·„à·™à¶§] LT[à¶§]", nextWeek: "dddd LT[à¶§]", lastDay: "[à¶Šà¶ºà·š] LT[à¶§]", lastWeek: "[à¶´à·ƒà·”à¶œà·’à¶º] dddd LT[à¶§]", sameElse: "L" }, relativeTime: { future: "%sà¶šà·’à¶±à·Š", past: "%sà¶šà¶§ à¶´à·™à¶»", s: "à¶­à¶­à·Šà¶´à¶» à¶šà·’à·„à·’à¶´à¶º", m: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·”à·€", mm: "à¶¸à·’à¶±à·’à¶­à·Šà¶­à·” %d", h: "à¶´à·à¶º", hh: "à¶´à·à¶º %d", d: "à¶¯à·’à¶±à¶º", dd: "à¶¯à·’à¶± %d", M: "à¶¸à·à·ƒà¶º", MM: "à¶¸à·à·ƒ %d", y: "à·€à·ƒà¶»", yy: "à·€à·ƒà¶» %d" }, ordinalParse: /\d{1,2} à·€à·à¶±à·’/, ordinal: function(n) { return n + " à·€à·à¶±à·’" }, meridiem: function(n, t, i) { return n > 11 ? i ? "à¶´.à·€." : "à¶´à·ƒà·Š à·€à¶»à·”" : i ? "à¶´à·™.à·€." : "à¶´à·™à¶» à·€à¶»à·”" } });
    //! moment.js locale configuration
    //! locale : slovak (sk)
    //! author : Martin Minka : https://github.com/k2s
    //! based on work of petrbela : https://github.com/petrbela
    gc = "januÃ¡r_februÃ¡r_marec_aprÃ­l_mÃ¡j_jÃºn_jÃºl_august_september_oktÃ³ber_november_december".split("_");
    nl = "jan_feb_mar_apr_mÃ¡j_jÃºn_jÃºl_aug_sep_okt_nov_dec".split("_");
    ett = n.defineLocale("sk", {
        months: gc,
        monthsShort: nl,
        weekdays: "nedeÄ¾a_pondelok_utorok_streda_Å¡tvrtok_piatok_sobota".split("_"),
        weekdaysShort: "ne_po_ut_st_Å¡t_pi_so".split("_"),
        weekdaysMin: "ne_po_ut_st_Å¡t_pi_so".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD.MM.YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[dnes o] LT",
            nextDay: "[zajtra o] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v nedeÄ¾u o] LT";
                    case 1:
                    case 2:
                        return "[v] dddd [o] LT";
                    case 3:
                        return "[v stredu o] LT";
                    case 4:
                        return "[vo Å¡tvrtok o] LT";
                    case 5:
                        return "[v piatok o] LT";
                    case 6:
                        return "[v sobotu o] LT"
                }
            },
            lastDay: "[vÄera o] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[minulÃº nedeÄ¾u o] LT";
                    case 1:
                    case 2:
                        return "[minulÃ½] dddd [o] LT";
                    case 3:
                        return "[minulÃº stredu o] LT";
                    case 4:
                    case 5:
                        return "[minulÃ½] dddd [o] LT";
                    case 6:
                        return "[minulÃº sobotu o] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "pred %s", s: ft, m: ft, mm: ft, h: ft, hh: ft, d: ft, dd: ft, M: ft, MM: ft, y: ft, yy: ft },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : slovenian (sl)
    //! author : Robert SedovÅ¡ek : https://github.com/sedovsek
    ott = n.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        weekdays: "nedelja_ponedeljek_torek_sreda_Äetrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._Äet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_Äe_pe_so".split("_"),
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v] [nedeljo] [ob] LT";
                    case 3:
                        return "[v] [sredo] [ob] LT";
                    case 6:
                        return "[v] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[v] dddd [ob] LT"
                }
            },
            lastDay: "[vÄeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[prejÅ¡njo] [nedeljo] [ob] LT";
                    case 3:
                        return "[prejÅ¡njo] [sredo] [ob] LT";
                    case 6:
                        return "[prejÅ¡njo] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prejÅ¡nji] dddd [ob] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "Äez %s", past: "pred %s", s: et, m: et, mm: et, h: et, hh: et, d: et, dd: et, M: et, MM: et, y: et, yy: et },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : Albanian (sq)
    //! author : FlakÃ«rim Ismani : https://github.com/flakerimi
    //! author: Menelion ElensÃºle: https://github.com/Oire (tests)
    //! author : Oerd Cukalla : https://github.com/oerd (fixes)
    stt = n.defineLocale("sq", { months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_NÃ«ntor_Dhjetor".split("_"), monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_NÃ«n_Dhj".split("_"), weekdays: "E Diel_E HÃ«nÃ«_E MartÃ«_E MÃ«rkurÃ«_E Enjte_E Premte_E ShtunÃ«".split("_"), weekdaysShort: "Die_HÃ«n_Mar_MÃ«r_Enj_Pre_Sht".split("_"), weekdaysMin: "D_H_Ma_MÃ«_E_P_Sh".split("_"), meridiemParse: /PD|MD/, isPM: function(n) { return n.charAt(0) === "M" }, meridiem: function(n) { return n < 12 ? "PD" : "MD" }, longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[Sot nÃ«] LT", nextDay: "[NesÃ«r nÃ«] LT", nextWeek: "dddd [nÃ«] LT", lastDay: "[Dje nÃ«] LT", lastWeek: "dddd [e kaluar nÃ«] LT", sameElse: "L" }, relativeTime: { future: "nÃ« %s", past: "%s mÃ« parÃ«", s: "disa sekonda", m: "njÃ« minutÃ«", mm: "%d minuta", h: "njÃ« orÃ«", hh: "%d orÃ«", d: "njÃ« ditÃ«", dd: "%d ditÃ«", M: "njÃ« muaj", MM: "%d muaj", y: "njÃ« vit", yy: "%d vite" }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Serbian-cyrillic (sr-cyrl)
    //! author : Milan JanaÄkoviÄ‡<milanjanackovic@gmail.com> : https://github.com/milan-j
    vt = { words: { m: ["Ñ˜ÐµÐ´Ð°Ð½ Ð¼Ð¸Ð½ÑƒÑ‚", "Ñ˜ÐµÐ´Ð½Ðµ Ð¼Ð¸Ð½ÑƒÑ‚Ðµ"], mm: ["Ð¼Ð¸Ð½ÑƒÑ‚", "Ð¼Ð¸Ð½ÑƒÑ‚Ðµ", "Ð¼Ð¸Ð½ÑƒÑ‚Ð°"], h: ["Ñ˜ÐµÐ´Ð°Ð½ ÑÐ°Ñ‚", "Ñ˜ÐµÐ´Ð½Ð¾Ð³ ÑÐ°Ñ‚Ð°"], hh: ["ÑÐ°Ñ‚", "ÑÐ°Ñ‚Ð°", "ÑÐ°Ñ‚Ð¸"], dd: ["Ð´Ð°Ð½", "Ð´Ð°Ð½Ð°", "Ð´Ð°Ð½Ð°"], MM: ["Ð¼ÐµÑÐµÑ†", "Ð¼ÐµÑÐµÑ†Ð°", "Ð¼ÐµÑÐµÑ†Ð¸"], yy: ["Ð³Ð¾Ð´Ð¸Ð½Ð°", "Ð³Ð¾Ð´Ð¸Ð½Ðµ", "Ð³Ð¾Ð´Ð¸Ð½Ð°"] }, correctGrammaticalCase: function(n, t) { return n === 1 ? t[0] : n >= 2 && n <= 4 ? t[1] : t[2] }, translate: function(n, t, i) { var r = vt.words[i]; return i.length === 1 ? t ? r[0] : r[1] : n + " " + vt.correctGrammaticalCase(n, r) } };
    htt = n.defineLocale("sr-cyrl", {
        months: ["Ñ˜Ð°Ð½ÑƒÐ°Ñ€", "Ñ„ÐµÐ±Ñ€ÑƒÐ°Ñ€", "Ð¼Ð°Ñ€Ñ‚", "Ð°Ð¿Ñ€Ð¸Ð»", "Ð¼Ð°Ñ˜", "Ñ˜ÑƒÐ½", "Ñ˜ÑƒÐ»", "Ð°Ð²Ð³ÑƒÑÑ‚", "ÑÐµÐ¿Ñ‚ÐµÐ¼Ð±Ð°Ñ€", "Ð¾ÐºÑ‚Ð¾Ð±Ð°Ñ€", "Ð½Ð¾Ð²ÐµÐ¼Ð±Ð°Ñ€", "Ð´ÐµÑ†ÐµÐ¼Ð±Ð°Ñ€"],
        monthsShort: ["Ñ˜Ð°Ð½.", "Ñ„ÐµÐ±.", "Ð¼Ð°Ñ€.", "Ð°Ð¿Ñ€.", "Ð¼Ð°Ñ˜", "Ñ˜ÑƒÐ½", "Ñ˜ÑƒÐ»", "Ð°Ð²Ð³.", "ÑÐµÐ¿.", "Ð¾ÐºÑ‚.", "Ð½Ð¾Ð².", "Ð´ÐµÑ†."],
        weekdays: ["Ð½ÐµÐ´ÐµÑ™Ð°", "Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™Ð°Ðº", "ÑƒÑ‚Ð¾Ñ€Ð°Ðº", "ÑÑ€ÐµÐ´Ð°", "Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚Ð°Ðº", "Ð¿ÐµÑ‚Ð°Ðº", "ÑÑƒÐ±Ð¾Ñ‚Ð°"],
        weekdaysShort: ["Ð½ÐµÐ´.", "Ð¿Ð¾Ð½.", "ÑƒÑ‚Ð¾.", "ÑÑ€Ðµ.", "Ñ‡ÐµÑ‚.", "Ð¿ÐµÑ‚.", "ÑÑƒÐ±."],
        weekdaysMin: ["Ð½Ðµ", "Ð¿Ð¾", "ÑƒÑ‚", "ÑÑ€", "Ñ‡Ðµ", "Ð¿Ðµ", "ÑÑƒ"],
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[Ð´Ð°Ð½Ð°Ñ Ñƒ] LT",
            nextDay: "[ÑÑƒÑ‚Ñ€Ð° Ñƒ] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[Ñƒ] [Ð½ÐµÐ´ÐµÑ™Ñƒ] [Ñƒ] LT";
                    case 3:
                        return "[Ñƒ] [ÑÑ€ÐµÐ´Ñƒ] [Ñƒ] LT";
                    case 6:
                        return "[Ñƒ] [ÑÑƒÐ±Ð¾Ñ‚Ñƒ] [Ñƒ] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[Ñƒ] dddd [Ñƒ] LT"
                }
            },
            lastDay: "[Ñ˜ÑƒÑ‡Ðµ Ñƒ] LT",
            lastWeek: function() { return ["[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [Ð½ÐµÐ´ÐµÑ™Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿Ð¾Ð½ÐµÐ´ÐµÑ™ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [ÑƒÑ‚Ð¾Ñ€ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑ€ÐµÐ´Ðµ] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ñ‡ÐµÑ‚Ð²Ñ€Ñ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ð¾Ð³] [Ð¿ÐµÑ‚ÐºÐ°] [Ñƒ] LT", "[Ð¿Ñ€Ð¾ÑˆÐ»Ðµ] [ÑÑƒÐ±Ð¾Ñ‚Ðµ] [Ñƒ] LT"][this.day()] },
            sameElse: "L"
        },
        relativeTime: { future: "Ð·Ð° %s", past: "Ð¿Ñ€Ðµ %s", s: "Ð½ÐµÐºÐ¾Ð»Ð¸ÐºÐ¾ ÑÐµÐºÑƒÐ½Ð´Ð¸", m: vt.translate, mm: vt.translate, h: vt.translate, hh: vt.translate, d: "Ð´Ð°Ð½", dd: vt.translate, M: "Ð¼ÐµÑÐµÑ†", MM: vt.translate, y: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ", yy: vt.translate },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : Serbian-latin (sr)
    //! author : Milan JanaÄkoviÄ‡<milanjanackovic@gmail.com> : https://github.com/milan-j
    yt = { words: { m: ["jedan minut", "jedne minute"], mm: ["minut", "minute", "minuta"], h: ["jedan sat", "jednog sata"], hh: ["sat", "sata", "sati"], dd: ["dan", "dana", "dana"], MM: ["mesec", "meseca", "meseci"], yy: ["godina", "godine", "godina"] }, correctGrammaticalCase: function(n, t) { return n === 1 ? t[0] : n >= 2 && n <= 4 ? t[1] : t[2] }, translate: function(n, t, i) { var r = yt.words[i]; return i.length === 1 ? t ? r[0] : r[1] : n + " " + yt.correctGrammaticalCase(n, r) } };
    ctt = n.defineLocale("sr", {
        months: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"],
        monthsShort: ["jan.", "feb.", "mar.", "apr.", "maj", "jun", "jul", "avg.", "sep.", "okt.", "nov.", "dec."],
        weekdays: ["nedelja", "ponedeljak", "utorak", "sreda", "Äetvrtak", "petak", "subota"],
        weekdaysShort: ["ned.", "pon.", "uto.", "sre.", "Äet.", "pet.", "sub."],
        weekdaysMin: ["ne", "po", "ut", "sr", "Äe", "pe", "su"],
        longDateFormat: { LT: "H:mm", LTS: "H:mm:ss", L: "DD. MM. YYYY", LL: "D. MMMM YYYY", LLL: "D. MMMM YYYY H:mm", LLLL: "dddd, D. MMMM YYYY H:mm" },
        calendar: {
            sameDay: "[danas u] LT",
            nextDay: "[sutra u] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[u] [nedelju] [u] LT";
                    case 3:
                        return "[u] [sredu] [u] LT";
                    case 6:
                        return "[u] [subotu] [u] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[u] dddd [u] LT"
                }
            },
            lastDay: "[juÄe u] LT",
            lastWeek: function() { return ["[proÅ¡le] [nedelje] [u] LT", "[proÅ¡log] [ponedeljka] [u] LT", "[proÅ¡log] [utorka] [u] LT", "[proÅ¡le] [srede] [u] LT", "[proÅ¡log] [Äetvrtka] [u] LT", "[proÅ¡log] [petka] [u] LT", "[proÅ¡le] [subote] [u] LT"][this.day()] },
            sameElse: "L"
        },
        relativeTime: { future: "za %s", past: "pre %s", s: "nekoliko sekundi", m: yt.translate, mm: yt.translate, h: yt.translate, hh: yt.translate, d: "dan", dd: yt.translate, M: "mesec", MM: yt.translate, y: "godinu", yy: yt.translate },
        ordinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : swedish (sv)
    //! author : Jens Alm : https://github.com/ulmus
    ltt = n.defineLocale("sv", {
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekdays: "sÃ¶ndag_mÃ¥ndag_tisdag_onsdag_torsdag_fredag_lÃ¶rdag".split("_"),
        weekdaysShort: "sÃ¶n_mÃ¥n_tis_ons_tor_fre_lÃ¶r".split("_"),
        weekdaysMin: "sÃ¶_mÃ¥_ti_on_to_fr_lÃ¶".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY-MM-DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[Idag] LT", nextDay: "[Imorgon] LT", lastDay: "[IgÃ¥r] LT", nextWeek: "[PÃ¥] dddd LT", lastWeek: "[I] dddd[s] LT", sameElse: "L" },
        relativeTime: { future: "om %s", past: "fÃ¶r %s sedan", s: "nÃ¥gra sekunder", m: "en minut", mm: "%d minuter", h: "en timme", hh: "%d timmar", d: "en dag", dd: "%d dagar", M: "en mÃ¥nad", MM: "%d mÃ¥nader", y: "ett Ã¥r", yy: "%d Ã¥r" },
        ordinalParse: /\d{1,2}(e|a)/,
        ordinal: function(n) {
            var t = n % 10,
                i = ~~(n % 100 / 10) == 1 ? "e" : t === 1 ? "a" : t === 2 ? "a" : t === 3 ? "e" : "e";
            return n + i
        },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : swahili (sw)
    //! author : Fahad Kassim : https://github.com/fadsel
    att = n.defineLocale("sw", { months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"), monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"), weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"), weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"), weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[leo saa] LT", nextDay: "[kesho saa] LT", nextWeek: "[wiki ijayo] dddd [saat] LT", lastDay: "[jana] LT", lastWeek: "[wiki iliyopita] dddd [saat] LT", sameElse: "L" }, relativeTime: { future: "%s baadaye", past: "tokea %s", s: "hivi punde", m: "dakika moja", mm: "dakika %d", h: "saa limoja", hh: "masaa %d", d: "siku moja", dd: "masiku %d", M: "mwezi mmoja", MM: "miezi %d", y: "mwaka mmoja", yy: "miaka %d" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : tamil (ta)
    //! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404
    var vtt = { "1": "à¯§", "2": "à¯¨", "3": "à¯©", "4": "à¯ª", "5": "à¯«", "6": "à¯¬", "7": "à¯­", "8": "à¯®", "9": "à¯¯", "0": "à¯¦" },
        ytt = { "à¯§": "1", "à¯¨": "2", "à¯©": "3", "à¯ª": "4", "à¯«": "5", "à¯¬": "6", "à¯­": "7", "à¯®": "8", "à¯¯": "9", "à¯¦": "0" },
        urt = n.defineLocale("ta", { months: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"), monthsShort: "à®œà®©à®µà®°à®¿_à®ªà®¿à®ªà¯à®°à®µà®°à®¿_à®®à®¾à®°à¯à®šà¯_à®à®ªà¯à®°à®²à¯_à®®à¯‡_à®œà¯‚à®©à¯_à®œà¯‚à®²à¯ˆ_à®†à®•à®¸à¯à®Ÿà¯_à®šà¯†à®ªà¯à®Ÿà¯†à®®à¯à®ªà®°à¯_à®…à®•à¯à®Ÿà¯‡à®¾à®ªà®°à¯_à®¨à®µà®®à¯à®ªà®°à¯_à®Ÿà®¿à®šà®®à¯à®ªà®°à¯".split("_"), weekdays: "à®žà®¾à®¯à®¿à®±à¯à®±à¯à®•à¯à®•à®¿à®´à®®à¯ˆ_à®¤à®¿à®™à¯à®•à®Ÿà¯à®•à®¿à®´à®®à¯ˆ_à®šà¯†à®µà¯à®µà®¾à®¯à¯à®•à®¿à®´à®®à¯ˆ_à®ªà¯à®¤à®©à¯à®•à®¿à®´à®®à¯ˆ_à®µà®¿à®¯à®¾à®´à®•à¯à®•à®¿à®´à®®à¯ˆ_à®µà¯†à®³à¯à®³à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ_à®šà®©à®¿à®•à¯à®•à®¿à®´à®®à¯ˆ".split("_"), weekdaysShort: "à®žà®¾à®¯à®¿à®±à¯_à®¤à®¿à®™à¯à®•à®³à¯_à®šà¯†à®µà¯à®µà®¾à®¯à¯_à®ªà¯à®¤à®©à¯_à®µà®¿à®¯à®¾à®´à®©à¯_à®µà¯†à®³à¯à®³à®¿_à®šà®©à®¿".split("_"), weekdaysMin: "à®žà®¾_à®¤à®¿_à®šà¯†_à®ªà¯_à®µà®¿_à®µà¯†_à®š".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, HH:mm", LLLL: "dddd, D MMMM YYYY, HH:mm" }, calendar: { sameDay: "[à®‡à®©à¯à®±à¯] LT", nextDay: "[à®¨à®¾à®³à¯ˆ] LT", nextWeek: "dddd, LT", lastDay: "[à®¨à¯‡à®±à¯à®±à¯] LT", lastWeek: "[à®•à®Ÿà®¨à¯à®¤ à®µà®¾à®°à®®à¯] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à®‡à®²à¯", past: "%s à®®à¯à®©à¯", s: "à®’à®°à¯ à®šà®¿à®² à®µà®¿à®¨à®¾à®Ÿà®¿à®•à®³à¯", m: "à®’à®°à¯ à®¨à®¿à®®à®¿à®Ÿà®®à¯", mm: "%d à®¨à®¿à®®à®¿à®Ÿà®™à¯à®•à®³à¯", h: "à®’à®°à¯ à®®à®£à®¿ à®¨à¯‡à®°à®®à¯", hh: "%d à®®à®£à®¿ à®¨à¯‡à®°à®®à¯", d: "à®’à®°à¯ à®¨à®¾à®³à¯", dd: "%d à®¨à®¾à®Ÿà¯à®•à®³à¯", M: "à®’à®°à¯ à®®à®¾à®¤à®®à¯", MM: "%d à®®à®¾à®¤à®™à¯à®•à®³à¯", y: "à®’à®°à¯ à®µà®°à¯à®Ÿà®®à¯", yy: "%d à®†à®£à¯à®Ÿà¯à®•à®³à¯" }, ordinalParse: /\d{1,2}à®µà®¤à¯/, ordinal: function(n) { return n + "à®µà®¤à¯" }, preparse: function(n) { return n.replace(/[à¯§à¯¨à¯©à¯ªà¯«à¯¬à¯­à¯®à¯¯à¯¦]/g, function(n) { return ytt[n] }) }, postformat: function(n) { return n.replace(/\d/g, function(n) { return vtt[n] }) }, meridiemParse: /à®¯à®¾à®®à®®à¯|à®µà¯ˆà®•à®±à¯ˆ|à®•à®¾à®²à¯ˆ|à®¨à®£à¯à®ªà®•à®²à¯|à®Žà®±à¯à®ªà®¾à®Ÿà¯|à®®à®¾à®²à¯ˆ/, meridiem: function(n) { return n < 2 ? " à®¯à®¾à®®à®®à¯" : n < 6 ? " à®µà¯ˆà®•à®±à¯ˆ" : n < 10 ? " à®•à®¾à®²à¯ˆ" : n < 14 ? " à®¨à®£à¯à®ªà®•à®²à¯" : n < 18 ? " à®Žà®±à¯à®ªà®¾à®Ÿà¯" : n < 22 ? " à®®à®¾à®²à¯ˆ" : " à®¯à®¾à®®à®®à¯" }, meridiemHour: function(n, t) { return n === 12 && (n = 0), t === "à®¯à®¾à®®à®®à¯" ? n < 2 ? n : n + 12 : t === "à®µà¯ˆà®•à®±à¯ˆ" || t === "à®•à®¾à®²à¯ˆ" ? n : t === "à®¨à®£à¯à®ªà®•à®²à¯" ? n >= 10 ? n : n + 12 : n + 12 }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : telugu (te)
    //! author : Krishna Chaitanya Thota : https://github.com/kcthota
    ptt = n.defineLocale("te", { months: "à°œà°¨à°µà°°à°¿_à°«à°¿à°¬à±à°°à°µà°°à°¿_à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿à°²à±_à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—à°¸à±à°Ÿà±_à°¸à±†à°ªà±à°Ÿà±†à°‚à°¬à°°à±_à°…à°•à±à°Ÿà±‹à°¬à°°à±_à°¨à°µà°‚à°¬à°°à±_à°¡à°¿à°¸à±†à°‚à°¬à°°à±".split("_"), monthsShort: "à°œà°¨._à°«à°¿à°¬à±à°°._à°®à°¾à°°à±à°šà°¿_à°à°ªà±à°°à°¿._à°®à±‡_à°œà±‚à°¨à±_à°œà±‚à°²à±†à±–_à°†à°—._à°¸à±†à°ªà±._à°…à°•à±à°Ÿà±‹._à°¨à°µ._à°¡à°¿à°¸à±†.".split("_"), weekdays: "à°†à°¦à°¿à°µà°¾à°°à°‚_à°¸à±‹à°®à°µà°¾à°°à°‚_à°®à°‚à°—à°³à°µà°¾à°°à°‚_à°¬à±à°§à°µà°¾à°°à°‚_à°—à±à°°à±à°µà°¾à°°à°‚_à°¶à±à°•à±à°°à°µà°¾à°°à°‚_à°¶à°¨à°¿à°µà°¾à°°à°‚".split("_"), weekdaysShort: "à°†à°¦à°¿_à°¸à±‹à°®_à°®à°‚à°—à°³_à°¬à±à°§_à°—à±à°°à±_à°¶à±à°•à±à°°_à°¶à°¨à°¿".split("_"), weekdaysMin: "à°†_à°¸à±‹_à°®à°‚_à°¬à±_à°—à±_à°¶à±_à°¶".split("_"), longDateFormat: { LT: "A h:mm", LTS: "A h:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY, A h:mm", LLLL: "dddd, D MMMM YYYY, A h:mm" }, calendar: { sameDay: "[à°¨à±‡à°¡à±] LT", nextDay: "[à°°à±‡à°ªà±] LT", nextWeek: "dddd, LT", lastDay: "[à°¨à°¿à°¨à±à°¨] LT", lastWeek: "[à°—à°¤] dddd, LT", sameElse: "L" }, relativeTime: { future: "%s à°²à±‹", past: "%s à°•à±à°°à°¿à°¤à°‚", s: "à°•à±Šà°¨à±à°¨à°¿ à°•à±à°·à°£à°¾à°²à±", m: "à°’à°• à°¨à°¿à°®à°¿à°·à°‚", mm: "%d à°¨à°¿à°®à°¿à°·à°¾à°²à±", h: "à°’à°• à°—à°‚à°Ÿ", hh: "%d à°—à°‚à°Ÿà°²à±", d: "à°’à°• à°°à±‹à°œà±", dd: "%d à°°à±‹à°œà±à°²à±", M: "à°’à°• à°¨à±†à°²", MM: "%d à°¨à±†à°²à°²à±", y: "à°’à°• à°¸à°‚à°µà°¤à±à°¸à°°à°‚", yy: "%d à°¸à°‚à°µà°¤à±à°¸à°°à°¾à°²à±" }, ordinalParse: /\d{1,2}à°µ/, ordinal: "%dà°µ", meridiemParse: /à°°à°¾à°¤à±à°°à°¿|à°‰à°¦à°¯à°‚|à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚|à°¸à°¾à°¯à°‚à°¤à±à°°à°‚/, meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "à°°à°¾à°¤à±à°°à°¿") ? n < 4 ? n : n + 12 : t === "à°‰à°¦à°¯à°‚" ? n : t === "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" ? n >= 10 ? n : n + 12 : t === "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" ? n + 12 : void 0 }, meridiem: function(n) { return n < 4 ? "à°°à°¾à°¤à±à°°à°¿" : n < 10 ? "à°‰à°¦à°¯à°‚" : n < 17 ? "à°®à°§à±à°¯à°¾à°¹à±à°¨à°‚" : n < 20 ? "à°¸à°¾à°¯à°‚à°¤à±à°°à°‚" : "à°°à°¾à°¤à±à°°à°¿" }, week: { dow: 0, doy: 6 } });
    //! moment.js locale configuration
    //! locale : thai (th)
    //! author : Kridsada Thanabulpong : https://github.com/sirn
    wtt = n.defineLocale("th", { months: "à¸¡à¸à¸£à¸²à¸„à¸¡_à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ_à¸¡à¸µà¸™à¸²à¸„à¸¡_à¹€à¸¡à¸©à¸²à¸¢à¸™_à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡_à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™_à¸à¸£à¸à¸Žà¸²à¸„à¸¡_à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡_à¸à¸±à¸™à¸¢à¸²à¸¢à¸™_à¸•à¸¸à¸¥à¸²à¸„à¸¡_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™_à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡".split("_"), monthsShort: "à¸¡à¸à¸£à¸²_à¸à¸¸à¸¡à¸ à¸²_à¸¡à¸µà¸™à¸²_à¹€à¸¡à¸©à¸²_à¸žà¸¤à¸©à¸ à¸²_à¸¡à¸´à¸–à¸¸à¸™à¸²_à¸à¸£à¸à¸Žà¸²_à¸ªà¸´à¸‡à¸«à¸²_à¸à¸±à¸™à¸¢à¸²_à¸•à¸¸à¸¥à¸²_à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²_à¸˜à¸±à¸™à¸§à¸²".split("_"), weekdays: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ªà¸šà¸”à¸µ_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"), weekdaysShort: "à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ_à¸ˆà¸±à¸™à¸—à¸£à¹Œ_à¸­à¸±à¸‡à¸„à¸²à¸£_à¸žà¸¸à¸˜_à¸žà¸¤à¸«à¸±à¸ª_à¸¨à¸¸à¸à¸£à¹Œ_à¹€à¸ªà¸²à¸£à¹Œ".split("_"), weekdaysMin: "à¸­à¸²._à¸ˆ._à¸­._à¸ž._à¸žà¸¤._à¸¨._à¸ª.".split("_"), longDateFormat: { LT: "H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ", LTS: "H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ s à¸§à¸´à¸™à¸²à¸—à¸µ", L: "YYYY/MM/DD", LL: "D MMMM YYYY", LLL: "D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ", LLLL: "à¸§à¸±à¸™ddddà¸—à¸µà¹ˆ D MMMM YYYY à¹€à¸§à¸¥à¸² H à¸™à¸²à¸¬à¸´à¸à¸² m à¸™à¸²à¸—à¸µ" }, meridiemParse: /à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡|à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡/, isPM: function(n) { return n === "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡" }, meridiem: function(n) { return n < 12 ? "à¸à¹ˆà¸­à¸™à¹€à¸—à¸µà¹ˆà¸¢à¸‡" : "à¸«à¸¥à¸±à¸‡à¹€à¸—à¸µà¹ˆà¸¢à¸‡" }, calendar: { sameDay: "[à¸§à¸±à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT", nextDay: "[à¸žà¸£à¸¸à¹ˆà¸‡à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT", nextWeek: "dddd[à¸«à¸™à¹‰à¸² à¹€à¸§à¸¥à¸²] LT", lastDay: "[à¹€à¸¡à¸·à¹ˆà¸­à¸§à¸²à¸™à¸™à¸µà¹‰ à¹€à¸§à¸¥à¸²] LT", lastWeek: "[à¸§à¸±à¸™]dddd[à¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§ à¹€à¸§à¸¥à¸²] LT", sameElse: "L" }, relativeTime: { future: "à¸­à¸µà¸ %s", past: "%sà¸—à¸µà¹ˆà¹à¸¥à¹‰à¸§", s: "à¹„à¸¡à¹ˆà¸à¸µà¹ˆà¸§à¸´à¸™à¸²à¸—à¸µ", m: "1 à¸™à¸²à¸—à¸µ", mm: "%d à¸™à¸²à¸—à¸µ", h: "1 à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡", hh: "%d à¸Šà¸±à¹ˆà¸§à¹‚à¸¡à¸‡", d: "1 à¸§à¸±à¸™", dd: "%d à¸§à¸±à¸™", M: "1 à¹€à¸”à¸·à¸­à¸™", MM: "%d à¹€à¸”à¸·à¸­à¸™", y: "1 à¸›à¸µ", yy: "%d à¸›à¸µ" } });
    //! moment.js locale configuration
    //! locale : Tagalog/Filipino (tl-ph)
    //! author : Dan Hagman
    btt = n.defineLocale("tl-ph", { months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"), monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"), weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"), weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"), weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "MM/D/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY HH:mm", LLLL: "dddd, MMMM DD, YYYY HH:mm" }, calendar: { sameDay: "[Ngayon sa] LT", nextDay: "[Bukas sa] LT", nextWeek: "dddd [sa] LT", lastDay: "[Kahapon sa] LT", lastWeek: "dddd [huling linggo] LT", sameElse: "L" }, relativeTime: { future: "sa loob ng %s", past: "%s ang nakalipas", s: "ilang segundo", m: "isang minuto", mm: "%d minuto", h: "isang oras", hh: "%d oras", d: "isang araw", dd: "%d araw", M: "isang buwan", MM: "%d buwan", y: "isang taon", yy: "%d taon" }, ordinalParse: /\d{1,2}/, ordinal: function(n) { return n }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Klingon (tlh)
    //! author : Dominika Kruk : https://github.com/amaranthrose
    hf = "pagh_waâ€™_chaâ€™_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
    nit = n.defineLocale("tlh", { months: "teraâ€™ jar waâ€™_teraâ€™ jar chaâ€™_teraâ€™ jar wej_teraâ€™ jar loS_teraâ€™ jar vagh_teraâ€™ jar jav_teraâ€™ jar Soch_teraâ€™ jar chorgh_teraâ€™ jar Hut_teraâ€™ jar waâ€™maH_teraâ€™ jar waâ€™maH waâ€™_teraâ€™ jar waâ€™maH chaâ€™".split("_"), monthsShort: "jar waâ€™_jar chaâ€™_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar waâ€™maH_jar waâ€™maH waâ€™_jar waâ€™maH chaâ€™".split("_"), weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" }, calendar: { sameDay: "[DaHjaj] LT", nextDay: "[waâ€™leS] LT", nextWeek: "LLL", lastDay: "[waâ€™Huâ€™] LT", lastWeek: "LLL", sameElse: "L" }, relativeTime: { future: ktt, past: dtt, s: "puS lup", m: "waâ€™ tup", mm: ru, h: "waâ€™ rep", hh: ru, d: "waâ€™ jaj", dd: ru, M: "waâ€™ jar", MM: ru, y: "waâ€™ DIS", yy: ru }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : turkish (tr)
    //! authors : Erhan Gundogan : https://github.com/erhangundogan,
    //!           Burak YiÄŸit Kaya: https://github.com/BYK
    cf = { 1: "'inci", 5: "'inci", 8: "'inci", 70: "'inci", 80: "'inci", 2: "'nci", 7: "'nci", 20: "'nci", 50: "'nci", 3: "'Ã¼ncÃ¼", 4: "'Ã¼ncÃ¼", 100: "'Ã¼ncÃ¼", 6: "'ncÄ±", 9: "'uncu", 10: "'uncu", 30: "'uncu", 60: "'Ä±ncÄ±", 90: "'Ä±ncÄ±" };
    tit = n.defineLocale("tr", {
        months: "Ocak_Åžubat_Mart_Nisan_MayÄ±s_Haziran_Temmuz_AÄŸustos_EylÃ¼l_Ekim_KasÄ±m_AralÄ±k".split("_"),
        monthsShort: "Oca_Åžub_Mar_Nis_May_Haz_Tem_AÄŸu_Eyl_Eki_Kas_Ara".split("_"),
        weekdays: "Pazar_Pazartesi_SalÄ±_Ã‡arÅŸamba_PerÅŸembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Ã‡ar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ã‡a_Pe_Cu_Ct".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd, D MMMM YYYY HH:mm" },
        calendar: { sameDay: "[bugÃ¼n saat] LT", nextDay: "[yarÄ±n saat] LT", nextWeek: "[haftaya] dddd [saat] LT", lastDay: "[dÃ¼n] LT", lastWeek: "[geÃ§en hafta] dddd [saat] LT", sameElse: "L" },
        relativeTime: { future: "%s sonra", past: "%s Ã¶nce", s: "birkaÃ§ saniye", m: "bir dakika", mm: "%d dakika", h: "bir saat", hh: "%d saat", d: "bir gÃ¼n", dd: "%d gÃ¼n", M: "bir ay", MM: "%d ay", y: "bir yÄ±l", yy: "%d yÄ±l" },
        ordinalParse: /\d{1,2}'(inci|nci|Ã¼ncÃ¼|ncÄ±|uncu|Ä±ncÄ±)/,
        ordinal: function(n) {
            if (n === 0) return n + "'Ä±ncÄ±";
            var t = n % 10,
                i = n % 100 - t,
                r = n >= 100 ? 100 : null;
            return n + (cf[t] || cf[i] || cf[r])
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : talossan (tzl)
    //! author : Robin van der Vliet : https://github.com/robin0van0der0v with the help of IustÃ¬ Canun
    iit = n.defineLocale("tzl", { months: "Januar_Fevraglh_MarÃ§_AvrÃ¯u_Mai_GÃ¼n_Julia_Guscht_Setemvar_ListopÃ¤ts_Noemvar_Zecemvar".split("_"), monthsShort: "Jan_Fev_Mar_Avr_Mai_GÃ¼n_Jul_Gus_Set_Lis_Noe_Zec".split("_"), weekdays: "SÃºladi_LÃºneÃ§i_Maitzi_MÃ¡rcuri_XhÃºadi_ViÃ©nerÃ§i_SÃ¡turi".split("_"), weekdaysShort: "SÃºl_LÃºn_Mai_MÃ¡r_XhÃº_ViÃ©_SÃ¡t".split("_"), weekdaysMin: "SÃº_LÃº_Ma_MÃ¡_Xh_Vi_SÃ¡".split("_"), longDateFormat: { LT: "HH.mm", LTS: "HH.mm.ss", L: "DD.MM.YYYY", LL: "D. MMMM [dallas] YYYY", LLL: "D. MMMM [dallas] YYYY HH.mm", LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm" }, meridiem: function(n, t, i) { return n > 11 ? i ? "d'o" : "D'O" : i ? "d'a" : "D'A" }, calendar: { sameDay: "[oxhi Ã ] LT", nextDay: "[demÃ  Ã ] LT", nextWeek: "dddd [Ã ] LT", lastDay: "[ieiri Ã ] LT", lastWeek: "[sÃ¼r el] dddd [lasteu Ã ] LT", sameElse: "L" }, relativeTime: { future: "osprei %s", past: "ja%s", s: ot, m: ot, mm: ot, h: ot, hh: ot, d: ot, dd: ot, M: ot, MM: ot, y: ot, yy: ot }, ordinalParse: /\d{1,2}\./, ordinal: "%d.", week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : Morocco Central Atlas TamaziÉ£t in Latin (tzm-latn)
    //! author : Abdel Said : https://github.com/abdelsaid
    rit = n.defineLocale("tzm-latn", { months: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"), monthsShort: "innayr_brË¤ayrË¤_marË¤sË¤_ibrir_mayyw_ywnyw_ywlywz_É£wÅ¡t_Å¡wtanbir_ktË¤wbrË¤_nwwanbir_dwjnbir".split("_"), weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"), weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"), weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiá¸yas".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[asdkh g] LT", nextDay: "[aska g] LT", nextWeek: "dddd [g] LT", lastDay: "[assant g] LT", lastWeek: "dddd [g] LT", sameElse: "L" }, relativeTime: { future: "dadkh s yan %s", past: "yan %s", s: "imik", m: "minuá¸", mm: "%d minuá¸", h: "saÉ›a", hh: "%d tassaÉ›in", d: "ass", dd: "%d ossan", M: "ayowr", MM: "%d iyyirn", y: "asgas", yy: "%d isgasn" }, week: { dow: 6, doy: 12 } });
    //! moment.js locale configuration
    //! locale : Morocco Central Atlas TamaziÉ£t (tzm)
    //! author : Abdel Said : https://github.com/abdelsaid
    uit = n.defineLocale("tzm", { months: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"), monthsShort: "âµ‰âµâµâ´°âµ¢âµ”_â´±âµ•â´°âµ¢âµ•_âµŽâ´°âµ•âµš_âµ‰â´±âµ”âµ‰âµ”_âµŽâ´°âµ¢âµ¢âµ“_âµ¢âµ“âµâµ¢âµ“_âµ¢âµ“âµâµ¢âµ“âµ£_âµ–âµ“âµ›âµœ_âµ›âµ“âµœâ´°âµâ´±âµ‰âµ”_â´½âµŸâµ“â´±âµ•_âµâµ“âµ¡â´°âµâ´±âµ‰âµ”_â´·âµ“âµŠâµâ´±âµ‰âµ”".split("_"), weekdays: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"), weekdaysShort: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"), weekdaysMin: "â´°âµ™â´°âµŽâ´°âµ™_â´°âµ¢âµâ´°âµ™_â´°âµ™âµ‰âµâ´°âµ™_â´°â´½âµ”â´°âµ™_â´°â´½âµ¡â´°âµ™_â´°âµ™âµ‰âµŽâµ¡â´°âµ™_â´°âµ™âµ‰â´¹âµ¢â´°âµ™".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, calendar: { sameDay: "[â´°âµ™â´·âµ… â´´] LT", nextDay: "[â´°âµ™â´½â´° â´´] LT", nextWeek: "dddd [â´´] LT", lastDay: "[â´°âµšâ´°âµâµœ â´´] LT", lastWeek: "dddd [â´´] LT", sameElse: "L" }, relativeTime: { future: "â´·â´°â´·âµ… âµ™ âµ¢â´°âµ %s", past: "âµ¢â´°âµ %s", s: "âµ‰âµŽâµ‰â´½", m: "âµŽâµ‰âµâµ“â´º", mm: "%d âµŽâµ‰âµâµ“â´º", h: "âµ™â´°âµ„â´°", hh: "%d âµœâ´°âµ™âµ™â´°âµ„âµ‰âµ", d: "â´°âµ™âµ™", dd: "%d oâµ™âµ™â´°âµ", M: "â´°âµ¢oâµ“âµ”", MM: "%d âµ‰âµ¢âµ¢âµ‰âµ”âµ", y: "â´°âµ™â´³â´°âµ™", yy: "%d âµ‰âµ™â´³â´°âµ™âµ" }, week: { dow: 6, doy: 12 } });
    //! moment.js locale configuration
    //! locale : ukrainian (uk)
    //! author : zemlanin : https://github.com/zemlanin
    //! Author : Menelion ElensÃºle : https://github.com/Oire
    oit = n.defineLocale("uk", {
        months: { format: "ÑÑ–Ñ‡Ð½Ñ_Ð»ÑŽÑ‚Ð¾Ð³Ð¾_Ð±ÐµÑ€ÐµÐ·Ð½Ñ_ÐºÐ²Ñ–Ñ‚Ð½Ñ_Ñ‚Ñ€Ð°Ð²Ð½Ñ_Ñ‡ÐµÑ€Ð²Ð½Ñ_Ð»Ð¸Ð¿Ð½Ñ_ÑÐµÑ€Ð¿Ð½Ñ_Ð²ÐµÑ€ÐµÑÐ½Ñ_Ð¶Ð¾Ð²Ñ‚Ð½Ñ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´Ð°_Ð³Ñ€ÑƒÐ´Ð½Ñ".split("_"), standalone: "ÑÑ–Ñ‡ÐµÐ½ÑŒ_Ð»ÑŽÑ‚Ð¸Ð¹_Ð±ÐµÑ€ÐµÐ·ÐµÐ½ÑŒ_ÐºÐ²Ñ–Ñ‚ÐµÐ½ÑŒ_Ñ‚Ñ€Ð°Ð²ÐµÐ½ÑŒ_Ñ‡ÐµÑ€Ð²ÐµÐ½ÑŒ_Ð»Ð¸Ð¿ÐµÐ½ÑŒ_ÑÐµÑ€Ð¿ÐµÐ½ÑŒ_Ð²ÐµÑ€ÐµÑÐµÐ½ÑŒ_Ð¶Ð¾Ð²Ñ‚ÐµÐ½ÑŒ_Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´_Ð³Ñ€ÑƒÐ´ÐµÐ½ÑŒ".split("_") },
        monthsShort: "ÑÑ–Ñ‡_Ð»ÑŽÑ‚_Ð±ÐµÑ€_ÐºÐ²Ñ–Ñ‚_Ñ‚Ñ€Ð°Ð²_Ñ‡ÐµÑ€Ð²_Ð»Ð¸Ð¿_ÑÐµÑ€Ð¿_Ð²ÐµÑ€_Ð¶Ð¾Ð²Ñ‚_Ð»Ð¸ÑÑ‚_Ð³Ñ€ÑƒÐ´".split("_"),
        weekdays: eit,
        weekdaysShort: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        weekdaysMin: "Ð½Ð´_Ð¿Ð½_Ð²Ñ‚_ÑÑ€_Ñ‡Ñ‚_Ð¿Ñ‚_ÑÐ±".split("_"),
        longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD.MM.YYYY", LL: "D MMMM YYYY Ñ€.", LLL: "D MMMM YYYY Ñ€., HH:mm", LLLL: "dddd, D MMMM YYYY Ñ€., HH:mm" },
        calendar: {
            sameDay: er("[Ð¡ÑŒÐ¾Ð³Ð¾Ð´Ð½Ñ– "),
            nextDay: er("[Ð—Ð°Ð²Ñ‚Ñ€Ð° "),
            lastDay: er("[Ð’Ñ‡Ð¾Ñ€Ð° "),
            nextWeek: er("[Ð£] dddd ["),
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                    case 3:
                    case 5:
                    case 6:
                        return er("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ñ—] dddd [").call(this);
                    case 1:
                    case 2:
                    case 4:
                        return er("[ÐœÐ¸Ð½ÑƒÐ»Ð¾Ð³Ð¾] dddd [").call(this)
                }
            },
            sameElse: "L"
        },
        relativeTime: { future: "Ð·Ð° %s", past: "%s Ñ‚Ð¾Ð¼Ñƒ", s: "Ð´ÐµÐºÑ–Ð»ÑŒÐºÐ° ÑÐµÐºÑƒÐ½Ð´", m: fr, mm: fr, h: "Ð³Ð¾Ð´Ð¸Ð½Ñƒ", hh: fr, d: "Ð´ÐµÐ½ÑŒ", dd: fr, M: "Ð¼Ñ–ÑÑÑ†ÑŒ", MM: fr, y: "Ñ€Ñ–Ðº", yy: fr },
        meridiemParse: /Ð½Ð¾Ñ‡Ñ–|Ñ€Ð°Ð½ÐºÑƒ|Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°/,
        isPM: function(n) { return /^(Ð´Ð½Ñ|Ð²ÐµÑ‡Ð¾Ñ€Ð°)$/.test(n) },
        meridiem: function(n) { return n < 4 ? "Ð½Ð¾Ñ‡Ñ–" : n < 12 ? "Ñ€Ð°Ð½ÐºÑƒ" : n < 17 ? "Ð´Ð½Ñ" : "Ð²ÐµÑ‡Ð¾Ñ€Ð°" },
        ordinalParse: /\d{1,2}-(Ð¹|Ð³Ð¾)/,
        ordinal: function(n, t) {
            switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                    return n + "-Ð¹";
                case "D":
                    return n + "-Ð³Ð¾";
                default:
                    return n
            }
        },
        week: { dow: 1, doy: 7 }
    });
    //! moment.js locale configuration
    //! locale : uzbek (uz)
    //! author : Sardor Muminov : https://github.com/muminoff
    sit = n.defineLocale("uz", { months: "ÑÐ½Ð²Ð°Ñ€_Ñ„ÐµÐ²Ñ€Ð°Ð»_Ð¼Ð°Ñ€Ñ‚_Ð°Ð¿Ñ€ÐµÐ»_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³ÑƒÑÑ‚_ÑÐµÐ½Ñ‚ÑÐ±Ñ€_Ð¾ÐºÑ‚ÑÐ±Ñ€_Ð½Ð¾ÑÐ±Ñ€_Ð´ÐµÐºÐ°Ð±Ñ€".split("_"), monthsShort: "ÑÐ½Ð²_Ñ„ÐµÐ²_Ð¼Ð°Ñ€_Ð°Ð¿Ñ€_Ð¼Ð°Ð¹_Ð¸ÑŽÐ½_Ð¸ÑŽÐ»_Ð°Ð²Ð³_ÑÐµÐ½_Ð¾ÐºÑ‚_Ð½Ð¾Ñ_Ð´ÐµÐº".split("_"), weekdays: "Ð¯ÐºÑˆÐ°Ð½Ð±Ð°_Ð”ÑƒÑˆÐ°Ð½Ð±Ð°_Ð¡ÐµÑˆÐ°Ð½Ð±Ð°_Ð§Ð¾Ñ€ÑˆÐ°Ð½Ð±Ð°_ÐŸÐ°Ð¹ÑˆÐ°Ð½Ð±Ð°_Ð–ÑƒÐ¼Ð°_Ð¨Ð°Ð½Ð±Ð°".split("_"), weekdaysShort: "Ð¯ÐºÑˆ_Ð”ÑƒÑˆ_Ð¡ÐµÑˆ_Ð§Ð¾Ñ€_ÐŸÐ°Ð¹_Ð–ÑƒÐ¼_Ð¨Ð°Ð½".split("_"), weekdaysMin: "Ð¯Ðº_Ð”Ñƒ_Ð¡Ðµ_Ð§Ð¾_ÐŸÐ°_Ð–Ñƒ_Ð¨Ð°".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "D MMMM YYYY, dddd HH:mm" }, calendar: { sameDay: "[Ð‘ÑƒÐ³ÑƒÐ½ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]", nextDay: "[Ð­Ñ€Ñ‚Ð°Ð³Ð°] LT [Ð´Ð°]", nextWeek: "dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]", lastDay: "[ÐšÐµÑ‡Ð° ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]", lastWeek: "[Ð£Ñ‚Ð³Ð°Ð½] dddd [ÐºÑƒÐ½Ð¸ ÑÐ¾Ð°Ñ‚] LT [Ð´Ð°]", sameElse: "L" }, relativeTime: { future: "Ð¯ÐºÐ¸Ð½ %s Ð¸Ñ‡Ð¸Ð´Ð°", past: "Ð‘Ð¸Ñ€ Ð½ÐµÑ‡Ð° %s Ð¾Ð»Ð´Ð¸Ð½", s: "Ñ„ÑƒÑ€ÑÐ°Ñ‚", m: "Ð±Ð¸Ñ€ Ð´Ð°ÐºÐ¸ÐºÐ°", mm: "%d Ð´Ð°ÐºÐ¸ÐºÐ°", h: "Ð±Ð¸Ñ€ ÑÐ¾Ð°Ñ‚", hh: "%d ÑÐ¾Ð°Ñ‚", d: "Ð±Ð¸Ñ€ ÐºÑƒÐ½", dd: "%d ÐºÑƒÐ½", M: "Ð±Ð¸Ñ€ Ð¾Ð¹", MM: "%d Ð¾Ð¹", y: "Ð±Ð¸Ñ€ Ð¹Ð¸Ð»", yy: "%d Ð¹Ð¸Ð»" }, week: { dow: 1, doy: 7 } });
    //! moment.js locale configuration
    //! locale : vietnamese (vi)
    //! author : Bang Nguyen : https://github.com/bangnk
    hit = n.defineLocale("vi", { months: "thÃ¡ng 1_thÃ¡ng 2_thÃ¡ng 3_thÃ¡ng 4_thÃ¡ng 5_thÃ¡ng 6_thÃ¡ng 7_thÃ¡ng 8_thÃ¡ng 9_thÃ¡ng 10_thÃ¡ng 11_thÃ¡ng 12".split("_"), monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"), weekdays: "chá»§ nháº­t_thá»© hai_thá»© ba_thá»© tÆ°_thá»© nÄƒm_thá»© sÃ¡u_thá»© báº£y".split("_"), weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"), weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"), longDateFormat: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM [nÄƒm] YYYY", LLL: "D MMMM [nÄƒm] YYYY HH:mm", LLLL: "dddd, D MMMM [nÄƒm] YYYY HH:mm", l: "DD/M/YYYY", ll: "D MMM YYYY", lll: "D MMM YYYY HH:mm", llll: "ddd, D MMM YYYY HH:mm" }, calendar: { sameDay: "[HÃ´m nay lÃºc] LT", nextDay: "[NgÃ y mai lÃºc] LT", nextWeek: "dddd [tuáº§n tá»›i lÃºc] LT", lastDay: "[HÃ´m qua lÃºc] LT", lastWeek: "dddd [tuáº§n rá»“i lÃºc] LT", sameElse: "L" }, relativeTime: { future: "%s tá»›i", past: "%s trÆ°á»›c", s: "vÃ i giÃ¢y", m: "má»™t phÃºt", mm: "%d phÃºt", h: "má»™t giá»", hh: "%d giá»", d: "má»™t ngÃ y", dd: "%d ngÃ y", M: "má»™t thÃ¡ng", MM: "%d thÃ¡ng", y: "má»™t nÄƒm", yy: "%d nÄƒm" }, ordinalParse: /\d{1,2}/, ordinal: function(n) { return n }, week: { dow: 1, doy: 4 } });
    //! moment.js locale configuration
    //! locale : chinese (zh-cn)
    //! author : suupic : https://github.com/suupic
    //! author : Zeno Zeng : https://github.com/zenozeng
    cit = n.defineLocale("zh-cn", {
        months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
        weekdaysShort: "å‘¨æ—¥_å‘¨ä¸€_å‘¨äºŒ_å‘¨ä¸‰_å‘¨å››_å‘¨äº”_å‘¨å…­".split("_"),
        weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
        longDateFormat: { LT: "Ahç‚¹mmåˆ†", LTS: "Ahç‚¹måˆ†sç§’", L: "YYYY-MM-DD", LL: "YYYYå¹´MMMDæ—¥", LLL: "YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†", LLLL: "YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†", l: "YYYY-MM-DD", ll: "YYYYå¹´MMMDæ—¥", lll: "YYYYå¹´MMMDæ—¥Ahç‚¹mmåˆ†", llll: "YYYYå¹´MMMDæ—¥ddddAhç‚¹mmåˆ†" },
        meridiemParse: /å‡Œæ™¨|æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
        meridiemHour: function(n, t) { return n === 12 && (n = 0), t === "å‡Œæ™¨" || t === "æ—©ä¸Š" || t === "ä¸Šåˆ" ? n : t === "ä¸‹åˆ" || t === "æ™šä¸Š" ? n + 12 : n >= 11 ? n : n + 12 },
        meridiem: function(n, t) { var i = n * 100 + t; return i < 600 ? "å‡Œæ™¨" : i < 900 ? "æ—©ä¸Š" : i < 1130 ? "ä¸Šåˆ" : i < 1230 ? "ä¸­åˆ" : i < 1800 ? "ä¸‹åˆ" : "æ™šä¸Š" },
        calendar: { sameDay: function() { return this.minutes() === 0 ? "[ä»Šå¤©]Ah[ç‚¹æ•´]" : "[ä»Šå¤©]LT" }, nextDay: function() { return this.minutes() === 0 ? "[æ˜Žå¤©]Ah[ç‚¹æ•´]" : "[æ˜Žå¤©]LT" }, lastDay: function() { return this.minutes() === 0 ? "[æ˜¨å¤©]Ah[ç‚¹æ•´]" : "[æ˜¨å¤©]LT" }, nextWeek: function() { var i, t; return i = n().startOf("week"), t = this.unix() - i.unix() >= 604800 ? "[ä¸‹]" : "[æœ¬]", this.minutes() === 0 ? t + "dddAhç‚¹æ•´" : t + "dddAhç‚¹mm" }, lastWeek: function() { var i, t; return i = n().startOf("week"), t = this.unix() < i.unix() ? "[ä¸Š]" : "[æœ¬]", this.minutes() === 0 ? t + "dddAhç‚¹æ•´" : t + "dddAhç‚¹mm" }, sameElse: "LL" },
        ordinalParse: /\d{1,2}(æ—¥|æœˆ|å‘¨)/,
        ordinal: function(n, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return n + "æ—¥";
                case "M":
                    return n + "æœˆ";
                case "w":
                case "W":
                    return n + "å‘¨";
                default:
                    return n
            }
        },
        relativeTime: { future: "%så†…", past: "%så‰", s: "å‡ ç§’", m: "1 åˆ†é’Ÿ", mm: "%d åˆ†é’Ÿ", h: "1 å°æ—¶", hh: "%d å°æ—¶", d: "1 å¤©", dd: "%d å¤©", M: "1 ä¸ªæœˆ", MM: "%d ä¸ªæœˆ", y: "1 å¹´", yy: "%d å¹´" },
        week: { dow: 1, doy: 4 }
    });
    //! moment.js locale configuration
    //! locale : traditional chinese (zh-tw)
    //! author : Ben : https://github.com/ben-lin
    return lit = n.defineLocale("zh-tw", {
        months: "ä¸€æœˆ_äºŒæœˆ_ä¸‰æœˆ_å››æœˆ_äº”æœˆ_å…­æœˆ_ä¸ƒæœˆ_å…«æœˆ_ä¹æœˆ_åæœˆ_åä¸€æœˆ_åäºŒæœˆ".split("_"),
        monthsShort: "1æœˆ_2æœˆ_3æœˆ_4æœˆ_5æœˆ_6æœˆ_7æœˆ_8æœˆ_9æœˆ_10æœˆ_11æœˆ_12æœˆ".split("_"),
        weekdays: "æ˜ŸæœŸæ—¥_æ˜ŸæœŸä¸€_æ˜ŸæœŸäºŒ_æ˜ŸæœŸä¸‰_æ˜ŸæœŸå››_æ˜ŸæœŸäº”_æ˜ŸæœŸå…­".split("_"),
        weekdaysShort: "é€±æ—¥_é€±ä¸€_é€±äºŒ_é€±ä¸‰_é€±å››_é€±äº”_é€±å…­".split("_"),
        weekdaysMin: "æ—¥_ä¸€_äºŒ_ä¸‰_å››_äº”_å…­".split("_"),
        longDateFormat: { LT: "Ahé»žmmåˆ†", LTS: "Ahé»žmåˆ†sç§’", L: "YYYYå¹´MMMDæ—¥", LL: "YYYYå¹´MMMDæ—¥", LLL: "YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†", LLLL: "YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†", l: "YYYYå¹´MMMDæ—¥", ll: "YYYYå¹´MMMDæ—¥", lll: "YYYYå¹´MMMDæ—¥Ahé»žmmåˆ†", llll: "YYYYå¹´MMMDæ—¥ddddAhé»žmmåˆ†" },
        meridiemParse: /æ—©ä¸Š|ä¸Šåˆ|ä¸­åˆ|ä¸‹åˆ|æ™šä¸Š/,
        meridiemHour: function(n, t) { return (n === 12 && (n = 0), t === "æ—©ä¸Š" || t === "ä¸Šåˆ") ? n : t === "ä¸­åˆ" ? n >= 11 ? n : n + 12 : t === "ä¸‹åˆ" || t === "æ™šä¸Š" ? n + 12 : void 0 },
        meridiem: function(n, t) { var i = n * 100 + t; return i < 900 ? "æ—©ä¸Š" : i < 1130 ? "ä¸Šåˆ" : i < 1230 ? "ä¸­åˆ" : i < 1800 ? "ä¸‹åˆ" : "æ™šä¸Š" },
        calendar: { sameDay: "[ä»Šå¤©]LT", nextDay: "[æ˜Žå¤©]LT", nextWeek: "[ä¸‹]ddddLT", lastDay: "[æ˜¨å¤©]LT", lastWeek: "[ä¸Š]ddddLT", sameElse: "L" },
        ordinalParse: /\d{1,2}(æ—¥|æœˆ|é€±)/,
        ordinal: function(n, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return n + "æ—¥";
                case "M":
                    return n + "æœˆ";
                case "w":
                case "W":
                    return n + "é€±";
                default:
                    return n
            }
        },
        relativeTime: { future: "%så…§", past: "%så‰", s: "å¹¾ç§’", m: "ä¸€åˆ†é˜", mm: "%dåˆ†é˜", h: "ä¸€å°æ™‚", hh: "%då°æ™‚", d: "ä¸€å¤©", dd: "%då¤©", M: "ä¸€å€‹æœˆ", MM: "%då€‹æœˆ", y: "ä¸€å¹´", yy: "%då¹´" }
    }), no = n, no.locale("en"), no
}),
function(n, t) { typeof define == "function" && define.amd ? define(["moment"], function(i) { return n.moment = t(i), n.moment }) : typeof exports == "object" ? module.exports = t(require("moment")) : n.moment = t(n.moment) }(this, function(n) {
    function ft(n, t) { return function(i) { return u(n.call(this, i), t) } }

    function pt(n, t) { return function(i) { return this.localeData().ordinal(n.call(this, i), t) } }

    function p(n, t) { for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]); return n }

    function u(n, t) { for (var i = n + ""; i.length < t;) i = "0" + i; return i }

    function wt(n) { return Object.prototype.toString.call(n) === "[object Array]" }

    function l(n) { return n ? yt[n] || n.toLowerCase().replace(/(.)s$/, "$1") : n }

    function s(n, t, i, r) {
        var u = n._isUTC ? "UTC" : "";
        n._d["set" + u + "FullYear"](t);
        n._d["set" + u + "Month"](i);
        n._d["set" + u + "Date"](r)
    }

    function et(n) {
        function t() {}
        return t.prototype = n, new t
    }

    function bt(n) { return Object.getPrototypeOf ? Object.getPrototypeOf(n) : "".__proto__ ? n.__proto__ : n.constructor.prototype }

    function kt(n) { for (var i = n.match(v), u = i.length, t = 0; t < u; t += 1) r[i[t]] && (i[t] = r[i[t]]); return function(r) { var f = ""; for (t = 0; t < u; t += 1) f += i[t] instanceof Function ? "[" + i[t].call(r, n) + "]" : i[t]; return f } }

    function st(t, i) {
        switch (t) {
            case "iDDDD":
                return g;
            case "iYYYY":
                return nt;
            case "iYYYYY":
                return tt;
            case "iDDD":
                return d;
            case "iMMM":
            case "iMMMM":
                return it;
            case "iMM":
            case "iDD":
            case "iYY":
            case "iM":
            case "iD":
                return k;
            case "DDDD":
                return g;
            case "YYYY":
                return nt;
            case "YYYYY":
                return tt;
            case "S":
            case "SS":
            case "SSS":
            case "DDD":
                return d;
            case "MMM":
            case "MMMM":
            case "dd":
            case "ddd":
            case "dddd":
                return it;
            case "a":
            case "A":
                return n.localeData(i._l)._meridiemParse;
            case "X":
                return vt;
            case "Z":
            case "ZZ":
                return lt;
            case "T":
                return at;
            case "MM":
            case "DD":
            case "YY":
            case "HH":
            case "hh":
            case "mm":
            case "ss":
            case "M":
            case "D":
            case "d":
            case "H":
            case "h":
            case "m":
            case "s":
                return k;
            default:
                return new RegExp(t.replace("\\", ""))
        }
    }

    function dt(t, i, r) {
        var f, u = r._a;
        switch (t) {
            case "iM":
            case "iMM":
                u[1] = i == null ? 0 : ~~i - 1;
                break;
            case "iMMM":
            case "iMMMM":
                f = n.localeData(r._l).iMonthsParse(i);
                f != null ? u[1] = f : r._isValid = !1;
                break;
            case "iD":
            case "iDD":
            case "iDDD":
            case "iDDDD":
                i != null && (u[2] = ~~i);
                break;
            case "iYY":
                u[0] = ~~i + (~~i > 47 ? 1300 : 1400);
                break;
            case "iYYYY":
            case "iYYYYY":
                u[0] = ~~i
        }
        i == null && (r._isValid = !1)
    }

    function gt(n) {
        var i, o, u = n._a[0],
            f = n._a[1],
            r = n._a[2];
        return u == null && f == null && r == null ? [0, 0, 1] : (u = u || 0, f = f || 0, r = r || 1, (r < 1 || r > t.iDaysInMonth(u, f)) && (n._isValid = !1), i = h(u, f, r), o = e(i.gy, i.gm, i.gd), n._hDiff = 0, ~~o.hy !== u && (n._hDiff += 1), ~~o.hm !== f && (n._hDiff += 1), ~~o.hd !== r && (n._hDiff += 1), [i.gy, i.gm, i.gd])
    }

    function ni(n) {
        var e = n._f.match(v),
            t = n._i,
            o = e.length,
            u, f, i;
        for (n._a = [], u = 0; u < o; u += 1) f = e[u], i = (st(f, n).exec(t) || [])[0], i && (t = t.slice(t.indexOf(i) + i.length)), r[f] && dt(f, i, n);
        return t && (n._il = t), gt(n)
    }

    function ti(n, t) {
        var e = n._f.length,
            u, o, i, s, r, f;
        if (e === 0) return a(new Date(NaN));
        for (u = 0; u < e; u += 1)(o = n._f[u], r = 0, i = a(n._i, o, n._l, t), i.isValid()) && (r += i._hDiff, i._il && (r += i._il.length), (f == null || r < f) && (f = r, s = i));
        return s
    }

    function ii(n) {
        for (var i = n._i, e = "", o = "", s = n._f.match(v), h = s.length, f, t, u = 0; u < h; u += 1) f = s[u], t = (st(f, n).exec(i) || [])[0], t && (i = i.slice(i.indexOf(t) + t.length)), r[f] instanceof Function || (o += f, t && (e += t));
        n._i = e;
        n._f = o
    }

    function ht(n, i, r) {
        var e = r - i,
            u = r - n.day(),
            f;
        return u > e && (u -= 7), u < e - 7 && (u += 7), f = t(n).add(u, "d"), { week: Math.ceil(f.iDayOfYear() / 7), year: f.iYear() }
    }

    function a(i, r, f, e) {
        var o = { _i: i, _f: r, _l: f },
            s, h, c;
        if (r) {
            if (wt(r)) return ti(o, e);
            s = ni(o);
            ii(o);
            r = "YYYY-MM-DD-" + o._f;
            i = u(s[0], 4) + "-" + u(s[1] + 1, 2) + "-" + u(s[2], 2) + "-" + o._i
        }
        return h = e ? n.utc(i, r, f) : n(i, r, f), o._isValid === !1 && (h._isValid = !1), h._hDiff = o._hDiff || 0, c = et(t.fn), p(c, h), c
    }

    function t(n, t, i) { return a(n, t, i, !1) }

    function e(n, t, i) { var r = ui(fi(n, t + 1, i)); return r.hm -= 1, r }

    function h(n, t, i) { var r = ei(ri(n, t + 1, i)); return r.gm -= 1, r }

    function i(n, t) { return ~~(n / t) }

    function c(n, t) { return n - ~~(n / t) * t }

    function ri(n, t, i) {
        var r = ct(n, t),
            u = i + o.ummalquraData[r - 1] - 1;
        return u + 24e5
    }

    function ui(n) {
        var t = n - 24e5,
            i = oi(t),
            r = i + 16260,
            u = Math.floor((r - 1) / 12),
            f = u + 1,
            e = r - 12 * u,
            s = t - o.ummalquraData[i - 1] + 1;
        return { hy: f, hm: e, hd: s }
    }

    function fi(n, t, r) { var u = i((n + i(t - 8, 6) + 100100) * 1461, 4) + i(153 * c(t + 9, 12) + 2, 5) + r - 34840408; return u - i(i(n + 100100 + i(t - 8, 6), 100) * 3, 4) + 752 }

    function ei(n) { var t, r, f, u, e; return t = 4 * n + 139361631, t = t + i(i(4 * n + 183187720, 146097) * 3, 4) * 4 - 3908, r = i(c(t, 1461), 4) * 5 + 308, f = i(c(r, 153), 5) + 1, u = c(i(r, 153), 12) + 1, e = i(t, 1461) - 100100 + i(8 - u, 6), { gy: e, gm: u, gd: f } }

    function ct(n, t) {
        var i = n - 1,
            r = i * 12 + 1 + (t - 1);
        return r - 16260
    }

    function oi(n) {
        for (var t = 0; t < o.ummalquraData.length; t = t + 1)
            if (o.ummalquraData[t] > n) return t
    }
    var w, ot;
    if (n == null) throw new Error("Cannot find moment");
    for (var o = { ummalquraData: [28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990, 29019, 29049, 29078, 29108, 29137, 29167, 29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522, 29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759, 29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053, 30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348, 30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585, 30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939, 30968, 30998, 31027, 31057, 31086, 31116, 31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530, 31559, 31589, 31618, 31648, 31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120, 32150, 32180, 32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711, 32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243, 33272, 33302, 33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775, 33804, 33834, 33863, 33893, 33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306, 34336, 34365, 34395, 34424, 34454, 34483, 34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837, 34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074, 35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370, 35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665, 35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901, 35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254, 36284, 36314, 36343, 36373, 36403, 36433, 36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845, 36875, 36904, 36934, 36963, 36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436, 37465, 37495, 37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027, 38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558, 38587, 38617, 38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089, 39118, 39148, 39178, 39208, 39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621, 39650, 39680, 39709, 39739, 39768, 39798, 39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153, 40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389, 40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685, 40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980, 41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216, 41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570, 41599, 41629, 41658, 41688, 41718, 41748, 41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161, 42190, 42220, 42249, 42279, 42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751, 42780, 42810, 42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342, 43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873, 43903, 43932, 43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405, 44434, 44464, 44493, 44523, 44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936, 44966, 44996, 45025, 45055, 45084, 45114, 45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468, 45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704, 45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999, 46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295, 46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531, 46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885, 46915, 46944, 46974, 47003, 47033, 47063, 47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476, 47506, 47535, 47565, 47594, 47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066, 48096, 48125, 48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657, 48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189, 49218, 49248, 49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720, 49749, 49779, 49809, 49838, 49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252, 50281, 50311, 50340, 50370, 50400, 50429, 50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784, 50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019, 51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315, 51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611, 51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846, 51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200, 52230, 52260, 52290, 52319, 52349, 52379, 52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792, 52822, 52851, 52881, 52910, 52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383, 53412, 53441, 53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973, 54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505, 54535, 54564, 54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036, 55066, 55095, 55125, 55154, 55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567, 55597, 55627, 55657, 55686, 55716, 55745, 55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100, 56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335, 56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631, 56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926, 56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162, 57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517, 57546, 57576, 57605, 57634, 57664, 57694, 57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107, 58137, 58167, 58196, 58226, 58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698, 58727, 58757, 58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288, 59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820, 59850, 59879, 59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352, 60381, 60411, 60440, 60469, 60499, 60528, 60558, 60588, 60618, 60648, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883, 60912, 60942, 60972, 61002, 61031, 61061, 61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415, 61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651, 61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947, 61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242, 62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478, 62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832, 62862, 62891, 62921, 62950, 62980, 63009, 63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423, 63453, 63482, 63512, 63541, 63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014, 64043, 64073, 64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603, 64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136, 65166, 65195, 65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667, 65697, 65726, 65755, 65785, 65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199, 66228, 66258, 66287, 66317, 66346, 66376, 66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730, 66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967, 66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262, 67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557, 67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793, 67823, 67852, 67882, 67911, 67941, 67971, 68e3, 68030, 68060, 68089, 68119, 68148, 68177, 68207, 68236, 68266, 68295, 68325, 68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738, 68768, 68797, 68827, 68857, 68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330, 69359, 69388, 69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919, 69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451, 70481, 70510, 70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983, 71013, 71042, 71071, 71101, 71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514, 71543, 71573, 71602, 71632, 71662, 71691, 71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046, 72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282, 72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577, 72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872, 72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109, 73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464, 73493, 73523, 73552, 73581, 73611, 73640, 73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053, 74083, 74113, 74142, 74172, 74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74586, 74615, 74645, 74675, 74704, 74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235, 75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766, 75796, 75826, 75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299, 76328, 76358, 76387, 76416, 76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830, 76859, 76889, 76918, 76948, 76977, 77007, 77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361, 77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598, 77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893, 77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188, 78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425, 78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779, 78808, 78838, 78867, 78897, 78926, 78956, 78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369, 79399, 79428, 79458, 79487, 79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960, 79990] }, v = /(\[[^\[]*\])|(\\)?i(Mo|MM?M?M?|Do|DDDo|DD?D?D?|w[o|w]?|YYYYY|YYYY|YY|gg(ggg?)?)|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, b = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, k = /\d\d?/, d = /\d{1,3}/, g = /\d{3}/, nt = /\d{1,4}/, tt = /[+\-]?\d{1,6}/, it = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.?)|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, lt = /Z|[\+\-]\d\d:?\d\d/i, at = /T/i, vt = /[\+\-]?\d+(\.\d{1,3})?/, yt = { hd: "idate", hm: "imonth", hy: "iyear" }, y = {}, rt = "DDD w M D".split(" "), ut = "M D w".split(" "), r = { iM: function() { return this.iMonth() + 1 }, iMMM: function(n) { return this.localeData().iMonthsShort(this, n) }, iMMMM: function(n) { return this.localeData().iMonths(this, n) }, iD: function() { return this.iDate() }, iDDD: function() { return this.iDayOfYear() }, iw: function() { return this.iWeek() }, iYY: function() { return u(this.iYear() % 100, 2) }, iYYYY: function() { return u(this.iYear(), 4) }, iYYYYY: function() { return u(this.iYear(), 5) }, igg: function() { return u(this.iWeekYear() % 100, 2) }, igggg: function() { return this.iWeekYear() }, iggggg: function() { return u(this.iWeekYear(), 5) } }, f; rt.length;) f = rt.pop(), r["i" + f + "o"] = pt(r["i" + f], f);
    while (ut.length) f = ut.pop(), r["i" + f + f] = ft(r["i" + f], 2);
    return r.iDDDD = ft(r.iDDD, 3), p(bt(n.localeData()), {
        _iMonths: ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Ula", "Jumada al-Alkhirah", "Rajab", "Shaâ€™ban", "Ramadhan", "Shawwal", "Thul-Qiâ€™dah", "Thul-Hijjah"],
        iMonths: function(n) { return this._iMonths[n.iMonth()] },
        _iMonthsShort: ["Muh", "Saf", "Rab-I", "Rab-II", "Jum-I", "Jum-II", "Raj", "Sha", "Ram", "Shw", "Dhu-Q", "Dhu-H"],
        iMonthsShort: function(n) { return this._iMonthsShort[n.iMonth()] },
        iMonthsParse: function(n) {
            var i, r, u;
            for (this._iMonthsParse || (this._iMonthsParse = []), i = 0; i < 12; i += 1)
                if (this._iMonthsParse[i] || (r = t([2e3, (2 + i) % 12, 25]), u = "^" + this.iMonths(r, "") + "$|^" + this.iMonthsShort(r, "") + "$", this._iMonthsParse[i] = new RegExp(u.replace(".", ""), "i")), this._iMonthsParse[i].test(n)) return i
        }
    }), w = { iMonths: "Ù…Ø­Ø±Ù…_ØµÙØ±_Ø±Ø¨ÙŠØ¹ Ø§Ù„Ø£ÙˆÙ„_Ø±Ø¨ÙŠØ¹ Ø§Ù„Ø«Ø§Ù†ÙŠ_Ø¬Ù…Ø§Ø¯Ù‰ Ø§Ù„Ø£ÙˆÙ„Ù‰_Ø¬Ù…Ø§Ø¯Ù‰ Ø§Ù„Ø¢Ø®Ø±Ø©_Ø±Ø¬Ø¨_Ø´Ø¹Ø¨Ø§Ù†_Ø±Ù…Ø¶Ø§Ù†_Ø´ÙˆØ§Ù„_Ø°Ùˆ Ø§Ù„Ù‚Ø¹Ø¯Ø©_Ø°Ùˆ Ø§Ù„Ø­Ø¬Ø©".split("_"), iMonthsShort: "Ù…Ø­Ø±Ù…_ØµÙØ±_Ø±Ø¨ÙŠØ¹ Ù¡_Ø±Ø¨ÙŠØ¹ Ù¢_Ø¬Ù…Ø§Ø¯Ù‰ Ù¡_Ø¬Ù…Ø§Ø¯Ù‰ Ù¢_Ø±Ø¬Ø¨_Ø´Ø¹Ø¨Ø§Ù†_Ø±Ù…Ø¶Ø§Ù†_Ø´ÙˆØ§Ù„_Ø°Ùˆ Ø§Ù„Ù‚Ø¹Ø¯Ø©_Ø°Ùˆ Ø§Ù„Ø­Ø¬Ø©".split("_") }, typeof n.updateLocale == "function" ? n.updateLocale("ar-sa", w) : (ot = n.locale(), n.defineLocale("ar-sa", w), n.locale(ot)), p(t, n), t.fn = et(n.fn), t.utc = function(n, t, i) { return a(n, t, i, !0) }, t.fn.format = function(t) {
        var i, r, u = this;
        if (t) {
            for (i = 5, r = function(n) { return u.localeData().longDateFormat(n) || n }; i > 0 && b.test(t);) i -= 1, t = t.replace(b, r);
            y[t] || (y[t] = kt(t));
            t = y[t](this)
        }
        return n.fn.format.call(this, t)
    }, t.fn.iYear = function(i) { var f, u, r; return typeof i == "number" ? (u = e(this.year(), this.month(), this.date()), f = Math.min(u.hd, t.iDaysInMonth(i, u.hm)), r = h(i, u.hm, f), s(this, r.gy, r.gm, r.gd), (this.month() !== r.gm || this.date() !== r.gd || this.year() !== r.gy) && s(this, r.gy, r.gm, r.gd), n.updateOffset(this), this) : e(this.year(), this.month(), this.date()).hy }, t.fn.iMonth = function(r) {
        var o, f, u;
        if (r != null) {
            if (typeof r == "string")
                if (r = this.localeData().iMonthsParse(r), r >= 0) r -= 1;
                else return this;
            return f = e(this.year(), this.month(), this.date()), o = Math.min(f.hd, t.iDaysInMonth(f.hy, r)), this.iYear(f.hy + i(r, 12)), r = c(r, 12), r < 0 && (r += 12, this.iYear(this.iYear() - 1)), u = h(this.iYear(), r, o), s(this, u.gy, u.gm, u.gd), (this.month() !== u.gm || this.date() !== u.gd || this.year() !== u.gy) && s(this, u.gy, u.gm, u.gd), n.updateOffset(this), this
        }
        return e(this.year(), this.month(), this.date()).hm
    }, t.fn.iDate = function(t) { var r, i; return typeof t == "number" ? (r = e(this.year(), this.month(), this.date()), i = h(r.hy, r.hm, t), s(this, i.gy, i.gm, i.gd), (this.month() !== i.gm || this.date() !== i.gd || this.year() !== i.gy) && s(this, i.gy, i.gm, i.gd), n.updateOffset(this), this) : e(this.year(), this.month(), this.date()).hd }, t.fn.iDayOfYear = function(n) { var i = Math.round((t(this).startOf("day") - t(this).startOf("iYear")) / 864e5) + 1; return n == null ? i : this.add(n - i, "d") }, t.fn.iDaysInMonth = function() { return parseInt(t(this).endOf("iMonth").format("iDD")) }, t.fn.iWeek = function(n) { var t = ht(this, this.localeData()._week.dow, this.localeData()._week.doy).week; return n == null ? t : this.add((n - t) * 7, "d") }, t.fn.iWeekYear = function(n) { var t = ht(this, this.localeData()._week.dow, this.localeData()._week.doy).year; return n == null ? t : this.add(n - t, "y") }, t.fn.add = function(t, i) { var r; return i === null || isNaN(+i) || (r = t, t = i, i = r), i = l(i), i === "iyear" ? this.iYear(this.iYear() + t) : i === "imonth" ? this.iMonth(this.iMonth() + t) : i === "idate" ? this.iDate(this.iDate() + t) : n.fn.add.call(this, t, i), this }, t.fn.subtract = function(t, i) { var r; return i === null || isNaN(+i) || (r = t, t = i, i = r), i = l(i), i === "iyear" ? this.iYear(this.iYear() - t) : i === "imonth" ? this.iMonth(this.iMonth() - t) : i === "idate" ? this.iDate(this.iDate() - t) : n.fn.subtract.call(this, t, i), this }, t.fn.startOf = function(t) { return t = l(t), t === "iyear" || t === "imonth" ? (t === "iyear" && this.iMonth(0), this.iDate(1), this.hours(0), this.minutes(0), this.seconds(0), this.milliseconds(0), this) : n.fn.startOf.call(this, t) }, t.fn.endOf = function(n) { return (n = l(n), n === undefined || n === "milisecond") ? this : this.startOf(n).add(1, n === "isoweek" ? "week" : n).subtract(1, "milliseconds") }, t.fn.clone = function() { return t(this) }, t.fn.iYears = t.fn.iYear, t.fn.iMonths = t.fn.iMonth, t.fn.iDates = t.fn.iDate, t.fn.iWeeks = t.fn.iWeek, t.iDaysInMonth = function(n, t) { var i = ct(n, t + 1); return o.ummalquraData[i] - o.ummalquraData[i - 1] }, t.iConvert = { toHijri: e, toGregorian: h }, t
});
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Modified by: @balbarak
 
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
(function(n) {
    "use strict";
    if (typeof define == "function" && define.amd) define(["jquery", "moment"], n);
    else if (typeof exports == "object") n(require("jquery"), require("moment"));
    else {
        if (typeof jQuery == "undefined") throw "bootstrap-hijri-datepicker requires jQuery to be loaded first";
        if (typeof moment == "undefined") throw "bootstrap-hijri-datepicker requires Moment.js to be loaded first";
        n(jQuery, moment)
    }
})(function(n, t) {
    "use strict";
    if (!t) throw new Error("bootstrap-hijri-datepicker requires Moment.js to be loaded first");
    var i = function(i, r) {
        var u = {},
            o, f, k = !0,
            c, l = !1,
            e = !1,
            d, nt = 0,
            y, g, b, ht = [{ clsName: "days", navFnc: r.hijri ? "iMonth" : "Month", navStep: 1 }, { clsName: "months", navFnc: r.hijri ? "iYear" : "y", navStep: 1 }, { clsName: "years", navFnc: r.hijri ? "iYear" : "y", navStep: 10 }, { clsName: "decades", navFnc: r.hijri ? "iYear" : "y", navStep: 100 }],
            yt = ["days", "months", "years", "decades"],
            bt = ["top", "bottom", "auto"],
            kt = ["left", "right", "auto"],
            dt = ["default", "top", "bottom"],
            gt = { up: 38, 38: "up", down: 40, 40: "down", left: 37, 37: "left", right: 39, 39: "right", tab: 9, 9: "tab", escape: 27, 27: "escape", enter: 13, 13: "enter", pageUp: 33, 33: "pageUp", pageDown: 34, 34: "pageDown", shift: 16, 16: "shift", control: 17, 17: "control", space: 32, 32: "space", t: 84, 84: "t", "delete": 46, 46: "delete" },
            ct = {},
            tt = function(n) {
                var u = !1,
                    i, f, e, o, s;
                return t.tz !== undefined && r.timeZone !== undefined && r.timeZone !== null && r.timeZone !== "" && (u = !0), n === undefined || n === null ? i = u ? t().tz(r.timeZone).startOf("day") : t().startOf("day") : u ? (f = t().tz(r.timeZone).utcOffset(), e = t(n, g, r.useStrict).utcOffset(), e !== f ? (o = t().tz(r.timeZone).format("Z"), s = t(n, g, r.useStrict).format("YYYY-MM-DD[T]HH:mm:ss") + o, i = t(s, g, r.useStrict).tz(r.timeZone)) : i = t(n, g, r.useStrict).tz(r.timeZone)) : i = t(n, g, r.useStrict), i
            },
            p = function(n) {
                if (typeof n != "string" || n.length > 1) throw new TypeError("isEnabled expects a single character string parameter");
                switch (n) {
                    case "y":
                        return y.indexOf("Y") !== -1;
                    case "M":
                        return y.indexOf("M") !== -1;
                    case "d":
                        return y.toLowerCase().indexOf("d") !== -1;
                    case "h":
                    case "H":
                        return y.toLowerCase().indexOf("hh:") !== -1;
                    case "m":
                        return y.indexOf("m") !== -1;
                    case "s":
                        return y.indexOf("s") !== -1;
                    default:
                        return !1
                }
            },
            lt = function() { return p("h") || p("m") || p("s") },
            ft = function() { return p("y") || p("M") || p("d") },
            si = function() {
                var t = n("<thead>").append(n("<tr>").append(n("<th>").addClass("prev").attr("data-action", "previous").append(n("<span>").html(r.icons.previous))).append(n("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", r.calendarWeeks ? "6" : "5")).append(n("<th>").addClass("next").attr("data-action", "next").append(n("<span>").html(r.icons.next)))),
                    i = n("<tbody>").append(n("<tr>").append(n("<td>").attr("colspan", r.calendarWeeks ? "8" : "7")));
                return [n("<div>").addClass("datepicker-days").append(n("<table>").addClass("table-condensed").append(t).append(n("<tbody>"))), n("<div>").addClass("datepicker-months").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-years").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone())), n("<div>").addClass("datepicker-decades").append(n("<table>").addClass("table-condensed").append(t.clone()).append(i.clone()))]
            },
            hi = function() {
                var t = n("<tr>"),
                    i = n("<tr>"),
                    u = n("<tr>");
                return p("h") && (t.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.incrementHour }).addClass("btn").attr("data-action", "incrementHours").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-hour").attr({ "data-time-component": "hours", title: r.tooltips.pickHour }).attr("data-action", "showHours"))), u.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.decrementHour }).addClass("btn").attr("data-action", "decrementHours").append(n("<span>").addClass(r.icons.down))))), p("m") && (p("h") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.incrementMinute }).addClass("btn").attr("data-action", "incrementMinutes").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-minute").attr({ "data-time-component": "minutes", title: r.tooltips.pickMinute }).attr("data-action", "showMinutes"))), u.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.decrementMinute }).addClass("btn").attr("data-action", "decrementMinutes").append(n("<span>").addClass(r.icons.down))))), p("s") && (p("m") && (t.append(n("<td>").addClass("separator")), i.append(n("<td>").addClass("separator").html(":")), u.append(n("<td>").addClass("separator"))), t.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.incrementSecond }).addClass("btn").attr("data-action", "incrementSeconds").append(n("<span>").addClass(r.icons.up)))), i.append(n("<td>").append(n("<span>").addClass("timepicker-second").attr({ "data-time-component": "seconds", title: r.tooltips.pickSecond }).attr("data-action", "showSeconds"))), u.append(n("<td>").append(n("<a>").attr({ href: "#", tabindex: "-1", title: r.tooltips.decrementSecond }).addClass("btn").attr("data-action", "decrementSeconds").append(n("<span>").addClass(r.icons.down))))), d || (t.append(n("<td>").addClass("separator")), i.append(n("<td>").append(n("<button>").addClass("btn btn-primary").attr({ "data-action": "togglePeriod", tabindex: "-1", title: r.tooltips.togglePeriod }))), u.append(n("<td>").addClass("separator"))), n("<div>").addClass("timepicker-picker").append(n("<table>").addClass("table-condensed").append([t, i, u]))
            },
            ci = function() {
                var i = n("<div>").addClass("timepicker-hours").append(n("<table>").addClass("table-condensed")),
                    r = n("<div>").addClass("timepicker-minutes").append(n("<table>").addClass("table-condensed")),
                    u = n("<div>").addClass("timepicker-seconds").append(n("<table>").addClass("table-condensed")),
                    t = [hi()];
                return p("h") && t.push(i), p("m") && t.push(r), p("s") && t.push(u), t
            },
            li = function() { var t = []; return r.showTodayButton && t.push(n("<td>").append(n("<a>").attr({ "data-action": "today", title: r.tooltips.today }).append(n("<span>").html(r.icons.today)))), !r.sideBySide && ft() && lt() && t.push(n("<td>").append(n("<a>").attr({ "data-action": "togglePicker", title: r.tooltips.selectTime }).append(n("<span>").addClass(r.icons.time)))), r.showClear && t.push(n("<td>").append(n("<a>").attr({ "data-action": "clear", title: r.tooltips.clear }).append(n("<span>").html(r.icons.clear)))), r.showClose && t.push(n("<td>").append(n("<a>").attr({ "data-action": "close", title: r.tooltips.close }).append(n("<span>").html(r.icons.close)))), r.showSwitcher && t.push(n("<td>").append(n("<a>").attr({ "data-action": "switchDate", title: r.tooltips.close }).append(n("<span>").html("Ù‡Ø¬Ø±ÙŠ/Ù…ÙŠÙ„Ø§Ø¯ÙŠ")))), n("<table>").addClass("table-condensed").append(n("<tbody>").append(n("<tr>").append(t))) },
            ai = function() {
                var t = n("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
                    f = n("<div>").addClass("datepicker").append(si()),
                    e = n("<div>").addClass("timepicker").append(ci()),
                    i = n("<ul>").addClass("list-unstyled"),
                    u = n("<li>").addClass("picker-switch" + (r.collapse ? " accordion-toggle" : "")).append(li());
                return (r.inline && t.removeClass("dropdown-menu"), d && t.addClass("usetwentyfour"), p("s") && !d && t.addClass("wider"), r.sideBySide && ft() && lt()) ? (t.addClass("timepicker-sbs"), r.toolbarPlacement === "top" && t.append(u), t.append(n("<div>").addClass("row").append(f.addClass("col-md-6")).append(e.addClass("col-md-6"))), r.toolbarPlacement === "bottom" && t.append(u), t) : (r.toolbarPlacement === "top" && i.append(u), ft() && i.append(n("<li>").addClass(r.collapse && lt() ? "collapse in" : "").append(f)), r.toolbarPlacement === "default" && i.append(u), lt() && i.append(n("<li>").addClass(r.collapse && ft() ? "collapse" : "").append(e)), r.toolbarPlacement === "bottom" && i.append(u), t.append(i))
            },
            vi = function() {
                var t, u = {};
                return t = i.is("input") || r.inline ? i.data() : i.find("input").data(), t.dateOptions && t.dateOptions instanceof Object && (u = n.extend(!0, u, t.dateOptions)), n.each(r, function(n) {
                    var i = "date" + n.charAt(0).toUpperCase() + n.slice(1);
                    t[i] !== undefined && (u[n] = t[i])
                }), u
            },
            pt = function() {
                var o = (l || i).position(),
                    s = (l || i).offset(),
                    u = r.widgetPositioning.vertical,
                    f = r.widgetPositioning.horizontal,
                    t;
                if (r.widgetParent) t = r.widgetParent.append(e);
                else if (i.is("input")) t = i.after(e).parent();
                else {
                    if (r.inline) { t = i.append(e); return }
                    t = i;
                    i.children().first().after(e)
                }
                if (u === "auto" && (u = s.top + e.height() * 1.5 >= n(window).height() + n(window).scrollTop() && e.height() + i.outerHeight() < s.top ? "top" : "bottom"), f === "auto" && (f = t.width() < s.left + e.outerWidth() / 2 && s.left + e.outerWidth() > n(window).width() ? "right" : "left"), u === "top" ? e.addClass("top").removeClass("bottom") : e.addClass("bottom").removeClass("top"), f === "right" ? e.addClass("pull-right") : e.removeClass("pull-right"), t.css("position") !== "relative" && (t = t.parents().filter(function() { return n(this).css("position") === "relative" }).first()), t.length === 0) throw new Error("datetimepicker component should be placed within a relative positioned container");
                e.css({ top: u === "top" ? "auto" : o.top + i.outerHeight(), bottom: u === "top" ? o.top + i.outerHeight() : "auto", left: f === "left" ? t === i ? 0 : o.left : "auto", right: f === "left" ? "auto" : t.outerWidth() - i.outerWidth() - (t === i ? 0 : o.left) })
            },
            et = function(n) {
                (n.type !== "dp.change" || (!n.date || !n.date.isSame(n.oldDate)) && (n.date || n.oldDate)) && i.trigger(n)
            },
            it = function(n) {
                n === "y" && (n = "YYYY");
                n === "M" && (n = "YYYY MMMM");
                et({ type: "dp.update", change: n, viewDate: f.clone() })
            },
            ot = function(n) { e && (n && (b = Math.max(nt, Math.min(2, b + n))), e.find(".datepicker > div").hide().filter(".datepicker-" + ht[b].clsName).show()) },
            yi = function() {
                var t = n("<tr>"),
                    i = f.clone().startOf("w").startOf("day");
                for (r.calendarWeeks === !0 && t.append(n("<th>").addClass("cw").text("#")); i.isBefore(f.clone().endOf("w"));) t.append(n("<th>").addClass("dow").text(i.format("dd"))), i.add(1, "days");
                e.find(".datepicker-days thead").append(t)
            },
            pi = function(n) { return r.disabledDates[n.format("YYYY-MM-DD")] === !0 },
            wi = function(n) { return r.enabledDates[n.format("YYYY-MM-DD")] === !0 },
            bi = function(n) { return r.disabledHours[n.format("H")] === !0 },
            ki = function(n) { return r.enabledHours[n.format("H")] === !0 },
            h = function(t, i) { if (!t.isValid() || r.disabledDates && i === "d" && pi(t) || r.enabledDates && i === "d" && !wi(t) || r.minDate && t.isBefore(r.minDate, i) || r.maxDate && t.isAfter(r.maxDate, i) || r.daysOfWeekDisabled && i === "d" && r.daysOfWeekDisabled.indexOf(t.day()) !== -1 || r.disabledHours && (i === "h" || i === "m" || i === "s") && bi(t) || r.enabledHours && (i === "h" || i === "m" || i === "s") && !ki(t)) return !1; if (r.disabledTimeIntervals && (i === "h" || i === "m" || i === "s")) { var u = !1; if (n.each(r.disabledTimeIntervals, function() { if (t.isBetween(this[0], this[1])) return u = !0, !1 }), u) return !1 } return !0 },
            ni = function() {
                for (var i = [], t = f.clone().startOf("y").startOf("day"); t.isSame(f, "years");) i.push(n("<span>").attr("data-action", "selectMonth").addClass("month").text(t.format("MMM"))), t.add(1, "months");
                e.find(".datepicker-months td").empty().append(i)
            },
            ti = function() {
                for (var i = [], t = f.clone().startOf("hy").hour(12); t.iYear() === f.iYear();) i.push(n("<span>").attr("data-action", "selectMonth").addClass("month").text(t.format("iMMM"))), t.add(1, "iMonth");
                e.find(".datepicker-months td").empty().append(i)
            },
            di = function() {
                var i = e.find(".datepicker-months"),
                    t = i.find("th"),
                    u = i.find("tbody").find("span");
                t.eq(0).find("span").attr("title", r.tooltips.prevYear);
                t.eq(1).attr("title", r.tooltips.selectYear);
                t.eq(2).find("span").attr("title", r.tooltips.nextYear);
                i.find(".disabled").removeClass("disabled");
                h(f.clone().subtract(1, "years"), "y") || t.eq(0).addClass("disabled");
                t.eq(1).text(f.iYear());
                h(f.clone().add(1, "y"), "y") || t.eq(2).addClass("disabled");
                u.removeClass("active");
                o.isSame(f, "y") && u.eq(o.month()).addClass("active");
                u.each(function(t) { h(f.clone().month(t), "M") || n(this).addClass("disabled") })
            },
            gi = function() {
                var i = e.find(".datepicker-months"),
                    t = i.find("th"),
                    u = i.find("tbody").find("span");
                t.eq(0).find("span").attr("title", r.tooltips.prevYear);
                t.eq(1).attr("title", r.tooltips.selectYear);
                t.eq(2).find("span").attr("title", r.tooltips.nextYear);
                i.find(".disabled").removeClass("disabled");
                h(f.clone().subtract(1, "years"), "y") || t.eq(0).addClass("disabled");
                t.eq(1).text(f.year());
                h(f.clone().add(1, "y"), "y") || t.eq(2).addClass("disabled");
                u.removeClass("active");
                o.isSame(f, "y") && !k && u.eq(o.month()).addClass("active");
                u.each(function(t) { h(f.clone().month(t), "M") || n(this).addClass("disabled") })
            },
            nr = function() {
                var u = e.find(".datepicker-years"),
                    t = u.find("th"),
                    n = f.clone().subtract(5, "hy"),
                    i = f.clone().add(6, "hy"),
                    s = "",
                    c, l;
                for (t.eq(0).find("span").attr("title", r.tooltips.prevDecade), t.eq(1).attr("title", r.tooltips.selectDecade), t.eq(2).find("span").attr("title", r.tooltips.nextDecade), u.find(".disabled").removeClass("disabled"), r.minDate && r.minDate.isAfter(n, "hy") && t.eq(0).addClass("disabled"), t.eq(1).text(n.iYear() + "-" + i.iYear()), r.maxDate && r.maxDate.isBefore(i, "hy") && t.eq(2).addClass("disabled"); !n.isAfter(i, "hy");) {
                    if (c = i.format("iYYYY"), l = n.format("iYYYY"), c === "1500" || l === "1355") {
                        n = f.clone().subtract(5, "hy");
                        s += '<span data-action="selectYear" class="year' + (n.iYear() === o.iYear() ? " active" : "") + (h(n, "hy") ? "" : " disabled") + '">' + n.iYear() + "<\/span>";
                        break
                    }
                    s += '<span data-action="selectYear" class="year' + (n.iYear() === o.iYear() ? " active" : "") + (h(n, "hy") ? "" : " disabled") + '">' + n.iYear() + "<\/span>";
                    n.add(1, "iYear")
                }
                u.find("td").html(s)
            },
            tr = function() {
                var i = e.find(".datepicker-years"),
                    t = i.find("th"),
                    n = f.clone().subtract(5, "y"),
                    u = f.clone().add(6, "y"),
                    s = "";
                for (t.eq(0).find("span").attr("title", r.tooltips.prevDecade), t.eq(1).attr("title", r.tooltips.selectDecade), t.eq(2).find("span").attr("title", r.tooltips.nextDecade), i.find(".disabled").removeClass("disabled"), r.minDate && r.minDate.isAfter(n, "y") && t.eq(0).addClass("disabled"), t.eq(1).text(n.year() + "-" + u.year()), r.maxDate && r.maxDate.isBefore(u, "y") && t.eq(2).addClass("disabled"); !n.isAfter(u, "y");) s += '<span data-action="selectYear" class="year' + (n.isSame(o, "y") && !k ? " active" : "") + (h(n, "y") ? "" : " disabled") + '">' + n.year() + "<\/span>", n.add(1, "y");
                i.find("td").html(s)
            },
            hr = function() {
                var u = e.find(".datepicker-decades"),
                    i = u.find("th"),
                    n = t({ y: f.year() - f.year() % 100 - 1 }),
                    s = n.clone().add(100, "y"),
                    l = n.clone(),
                    c = "";
                for (i.eq(0).find("span").attr("title", r.tooltips.prevCentury), i.eq(2).find("span").attr("title", r.tooltips.nextCentury), u.find(".disabled").removeClass("disabled"), (n.isSame(t({ y: 1900 })) || r.minDate && r.minDate.isAfter(n, "y")) && i.eq(0).addClass("disabled"), i.eq(1).text(n.year() + "-" + s.year()), (n.isSame(t({ y: 2e3 })) || r.maxDate && r.maxDate.isBefore(s, "y")) && i.eq(2).addClass("disabled"); !n.isAfter(s, "y");) c += '<span data-action="selectDecade" class="decade' + (n.isSame(o, "y") ? " active" : "") + (h(n, "y") ? "" : " disabled") + '" data-selection="' + (n.year() + 6) + '">' + (n.year() + 1) + " - " + (n.year() + 12) + "<\/span>", n.add(12, "y");
                c += "<span><\/span><span><\/span><span><\/span>";
                u.find("td").html(c);
                i.eq(1).text(l.year() + 1 + "-" + n.year())
            },
            ut = function() {
                if (r.hijri) { at(); return }
                var c = e.find(".datepicker-days"),
                    u = c.find("th"),
                    t, a = [],
                    s, i, l;
                if (ft()) {
                    for (u.eq(0).find("span").attr("title", r.tooltips.prevMonth), u.eq(1).attr("title", r.tooltips.selectMonth), u.eq(2).find("span").attr("title", r.tooltips.nextMonth), c.find(".disabled").removeClass("disabled"), u.eq(1).text(f.format(r.dayViewHeaderFormat)), h(f.clone().subtract(1, "months"), "months") || u.eq(0).addClass("disabled"), h(f.clone().add(1, "months"), "months") || u.eq(2).addClass("disabled"), t = f.clone().startOf("months").startOf("weeks").startOf("days"), l = 0; l < 42; l++) t.weekday() === 0 && (s = n("<tr>"), r.calendarWeeks && s.append('<td class="cw">' + t.week() + "<\/td>"), a.push(s)), i = "", t.isBefore(f, "months") && (i += " old"), t.isAfter(f, "months") && (i += " new"), t.isSame(o, "days") && !k && (i += " active"), h(t, "days") || (i += " disabled"), t.isSame(tt(), "days") && (i += " today"), (t.day() === 6 || t.day() === 5) && (i += " weekend"), s.append('<td data-action="selectDay" data-day="' + t.format("L") + '" class="day' + i + '">' + t.date() + "<\/td>"), t.add(1, "days");
                    c.find("tbody").empty().append(a);
                    // console.log(a);
                    gi();
                    tr()
                }
            },
            at = function() {
                var l = e.find(".datepicker-days"),
                    s = l.find("th"),
                    i, v = [],
                    c, u, a;
                if (ft()) {
                    for (s.eq(0).find("span").attr("title", r.tooltips.prevMonth), s.eq(1).attr("title", r.tooltips.selectMonth), s.eq(2).find("span").attr("title", r.tooltips.nextMonth), l.find(".disabled").removeClass("disabled"), s.eq(1).text(f.format(r.hijriDayViewHeaderFormat)), h(f.clone().subtract(1, "iMonth"), "iMonth") || s.eq(0).addClass("disabled"), h(f.clone().add(1, "iMonth"), "iMonth") || s.eq(2).addClass("disabled"), i = f.clone().startOf("iMonth").startOf("week"), a = 0; a < 42; a++) i.weekday() === 0 && (c = n("<tr>"), r.calendarWeeks && c.append('<td class="cw">' + i.week() + "<\/td>"), v.push(c)), u = "", i.iMonth() < f.iMonth() && (u += " old"), i.iMonth() > f.iMonth() && (u += " new"), i.isSame(o, "d") && !k && (u += " active"), h(i, "d") || (u += " disabled"), i.isSame(t(), "d") && (u += " today"), (i.day() === 5 || i.day() === 6) && (u += " weekend"), c.append('<td data-action="selectDay" data-mday="' + i.date() + '" data-day="' + i.format("L") + '" class="day' + u + '">' + i.iDate() + "<\/td>"), i.add(1, "days");
                    l.find("tbody").empty().append(v);
                    di();
                    nr()
                }
            },
            ir = function() {
                var u = e.find(".timepicker-hours table"),
                    t = f.clone().startOf("day"),
                    r = [],
                    i = n("<tr>");
                for (f.hour() > 11 && !d && t.hour(12); t.isSame(f, "d") && (d || f.hour() < 12 && t.hour() < 12 || f.hour() > 11);) t.hour() % 4 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectHour" class="hour' + (h(t, "h") ? "" : " disabled") + '">' + t.format(d ? "HH" : "hh") + "<\/td>"), t.add(1, "h");
                u.empty().append(r)
            },
            rr = function() {
                for (var s = e.find(".timepicker-minutes table"), t = f.clone().startOf("h"), u = [], i = n("<tr>"), o = r.stepping === 1 ? 5 : r.stepping; f.isSame(t, "h");) t.minute() % (o * 4) == 0 && (i = n("<tr>"), u.push(i)), i.append('<td data-action="selectMinute" class="minute' + (h(t, "m") ? "" : " disabled") + '">' + t.format("mm") + "<\/td>"), t.add(o, "m");
                s.empty().append(u)
            },
            ur = function() {
                for (var u = e.find(".timepicker-seconds table"), t = f.clone().startOf("m"), r = [], i = n("<tr>"); f.isSame(t, "m");) t.second() % 20 == 0 && (i = n("<tr>"), r.push(i)), i.append('<td data-action="selectSecond" class="second' + (h(t, "s") ? "" : " disabled") + '">' + t.format("ss") + "<\/td>"), t.add(5, "s");
                u.empty().append(r)
            },
            fr = function() {
                var n, i, t = e.find(".timepicker span[data-time-component]");
                d || (n = e.find(".timepicker [data-action=togglePeriod]"), i = o.clone().add(o.hours() >= 12 ? -12 : 12, "h"), n.text(o.format("A")), h(i, "h") ? n.removeClass("disabled") : n.addClass("disabled"));
                t.filter("[data-time-component=hours]").text(o.format(d ? "HH" : "hh"));
                t.filter("[data-time-component=minutes]").text(o.format("mm"));
                t.filter("[data-time-component=seconds]").text(o.format("ss"));
                ir();
                rr();
                ur()
            },
            a = function() { e && (ut(), fr()) },
            s = function(n) {
                var t = k ? null : o;
                if (!n) {
                    k = !0;
                    c.val("");
                    i.data("date", "");
                    et({ type: "dp.change", date: !1, oldDate: t });
                    a();
                    return
                }
                n = n.clone().locale(r.locale);
                r.stepping !== 1 && n.minutes(Math.round(n.minutes() / r.stepping) * r.stepping % 60).seconds(0);
                h(n) ? (o = n, f = o.clone(), c.val(o.format(y)), i.data("date", o.format(y)), k = !1, a(), et({ type: "dp.change", date: o.clone(), oldDate: t })) : (r.keepInvalid || c.val(k ? "" : o.format(y)), et({ type: "dp.error", date: n }))
            },
            v = function() { var t = !1; return e ? (e.find(".collapse").each(function() { var i = n(this).data("collapse"); return i && i.transitioning ? (t = !0, !1) : !0 }), t) ? u : (l && l.hasClass("btn") && l.toggleClass("active"), e.hide(), n(window).off("resize", pt), e.off("click", "[data-action]"), e.off("mousedown", !1), e.remove(), e = !1, et({ type: "dp.hide", date: o.clone() }), c.blur(), u) : u },
            ii = function() { s(null) },
            vt = {
                next: function() {
                    var n = ht[b].navFnc;
                    f.add(ht[b].navStep, n);
                    r.hijri ? at() : ut();
                    it(n)
                },
                previous: function() {
                    var n = ht[b].navFnc;
                    f.subtract(ht[b].navStep, n);
                    r.hijri ? at() : ut();
                    it(n)
                },
                pickerSwitch: function() { ot(1) },
                selectMonth: function(t) {
                    var i = n(t.target).closest("tbody").find("span").index(n(t.target));
                    r.hijri ? f.iMonth(i) : f.month(i);
                    b === nt ? (r.hijri ? s(o.clone().year(f.iYear()).month(f.iMonth())) : s(o.clone().year(f.year()).month(f.month())), r.inline || v()) : (ot(-1), ut());
                    r.hijri ? it("iM") : it("M")
                },
                selectYear: function(t) {
                    var i = parseInt(n(t.target).text(), 10) || 0;
                    r.hijri ? f.iYear(i) : f.year(i);
                    b === nt ? (r.hijri ? s(o.clone().iYear(f.iYear())) : s(o.clone().year(f.year())), r.inline || v()) : (ot(-1), ut());
                    r.hijri ? it("hYYYY") : it("YYYY")
                },
                selectDecade: function(t) {
                    var i = parseInt(n(t.target).data("selection"), 10) || 0;
                    r.hijri ? f.iYear(i) : f.year(i);
                    b === nt ? (r.hijri ? s(o.clone().iYear(f.iYear())) : s(o.clone().year(f.year())), r.inline || v()) : (ot(-1), ut());
                    r.hijri ? it("hYYYY") : it("YYYY")
                },
                selectDay: function(t) {
                    // console.log(t);
                    var i = f.clone();
                    r.hijri ? (n(t.target).is(".old") && i.subtract(1, "iMonth"), n(t.target).is(".new") && i.add(1, "iMonth"), s(i.iDate(parseInt(n(t.target).text(), 10)))) : (n(t.target).is(".old") && i.subtract(1, "months"), n(t.target).is(".new") && i.add(1, "months"), s(i.date(parseInt(n(t.target).text(), 10))));
                    lt() || r.keepOpen || r.inline || v()
                },
                incrementHours: function() {
                    var n = o.clone().add(1, "h");
                    h(n, "h") && s(n)
                },
                incrementMinutes: function() {
                    var n = o.clone().add(r.stepping, "m");
                    h(n, "m") && s(n)
                },
                incrementSeconds: function() {
                    var n = o.clone().add(1, "s");
                    h(n, "s") && s(n)
                },
                decrementHours: function() {
                    var n = o.clone().subtract(1, "h");
                    h(n, "h") && s(n)
                },
                decrementMinutes: function() {
                    var n = o.clone().subtract(r.stepping, "m");
                    h(n, "m") && s(n)
                },
                decrementSeconds: function() {
                    var n = o.clone().subtract(1, "s");
                    h(n, "s") && s(n)
                },
                togglePeriod: function() { s(o.clone().add(o.hours() >= 12 ? -12 : 12, "h")) },
                togglePicker: function(t) {
                    var u = n(t.target),
                        e = u.closest("ul"),
                        i = e.find(".in"),
                        o = e.find(".collapse:not(.in)"),
                        f;
                    if (i && i.length) {
                        if (f = i.data("collapse"), f && f.transitioning) return;
                        i.collapse ? (i.collapse("hide"), o.collapse("show")) : (i.removeClass("in"), o.addClass("in"));
                        u.is("span") ? u.toggleClass(r.icons.time + " " + r.icons.date) : u.find("span").toggleClass(r.icons.time + " " + r.icons.date)
                    }
                },
                showPicker: function() {
                    e.find(".timepicker > div:not(.timepicker-picker)").hide();
                    e.find(".timepicker .timepicker-picker").show()
                },
                showHours: function() {
                    e.find(".timepicker .timepicker-picker").hide();
                    e.find(".timepicker .timepicker-hours").show()
                },
                showMinutes: function() {
                    e.find(".timepicker .timepicker-picker").hide();
                    e.find(".timepicker .timepicker-minutes").show()
                },
                showSeconds: function() {
                    e.find(".timepicker .timepicker-picker").hide();
                    e.find(".timepicker .timepicker-seconds").show()
                },
                selectHour: function(t) {
                    var i = parseInt(n(t.target).text(), 10);
                    d || (o.hours() >= 12 ? i !== 12 && (i += 12) : i === 12 && (i = 0));
                    s(o.clone().hours(i));
                    vt.showPicker.call(u)
                },
                selectMinute: function(t) {
                    s(o.clone().minutes(parseInt(n(t.target).text(), 10)));
                    vt.showPicker.call(u)
                },
                selectSecond: function(t) {
                    s(o.clone().seconds(parseInt(n(t.target).text(), 10)));
                    vt.showPicker.call(u)
                },
                clear: ii,
                today: function() {
                    var n = tt();
                    h(n, "d") && s(n)
                },
                close: v,
                switchDate: function() { r.hijri ? (r.hijri = !1, ut(), ni(), st()) : (r.hijri = !0, at(), ti(), st()) }
            },
            er = function(t) { return n(t.currentTarget).is(".disabled") ? !1 : (vt[n(t.currentTarget).data("action")].apply(u, arguments), !1) },
            w = function() {
                var t, i = { year: function(n) { return n.month(0).date(1).hours(0).seconds(0).minutes(0) }, month: function(n) { return n.date(1).hours(0).seconds(0).minutes(0) }, day: function(n) { return n.hours(0).seconds(0).minutes(0) }, hour: function(n) { return n.seconds(0).minutes(0) }, minute: function(n) { return n.seconds(0) } };
                if (c.prop("disabled") || !r.ignoreReadonly && c.prop("readonly") || e) return u;
                c.val() !== undefined && c.val().trim().length !== 0 ? s(rt(c.val().trim())) : r.useCurrent && k && (c.is("input") && c.val().trim().length === 0 || r.inline) && (t = tt(), typeof r.useCurrent == "string" && (t = i[r.useCurrent](t)), s(t));
                e = ai();
                console.log("click");
                console.log(e);
                yi();
                r.hijri ? ti() : ni();
                e.find(".timepicker-hours").hide();
                e.find(".timepicker-minutes").hide();
                e.find(".timepicker-seconds").hide();
                a();
                ot();
                n(window).on("resize", pt);
                e.on("click", "[data-action]", er);
                e.on("mousedown", !1);
                return l && l.hasClass("btn") && l.toggleClass("active"), e.show(), pt(), r.focusOnShow && !c.is(":focus") && c.focus(), et({ type: "dp.show" }), u
            },
            wt = function() { return e ? v() : w() },
            rt = function(n) { return n = r.parseInputDate === undefined ? t.isMoment(n) || n instanceof Date ? t(n) : tt(n) : r.parseInputDate(n), n.locale(r.locale), n },
            ri = function(n) {
                var o = null,
                    t, f, c = [],
                    l = {},
                    s = n.which,
                    i, h, a = "p";
                ct[s] = a;
                for (t in ct) ct.hasOwnProperty(t) && ct[t] === a && (c.push(t), parseInt(t, 10) !== s && (l[t] = !0));
                for (t in r.keyBinds)
                    if (r.keyBinds.hasOwnProperty(t) && typeof r.keyBinds[t] == "function" && (i = t.split(" "), i.length === c.length && gt[s] === i[i.length - 1])) {
                        for (h = !0, f = i.length - 2; f >= 0; f--)
                            if (!(gt[i[f]] in l)) { h = !1; break }
                        if (h) { o = r.keyBinds[t]; break }
                    }
                o && (o.call(u, e), n.stopPropagation(), n.preventDefault())
            },
            ui = function(n) {
                ct[n.which] = "r";
                n.stopPropagation();
                n.preventDefault()
            },
            fi = function(t) {
                var i = n(t.target).val().trim(),
                    r = i ? rt(i) : null;
                return s(r), t.stopImmediatePropagation(), !1
            },
            or = function() {
                c.on({ change: fi, blur: r.debug ? "" : v, keydown: ri, keyup: ui, focus: r.allowInputToggle ? w : "" });
                if (i.is("input")) c.on({ focus: w });
                else if (l) {
                    l.on("click", wt);
                    l.on("mousedown", !1)
                }
            },
            sr = function() {
                c.off({ change: fi, blur: blur, keydown: ri, keyup: ui, focus: r.allowInputToggle ? v : "" });
                i.is("input") ? c.off({ focus: w }) : l && (l.off("click", wt), l.off("mousedown", !1))
            },
            ei = function(t) {
                var i = {};
                return n.each(t, function() {
                    var n = rt(this);
                    n.isValid() && (i[n.format("YYYY-MM-DD")] = !0)
                }), Object.keys(i).length ? i : !1
            },
            oi = function(t) { var i = {}; return n.each(t, function() { i[this] = !0 }), Object.keys(i).length ? i : !1 },
            st = function() {
                var n = r.format || "L LT";
                r.hijri && (n = r.hijriFormat);
                y = n.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(n) { var t = o.localeData().longDateFormat(n) || n; return t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function(n) { return o.localeData().longDateFormat(n) || n }) });
                g = r.extraFormats ? r.extraFormats.slice() : [];
                g.indexOf(n) < 0 && g.indexOf(y) < 0 && g.push(y);
                d = y.toLowerCase().indexOf("a") < 1 && y.replace(/\[.*?\]/g, "").indexOf("h") < 1;
                p("y") && (nt = 2);
                p("M") && (nt = 1);
                p("d") && (nt = 0);
                b = Math.max(nt, b);
                k || s(o)
            };
        if (u.destroy = function() {
                v();
                sr();
                i.removeData("DateTimePicker");
                i.removeData("date")
            }, u.toggle = wt, u.show = w, u.hide = v, u.disable = function() { return v(), l && l.hasClass("btn") && l.addClass("disabled"), c.prop("disabled", !0), u }, u.enable = function() { return l && l.hasClass("btn") && l.removeClass("disabled"), c.prop("disabled", !1), u }, u.ignoreReadonly = function(n) { if (arguments.length === 0) return r.ignoreReadonly; if (typeof n != "boolean") throw new TypeError("ignoreReadonly () expects a boolean parameter"); return r.ignoreReadonly = n, u }, u.options = function(t) {
                if (arguments.length === 0) return n.extend(!0, {}, r);
                if (!(t instanceof Object)) throw new TypeError("options() options parameter should be an object");
                return n.extend(!0, r, t), n.each(r, function(n, t) {
                    if (u[n] !== undefined) u[n](t);
                    else throw new TypeError("option " + n + " is not recognized!");
                }), u
            }, u.date = function(n) { if (arguments.length === 0) return k ? null : o.clone(); if (n !== null && typeof n != "string" && !t.isMoment(n) && !(n instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]"); return s(n === null ? null : rt(n)), u }, u.format = function(n) { if (arguments.length === 0) return r.format; if (typeof n != "string" && (typeof n != "boolean" || n !== !1)) throw new TypeError("format() expects a sting or boolean:false parameter " + n); return r.format = n, y && st(), u }, u.hijriFormat = function() {}, u.timeZone = function(n) { return arguments.length === 0 ? r.timeZone : (r.timeZone = n, u) }, u.dayViewHeaderFormat = function(n) { if (arguments.length === 0) return r.dayViewHeaderFormat; if (typeof n != "string") throw new TypeError("dayViewHeaderFormat() expects a string parameter"); return r.dayViewHeaderFormat = n, u }, u.hijriDayViewHeaderFormat = function() {}, u.extraFormats = function(n) { if (arguments.length === 0) return r.extraFormats; if (n !== !1 && !(n instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter"); return r.extraFormats = n, g && st(), u }, u.disabledDates = function(t) { if (arguments.length === 0) return r.disabledDates ? n.extend({}, r.disabledDates) : r.disabledDates; if (!t) return r.disabledDates = !1, a(), u; if (!(t instanceof Array)) throw new TypeError("disabledDates() expects an array parameter"); return r.disabledDates = ei(t), r.enabledDates = !1, a(), u }, u.enabledDates = function(t) { if (arguments.length === 0) return r.enabledDates ? n.extend({}, r.enabledDates) : r.enabledDates; if (!t) return r.enabledDates = !1, a(), u; if (!(t instanceof Array)) throw new TypeError("enabledDates() expects an array parameter"); return r.enabledDates = ei(t), r.disabledDates = !1, a(), u }, u.daysOfWeekDisabled = function(n) {
                if (arguments.length === 0) return r.daysOfWeekDisabled.splice(0);
                if (typeof n == "boolean" && !n) return r.daysOfWeekDisabled = !1, a(), u;
                if (!(n instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");
                if (r.daysOfWeekDisabled = n.reduce(function(n, t) { return (t = parseInt(t, 10), t > 6 || t < 0 || isNaN(t)) ? n : (n.indexOf(t) === -1 && n.push(t), n) }, []).sort(), r.useCurrent && !r.keepInvalid) {
                    for (var t = 0; !h(o, "d");) {
                        if (o.add(1, "days"), t === 7) throw "Tried 7 times to find a valid date";
                        t++
                    }
                    s(o)
                }
                return a(), u
            }, u.maxDate = function(n) {
                if (arguments.length === 0) return r.maxDate ? r.maxDate.clone() : r.maxDate;
                if (typeof n == "boolean" && n === !1) return r.maxDate = !1, a(), u;
                typeof n == "string" && (n === "now" || n === "moment") && (n = tt());
                var t = rt(n);
                if (!t.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + n);
                if (r.minDate && t.isBefore(r.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + t.format(y));
                return r.maxDate = t, r.useCurrent && !r.keepInvalid && o.isAfter(n) && s(r.maxDate), f.isAfter(t) && (f = t.clone().subtract(r.stepping, "m")), a(), u
            }, u.minDate = function(n) {
                if (arguments.length === 0) return r.minDate ? r.minDate.clone() : r.minDate;
                if (typeof n == "boolean" && n === !1) return r.minDate = !1, a(), u;
                typeof n == "string" && (n === "now" || n === "moment") && (n = tt());
                var t = rt(n);
                if (!t.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + n);
                if (r.maxDate && t.isAfter(r.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + t.format(y));
                return r.minDate = t, r.useCurrent && !r.keepInvalid && o.isBefore(n) && s(r.minDate), f.isBefore(t) && (f = t.clone().add(r.stepping, "m")), a(), u
            }, u.defaultDate = function(n) {
                if (arguments.length === 0) return r.defaultDate ? r.defaultDate.clone() : r.defaultDate;
                if (!n) return r.defaultDate = !1, u;
                typeof n == "string" && (n === "now" || n === "moment") && (n = tt());
                var t = rt(n);
                if (!t.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + n);
                if (!h(t)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
                return r.defaultDate = t, (r.defaultDate && r.inline || c.val().trim() === "") && s(r.defaultDate), u
            }, u.hijri = function(n) { if (arguments.length === 0) return r.hijri && (r.viewModes = ["days", "months", "years"]), r.hijri; if (typeof n != "boolean") throw new TypeError("hijri() expects a boolean parameter"); return r.hijri = n, r.hijri && (r.viewModes = ["days", "months", "years"]), u }, u.isRTL = function() { return r.isRTL && (r.icons.next = ">>", r.icons.previous = "<<"), r.isRTL }, u.locale = function(n) { if (arguments.length === 0) return r.locale; if (!t.localeData(n)) throw new TypeError("locale() locale " + n + " is not loaded from moment locales!"); return r.locale = n, o.locale(r.locale), f.locale(r.locale), y && st(), e && (v(), w()), u }, u.stepping = function(n) { return arguments.length === 0 ? r.stepping : (n = parseInt(n, 10), (isNaN(n) || n < 1) && (n = 1), r.stepping = n, u) }, u.useCurrent = function(n) { var t = ["year", "month", "day", "hour", "minute"]; if (arguments.length === 0) return r.useCurrent; if (typeof n != "boolean" && typeof n != "string") throw new TypeError("useCurrent() expects a boolean or string parameter"); if (typeof n == "string" && t.indexOf(n.toLowerCase()) === -1) throw new TypeError("useCurrent() expects a string parameter of " + t.join(", ")); return r.useCurrent = n, u }, u.collapse = function(n) { if (arguments.length === 0) return r.collapse; if (typeof n != "boolean") throw new TypeError("collapse() expects a boolean parameter"); return r.collapse === n ? u : (r.collapse = n, e && (v(), w()), u) }, u.icons = function(t) { if (arguments.length === 0) return n.extend({}, r.icons); if (!(t instanceof Object)) throw new TypeError("icons() expects parameter to be an Object"); return n.extend(r.icons, t), e && (v(), w()), u }, u.tooltips = function(t) { if (arguments.length === 0) return n.extend({}, r.tooltips); if (!(t instanceof Object)) throw new TypeError("tooltips() expects parameter to be an Object"); return n.extend(r.tooltips, t), e && (v(), w()), u }, u.useStrict = function(n) { if (arguments.length === 0) return r.useStrict; if (typeof n != "boolean") throw new TypeError("useStrict() expects a boolean parameter"); return r.useStrict = n, u }, u.sideBySide = function(n) { if (arguments.length === 0) return r.sideBySide; if (typeof n != "boolean") throw new TypeError("sideBySide() expects a boolean parameter"); return r.sideBySide = n, e && (v(), w()), u }, u.viewMode = function(n) { if (arguments.length === 0) return r.viewMode; if (typeof n != "string") throw new TypeError("viewMode() expects a string parameter"); if (yt.indexOf(n) === -1) throw new TypeError("viewMode() parameter must be one of (" + yt.join(", ") + ") value"); return r.viewMode = n, b = Math.max(yt.indexOf(n), nt), ot(), u }, u.toolbarPlacement = function(n) { if (arguments.length === 0) return r.toolbarPlacement; if (typeof n != "string") throw new TypeError("toolbarPlacement() expects a string parameter"); if (dt.indexOf(n) === -1) throw new TypeError("toolbarPlacement() parameter must be one of (" + dt.join(", ") + ") value"); return r.toolbarPlacement = n, e && (v(), w()), u }, u.widgetPositioning = function(t) {
                if (arguments.length === 0) return n.extend({}, r.widgetPositioning);
                if ({}.toString.call(t) !== "[object Object]") throw new TypeError("widgetPositioning() expects an object variable");
                if (t.horizontal) {
                    if (typeof t.horizontal != "string") throw new TypeError("widgetPositioning() horizontal variable must be a string");
                    if (t.horizontal = t.horizontal.toLowerCase(), kt.indexOf(t.horizontal) === -1) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + kt.join(", ") + ")");
                    r.widgetPositioning.horizontal = t.horizontal
                }
                if (t.vertical) {
                    if (typeof t.vertical != "string") throw new TypeError("widgetPositioning() vertical variable must be a string");
                    if (t.vertical = t.vertical.toLowerCase(), bt.indexOf(t.vertical) === -1) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + bt.join(", ") + ")");
                    r.widgetPositioning.vertical = t.vertical
                }
                return a(), u
            }, u.calendarWeeks = function(n) { if (arguments.length === 0) return r.calendarWeeks; if (typeof n != "boolean") throw new TypeError("calendarWeeks() expects parameter to be a boolean value"); return r.calendarWeeks = n, a(), u }, u.showTodayButton = function(n) { if (arguments.length === 0) return r.showTodayButton; if (typeof n != "boolean") throw new TypeError("showTodayButton() expects a boolean parameter"); return r.showTodayButton = n, e && (v(), w()), u }, u.showClear = function(n) { if (arguments.length === 0) return r.showClear; if (typeof n != "boolean") throw new TypeError("showClear() expects a boolean parameter"); return r.showClear = n, e && (v(), w()), u }, u.widgetParent = function(t) { if (arguments.length === 0) return r.widgetParent; if (typeof t == "string" && (t = n(t)), t !== null && typeof t != "string" && !(t instanceof n)) throw new TypeError("widgetParent() expects a string or a jQuery object parameter"); return r.widgetParent = t, e && (v(), w()), u }, u.keepOpen = function(n) { if (arguments.length === 0) return r.keepOpen; if (typeof n != "boolean") throw new TypeError("keepOpen() expects a boolean parameter"); return r.keepOpen = n, u }, u.focusOnShow = function(n) { if (arguments.length === 0) return r.focusOnShow; if (typeof n != "boolean") throw new TypeError("focusOnShow() expects a boolean parameter"); return r.focusOnShow = n, u }, u.inline = function(n) { if (arguments.length === 0) return r.inline; if (typeof n != "boolean") throw new TypeError("inline() expects a boolean parameter"); return r.inline = n, u }, u.clear = function() { return ii(), u }, u.keyBinds = function(n) { return r.keyBinds = n, u }, u.getMoment = function(n) { return tt(n) }, u.debug = function(n) { if (typeof n != "boolean") throw new TypeError("debug() expects a boolean parameter"); return r.debug = n, u }, u.allowInputToggle = function(n) { if (arguments.length === 0) return r.allowInputToggle; if (typeof n != "boolean") throw new TypeError("allowInputToggle() expects a boolean parameter"); return r.allowInputToggle = n, u }, u.showClose = function(n) { if (arguments.length === 0) return r.showClose; if (typeof n != "boolean") throw new TypeError("showClose() expects a boolean parameter"); return r.showClose = n, u }, u.showSwitcher = function(n) { if (arguments.length === 0) return r.showSwitcher; if (typeof n != "boolean") throw new TypeError("showClose() expects a boolean parameter"); return r.showSwitcher = n, u }, u.keepInvalid = function(n) { if (arguments.length === 0) return r.keepInvalid; if (typeof n != "boolean") throw new TypeError("keepInvalid() expects a boolean parameter"); return r.keepInvalid = n, u }, u.datepickerInput = function(n) { if (arguments.length === 0) return r.datepickerInput; if (typeof n != "string") throw new TypeError("datepickerInput() expects a string parameter"); return r.datepickerInput = n, u }, u.parseInputDate = function(n) { if (arguments.length === 0) return r.parseInputDate; if (typeof n != "function") throw new TypeError("parseInputDate() sholud be as function"); return r.parseInputDate = n, u }, u.disabledTimeIntervals = function(t) { if (arguments.length === 0) return r.disabledTimeIntervals ? n.extend({}, r.disabledTimeIntervals) : r.disabledTimeIntervals; if (!t) return r.disabledTimeIntervals = !1, a(), u; if (!(t instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter"); return r.disabledTimeIntervals = t, a(), u }, u.disabledHours = function(t) {
                if (arguments.length === 0) return r.disabledHours ? n.extend({}, r.disabledHours) : r.disabledHours;
                if (!t) return r.disabledHours = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");
                if (r.disabledHours = oi(t), r.enabledHours = !1, r.useCurrent && !r.keepInvalid) {
                    for (var i = 0; !h(o, "h");) {
                        if (o.add(1, "h"), i === 24) throw "Tried 24 times to find a valid date";
                        i++
                    }
                    s(o)
                }
                return a(), u
            }, u.enabledHours = function(t) {
                if (arguments.length === 0) return r.enabledHours ? n.extend({}, r.enabledHours) : r.enabledHours;
                if (!t) return r.enabledHours = !1, a(), u;
                if (!(t instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");
                if (r.enabledHours = oi(t), r.disabledHours = !1, r.useCurrent && !r.keepInvalid) {
                    for (var i = 0; !h(o, "h");) {
                        if (o.add(1, "h"), i === 24) throw "Tried 24 times to find a valid date";
                        i++
                    }
                    s(o)
                }
                return a(), u
            }, u.viewDate = function(n) { if (arguments.length === 0) return f.clone(); if (!n) return f = o.clone(), u; if (typeof n != "string" && !t.isMoment(n) && !(n instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]"); return f = rt(n), it(), u }, i.is("input")) c = i;
        else if (c = i.find(r.datepickerInput), c.size() === 0) c = i.find("input");
        else if (!c.is("input")) throw new Error('CSS class "' + r.datepickerInput + '" cannot be applied to non input element');
        if (i.hasClass("input-group") && (l = i.find(".datepickerbutton").size() === 0 ? i.find(".input-group-addon") : i.find(".datepickerbutton")), !r.inline && !c.is("input")) throw new Error("Could not initialize DateTimePicker without an input element");
        return o = tt(), f = o.clone(), n.extend(!0, r, vi()), u.options(r), st(), or(), c.prop("disabled") && u.disable(), c.is("input") && c.val().trim().length !== 0 ? s(rt(c.val().trim())) : r.defaultDate && c.attr("placeholder") === undefined && s(r.defaultDate), r.inline && w(), u
    };
    n.fn.hijriDatePicker = function(t) {
        return this.each(function() {
            var r = n(this);
            r.data("HijriDatePicker") || (t = n.extend(!0, {}, n.fn.hijriDatePicker.defaults, t), r.data("HijriDatePicker", i(r, t)))
        })
    };
    n.fn.hijriDatePicker.defaults = {
        timeZone: "Etc/UTC",
        format: "DD-MM-YYYY",
        hijriFormat: "iYYYY-iMM-iDD",
        hijriDayViewHeaderFormat: "iMMMM iYYYY",
        dayViewHeaderFormat: "MMMM YYYY",
        minDate: "1950-01-01",
        maxDate: "2070-01-01",
        extraFormats: !1,
        stepping: 1,
        useCurrent: !0,
        collapse: !0,
        locale: "ar-SA",
        defaultDate: !1,
        disabledDates: !1,
        enabledDates: !1,
        icons: { time: "fa fa-clock text-primary", date: "glyphicon glyphicon-calendar", up: "fa fa-chevron-up text-primary", down: "fa fa-chevron-down text-primary", previous: "<<", next: ">>", today: "Ø§Ù„ÙŠÙˆÙ…", clear: "Ù…Ø³Ø­", close: "Ø§ØºÙ„Ø§Ù‚" },
        tooltips: { today: "Go to today", clear: "Clear selection", close: "Close the picker", selectMonth: "Select Month", prevMonth: "Previous Month", nextMonth: "Next Month", selectYear: "Select Year", prevYear: "Previous Year", nextYear: "Next Year", selectDecade: "Select Decade", prevDecade: "Previous Decade", nextDecade: "Next Decade", prevCentury: "Previous Century", nextCentury: "Next Century", pickHour: "Pick Hour", incrementHour: "Increment Hour", decrementHour: "Decrement Hour", pickMinute: "Pick Minute", incrementMinute: "Increment Minute", decrementMinute: "Decrement Minute", pickSecond: "Pick Second", incrementSecond: "Increment Second", decrementSecond: "Decrement Second", togglePeriod: "Toggle Period", selectTime: "Select Time" },
        useStrict: !1,
        sideBySide: !1,
        daysOfWeekDisabled: !1,
        calendarWeeks: !1,
        viewMode: "days",
        toolbarPlacement: "default",
        showTodayButton: !1,
        showClear: !1,
        showClose: !1,
        widgetPositioning: { horizontal: "auto", vertical: "auto" },
        widgetParent: null,
        ignoreReadonly: !1,
        keepOpen: !1,
        focusOnShow: !0,
        inline: !1,
        keepInvalid: !1,
        datepickerInput: ".datepickerinput",
        keyBinds: {
            up: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(7, "d")) : this.date(t.clone().add(this.stepping(), "m"))
                }
            },
            down: function(n) {
                if (!n) { this.show(); return }
                var t = this.date() || this.getMoment();
                n.find(".datepicker").is(":visible") ? this.date(t.clone().add(7, "d")) : this.date(t.clone().subtract(this.stepping(), "m"))
            },
            "control up": function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().subtract(1, "years")) : this.date(t.clone().add(1, "h"))
                }
            },
            "control down": function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") ? this.date(t.clone().add(1, "y")) : this.date(t.clone().subtract(1, "h"))
                }
            },
            left: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "days"))
                }
            },
            right: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "days"))
                }
            },
            pageUp: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().subtract(1, "months"))
                }
            },
            pageDown: function(n) {
                if (n) {
                    var t = this.date() || this.getMoment();
                    n.find(".datepicker").is(":visible") && this.date(t.clone().add(1, "months"))
                }
            },
            enter: function() { this.hide() },
            escape: function() { this.hide() },
            "control space": function(n) { n.find(".timepicker").is(":visible") && n.find('.btn[data-action="togglePeriod"]').click() },
            t: function() { this.date(this.getMoment()) },
            "delete": function() { this.clear() }
        },
        showSwitcher: !0,
        debug: !1,
        allowInputToggle: !1,
        disabledTimeIntervals: !1,
        disabledHours: !1,
        enabledHours: !1,
        viewDate: !1,
        hijri: !1,
        isRTL: !1
    }
});