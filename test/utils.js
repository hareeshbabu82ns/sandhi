//
const should = require('should')
var salita = require('salita-component');
// var splitter = require('../splitter');

// var go = process.argv.slice(3)[0] || false;

var debug = (process.env.debug == 'true') ? true : false;
var s = require('../index');
var sandhi = s.sandhi;
var u = s.u;

class utils {

    test(test, idx, cut, type) {
        var compound = test.shift();
        if (!compound) return;
        var first = test[0];
        var second = test[1];
        var full_sec = second;
        var beg = u.first(second);
        var addtext = test.join(' + ');
        var idxstr = ['_', idx + 1, '_'].join('');
        var co_slp = salita.sa2slp(compound);
        var fi_slp = salita.sa2slp(first);
        var se_slp = salita.sa2slp(second);
        var _slp = [fi_slp, se_slp, co_slp].join(' - ');
        var descr = [idxstr, 'add', addtext, compound, _slp].join(' - ');

        if (u.isVowel(beg)) {
            // if (cut) second = second.slice(1);
            second = second.slice(1);
            // else second = [u.liga(beg), u.wofirst(second)].join(''); // test starts with vowel, but it was not cutted - (doubled nasals, ayadi);
        }

        it(descr, function () {
            var added = sandhi.add(first, full_sec);
            // u.log('tests: ADD', added, 'f', first, 'sec', full_sec, 'samasa', compound, 0, added[0]);
            var samasas = added.map(function (r) {
                return r.samasa
            });
            should(u.include(samasas, compound)).be.true();
        });

        var descr = [idxstr, 'del', addtext, compound, fi_slp, se_slp, co_slp].join(' - ');
        it(descr, function () {
            var fres = false;
            var sres = false;
            var results = sandhi.del(compound, second);
            if (!results) u.log('TEST DEL - NO RESULT');
            // u.log('TEST DEL', results);
            results.forEach(function (res) {
                if (u.include(res.firsts, first)) fres = true;
                if (u.include(res.seconds, full_sec)) sres = true;
                // reversed adding:
                res.firsts.forEach(function (f) {
                    res.seconds.forEach(function (s) {
                        var added = sandhi.add(f, s);
                        // u.log('A', added, res.sutra)
                        if (added.length == 0) u.log('TEST:: NO ADDED', 'f:', f, 's:', s, 'added:', added);
                        var samasas = added.map(function (r) {
                            return r.samasa
                        });
                        // if (!u.include(samasas, compound)) u.log('TEST - FALSE:', 'f:', f, 's', s, 'added:',  added, 'samasa', compound, u.include(added, compound), 'sutra-del:', res.sutra);
                        should(u.include(samasas, compound)).be.true();
                    });
                });
            });
            fres.should.equal(true);
            sres.should.equal(true);
        });

    }
}


// function isIN(arr, item) {
//     return (arr.indexOf(item) > -1) ? true : false;
// }

// true.should.equal(true);
// function log() { console.log.apply(console, arguments) }

module.exports = new utils();