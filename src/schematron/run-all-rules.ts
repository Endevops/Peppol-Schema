import type { PeppolDocument } from '#/document';
import type { SchematronRuleResult } from '#/schematron/types';

import { validateCenEn16931BrAe01 } from '#/schematron/cen/ae/cen-en16931-br-ae-01';
import { validateCenEn16931BrAe02 } from '#/schematron/cen/ae/cen-en16931-br-ae-02';
import { validateCenEn16931BrAe03 } from '#/schematron/cen/ae/cen-en16931-br-ae-03';
import { validateCenEn16931BrAe04 } from '#/schematron/cen/ae/cen-en16931-br-ae-04';
import { validateCenEn16931BrAe05 } from '#/schematron/cen/ae/cen-en16931-br-ae-05';
import { validateCenEn16931BrAe06 } from '#/schematron/cen/ae/cen-en16931-br-ae-06';
import { validateCenEn16931BrAe07 } from '#/schematron/cen/ae/cen-en16931-br-ae-07';
import { validateCenEn16931BrAe08 } from '#/schematron/cen/ae/cen-en16931-br-ae-08';
import { validateCenEn16931BrAe09 } from '#/schematron/cen/ae/cen-en16931-br-ae-09';
import { validateCenEn16931BrAe10 } from '#/schematron/cen/ae/cen-en16931-br-ae-10';
import { validateCenEn16931BrAf01 } from '#/schematron/cen/af/cen-en16931-br-af-01';
import { validateCenEn16931BrAf02 } from '#/schematron/cen/af/cen-en16931-br-af-02';
import { validateCenEn16931BrAf03 } from '#/schematron/cen/af/cen-en16931-br-af-03';
import { validateCenEn16931BrAf04 } from '#/schematron/cen/af/cen-en16931-br-af-04';
import { validateCenEn16931BrAf05 } from '#/schematron/cen/af/cen-en16931-br-af-05';
import { validateCenEn16931BrAf06 } from '#/schematron/cen/af/cen-en16931-br-af-06';
import { validateCenEn16931BrAf07 } from '#/schematron/cen/af/cen-en16931-br-af-07';
import { validateCenEn16931BrAf08 } from '#/schematron/cen/af/cen-en16931-br-af-08';
import { validateCenEn16931BrAf09 } from '#/schematron/cen/af/cen-en16931-br-af-09';
import { validateCenEn16931BrAf10 } from '#/schematron/cen/af/cen-en16931-br-af-10';
import { validateCenEn16931BrAg01 } from '#/schematron/cen/ag/cen-en16931-br-ag-01';
import { validateCenEn16931BrAg02 } from '#/schematron/cen/ag/cen-en16931-br-ag-02';
import { validateCenEn16931BrAg03 } from '#/schematron/cen/ag/cen-en16931-br-ag-03';
import { validateCenEn16931BrAg04 } from '#/schematron/cen/ag/cen-en16931-br-ag-04';
import { validateCenEn16931BrAg05 } from '#/schematron/cen/ag/cen-en16931-br-ag-05';
import { validateCenEn16931BrAg06 } from '#/schematron/cen/ag/cen-en16931-br-ag-06';
import { validateCenEn16931BrAg07 } from '#/schematron/cen/ag/cen-en16931-br-ag-07';
import { validateCenEn16931BrAg08 } from '#/schematron/cen/ag/cen-en16931-br-ag-08';
import { validateCenEn16931BrAg09 } from '#/schematron/cen/ag/cen-en16931-br-ag-09';
import { validateCenEn16931BrAg10 } from '#/schematron/cen/ag/cen-en16931-br-ag-10';
import { validateCenEn16931BrB01 } from '#/schematron/cen/b/cen-en16931-br-b-01';
import { validateCenEn16931BrB02 } from '#/schematron/cen/b/cen-en16931-br-b-02';
import { validateCenEn16931Br01 } from '#/schematron/cen/cen-en16931-br-01';
import { validateCenEn16931Br02 } from '#/schematron/cen/cen-en16931-br-02';
import { validateCenEn16931Br03 } from '#/schematron/cen/cen-en16931-br-03';
import { validateCenEn16931Br04 } from '#/schematron/cen/cen-en16931-br-04';
import { validateCenEn16931Br05 } from '#/schematron/cen/cen-en16931-br-05';
import { validateCenEn16931Br06 } from '#/schematron/cen/cen-en16931-br-06';
import { validateCenEn16931Br07 } from '#/schematron/cen/cen-en16931-br-07';
import { validateCenEn16931Br08 } from '#/schematron/cen/cen-en16931-br-08';
import { validateCenEn16931Br09 } from '#/schematron/cen/cen-en16931-br-09';
import { validateCenEn16931Br10 } from '#/schematron/cen/cen-en16931-br-10';
import { validateCenEn16931Br11 } from '#/schematron/cen/cen-en16931-br-11';
import { validateCenEn16931Br12 } from '#/schematron/cen/cen-en16931-br-12';
import { validateCenEn16931Br13 } from '#/schematron/cen/cen-en16931-br-13';
import { validateCenEn16931Br14 } from '#/schematron/cen/cen-en16931-br-14';
import { validateCenEn16931Br15 } from '#/schematron/cen/cen-en16931-br-15';
import { validateCenEn16931Br16 } from '#/schematron/cen/cen-en16931-br-16';
import { validateCenEn16931Br17 } from '#/schematron/cen/cen-en16931-br-17';
import { validateCenEn16931Br18 } from '#/schematron/cen/cen-en16931-br-18';
import { validateCenEn16931Br19 } from '#/schematron/cen/cen-en16931-br-19';
import { validateCenEn16931Br20 } from '#/schematron/cen/cen-en16931-br-20';
import { validateCenEn16931Br21 } from '#/schematron/cen/cen-en16931-br-21';
import { validateCenEn16931Br22 } from '#/schematron/cen/cen-en16931-br-22';
import { validateCenEn16931Br23 } from '#/schematron/cen/cen-en16931-br-23';
import { validateCenEn16931Br24 } from '#/schematron/cen/cen-en16931-br-24';
import { validateCenEn16931Br25 } from '#/schematron/cen/cen-en16931-br-25';
import { validateCenEn16931Br26 } from '#/schematron/cen/cen-en16931-br-26';
import { validateCenEn16931Br27 } from '#/schematron/cen/cen-en16931-br-27';
import { validateCenEn16931Br28 } from '#/schematron/cen/cen-en16931-br-28';
import { validateCenEn16931Br29 } from '#/schematron/cen/cen-en16931-br-29';
import { validateCenEn16931Br30 } from '#/schematron/cen/cen-en16931-br-30';
import { validateCenEn16931Br31 } from '#/schematron/cen/cen-en16931-br-31';
import { validateCenEn16931Br32 } from '#/schematron/cen/cen-en16931-br-32';
import { validateCenEn16931Br33 } from '#/schematron/cen/cen-en16931-br-33';
import { validateCenEn16931Br36 } from '#/schematron/cen/cen-en16931-br-36';
import { validateCenEn16931Br37 } from '#/schematron/cen/cen-en16931-br-37';
import { validateCenEn16931Br38 } from '#/schematron/cen/cen-en16931-br-38';
import { validateCenEn16931Br41 } from '#/schematron/cen/cen-en16931-br-41';
import { validateCenEn16931Br42 } from '#/schematron/cen/cen-en16931-br-42';
import { validateCenEn16931Br43 } from '#/schematron/cen/cen-en16931-br-43';
import { validateCenEn16931Br44 } from '#/schematron/cen/cen-en16931-br-44';
import { validateCenEn16931Br45 } from '#/schematron/cen/cen-en16931-br-45';
import { validateCenEn16931Br46 } from '#/schematron/cen/cen-en16931-br-46';
import { validateCenEn16931Br47 } from '#/schematron/cen/cen-en16931-br-47';
import { validateCenEn16931Br48 } from '#/schematron/cen/cen-en16931-br-48';
import { validateCenEn16931Br49 } from '#/schematron/cen/cen-en16931-br-49';
import { validateCenEn16931Br50 } from '#/schematron/cen/cen-en16931-br-50';
import { validateCenEn16931Br51 } from '#/schematron/cen/cen-en16931-br-51';
import { validateCenEn16931Br52 } from '#/schematron/cen/cen-en16931-br-52';
import { validateCenEn16931Br53 } from '#/schematron/cen/cen-en16931-br-53';
import { validateCenEn16931Br54 } from '#/schematron/cen/cen-en16931-br-54';
import { validateCenEn16931Br55 } from '#/schematron/cen/cen-en16931-br-55';
import { validateCenEn16931Br56 } from '#/schematron/cen/cen-en16931-br-56';
import { validateCenEn16931Br57 } from '#/schematron/cen/cen-en16931-br-57';
import { validateCenEn16931Br61 } from '#/schematron/cen/cen-en16931-br-61';
import { validateCenEn16931Br62 } from '#/schematron/cen/cen-en16931-br-62';
import { validateCenEn16931Br63 } from '#/schematron/cen/cen-en16931-br-63';
import { validateCenEn16931Br64 } from '#/schematron/cen/cen-en16931-br-64';
import { validateCenEn16931Br65 } from '#/schematron/cen/cen-en16931-br-65';
import { validateCenEn16931BrCl08 } from '#/schematron/cen/cl/cen-en16931-br-cl-08';
import { validateCenEn16931BrCo03 } from '#/schematron/cen/co/cen-en16931-br-co-03';
import { validateCenEn16931BrCo04 } from '#/schematron/cen/co/cen-en16931-br-co-04';
import { validateCenEn16931BrCo05 } from '#/schematron/cen/co/cen-en16931-br-co-05';
import { validateCenEn16931BrCo06 } from '#/schematron/cen/co/cen-en16931-br-co-06';
import { validateCenEn16931BrCo07 } from '#/schematron/cen/co/cen-en16931-br-co-07';
import { validateCenEn16931BrCo08 } from '#/schematron/cen/co/cen-en16931-br-co-08';
import { validateCenEn16931BrCo09 } from '#/schematron/cen/co/cen-en16931-br-co-09';
import { validateCenEn16931BrCo10 } from '#/schematron/cen/co/cen-en16931-br-co-10';
import { validateCenEn16931BrCo11 } from '#/schematron/cen/co/cen-en16931-br-co-11';
import { validateCenEn16931BrCo12 } from '#/schematron/cen/co/cen-en16931-br-co-12';
import { validateCenEn16931BrCo13 } from '#/schematron/cen/co/cen-en16931-br-co-13';
import { validateCenEn16931BrCo14 } from '#/schematron/cen/co/cen-en16931-br-co-14';
import { validateCenEn16931BrCo15 } from '#/schematron/cen/co/cen-en16931-br-co-15';
import { validateCenEn16931BrCo16 } from '#/schematron/cen/co/cen-en16931-br-co-16';
import { validateCenEn16931BrCo17 } from '#/schematron/cen/co/cen-en16931-br-co-17';
import { validateCenEn16931BrCo18 } from '#/schematron/cen/co/cen-en16931-br-co-18';
import { validateCenEn16931BrCo19 } from '#/schematron/cen/co/cen-en16931-br-co-19';
import { validateCenEn16931BrCo20 } from '#/schematron/cen/co/cen-en16931-br-co-20';
import { validateCenEn16931BrCo21 } from '#/schematron/cen/co/cen-en16931-br-co-21';
import { validateCenEn16931BrCo22 } from '#/schematron/cen/co/cen-en16931-br-co-22';
import { validateCenEn16931BrCo23 } from '#/schematron/cen/co/cen-en16931-br-co-23';
import { validateCenEn16931BrCo24 } from '#/schematron/cen/co/cen-en16931-br-co-24';
import { validateCenEn16931BrCo25 } from '#/schematron/cen/co/cen-en16931-br-co-25';
import { validateCenEn16931BrCo26 } from '#/schematron/cen/co/cen-en16931-br-co-26';
import { validateCenEn16931BrDec01 } from '#/schematron/cen/dec/cen-en16931-br-dec-01';
import { validateCenEn16931BrDec02 } from '#/schematron/cen/dec/cen-en16931-br-dec-02';
import { validateCenEn16931BrDec05 } from '#/schematron/cen/dec/cen-en16931-br-dec-05';
import { validateCenEn16931BrDec06 } from '#/schematron/cen/dec/cen-en16931-br-dec-06';
import { validateCenEn16931BrDec09 } from '#/schematron/cen/dec/cen-en16931-br-dec-09';
import { validateCenEn16931BrDec10 } from '#/schematron/cen/dec/cen-en16931-br-dec-10';
import { validateCenEn16931BrDec11 } from '#/schematron/cen/dec/cen-en16931-br-dec-11';
import { validateCenEn16931BrDec12 } from '#/schematron/cen/dec/cen-en16931-br-dec-12';
import { validateCenEn16931BrDec13 } from '#/schematron/cen/dec/cen-en16931-br-dec-13';
import { validateCenEn16931BrDec14 } from '#/schematron/cen/dec/cen-en16931-br-dec-14';
import { validateCenEn16931BrDec15 } from '#/schematron/cen/dec/cen-en16931-br-dec-15';
import { validateCenEn16931BrDec16 } from '#/schematron/cen/dec/cen-en16931-br-dec-16';
import { validateCenEn16931BrDec17 } from '#/schematron/cen/dec/cen-en16931-br-dec-17';
import { validateCenEn16931BrDec18 } from '#/schematron/cen/dec/cen-en16931-br-dec-18';
import { validateCenEn16931BrDec19 } from '#/schematron/cen/dec/cen-en16931-br-dec-19';
import { validateCenEn16931BrDec20 } from '#/schematron/cen/dec/cen-en16931-br-dec-20';
import { validateCenEn16931BrDec23 } from '#/schematron/cen/dec/cen-en16931-br-dec-23';
import { validateCenEn16931BrDec24 } from '#/schematron/cen/dec/cen-en16931-br-dec-24';
import { validateCenEn16931BrDec25 } from '#/schematron/cen/dec/cen-en16931-br-dec-25';
import { validateCenEn16931BrDec27 } from '#/schematron/cen/dec/cen-en16931-br-dec-27';
import { validateCenEn16931BrDec28 } from '#/schematron/cen/dec/cen-en16931-br-dec-28';
import { validateCenEn16931BrE01 } from '#/schematron/cen/e/cen-en16931-br-e-01';
import { validateCenEn16931BrE02 } from '#/schematron/cen/e/cen-en16931-br-e-02';
import { validateCenEn16931BrE03 } from '#/schematron/cen/e/cen-en16931-br-e-03';
import { validateCenEn16931BrE04 } from '#/schematron/cen/e/cen-en16931-br-e-04';
import { validateCenEn16931BrE05 } from '#/schematron/cen/e/cen-en16931-br-e-05';
import { validateCenEn16931BrE06 } from '#/schematron/cen/e/cen-en16931-br-e-06';
import { validateCenEn16931BrE07 } from '#/schematron/cen/e/cen-en16931-br-e-07';
import { validateCenEn16931BrE08 } from '#/schematron/cen/e/cen-en16931-br-e-08';
import { validateCenEn16931BrE09 } from '#/schematron/cen/e/cen-en16931-br-e-09';
import { validateCenEn16931BrE10 } from '#/schematron/cen/e/cen-en16931-br-e-10';
import { validateCenEn16931BrG01 } from '#/schematron/cen/g/cen-en16931-br-g-01';
import { validateCenEn16931BrG02 } from '#/schematron/cen/g/cen-en16931-br-g-02';
import { validateCenEn16931BrG03 } from '#/schematron/cen/g/cen-en16931-br-g-03';
import { validateCenEn16931BrG04 } from '#/schematron/cen/g/cen-en16931-br-g-04';
import { validateCenEn16931BrG05 } from '#/schematron/cen/g/cen-en16931-br-g-05';
import { validateCenEn16931BrG06 } from '#/schematron/cen/g/cen-en16931-br-g-06';
import { validateCenEn16931BrG07 } from '#/schematron/cen/g/cen-en16931-br-g-07';
import { validateCenEn16931BrG08 } from '#/schematron/cen/g/cen-en16931-br-g-08';
import { validateCenEn16931BrG09 } from '#/schematron/cen/g/cen-en16931-br-g-09';
import { validateCenEn16931BrG10 } from '#/schematron/cen/g/cen-en16931-br-g-10';
import { validateCenEn16931BrIc01 } from '#/schematron/cen/ic/cen-en16931-br-ic-01';
import { validateCenEn16931BrIc02 } from '#/schematron/cen/ic/cen-en16931-br-ic-02';
import { validateCenEn16931BrIc03 } from '#/schematron/cen/ic/cen-en16931-br-ic-03';
import { validateCenEn16931BrIc04 } from '#/schematron/cen/ic/cen-en16931-br-ic-04';
import { validateCenEn16931BrIc05 } from '#/schematron/cen/ic/cen-en16931-br-ic-05';
import { validateCenEn16931BrIc06 } from '#/schematron/cen/ic/cen-en16931-br-ic-06';
import { validateCenEn16931BrIc07 } from '#/schematron/cen/ic/cen-en16931-br-ic-07';
import { validateCenEn16931BrIc08 } from '#/schematron/cen/ic/cen-en16931-br-ic-08';
import { validateCenEn16931BrIc09 } from '#/schematron/cen/ic/cen-en16931-br-ic-09';
import { validateCenEn16931BrIc10 } from '#/schematron/cen/ic/cen-en16931-br-ic-10';
import { validateCenEn16931BrIc11 } from '#/schematron/cen/ic/cen-en16931-br-ic-11';
import { validateCenEn16931BrIc12 } from '#/schematron/cen/ic/cen-en16931-br-ic-12';
import { validateCenEn16931BrO01 } from '#/schematron/cen/o/cen-en16931-br-o-01';
import { validateCenEn16931BrO02 } from '#/schematron/cen/o/cen-en16931-br-o-02';
import { validateCenEn16931BrO03 } from '#/schematron/cen/o/cen-en16931-br-o-03';
import { validateCenEn16931BrO04 } from '#/schematron/cen/o/cen-en16931-br-o-04';
import { validateCenEn16931BrO05 } from '#/schematron/cen/o/cen-en16931-br-o-05';
import { validateCenEn16931BrO06 } from '#/schematron/cen/o/cen-en16931-br-o-06';
import { validateCenEn16931BrO07 } from '#/schematron/cen/o/cen-en16931-br-o-07';
import { validateCenEn16931BrO08 } from '#/schematron/cen/o/cen-en16931-br-o-08';
import { validateCenEn16931BrO09 } from '#/schematron/cen/o/cen-en16931-br-o-09';
import { validateCenEn16931BrO10 } from '#/schematron/cen/o/cen-en16931-br-o-10';
import { validateCenEn16931BrO11 } from '#/schematron/cen/o/cen-en16931-br-o-11';
import { validateCenEn16931BrO12 } from '#/schematron/cen/o/cen-en16931-br-o-12';
import { validateCenEn16931BrO13 } from '#/schematron/cen/o/cen-en16931-br-o-13';
import { validateCenEn16931BrO14 } from '#/schematron/cen/o/cen-en16931-br-o-14';
import { validateCenEn16931BrS01 } from '#/schematron/cen/s/cen-en16931-br-s-01';
import { validateCenEn16931BrS02 } from '#/schematron/cen/s/cen-en16931-br-s-02';
import { validateCenEn16931BrS03 } from '#/schematron/cen/s/cen-en16931-br-s-03';
import { validateCenEn16931BrS04 } from '#/schematron/cen/s/cen-en16931-br-s-04';
import { validateCenEn16931BrS05 } from '#/schematron/cen/s/cen-en16931-br-s-05';
import { validateCenEn16931BrS06 } from '#/schematron/cen/s/cen-en16931-br-s-06';
import { validateCenEn16931BrS07 } from '#/schematron/cen/s/cen-en16931-br-s-07';
import { validateCenEn16931BrS08 } from '#/schematron/cen/s/cen-en16931-br-s-08';
import { validateCenEn16931BrS09 } from '#/schematron/cen/s/cen-en16931-br-s-09';
import { validateCenEn16931BrS10 } from '#/schematron/cen/s/cen-en16931-br-s-10';
import { validateCenEn16931BrZ01 } from '#/schematron/cen/z/cen-en16931-br-z-01';
import { validateCenEn16931BrZ02 } from '#/schematron/cen/z/cen-en16931-br-z-02';
import { validateCenEn16931BrZ03 } from '#/schematron/cen/z/cen-en16931-br-z-03';
import { validateCenEn16931BrZ04 } from '#/schematron/cen/z/cen-en16931-br-z-04';
import { validateCenEn16931BrZ05 } from '#/schematron/cen/z/cen-en16931-br-z-05';
import { validateCenEn16931BrZ06 } from '#/schematron/cen/z/cen-en16931-br-z-06';
import { validateCenEn16931BrZ07 } from '#/schematron/cen/z/cen-en16931-br-z-07';
import { validateCenEn16931BrZ08 } from '#/schematron/cen/z/cen-en16931-br-z-08';
import { validateCenEn16931BrZ09 } from '#/schematron/cen/z/cen-en16931-br-z-09';
import { validateCenEn16931BrZ10 } from '#/schematron/cen/z/cen-en16931-br-z-10';
import { validateDeR001 } from '#/schematron/de/de-r-001';
import { validateDeR002 } from '#/schematron/de/de-r-002';
import { validateDeR003 } from '#/schematron/de/de-r-003';
import { validateDeR004 } from '#/schematron/de/de-r-004';
import { validateDeR005 } from '#/schematron/de/de-r-005';
import { validateDeR006 } from '#/schematron/de/de-r-006';
import { validateDeR007 } from '#/schematron/de/de-r-007';
import { validateDeR008 } from '#/schematron/de/de-r-008';
import { validateDeR009 } from '#/schematron/de/de-r-009';
import { validateDeR010 } from '#/schematron/de/de-r-010';
import { validateDeR011 } from '#/schematron/de/de-r-011';
import { validateDeR014 } from '#/schematron/de/de-r-014';
import { validateDeR015 } from '#/schematron/de/de-r-015';
import { validateDeR016 } from '#/schematron/de/de-r-016';
import { validateDeR017 } from '#/schematron/de/de-r-017';
import { validateDeR018 } from '#/schematron/de/de-r-018';
import { validateDeR019 } from '#/schematron/de/de-r-019';
import { validateDeR020 } from '#/schematron/de/de-r-020';
import { validateDeR022 } from '#/schematron/de/de-r-022';
import { validateDeR023_1 } from '#/schematron/de/de-r-023-1';
import { validateDeR023_2 } from '#/schematron/de/de-r-023-2';
import { validateDeR024_1 } from '#/schematron/de/de-r-024-1';
import { validateDeR024_2 } from '#/schematron/de/de-r-024-2';
import { validateDeR025_1 } from '#/schematron/de/de-r-025-1';
import { validateDeR025_2 } from '#/schematron/de/de-r-025-2';
import { validateDeR026 } from '#/schematron/de/de-r-026';
import { validateDeR027 } from '#/schematron/de/de-r-027';
import { validateDeR028 } from '#/schematron/de/de-r-028';
import { validateDeR030 } from '#/schematron/de/de-r-030';
import { validateDeR031 } from '#/schematron/de/de-r-031';
import { validateDkR002 } from '#/schematron/dk/dk-r-002';
import { validateDkR003 } from '#/schematron/dk/dk-r-003';
import { validateDkR004 } from '#/schematron/dk/dk-r-004';
import { validateDkR005 } from '#/schematron/dk/dk-r-005';
import { validateDkR006 } from '#/schematron/dk/dk-r-006';
import { validateDkR007 } from '#/schematron/dk/dk-r-007';
import { validateDkR008 } from '#/schematron/dk/dk-r-008';
import { validateDkR009 } from '#/schematron/dk/dk-r-009';
import { validateDkR010 } from '#/schematron/dk/dk-r-010';
import { validateDkR011 } from '#/schematron/dk/dk-r-011';
import { validateDkR013 } from '#/schematron/dk/dk-r-013';
import { validateDkR014 } from '#/schematron/dk/dk-r-014';
import { validateDkR016 } from '#/schematron/dk/dk-r-016';
import { validateDkR017 } from '#/schematron/dk/dk-r-017';
import { validateGrR001_1 } from '#/schematron/gr/gr-r-001-1';
import { validateGrR001_2 } from '#/schematron/gr/gr-r-001-2';
import { validateGrR001_3 } from '#/schematron/gr/gr-r-001-3';
import { validateGrR001_4 } from '#/schematron/gr/gr-r-001-4';
import { validateGrR001_5 } from '#/schematron/gr/gr-r-001-5';
import { validateGrR001_6 } from '#/schematron/gr/gr-r-001-6';
import { validateGrR001_7 } from '#/schematron/gr/gr-r-001-7';
import { validateGrR002 } from '#/schematron/gr/gr-r-002';
import { validateGrR003 } from '#/schematron/gr/gr-r-003';
import { validateGrR004_1 } from '#/schematron/gr/gr-r-004-1';
import { validateGrR004_2 } from '#/schematron/gr/gr-r-004-2';
import { validateGrR005 } from '#/schematron/gr/gr-r-005';
import { validateGrR006 } from '#/schematron/gr/gr-r-006';
import { validateGrR008_2 } from '#/schematron/gr/gr-r-008-2';
import { validateGrR008_3 } from '#/schematron/gr/gr-r-008-3';
import { validateGrR009 } from '#/schematron/gr/gr-r-009';
import { validateGrR010 } from '#/schematron/gr/gr-r-010';
import { validateGrS008_1 } from '#/schematron/gr/gr-s-008-1';
import { validateGrS011 } from '#/schematron/gr/gr-s-011';
import { validateIsR001 } from '#/schematron/is/is-r-001';
import { validateIsR002 } from '#/schematron/is/is-r-002';
import { validateIsR003 } from '#/schematron/is/is-r-003';
import { validateIsR004 } from '#/schematron/is/is-r-004';
import { validateIsR005 } from '#/schematron/is/is-r-005';
import { validateIsR006 } from '#/schematron/is/is-r-006';
import { validateIsR007 } from '#/schematron/is/is-r-007';
import { validateIsR008 } from '#/schematron/is/is-r-008';
import { validateIsR009 } from '#/schematron/is/is-r-009';
import { validateIsR010 } from '#/schematron/is/is-r-010';
import { validateItR001 } from '#/schematron/it/it-r-001';
import { validateItR002 } from '#/schematron/it/it-r-002';
import { validateItR003 } from '#/schematron/it/it-r-003';
import { validateItR004 } from '#/schematron/it/it-r-004';
import { validateNlR001 } from '#/schematron/nl/nl-r-001';
import { validateNlR002 } from '#/schematron/nl/nl-r-002';
import { validateNlR003 } from '#/schematron/nl/nl-r-003';
import { validateNlR004 } from '#/schematron/nl/nl-r-004';
import { validateNlR005 } from '#/schematron/nl/nl-r-005';
import { validateNlR006 } from '#/schematron/nl/nl-r-006';
import { validateNlR007 } from '#/schematron/nl/nl-r-007';
import { validateNlR008 } from '#/schematron/nl/nl-r-008';
import { validateNlR009 } from '#/schematron/nl/nl-r-009';
import { validateNoR001 } from '#/schematron/no/no-r-001';
import { validateNoR002 } from '#/schematron/no/no-r-002';
import { validatePeppolEn16931CL001 } from '#/schematron/peppol/cl/peppol-en16931-cl001';
import { validatePeppolEn16931CL002 } from '#/schematron/peppol/cl/peppol-en16931-cl002';
import { validatePeppolEn16931CL003 } from '#/schematron/peppol/cl/peppol-en16931-cl003';
import { validatePeppolEn16931CL006 } from '#/schematron/peppol/cl/peppol-en16931-cl006';
import { validatePeppolEn16931CL007 } from '#/schematron/peppol/cl/peppol-en16931-cl007';
import { validatePeppolEn16931CL008 } from '#/schematron/peppol/cl/peppol-en16931-cl008';
import { validatePeppolCommonR040 } from '#/schematron/peppol/common/peppol-common-r040';
import { validatePeppolCommonR041 } from '#/schematron/peppol/common/peppol-common-r041';
import { validatePeppolCommonR042 } from '#/schematron/peppol/common/peppol-common-r042';
import { validatePeppolCommonR043 } from '#/schematron/peppol/common/peppol-common-r043';
import { validatePeppolCommonR044 } from '#/schematron/peppol/common/peppol-common-r044';
import { validatePeppolCommonR045 } from '#/schematron/peppol/common/peppol-common-r045';
import { validatePeppolCommonR046 } from '#/schematron/peppol/common/peppol-common-r046';
import { validatePeppolCommonR047 } from '#/schematron/peppol/common/peppol-common-r047';
import { validatePeppolCommonR049 } from '#/schematron/peppol/common/peppol-common-r049';
import { validatePeppolCommonR050 } from '#/schematron/peppol/common/peppol-common-r050';
import { validatePeppolCommonR052 } from '#/schematron/peppol/common/peppol-common-r052';
import { validatePeppolCommonR053 } from '#/schematron/peppol/common/peppol-common-r053';
import { validatePeppolEn16931F001 } from '#/schematron/peppol/f/peppol-en16931-f001';
import { validatePeppolEn16931P0100 } from '#/schematron/peppol/p/peppol-en16931-p0100';
import { validatePeppolEn16931P0101 } from '#/schematron/peppol/p/peppol-en16931-p0101';
import { validatePeppolEn16931P0104 } from '#/schematron/peppol/p/peppol-en16931-p0104';
import { validatePeppolEn16931P0105 } from '#/schematron/peppol/p/peppol-en16931-p0105';
import { validatePeppolEn16931P0106 } from '#/schematron/peppol/p/peppol-en16931-p0106';
import { validatePeppolEn16931P0107 } from '#/schematron/peppol/p/peppol-en16931-p0107';
import { validatePeppolEn16931P0108 } from '#/schematron/peppol/p/peppol-en16931-p0108';
import { validatePeppolEn16931P0109 } from '#/schematron/peppol/p/peppol-en16931-p0109';
import { validatePeppolEn16931P0110 } from '#/schematron/peppol/p/peppol-en16931-p0110';
import { validatePeppolEn16931P0111 } from '#/schematron/peppol/p/peppol-en16931-p0111';
import { validatePeppolEn16931P0112 } from '#/schematron/peppol/p/peppol-en16931-p0112';
import { validatePeppolEn16931R001 } from '#/schematron/peppol/r/peppol-en16931-r001';
import { validatePeppolEn16931R002 } from '#/schematron/peppol/r/peppol-en16931-r002';
import { validatePeppolEn16931R003 } from '#/schematron/peppol/r/peppol-en16931-r003';
import { validatePeppolEn16931R004 } from '#/schematron/peppol/r/peppol-en16931-r004';
import { validatePeppolEn16931R005 } from '#/schematron/peppol/r/peppol-en16931-r005';
import { validatePeppolEn16931R007 } from '#/schematron/peppol/r/peppol-en16931-r007';
import { validatePeppolEn16931R008 } from '#/schematron/peppol/r/peppol-en16931-r008';
import { validatePeppolEn16931R010 } from '#/schematron/peppol/r/peppol-en16931-r010';
import { validatePeppolEn16931R020 } from '#/schematron/peppol/r/peppol-en16931-r020';
import { validatePeppolEn16931R040 } from '#/schematron/peppol/r/peppol-en16931-r040';
import { validatePeppolEn16931R041 } from '#/schematron/peppol/r/peppol-en16931-r041';
import { validatePeppolEn16931R042 } from '#/schematron/peppol/r/peppol-en16931-r042';
import { validatePeppolEn16931R043 } from '#/schematron/peppol/r/peppol-en16931-r043';
import { validatePeppolEn16931R044 } from '#/schematron/peppol/r/peppol-en16931-r044';
import { validatePeppolEn16931R046 } from '#/schematron/peppol/r/peppol-en16931-r046';
import { validatePeppolEn16931R051 } from '#/schematron/peppol/r/peppol-en16931-r051';
import { validatePeppolEn16931R053 } from '#/schematron/peppol/r/peppol-en16931-r053';
import { validatePeppolEn16931R054 } from '#/schematron/peppol/r/peppol-en16931-r054';
import { validatePeppolEn16931R055 } from '#/schematron/peppol/r/peppol-en16931-r055';
import { validatePeppolEn16931R061 } from '#/schematron/peppol/r/peppol-en16931-r061';
import { validatePeppolEn16931R100 } from '#/schematron/peppol/r/peppol-en16931-r100';
import { validatePeppolEn16931R101 } from '#/schematron/peppol/r/peppol-en16931-r101';
import { validatePeppolEn16931R110 } from '#/schematron/peppol/r/peppol-en16931-r110';
import { validatePeppolEn16931R111 } from '#/schematron/peppol/r/peppol-en16931-r111';
import { validatePeppolEn16931R120 } from '#/schematron/peppol/r/peppol-en16931-r120';
import { validatePeppolEn16931R121 } from '#/schematron/peppol/r/peppol-en16931-r121';
import { validatePeppolEn16931R130 } from '#/schematron/peppol/r/peppol-en16931-r130';
import { validateSeR001 } from '#/schematron/se/se-r-001';
import { validateSeR002 } from '#/schematron/se/se-r-002';
import { validateSeR003 } from '#/schematron/se/se-r-003';
import { validateSeR004 } from '#/schematron/se/se-r-004';
import { validateSeR005 } from '#/schematron/se/se-r-005';
import { validateSeR006 } from '#/schematron/se/se-r-006';
import { validateSeR007 } from '#/schematron/se/se-r-007';
import { validateSeR008 } from '#/schematron/se/se-r-008';
import { validateSeR009 } from '#/schematron/se/se-r-009';
import { validateSeR010 } from '#/schematron/se/se-r-010';
import { validateSeR011 } from '#/schematron/se/se-r-011';
import { validateSeR012 } from '#/schematron/se/se-r-012';
import { validateSeR013 } from '#/schematron/se/se-r-013';

