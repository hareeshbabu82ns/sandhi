var utils = require('../utils');

var tests = [
    {
        sutra: 'hard-to-soft',
        descr: 'hard consonant followed by a soft consonant but nasal or vow changes to 3d-class - 8.2.39',
        first: true,
        tests: [
            ['श्रीमद्भगवद्गीता', 'श्रीमत्', 'भगवद्गीता'],
            ['वनादागच्छामि', 'वनात्', 'आगच्छामि'],
            ['सद्भडति', 'सत्', 'भडति'],
            ['प्रागूध', 'प्राक्', 'ऊध'], // 4.40 ?
            ['नगरादागच्छति', 'नगरात्', 'आगच्छति'],
            ['भगवद्गीता', 'भगवत्', 'गीता'],
            ['वधाद्विना', 'वधात्', 'विना'],
            ['वनात्पिता', 'वनात्', 'पिता'],

            ['तज्जातम्', 'तत्', 'जातम्'],
            // ['पतन्ति', 'पत्', 'अन्ति'], // failed, internal - B.1.1 e3
            ['', '', ''],
        ]
    },

    // G2. Consonant to nasal of class:
    // anusvara at the middle of word followed by consonant except र्, sibilants or ह् mandatorily changes to nasal of the class
    // anusvara at the end of word followed by consonant except र्, sibilants or ह् optionally changes to nasal of the class
    // reverse: nasal to anusvara anusvara in a middle of a splitted segment --> internal
    // == ONLY INT
    // {
    //     sutra: '8.4.58',
    //     descr: 'anusvara at mow, eow to nasal - nasal to anusvara anusvara in a middle of a splitted segment',
    //     only: 'int',
    //     tests: [
    //         ['शङ्करच', 'शंकर', 'च'], // च has no sense, only for test // 'शंकर' == 'शंकर'
    //         ['', '', ''],
    //     ]
    // },

    {
        sutra: 'cons-to-nasal-or-third',
        descr: 'class consonant followed by (nasal) optionally changes to the nasal or 3rd-class - 8.4.45',
        only: 'ext',
        tests: [
            ['एतन्मुरारि', 'एतद्', 'मुरारि'], // opt
            ['षण्मासा', 'षट्', 'मासा'],
            ['षड्मासा', 'षट्', 'मासा'], // то же самое, 3-й класс - какая сутра ???
            ['तन्मुग्धम्', 'तत्', 'मुग्धम्'],
            ['तद्मुग्धम्', 'तत्', 'मुग्धम्'],
            ['सम्यङ्मिलितः', 'सम्यक्', 'मिलितः'],
            ['सम्यग्मिलितः', 'सम्यक्', 'मिलितः'],
            ['', '', ''],
            ['कामान्सर्वान्पा', 'कामान्सर्वान्', 'पा'], // सर्वाम्
            ['', '', ''],
            ['', '', ''],
        ]
    },

    // {
    //     sutra: '8.4.45-hard',
    //     descr: 'class consonant followed by (nasal) optionally changes to the nasal of class, or less commonly for class hard consonants, changes to 3rd consonant of class',
    //     only: 'ext',
    //     tests: [
    //         ['एतद्मुरारि', 'एतद्', 'मुरारि'],
    //         // ['षण्मासा', 'षट्', 'मासा'],
    //         // ['षड्मासा', 'षट्', 'मासा'],
    //         // ['तन्मुग्धम्', 'तत्', 'मुग्धम्'],
    //         // ['तद्मुग्धम्', 'तत्', 'मुग्धम्'],
    //         // ['सम्यङ्मिलितः', 'सम्यक्', 'मिलितः'],
    //         // ['सम्यग्मिलितः', 'सम्यक्', 'मिलितः'],
    //         ['', '', ''],
    //     ]
    // },

    {
        sutra: 'dental-palatal',
        descr: 'Dental + Palatal -> doubled palatal - 8.4.40',
        tests: [
            ['सच्चित्', 'सत्', 'चित्'],
            ['तच्छिनत्ति', 'तत्', 'छिनत्ति'],
            ['ताञ्जनान्', 'तान्', 'जनान्'], // nasal
            ['तच्शिवः', 'तत्', 'शिवः'], // S
            ['तच्छिवः', 'तत्', 'शिवः'], // C - can not be tested for sandhi.cut <====== FIXME:
            ['तच्छिवः', 'तत्', 'छिवः'], // S-C

            ['शिवश्चर्य', 'शिवः', 'चर्य'], // s -> H // शिवः + चर्य
            ['तच्चर्य', 'तत्', 'चर्य'],
            ['तज्जह', 'तत्', 'जह'], // soft
            ['रामश्शेते', 'रामः', 'शेते'], // s -> H
            ['तज्जातम्', 'तत्', 'जातम्'],

            ['हरिश्शेते', 'हरिः', 'शेते'], // s -> H
            ['', '', ''],
        ]
    },

    {
        sutra: 'dental-cerebral',
        descr: 'A dental class consonant followed by a cerebral class consonant changes to cerebral - 8.4.41',
        tests: [
            ['ताण्डम्बरान्', 'तान्', 'डम्बरान्'],
            ['तट्षट्', 'तत्', 'षट्'],
            ['रामष्षष्ठः', 'रामः', 'षष्ठः'],
            ['तड्डयते', 'तत्', 'डयते'],
            ['तट्टीकाः', 'तत्', 'टीकाः'],
            ['', '', ''],
        ]
    },

    {
        sutra: 'doubled-nasals',
        descr: 'ङ्, ण्, न् at the end of a word after a short vowel doubles itself when followed by a vowel',
        only: 'ext',
        tests: [
            ['प्रत्यङ्ङात्मा', 'प्रत्यङ्', 'आत्मा'],
            ['सुगण्णिति', 'सुगण्', 'इति'],
            ['तस्मिन्नेव', 'तस्मिन्', 'एव'],
            ['विषीदन्निदम्', 'विषीदन्', 'इदम्'],
            ['अनिच्छन्नपि', 'अनिच्छन्', 'अपि'],
            // ['यावदेतान्निरीक्षेहम्', 'यावदेतान्', 'इरीक्षेहम्'], // -n not after short vowel, but A!
        ]
    },


    // gita:
    // इमाँल्लोकान्न
    // शुभाँल्लोकान्प्राप्नुयात्पुण्यकर्मणाम्
    // शुभाँल्लोकान्प्राप्नुयात्पुण्यकर्मणाम्
    // श्रद्धावाँल्लभते
    // इमाँल्लोकान्न
    // शुभाँल्लोकान्प्राप्नुयात्पुण्यकर्मणाम्
    // श्रद्धावाँल्लभते

    {
        sutra: 'double-la',
        descr: 'a dental n or dental other than n and s is followed by l - 8.4.60',
        tests: [
            ['तल्लयः', 'तत्', 'लयः'],
            // ['विद्वाल्ँलिखति', 'विद्वान्', 'लिखति'], // sequence - la, candra, virama, la
            ['विद्वाँल्लिखति', 'विद्वान्', 'लिखति'],
            ['चिल्लीनः', 'चिद्', 'लीनः'],
            // ['श्रद्धावाल्ँलभते', 'श्रद्धावान्', 'लभते'], // sequence
            ['श्रद्धावाँल्लभते', 'श्रद्धावान्', 'लभते'],
            ['', '', ''],
        ]
    },

    // In place of the "m" ending in an inflected word , the substitution is to be the "anusvara" if a consonant follows
    // reverse: anusvara to m
    {
        sutra: 'anusvara-to-m',
        descr: 'm,n to anusvara - 8.3.23',
        tests: [
            ['तंसारि', 'तम्', 'सारि'],
            ['अहंचर्य', 'अहम्', 'चर्य'],
            ['अहंचर्य', 'अहम्', 'चर्य'],
            ['अहंतिष्ठामि', 'अहम्', 'तिष्ठामि'],
            ['अहंतिष्ठामि', 'अहम्', 'तिष्ठामि'],
            ['शिवंनमः', 'शिवम्', 'नमः'],
            ['नरंपृच्छामि', 'नरम्', 'पृच्छामि'],
            // ['नरंयच्छति', 'नरम्', 'यच्छति'], // FIXME: ? вопрос - а вообще может быть M-yavala? Нет, там возникает candra согласно I.1.3
            ['पुष्पंदत्तम्', 'पुष्पम्', 'दत्तम्'],
            ['', '', ''],
            ['तंस', 'तम्', 'स'],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    },

    {
        sutra: 'anusvara-Sar',
        descr: '',
        tests: [
            ['तांश्च', 'तान्', 'च'], // 'तांश्च'
            ['कांश्चित्', 'कान्', 'चित्'],
            ['तांष्टङ्कान्', 'तान्', 'टङ्कान्'],
            ['तांस्तु', 'तान्', 'तु'],
            // ['राजन्संस्मृत्य', 'राजन्सन्', 'मृत्य'],
            ['', '', ''],
            ['', '', ''],
        ]
    },

    {
        sutra: 'candra',
        descr: 'm-to-candra after yalava',
        tests: [
            ['अहँव्वच्मि', 'अहम्', 'वच्मि'], // xxx - неверно зaписано слово, взять примеры из Бхг -  अ ह व ् ँ व च्मि - अहँव्वच्मि - अहँव्वच्मि
            ['इमाँल्लोकान्न', 'इमाम्', 'लोकान्न'], // в примерах из гиты first оканчивается всегда на -n. А в словаре эти слова -m, и sandhi-tool дает -m
            ['', '', ''],
            ['', '', ''],
        ]
    },

    {
        sutra: 'h-to-4class',
        descr: 'beg ह् optionally changes to 4th-class, soft fin undergoes sandhi changes',
        tests: [
            ['वाग्घरि', 'वाक्', 'घरि'], // in add test - हरि
            // ['धर्म्याद्धि', 'धर्म्याद्', 'धि'], // - हि // добавить, если будет добавлена звонкая при разрезании cut-cons
            ['धर्म्याद्धि', 'धर्म्यात्', 'धि'], // - हि
            ['बुद्धियोगाद्धनञ्जय', 'बुद्धियोगात्', 'धनञ्जय'],
        ]
    },

    {
        sutra: 'cuts',
        tests: [
            ['किमकुर्वत', 'किम्', 'अकुर्वत'],
            ['किमकुर्वत', 'किम', 'कुर्वत'],

            ['तदस्माकम्', 'तदस्', 'माकम्'],
            ['तदस्माकम्', 'तद्', 'अस्माकम्'],
            ['तदस्माकम्', 'तत्', 'अस्माकम्'],

            ['सञ्जनयन्हर्षम्', 'सञ्जनयन्', 'हर्षम्'],
            ['शब्दस्तुमुलोऽभवत्', 'शब्दस्तुमुलोऽभ', 'वत्'],
            ['', '', ''],
            ['सौभद्रश्च', 'सौभत्', 'रश्च'],
            ['सौभद्रश्च', 'सौभद्', 'रश्च'], // its just a test
            ['यावदेतान्', 'यावत्', 'एतान्'],
            ['यावदेतान्', 'यावद्', 'एतान्'],
            ['योद्धुकामानवस्थितान्', 'योद्धुकामान', 'वस्थितान्'],
            ['योद्धुकामानवस्थितान्', 'योद्धुकामान्', 'अवस्थितान्'],

            ['सेनयोरुभयोर्मध्ये', 'सेन्', 'अयोरुभयोर्मध्ये'],
            ['सेनयोरुभयोर्मध्ये', 'सेन', 'योरुभयोर्मध्ये'],
            ['रूनिति', 'रूनि', 'ति'],
            ['रूनिति', 'रून्', 'इति'],

            ['भ्यनुनादयन्', 'भ्यनु', 'नादयन्'],
            ['', '', ''],
            ['कृताञ्जलिर्वेपमानः', 'कृताञ्जलिर्वे', 'पमानः'],
            ['चलन्ध्रुवम्', 'चलम्', 'ध्रुवम्'], // -n => -m + soft
            ['अनन्येनैव', 'अनन्', 'येनैव'], // -n => no -m
            ['मात्रिन्दुं', 'मात्रिन्', 'दुं'],
            ['यावदेतान्निरीक्षेहम्', 'यावदेतान्नि', 'रीक्षेहम्'],
            ['', '', ''],
            ['', '', ''],
            ['ताञ्जनान्', 'तान्', 'जनान्'], // D.1.2 -> -n + j,J
            ['अहन्तिष्ठामि', 'अहम्', 'तिष्ठामि'],
            ['', '', ''],
            ['यज्ञदानतपःक्रियाः', 'यज्ञदानतपः', 'क्रियाः'],
        ]
    },

    // это массив тестов только для разбиения слов -n-, -m-? -M-
    {
        sutra: 'nasals-nm tests',
        descr: 'nasal tests',
        tests: [
            // anusvara-to-m:
            ['ग्रामंगच्छति', 'ग्रामम्', 'गच्छति'],
            ['तंस', 'तम्', 'स'],
            ['तंह', 'तम्', 'ह'],
            ['तंरक्षति', 'तम्', 'रक्षति'],
            ['अहंच', 'अहम्', 'च'],
            ['अहंतिष्ठामि', 'अहम्', 'तिष्ठामि'],
            // nasal-to-m:
            ['शङ्करः', 'शम्', 'करः'],
            ['ग्रामङ्गच्छति', 'ग्रामम्', 'गच्छति'],
            ['अहञ्च', 'अहम्', 'च'],
            // -n
            ['अहन्तिष्ठामि', 'अहम्', 'तिष्ठामि'],
            ['ग्रामङ्गच्छति', 'ग्रामम्', 'गच्छति'],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    },

    {
        sutra: '',
        descr: '',
        only: 'ext',
        tests: [
            ['', '', ''],
            ['', '', ''],
        ]
    },

]

// describe('consonant_sandhi', function() {
//     tests.forEach(function(t) {
//         if (t.sutra == '') return;
//         var descr = [t.sutra, t.descr].join(' - ');
//         describe(descr, function() {
//             t.tests.forEach(function(test, idx) {
//                 if (t.only) test.push(t.only);
//                 utils.test(test, idx);
//             });
//         });
//     });
// });

describe('consonant_sandhi', function () {
    tests.forEach(function (t) {
        if (t.sutra == '') return;
        var descr = [t.sutra, t.descr].join(' - ');
        var cut = false;
        if (t.first) cut = t.first;
        describe(descr, function () {
            t.tests.forEach(function (test, idx) {
                utils.test(test, idx, false);
            });
        });
    });
});
