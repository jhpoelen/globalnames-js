test = require('tape');
taxon = require('../../');

test('get page id for Homo sapiens and Enhydra lutris', function(t) {
  t.plan(1);
  var ids = taxon.eolPageIdsFor(['Homo sapiens', 'Enhydra lutris'], function(pageIds) {
    t.deepEquals(pageIds, ['327955', '328583']);
  });
});

test('get page id for Homo sapiens', function (t) {
    t.plan(1);
    var testCallback = function(pageIds) {
      t.deepEquals(pageIds, ['327955']);
    };
    var names = ['Homo sapiens'];
    taxon.eolPageIdsFor(names, testCallback);
});

test('get page id for Homo sapiens', function (t) {
    t.plan(1);
    var testCallback = function(pageIds) {
      t.deepEquals(pageIds, []);
    };
    var names = ['Homo sapiensz'];
    taxon.eolPageIdsFor(names, testCallback);
});

test('get a thousand and one names', function(t) {
  t.plan(1);
  var names = ['Homo sapiens', 'Ariopsis felis'];
  for (var i=0; i< 1001; i++) {
    names = names.concat(['Testo namis' + i]);
  }
  var testCallback = function(pageIds) {
    t.ok(pageIds > 0);
  };
  taxon.eolPageIdsFor(names, testCallback);
});

test('get a bunch of names', function (t) {
  t.plan(1);
  var names = ["Dendroica striata","Bombycilla cedrorum","Piranga olivacea","Pooecetes gramineus","Tachycineta bicolor","Charadrius melodus","Chaetura pelagica","Botaurus lentiginosus","Spizella arborea","Spizella passerina","Zonotrichia albicollis","Dendroica mataxonolia","Tyrannus tyrannus","Ammodramus savannarum","Porzana carolina","Dumetella carolinensis","Pinicola enucleator","Ammodramus henslowii","Sterna paradisaea","Sayornis phoebe","Junco hyemalis","Contopus virens","Bartramia longicauda","Wilsonia canadensis","Coccyzus erythropthalmus","Seiurus noveboracensis","Dolichonyx oryzivorus","Mniotilta varia","Tringa melanoleuca","Tringa flavipes","Dendroica fusca","Pipilo erythrophthalmus","Passerina cyanea","Pheucticus ludovicianus","Calidris maritima","Melospiza georgiana","Empidonax flaviventris","Hylocichla mustelina","Zonotrichia leucophrys","Plectrophenax nivalis","Limosa haemastica","Somateria mollissima","Myiarchus crinitus","Dendroica coronata","Calidris pusilla","Anas discors","Geothlypis trichas","Spizella pusilla","Bucephala clangula","Falco peregrinus","Accipiter cooperii","Larus argentatus","Alca torda","Clangula hyemalis","Bucephala islandica","Bucephala albeola","Aythya collaris","Aythya affinis","Colaptes auratus","Vireo philadelphicus","Vermivora peregrina","Eremophila alpestris","Stercorarius parasiticus","Alle alle","Chordeiles minor","Melanerpes erythrocephalus","Sitta carolinensis","Dendroica tigrina","Dendroica pinus","Passerculus sandwichensis","Scolopax minor","Calidris himantopus","Calidris fuscicollis","Pluvialis squatarola","Uria lomvia","Mergus serrator","Aythya americana","Podilymbus podiceps","Sphyrapicus varius","Phaethon aethereus","Catharus fuscescens","Sturnus vulgaris","Passer domesticus","Seiurus motacilla","Catharus guttatus","Lanius excubitor","Quiscalus quiscula","Agelaius phoeniceus","Serinus canaria","Loxia leucoptera","Coccothraustes vespertinus","Carpodacus purpureus","Carpodacus mexicanus","Carduelis spinus","Passerella iliaca","Melospiza melodia","Chondestes grammacus","Calcarius lapponicus","Ammodramus maritimus","Corvus monedula","Corvus brachyrhynchos","Colinus virginianus","Falco columbarius","Circus cyaneus","Buteo swainsoni","Accipiter gentilis","Zenaida macroura","Limosa haemastica","Nycticorax nycticorax","Tryngites subruficollis","Scolopax minor","Philomachus putaxonax","Phalaropus lobatus","Limosa fedoa","Calidris melanotos","Calidris alba","Sterna forsteri","Haematopus ostralegus","Pluvialis dominica","Charadrius semipalmatus","Chroicocephalus philadelphia","Charadrius semipalmatus","Caprimulgus carolinensis","Oxyura jamaicensis","Dendrocytaxona bicolor","Anas rubripes","Anas platyrhynchos","Anas crecca","Anas americana","Anas acuta","Accipiter cooperii"];
  taxon.eolPageIdsFor(names, function(ids) { 
    t.ok(ids.length > 0); 
  });
});
