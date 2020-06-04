var _ = require('underscore');
var shiva = require('shiva-sutras');
var util = require('util');
var Const = require('./const');
var c = require('./const');
var debug = (process.env.debug == 'true') ? true : false;



class utils {


    // var self = this;

    // utils.prototype.c = utils.prototype.isIN = 
    c(arr, item) {
        return this.include(arr, item)
    }
    isIN(arr, item) {
        return this.include(arr, item)
    }
    include(arr, item) {
        return (arr.indexOf(item) > -1) ? true : false;
    }

    endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    startsWith(str, prefix) {
        return str.slice(0, prefix.length) == prefix;
    }

    arr2virama(arr) {
        return arr.map(function (str) { return [str, Const.virama].join(''); });
    }

    wolast(str) {
        return str.slice(0, -1);
    }

    wolast2(str) {
        return str.slice(0, -2);
    }

    wofirst(str) {
        return str.slice(1);
    }

    wofirst2(str) {
        return str.slice(2);
    }

    wofirstIfVow(str) {
        var vowel = (c.allvowels.indexOf(str[0]) > -1) ? true : false;
        return (vowel) ? str.slice(1) : str;
    }

    first(str) {
        return str[0];
    }

    last(str) {
        return str.slice(-1);
    }

    penult(str) {
        return str.slice(-2, -1);
    }

    isVowel(sym) {
        return this.include(c.allligas, sym) || this.include(c.allvowels, sym);
    }

    isLiga(sym) {
        return this.include(c.allligas, sym);
    }

    isVowExA(sym) {
        return this.include(c.allexa, sym);
    }

    isVirama(sym) {
        return sym == c.virama;
    }

    isVisarga(sym) {
        return sym == c.visarga;
    }

    isAnusvara(sym) {
        return sym == c.anusvara;
    }

    isCandra(sym) {
        return sym == c.candra;
    }

    isSemiVowel(sym) {
        return this.include(c.yaR, sym);
    }