const ruleValidators: Array<(document: PeppolDocument) => SchematronRuleResult> = [
  validateCenEn16931BrAe01,
  validateCenEn16931BrAe02,
  validateCenEn16931BrAe03,
  validateCenEn16931BrAe04,
  validateCenEn16931BrAe05,
  validateCenEn16931BrAe06,
  validateCenEn16931BrAe07,
  validateCenEn16931BrAe08,
  validateCenEn16931BrAe09,
  validateCenEn16931BrAe10,
  validateCenEn16931BrAf01,
  validateCenEn16931BrAf02,
  validateCenEn16931BrAf03,
  validateCenEn16931BrAf04,
  validateCenEn16931BrAf05,
  validateCenEn16931BrAf06,
  validateCenEn16931BrAf07,
  validateCenEn16931BrAf08,
  validateCenEn16931BrAf09,
  validateCenEn16931BrAf10,
  validateCenEn16931BrAg01,
  validateCenEn16931BrAg02,
  validateCenEn16931BrAg03,
  validateCenEn16931BrAg04,
  validateCenEn16931BrAg05,
  validateCenEn16931BrAg06,
  validateCenEn16931BrAg07,
  validateCenEn16931BrAg08,
  validateCenEn16931BrAg09,
  validateCenEn16931BrAg10,
  validateCenEn16931BrB01,
  validateCenEn16931BrB02,
  validateCenEn16931Br01,
  validateCenEn16931Br02,
  validateCenEn16931Br03,
  validateCenEn16931Br04,
  validateCenEn16931Br05,
  validateCenEn16931Br06,
  validateCenEn16931Br07,
  validateCenEn16931Br08,
  validateCenEn16931Br09,
  validateCenEn16931Br10,
  validateCenEn16931Br11,
  validateCenEn16931Br12,
  validateCenEn16931Br13,
  validateCenEn16931Br14,
  validateCenEn16931Br15,
  validateCenEn16931Br16,
  validateCenEn16931Br17,
  validateCenEn16931Br18,
  validateCenEn16931Br19,
  validateCenEn16931Br20,
  validateCenEn16931Br21,
  validateCenEn16931Br22,
  validateCenEn16931Br23,
  validateCenEn16931Br24,
  validateCenEn16931Br25,
  validateCenEn16931Br26,
  validateCenEn16931Br27,
  validateCenEn16931Br28,
  validateCenEn16931Br29,
  validateCenEn16931Br30,
  validateCenEn16931Br31,
  validateCenEn16931Br32,
  validateCenEn16931Br33,
  validateCenEn16931Br36,
  validateCenEn16931Br37,
  validateCenEn16931Br38,
  validateCenEn16931Br41,
  validateCenEn16931Br42,
  validateCenEn16931Br43,
  validateCenEn16931Br44,
  validateCenEn16931Br45,
  validateCenEn16931Br46,
  validateCenEn16931Br47,
  validateCenEn16931Br48,
  validateCenEn16931Br49,
  validateCenEn16931Br50,
  validateCenEn16931Br51,
  validateCenEn16931Br52,
  validateCenEn16931Br53,
  validateCenEn16931Br54,
  validateCenEn16931Br55,
  validateCenEn16931Br56,
  validateCenEn16931Br57,
  validateCenEn16931Br61,
  validateCenEn16931Br62,
  validateCenEn16931Br63,
  validateCenEn16931Br64,
  validateCenEn16931Br65,
  validateCenEn16931BrCl08,
  validateCenEn16931BrCo03,
  validateCenEn16931BrCo04,
  validateCenEn16931BrCo05,
  validateCenEn16931BrCo06,
  validateCenEn16931BrCo07,
  validateCenEn16931BrCo08,
  validateCenEn16931BrCo09,
  validateCenEn16931BrCo10,
  validateCenEn16931BrCo11,
  validateCenEn16931BrCo12,
  validateCenEn16931BrCo13,
  validateCenEn16931BrCo14,
  validateCenEn16931BrCo15,
  validateCenEn16931BrCo16,
  validateCenEn16931BrCo17,
  validateCenEn16931BrCo18,
  validateCenEn16931BrCo19,
  validateCenEn16931BrCo20,
  validateCenEn16931BrCo21,
  validateCenEn16931BrCo22,
  validateCenEn16931BrCo23,
  validateCenEn16931BrCo24,
  validateCenEn16931BrCo25,
  validateCenEn16931BrCo26,
  validateCenEn16931BrDec01,
  validateCenEn16931BrDec02,
  validateCenEn16931BrDec05,
  validateCenEn16931BrDec06,
  validateCenEn16931BrDec09,
  validateCenEn16931BrDec10,
  validateCenEn16931BrDec11,
  validateCenEn16931BrDec12,
  validateCenEn16931BrDec13,
  validateCenEn16931BrDec14,
  validateCenEn16931BrDec15,
  validateCenEn16931BrDec16,
  validateCenEn16931BrDec17,
  validateCenEn16931BrDec18,
  validateCenEn16931BrDec19,
  validateCenEn16931BrDec20,
  validateCenEn16931BrDec23,
  validateCenEn16931BrDec24,
  validateCenEn16931BrDec25,
  validateCenEn16931BrDec27,
  validateCenEn16931BrDec28,
  validateCenEn16931BrE01,
  validateCenEn16931BrE02,
  validateCenEn16931BrE03,
  validateCenEn16931BrE04,
  validateCenEn16931BrE05,
  validateCenEn16931BrE06,
  validateCenEn16931BrE07,
  validateCenEn16931BrE08,
  validateCenEn16931BrE09,
  validateCenEn16931BrE10,
  validateCenEn16931BrG01,
  validateCenEn16931BrG02,
  validateCenEn16931BrG03,
  validateCenEn16931BrG04,
  validateCenEn16931BrG05,
  validateCenEn16931BrG06,
  validateCenEn16931BrG07,
  validateCenEn16931BrG08,
  validateCenEn16931BrG09,
  validateCenEn16931BrG10,
  validateCenEn16931BrIc01,
  validateCenEn16931BrIc02,
  validateCenEn16931BrIc03,
  validateCenEn16931BrIc04,
  validateCenEn16931BrIc05,
  validateCenEn16931BrIc06,
  validateCenEn16931BrIc07,
  validateCenEn16931BrIc08,
  validateCenEn16931BrIc09,
  validateCenEn16931BrIc10,
  validateCenEn16931BrIc11,
  validateCenEn16931BrIc12,
  validateCenEn16931BrO01,
  validateCenEn16931BrO02,
  validateCenEn16931BrO03,
  validateCenEn16931BrO04,
  validateCenEn16931BrO05,
  validateCenEn16931BrO06,
  validateCenEn16931BrO07,
  validateCenEn16931BrO08,
  validateCenEn16931BrO09,
  validateCenEn16931BrO10,
  validateCenEn16931BrO11,
  validateCenEn16931BrO12,
  validateCenEn16931BrO13,
  validateCenEn16931BrO14,
  validateCenEn16931BrS01,
  validateCenEn16931BrS02,
  validateCenEn16931BrS03,
  validateCenEn16931BrS04,
  validateCenEn16931BrS05,
  validateCenEn16931BrS06,
  validateCenEn16931BrS07,
  validateCenEn16931BrS08,
  validateCenEn16931BrS09,
  validateCenEn16931BrS10,
  validateCenEn16931BrZ01,
  validateCenEn16931BrZ02,
  validateCenEn16931BrZ03,
  validateCenEn16931BrZ04,
  validateCenEn16931BrZ05,
  validateCenEn16931BrZ06,
  validateCenEn16931BrZ07,
  validateCenEn16931BrZ08,
  validateCenEn16931BrZ09,
  validateCenEn16931BrZ10,
  validateDeR001,
  validateDeR002,
  validateDeR003,
  validateDeR004,
  validateDeR005,
  validateDeR006,
  validateDeR007,
  validateDeR008,
  validateDeR009,
  validateDeR010,
  validateDeR011,
  validateDeR014,
  validateDeR015,
  validateDeR016,
  validateDeR017,
  validateDeR018,
  validateDeR019,
  validateDeR020,
  validateDeR022,
  validateDeR023_1,
  validateDeR023_2,
  validateDeR024_1,
  validateDeR024_2,
  validateDeR025_1,
  validateDeR025_2,
  validateDeR026,
  validateDeR027,
  validateDeR028,
  validateDeR030,
  validateDeR031,
  validateDkR002,
  validateDkR003,
  validateDkR004,
  validateDkR005,
  validateDkR006,
  validateDkR007,
  validateDkR008,
  validateDkR009,
  validateDkR010,
  validateDkR011,
  validateDkR013,
  validateDkR014,
  validateDkR016,
  validateDkR017,
  validateGrR001_1,
  validateGrR001_2,
  validateGrR001_3,
  validateGrR001_4,
  validateGrR001_5,
  validateGrR001_6,
  validateGrR001_7,
  validateGrR002,
  validateGrR003,
  validateGrR004_1,
  validateGrR004_2,
  validateGrR005,
  validateGrR006,
  validateGrR008_2,
  validateGrR008_3,
  validateGrR009,
  validateGrR010,
  validateGrS008_1,
  validateGrS011,
  validateIsR001,
  validateIsR002,
  validateIsR003,
  validateIsR004,
  validateIsR005,
  validateIsR006,
  validateIsR007,
  validateIsR008,
  validateIsR009,
  validateIsR010,
  validateItR001,
  validateItR002,
  validateItR003,
  validateItR004,
  validateNlR001,
  validateNlR002,
  validateNlR003,
  validateNlR004,
  validateNlR005,
  validateNlR006,
  validateNlR007,
  validateNlR008,
  validateNlR009,
  validateNoR001,
  validateNoR002,
  validatePeppolEn16931CL001,
  validatePeppolEn16931CL002,
  validatePeppolEn16931CL003,
  validatePeppolEn16931CL006,
  validatePeppolEn16931CL007,
  validatePeppolEn16931CL008,
  validatePeppolCommonR040,
  validatePeppolCommonR041,
  validatePeppolCommonR042,
  validatePeppolCommonR043,
  validatePeppolCommonR044,
  validatePeppolCommonR045,
  validatePeppolCommonR046,
  validatePeppolCommonR047,
  validatePeppolCommonR049,
  validatePeppolCommonR050,
  validatePeppolCommonR052,
  validatePeppolCommonR053,
  validatePeppolEn16931F001,
  validatePeppolEn16931P0100,
  validatePeppolEn16931P0101,
  validatePeppolEn16931P0104,
  validatePeppolEn16931P0105,
  validatePeppolEn16931P0106,
  validatePeppolEn16931P0107,
  validatePeppolEn16931P0108,
  validatePeppolEn16931P0109,
  validatePeppolEn16931P0110,
  validatePeppolEn16931P0111,
  validatePeppolEn16931P0112,
  validatePeppolEn16931R001,
  validatePeppolEn16931R002,
  validatePeppolEn16931R003,
  validatePeppolEn16931R004,
  validatePeppolEn16931R005,
  validatePeppolEn16931R007,
  validatePeppolEn16931R008,
  validatePeppolEn16931R010,
  validatePeppolEn16931R020,
  validatePeppolEn16931R040,
  validatePeppolEn16931R041,
  validatePeppolEn16931R042,
  validatePeppolEn16931R043,
  validatePeppolEn16931R044,
  validatePeppolEn16931R046,
  validatePeppolEn16931R051,
  validatePeppolEn16931R053,
  validatePeppolEn16931R054,
  validatePeppolEn16931R055,
  validatePeppolEn16931R061,
  validatePeppolEn16931R100,
  validatePeppolEn16931R101,
  validatePeppolEn16931R110,
  validatePeppolEn16931R111,
  validatePeppolEn16931R120,
  validatePeppolEn16931R121,
  validatePeppolEn16931R130,
  validateSeR001,
  validateSeR002,
  validateSeR003,
  validateSeR004,
  validateSeR005,
  validateSeR006,
  validateSeR007,
  validateSeR008,
  validateSeR009,
  validateSeR010,
  validateSeR011,
  validateSeR012,
  validateSeR013,
];

export function runAllRules(document: PeppolDocument): Array<SchematronRuleResult> {
  return ruleValidators.map(validate => validate(document));
}