    vowel(sym) {
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([2, 4, 6, 8], idx)) return row[idx - 1];
        if (idx == 0) return row[1];
    }

    // FIXME: не эффективно, переписать
    // vow, dirgha, liga, dl, semivow, guna, gl, vriddhi, vl
    liga(sym) {
        if (sym == 'अ') return '';
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 3, 5, 7], idx)) return row[idx + 1];
    }

    dirgha(sym) {
        // должен отдавать долгую полную, только если на входе краткая, к.лига, и долгая лига
        if (this.vowel(sym) == 'ऌ') return 'ॠ'; // FIXME: - или добавить f,F в vowrow?
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[3];
    }

    // dirgha-liga
    // semivow, vow, liga, dirgha, dl, guna, gl, vriddhi, vl
    dliga(sym) {
        // NB ==> должно быть равно u.liga(u.dirgha)
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[4];
    }

    // semi-vowel - от любой гласной ряда
    svow(sym) {
        return vowrow(sym)[0];
    }

    guna(sym) {
        // только если на входе краткая, лига, долгая и д.лига - а vriddhi? похоже, тоже?
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[5];
    }

    // guna-liga
    gliga(sym) {
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[6];
    }

    // aguna-liga
    aguna(sym) {
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (idx == 5) return row[2];
    }

    vriddhi(sym) {
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[7];
    }

    vliga(sym) {
        var row = this.vowrow(sym);
        var idx = row.indexOf(sym);
        if (this.c([1, 2, 3, 4], idx)) return row[8];
    }

    vowrow = function (sym) {
        return _.find(Const.vowtable, function (row) {
            return (row.indexOf(sym) > -1);
        }) || '';
    }


    // base - другой similar - не сравнение, а основной звук
    base(sym) {
        return this.vowrow(sym)[1];
    }


    similar(a, b) {
        if (a == 'ृ' && b == 'ऌ') return true; // FIXME: all variants needed?
        var arow = this.vowrow(a);
        var brow = this.vowrow(b);
        return (arow == brow);
    }

    // FIXME: в новом стиле
    hrasva(sym) {
        return shiva([sym]).hrasva().end()[0];
    }

    isHrasva(sym) {
        return this.c(c.hrasva, sym);
    }

    isDirgha(sym) {
        return this.c(c.dirgha, sym);
    }

    isConsonant(sym) {
        return (this.c(Const.hal, sym));
    }

    isSimple(sym) {
        return (this.c(Const.allsimples, sym)); //  [ 'इ', 'उ', 'ऋ', 'ऌ', 'ई', 'ऊ', 'ॠ' ]
    }

    isaA(sym) {
        return (this.c(Const.hal, sym) || sym == Const.A);
    }

    endsaA(str) {
        var sym = str.slice(-1);
        return (this.c(Const.hal, sym) || sym == Const.A);
    }

    startsaA(str) {
        return (this.c(Const.aA, str[0]));
    }

    vowsound(str) {
        var sym = str.slice(-1);
        return (this.c(Const.hal, sym) || this.c(Const.allligas, sym) || this.c(Const.allvowels, sym));
        // return (this.c(Const.hal, sym) || this.c(Const.allligas, sym) || this.c(Const.allvowels, sym) || this.c(Const.dirgha, sym));
        // FIXME: это неверно - почему долгие нужно писать отдельно?
    }

    vowshort(str) {
        var sym = str.slice(-1);
        return (this.c(Const.hal, sym) || this.c(Const.ligas, sym));
    }

    isShortSound(sym) {
        return (this.c(Const.hal, sym) || this.c(Const.hrasva_ligas, sym) || this.c(Const.vowels, sym));
    }

    // ============== CONSONANTS ===============

    consrow = function (sym) {
        return _.find(Const.constable, function (row) {
            return (row.indexOf(sym) > -1);
        }) || '';
    }

    voicing(str) {
        for (var uv in Const.unvoiced2voiced) {
            var v = Const.unvoiced2voiced[uv];
            str = str.replace(uv, v);
        }
        return str;
    }

    class1(v) {
        var res;
        Const.constable.forEach(function (str) {
            if (str.indexOf(v) > -1) res = str[0];
        });
        return res;
    }

    class3(v) {
        var res;
        Const.constable.forEach(function (str) {
            if (str.indexOf(v) > -1) res = str[2];
        });
        return res;
    }

    class4(v) {
        var res;
        Const.constable.forEach(function (str) {
            if (str.indexOf(v) > -1) res = str[3];
        });
        return res;
    }

    nasal(v) {
        return this.class5(v);
    }

    class5(v) {
        var res;
        Const.constable.forEach(function (str) {
            if (str.indexOf(v) > -1) res = str[4];
        });
        return res;
    }

    soft2hard(v) {
        var hard;
        Const.constable.forEach(function (row) {
            if (row.indexOf(v) < 0) return;
            var idx = row.indexOf(v);
            if (idx != 2 && idx != 3) return;
            hard = row[idx - 2];
        });
        return hard || v;
    }

    hard2soft(v) {
        var hard;
        Const.constable.forEach(function (row) {
            if (row.indexOf(v) < 0) return;
            var idx = row.indexOf(v);
            if (idx != 0 && idx != 1) return;
            hard = row[idx + 2];
        });
        return hard || v;
    }

    // select only soft
    soft(table) {
        if (!table) table = Const.constable;
        else if (typeof (table) == 'string') table = [table];
        var res = table.map(function (row) {
            var hard = [];
            row.split('').forEach(function (sym, idx) {
                if (idx > 1 && idx < 4) hard.push(sym);
            });
            return hard.join('');
        });
        return res.join('');
    }

    hard(table) {
        if (!table) table = Const.constable;
        else if (typeof (table) == 'string') table = [table];
        var res = table.map(function (row) {
            var hard = [];
            row.split('').forEach(function (sym, idx) {
                if (idx < 2) hard.push(sym);
            });
            return hard.join('');
        });
        return res.join('');
    }

    eqvarga(a, b) {
        return consrow(a) == consrow(b);
    }

    cavarga() {
        return this.palatal();
    }
    palatal() {
        return Const.constable[1];
    }

    tavarga() {
        return dental();
    }

    dental() {
        return Const.constable[3];
    }

    wavarga() {
        return cerebral()
    }

    cerebral() {
        return Const.constable[2];
    }

    pavarga() {
        return labial();
    }

    labial() {
        return Const.constable[4];
    }

    dental2palatal(v) {
        return this.palatal()[this.dental().indexOf(v)];
    }

    palatal2dental(v) {
        return this.dental()[this.palatal().indexOf(v)];
    }

    dental2cerebral(v) {
        return this.cerebral()[this.dental().indexOf(v)];
    }

    cerebral2dental(v) {
        return this.dental()[this.cerebral().indexOf(v)];
    }


    // spcons(a, b) { // spaced consonant
    //     return [a, Const.virama, ' ', b].join('');
    // }


    // /* vowels liga2matra */
    // matra(v) {
    //     // return Const.allvowels[Const.allligas.indexOf(v)];
    // }

    // /* vowels matra2liga */
    // liga(v) {    // nodejs sorts its incorrect !! Use Const.vow2liga instead
    //     // return Const.allligas[Const.allvowels.indexOf(v)];
    // }

    jhal2jaS(c) {
        if (isIN(['ग', 'ध', 'ख', 'क', 'ह'], c)) return 'ग' // g
        else if (isIN(['ज', 'झ', 'छ', 'च', 'श'], c)) return 'ज' // j
        else if (isIN(['ड', 'ढ', 'ठ', 'ट', 'ष'], c)) return 'ड' // D
        else if (isIN(['द', 'ध', 'थ', 'त', 'स']), c) return 'द' // d
        else if (isIN(['ब', 'भ', 'फ', 'प'], c)) return 'ब'; // b
        else return '';
    }

    // jhal - झ,भ,घ,ढ,ध, - ज,ब,ग,ड,द, - ख,फ,छ,ठ,थ, - च,ट,त,क,प, - श,ष,स,ह
    // car - च,ट,त,क,प,श,ष,स
    jhal2car(c) {
        if (isIN(['ग', 'ध', 'ख', 'क', 'ह'], c)) return 'क' // k
        else if (isIN(['ज', 'झ', 'छ', 'च', 'श'], c)) return 'च' // c
        else if (isIN(['ड', 'ढ', 'ठ', 'ट', 'ष'], c)) return 'ट' // w
        else if (isIN(['द', 'ध', 'थ', 'त', 'स']), c) return 'त' // t
        else if (isIN(['ब', 'भ', 'फ', 'प'], c)) return 'प'; // p
        else return '';
    }

    // FIXME: здесь только 1-4 классы должны быть и ya, va, la
    jhar2nasal(c) {
        if (isIN(['ग', 'ध', 'ख', 'क'], c)) return 'ङ' //
        else if (isIN(['ज', 'झ', 'छ', 'च', 'य'], c)) return 'ञ' //
        else if (isIN(['ड', 'ढ', 'ठ', 'ट'], c)) return 'ण' // N
        else if (isIN(['द', 'ध', 'थ', 'त', 'ल']), c) return 'न' // n
        else if (isIN(['ब', 'भ', 'फ', 'प', 'व'], c)) return 'म'; // m
        else return '';
    }





    den2pal(v) {
        return Const.palatal[Const.dental.indexOf(v)];
    }

    pal2den(v) {
        return Const.dental[Const.palatal.indexOf(v)];
    }

    den2cer(v) {
        return Const.cerebral[Const.dental.indexOf(v)];
    }

    cer2den(v) {
        return Const.dental[Const.cerebral.indexOf(v)];
    }


    // g - 'ग', 'ध', 'ख', 'क', 'ह'
    // j - 'ज', 'झ', 'छ', 'च', 'श'
    // D - 'ड', 'ढ', 'ठ', 'ट', 'ष'
    // d - 'द', 'ध', 'थ', 'त', 'स'
    // b - 'ब', 'भ', 'फ', 'प'

    combine(first, second, ends, starts) {
        // second = second.slice(1);
        var res = {};
        res.firsts = ends.map(function (e) {
            return [first, e].join('');
        });
        res.seconds = starts.map(function (s) {
            return [s, second].join('');
        });
        return res;
    }

    fourBySpace(ends, starts) {
        var res = [];
        ends.forEach(function (e) {
            starts.forEach(function (s) {
                res.push([e, s].join(' '));
            });
        });
        return res;
    }

    replaceByPos(samasa, pattern, sandhi, pos) {
        var first = samasa.slice(0, pos);
        var second = samasa.slice(pos);
        var result = second.replace(pattern, sandhi);
        return [first, result].join('');
    }

    isIN = function (arr, item) {
        return (arr.indexOf(item) > -1) ? true : false;
    }

    correct = function (sects, samasa) {
        var corr = true;
        sects.forEach(function (sect) {
            if (sect.length < 2) corr = false;
        });
        return corr;
    }

    // ===== internal ====

    ultima(stem) {
        var clean = stem.replace(/्$/, '');
        return (clean == stem) ? stem.slice(-1) : clean.slice(-1);
    }


    // internal.js
    unvoiced2voiced_unasp(lett) {
        var idx = Const.unvoiced_unasp.indexOf(lett);
        return Const.voiced_unasp[idx];
    }


    // ============== OLD =================

    unasp2asp(lett) {
        var idx = Const.unasps.indexOf(lett);
        return Const.asps[idx];
    }

    asp2unasp(lett) {
        var idx = Const.asps.indexOf(lett);
        return Const.unasps[idx];
    }

    // virama(stem) {
    //     var clean = stem.replace(/्$/, '');
    //     return (clean == stem) ? false : true;
    // }

    replaceEnd(stem, from, to) {
        // from = [from, Const.virama].join('');
        // to = [to, Const.virama].join('');
        var re = new RegExp(from + '$');
        return stem.replace(re, to);
    }


    ulog = function () {
        var obj = arguments[0];
        if (arguments.length > 1) {
            console.log('==', arguments[0], '==');
            var obj = arguments[1];
        }
        console.log(util.inspect(obj, showHidden = false, depth = null, colorize = true));
    }

    log = function () { console.log.apply(console, arguments) }

    log() {
        console.log.apply(console, arguments)
    }

    p() {
        var vs = _.values(arguments);
        if (vs.length == 1) vs = vs[0];
        console.log(util.inspect(vs, showHidden = false, depth = null, colorize = true));
    }

    debug() {
        if (!debug) return;
        console.log.apply(console, arguments)
    }
}
module.exports = new utils();