import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import ModelCard from '../src/components/ModelCard';
import TechnicalSheet from '../src/components/TechnicalSheet';
import { getAllSheets, getSheet } from '../src/data/technical';
import sitemap from '../src/app/sitemap';
import { resolveEfficiency } from '../src/lib/efficiency';
import { isCombustion, isElectrified } from '../src/lib/efficiency';
import { accreditedVehicleModelDate, vehicleJsonLd } from '../src/lib/json-ld';
import {
  brandSlug,
  filterModels,
  getAllModels,
  getBrandNames,
  getModelBySlugs,
  modelPath,
  modelSlug,
  sortModels,
} from '../src/lib/models';
import { publicPrices, publicSurfaceText, publicTransmission } from '../src/lib/technical/editorial';
import { legacyRedirects } from '../src/lib/technical/redirects';
import { coverageCounts } from '../src/lib/technical/coverage';
import type { CarModel } from '../src/lib/models';

const INVENTARIO = [
  'chery/tiggo-2-pro',
  'chery/tiggo-4-pro',
  'chery/tiggo-8-pro',
  'geely/emgrand-gs',
  'geely/emgrand-x7-sport',
  'dfsk/c31',
  'dfsk/c32-doble-cabina',
  'dfsk/c35-cargo-van',
  'dfsk/glory-500',
  'jac/s2',
  'jac/t8',
  'jac/x200',
  'haval/h6',
  'haval/h6-hev',
  'haval/h6gt',
  'haval/jolion',
  'ora/ora-3-good-cat',
  'haval/jolion-pro-hev',
  'baic/x55-ii',
  'baic/x55-plus',
  'baic/bj30',
  'baic/bj40',
  'baic/bj60',
  'baic/eu5',
  'baic/u5-plus',
  'baic/x35',
  'foton/aumark-tm1-cabina-doble',
  'foton/aumark-tm1-cabina-simple',
  'foton/gratour-t3-cabina-doble',
  'foton/gratour-t3-cabina-simple',
  'foton/tunland-g7',
  'foton/v9',
  'foton/view-cs2',
  'foton/wonder',
  'foton/wonder-cabina-doble',
  'great-wall/poer-luxury',
  'great-wall/poer-elite',
  'great-wall/wingle-7',
  'changan/md201-cargo-box',
  'changan/m201-cargo-van',
  'changan/md201-pickup',
  'mg/new-mg-3',
  'mg/new-mg-zs',
  'mg/mg-4',
  'mg/mg-cyberster',
  'faw/actis-box',
  'faw/actis-truck',
  'faw/t33',
  'dongfeng/captain-w-310',
  'dongfeng/captain-w-412',
  'dongfeng/captain-c-615',
  'dongfeng/captain-c-815',
  'dongfeng/captain-c-1016',
  'dongfeng/captain-c-1217',
  'dongfeng/captain-d',
  'dongfeng/van-312',
  'dongfeng/van-312l-cargo',
  'dongfeng/van-312l-bus',
  'dongfeng/u-van-414-cargo',
  'dongfeng/u-van-414-bus',
  'byd/song-pro-dm-i',
  'byd/dolphin-mini',
  'byd/yuan-pro',
  'lifan/x70',
  'lifan/myway',
  'kyc/mamut',
];

function byId(id: string): CarModel {
  const model = getAllModels().find((item) => item.id === id);
  assert.ok(model, id);
  return model;
}

function ficha(model: CarModel): string {
  return [
    model.brand,
    model.nombre,
    model.descripcion,
    model.precio,
    model.combustible,
    model.transmision,
    model.categoria,
    ...Object.values(model.especificaciones),
    ...model.caracteristicas,
  ].join('\n');
}

describe('catálogo y rutas', () => {
  it('conserva 66 modelos y las rutas, con redirects de marca o nombre', () => {
    const models = getAllModels();
    assert.equal(models.length, 66);
    assert.equal(new Set(models.map((model) => model.id)).size, 66);
    assert.deepEqual(getBrandNames().sort(), [...getBrandNames()].sort());
    assert.equal(getBrandNames().length, 16);
    const paths = models.map((model) => modelPath(model).replace('/marcas/', '')).sort();
    assert.deepEqual(paths, [...INVENTARIO].sort());
    assert.equal(getModelBySlugs('haval', 'ora-3-good-cat'), null);
    assert.equal(getModelBySlugs('lifan', 'mamut'), null);
    assert.equal(getModelBySlugs('changan', 'md201-cargo-van'), null);
    assert.ok(getModelBySlugs('ora', 'ora-3-good-cat'));
    assert.ok(getModelBySlugs('kyc', 'mamut'));
    assert.ok(getModelBySlugs('changan', 'm201-cargo-van'));
  });

  it('mantiene filtros, sitemap y orden de precios sin convertir monedas', () => {
    const models = getAllModels();
    assert.equal(filterModels(models, { marca: 'Chery' }).length, 3);
    assert.equal(filterModels(models, { marca: 'Dongfeng' }).length, 12);
    assert.equal(filterModels(models, { marca: 'ORA' }).length, 1);
    assert.equal(filterModels(models, { combustible: 'Híbrido (HEV)' }).some((m) => m.id === 'baic-bj30-2025'), true);

    const urls = sitemap().map((item) => item.url);
    assert.ok(urls.some((url) => url.endsWith('/marcas/ora/ora-3-good-cat')));
    assert.ok(urls.some((url) => url.endsWith('/marcas/kyc/mamut')));
    assert.ok(urls.some((url) => url.endsWith('/marcas/changan/m201-cargo-van')));
    assert.equal(urls.some((url) => url.includes('/marcas/haval/ora-3-good-cat')), false);
    assert.equal(urls.some((url) => url.includes('/marcas/lifan/mamut')), false);
    assert.equal(models.filter((model) => urls.some((url) => url.endsWith(modelPath(model)))).length, 66);

    const sorted = sortModels(models, 'precio');
    const priced = sorted.filter((model) => model.precioOrden);
    assert.equal(priced[0]?.id, 'chery-tiggo-2-pro-2025');
    assert.equal(priced.at(-1)?.precioOrden?.moneda, 'USD');
    assert.equal(sorted.at(-1)?.precioOrden, null);
    assert.ok(legacyRedirects.some((item) => item.destination === '/marcas/ora/ora-3-good-cat'));
    assert.ok(legacyRedirects.some((item) => item.source === '/marcas/changan/md201-cargo-van'));
    assert.ok(legacyRedirects.some((item) => item.source === '/marcas/lifan/mamut'));
  });
});

describe('correcciones críticas', () => {
  it('retira identidades ambiguas sin convertirlas en otro modelo', () => {
    const v9 = ficha(byId('foton-v9-2025'));
    assert.equal(byId('foton-v9-2025').combustible, '');
    assert.equal(getSheet('foton-v9-2025')?.public.combustible, 'Sin confirmar');
    assert.doesNotMatch(v9, /Sin confirmar/);
    assert.doesNotMatch(v9, /15 pasajeros|150 HP|Tunland|mild hybrid/i);
    assert.match(getSheet('foton-v9-2025')?.public.aviso || '', /Tunland V9/);
    assert.equal(byId('foton-v9-2025').fichaCobertura, 'retiro');

    const captain = ficha(byId('dongfeng-captain-d-2025'));
    assert.doesNotMatch(captain, /102 HP|2\.2|296 HP|6\.7|Cummins/);
    assert.match(getSheet('dongfeng-captain-d-2025')?.public.aviso || '', /D1830/);
    assert.equal(getSheet('dongfeng-captain-d-2025')?.secciones.length, 0);

    const mamut = byId('lifan-mamut-2025');
    assert.equal(mamut.brand, 'KYC');
    assert.equal(brandSlug(mamut.brand), 'kyc');
    assert.match(ficha(mamut), /108 CV/);
    assert.equal(mamut.combustible, 'Nafta');
    assert.doesNotMatch(ficha(mamut), /190|4x4|Diésel|diésel/);
  });

  it('corrige motorizaciones, batería, marca y denominaciones', () => {
    assert.match(ficha(byId('dongfeng-captain-w310-2025')), /Wuling 1\.3/);
    assert.match(ficha(byId('dongfeng-captain-w310-2025')), /90 HP/);
    assert.equal(byId('dongfeng-captain-w310-2025').combustible, 'Nafta');
    assert.match(ficha(byId('dongfeng-captain-w412-2025')), /1\.6/);
    assert.match(ficha(byId('dongfeng-captain-w412-2025')), /122 HP/);
    assert.doesNotMatch(ficha(byId('dongfeng-captain-w412-2025')), /3\.0/);

    assert.match(ficha(byId('dongfeng-captain-c615-2025')), /Nissan/);
    assert.match(ficha(byId('dongfeng-captain-c615-2025')), /148 HP/);
    assert.doesNotMatch(ficha(byId('dongfeng-captain-c615-2025')), /160 HP|3\.8/);
    assert.match(ficha(byId('dongfeng-captain-c815-2025')), /148 HP/);
    assert.doesNotMatch(ficha(byId('dongfeng-captain-c815-2025')), /180 HP|4\.0/);
    assert.match(ficha(byId('dongfeng-captain-c1016-2025')), /Cummins ISF 3\.8/);
    assert.match(ficha(byId('dongfeng-captain-c1016-2025')), /154 HP/);
    assert.doesNotMatch(ficha(byId('dongfeng-captain-c1016-2025')), /220 HP|5\.9/);
    assert.match(ficha(byId('dongfeng-captain-c1217-2025')), /168 HP/);
    assert.doesNotMatch(ficha(byId('dongfeng-captain-c1217-2025')), /240 HP|6\.7|6x2/);

    const bj30 = byId('baic-bj30-2025');
    assert.equal(bj30.combustible, 'Híbrido (HEV)');
    assert.match(bj30.transmision, /DHT/);
    assert.match(ficha(bj30), /404 HP/);
    assert.doesNotMatch(ficha(bj30), /AT8|190 HP|8 velocidades/);

    const eu5 = byId('baic-eu5-2025');
    assert.match(ficha(eu5), /49,6 kWh/);
    assert.doesNotMatch(ficha(eu5), /60 kWh/);
    assert.equal(resolveEfficiency(eu5).batteryKwh, 49.6);

    const wonder = ficha(byId('foton-wonder-2025'));
    assert.match(wonder, /120 HP/);
    assert.match(wonder, /1\.597/);
    assert.doesNotMatch(wonder, /85 HP/);
    assert.doesNotMatch(byId('foton-wonder-2025').especificaciones.motor, /1\.2L|1\.2 /);
    assert.match(ficha(byId('foton-wonder-cd-2025')), /120 HP/);

    const poer = byId('greatwall-poer-luxury-2025');
    assert.match(poer.especificaciones.potencia, /163 CV/);
    assert.doesNotMatch(ficha(poer), /188 HP/);

    const ora = byId('ora-3-2025');
    assert.equal(ora.brand, 'ORA');
    assert.equal(modelSlug(ora.nombre), 'ora-3-good-cat');
    assert.match(ficha(ora), /48 kWh/);
    assert.match(ficha(ora), /126 kW/);
    assert.doesNotMatch(ficha(ora), /47,8|63 kWh|143 HP|400 km/);
    assert.equal(resolveEfficiency(ora).batteryKwh, 48);

    const van = byId('changan-md201-cargo-van-2025');
    assert.equal(van.nombre, 'M201 Cargo Van');
    assert.equal(modelPath(van), '/marcas/changan/m201-cargo-van');
    assert.match(ficha(van), /92 HP/);
    assert.doesNotMatch(ficha(van), /97 HP/);
  });

  it('separa versiones que no son intercambiables', () => {
    const h6 = byId('haval-h6-2025');
    assert.equal(h6.especificaciones.potencia, '235 CV');
    assert.match(getSheet('haval-h6-2025')?.public.avisoCorto || '', /201 HP/);
    assert.doesNotMatch(h6.precio, /35\.500|35500/);

    const hev = byId('haval-h6-hev-2025');
    assert.match(hev.transmision, /DHT/);
    assert.match(hev.especificaciones.capacidad_tanque, /61/);
    assert.match(getSheet('haval-h6-hev-2025')?.public.precio || '', /H6 PRO HEV/);
    assert.equal(hev.precio, '');
    assert.match(ficha(hev), /Supreme/);
    assert.doesNotMatch(hev.transmision, /E-CVT/);

    const pro = byId('haval-jolion-pro-hev-2025');
    assert.match(pro.especificaciones.motor, /atmosférico/);
    assert.match(pro.especificaciones.potencia, /188 HP/);
    assert.doesNotMatch(ficha(pro), /190 HP|turbo/i);
    assert.match(pro.precio, /Supreme/);
    assert.doesNotMatch(ficha(byId('haval-jolion-2025')), /32\.990|32990/);

    const tiggo2 = byId('chery-tiggo-2-pro-2025');
    assert.match(tiggo2.precio, /23\.000/);
    assert.match(tiggo2.precio, /25\.500/);
    assert.match(tiggo2.precio, /PRO MAX/);
    assert.doesNotMatch(tiggo2.precio, /29\.500\.000/);
    assert.match(ficha(byId('chery-tiggo-4-pro-2025')), /28\.700/);
    assert.match(getSheet('chery-tiggo-4-pro-2025')?.public.anioNota || '', /2026/);
    assert.match(ficha(byId('chery-tiggo-8-pro-2023')), /41\.800/);
    assert.doesNotMatch(ficha(byId('chery-tiggo-8-pro-2023')), /54\.056|54056|32\.000\.000/);

    const bj40 = ficha(byId('baic-bj40-2025'));
    assert.match(bj40, /BJ40 PLUS/);
    assert.match(bj40, /221 HP/);
    assert.doesNotMatch(bj40, /7 airbags/);

    const zs = ficha(byId('mg-zs-2025'));
    assert.match(zs, /114 CV/);
    assert.match(zs, /168 CV/);
    assert.equal(byId('mg-zs-2025').combustible, 'Nafta');
    assert.doesNotMatch(byId('mg-zs-2025').especificaciones.potencia, /118/);
    assert.match(getSheet('mg-zs-2025')?.public.aviso || '', /no se mezclan con el ZS Hybrid\+/);
    assert.doesNotMatch(zs, /Hybrid\+/);
    const mg3 = ficha(byId('mg-3-2025'));
    assert.match(mg3, /114 HP/);
    assert.doesNotMatch(mg3, /híbrido/i);

    assert.equal(getSheet('mg-4-2025')?.public.especificaciones.potencia, 'Por especificar');
    assert.equal(byId('mg-4-2025').especificaciones.potencia, '');
    assert.doesNotMatch(ficha(byId('mg-4-2025')), /450 km|51|64 kWh|170/);
    assert.equal(resolveEfficiency(byId('mg-4-2025')).batteryKwh, undefined);
    assert.equal(isElectrified(byId('mg-4-2025')), false);
    assert.equal(isCombustion(byId('foton-v9-2025')), false);
    assert.equal(isCombustion(byId('dongfeng-captain-d-2025')), false);
    assert.equal(isElectrified(byId('haval-h6-hev-2025')), true);
    assert.equal(resolveEfficiency(byId('haval-h6-hev-2025')).estimated, true);
    assert.equal(resolveEfficiency(byId('haval-jolion-pro-hev-2025')).estimated, true);

    const cyber = resolveEfficiency(byId('mg-cyberster-2025'));
    assert.equal(cyber.batteryKwh, 77);
    assert.ok((cyber.kwhPer100km || 0) > 16);
    assert.match(ficha(byId('mg-cyberster-2025')), /3,7/);
    assert.doesNotMatch(ficha(byId('mg-cyberster-2025')), /3,2|536 HP|500 km/);
  });
});

describe('fuentes, precios y datos pendientes', () => {
  it('fecha cada fuente con la consulta y no la usa como vigencia', () => {
    assert.equal(getAllSheets().length, 66);
    const ids = new Set(getAllModels().map((model) => model.id));
    for (const sheet of getAllSheets()) {
      assert.ok(ids.has(sheet.id), sheet.id);
      const fuentes = new Set(sheet.fuentes.map((fuente) => fuente.id));
      assert.equal(fuentes.size, sheet.fuentes.length);
      for (const fuente of sheet.fuentes) {
        assert.equal(fuente.consulta, '2026-11-08');
        assert.ok(fuente.url.startsWith('http'));
        assert.doesNotMatch(fuente.edicion, /vigente en noviembre/i);
      }
      for (const seccion of sheet.secciones) {
        assert.ok(seccion.hechos.length > 0);
        for (const hecho of seccion.hechos) assert.ok(fuentes.has(hecho.fuenteId), hecho.fuenteId);
      }
      for (const precio of sheet.precios) {
        assert.ok(fuentes.has(precio.fuenteId));
        assert.doesNotMatch(precio.vigencia, /vigente en noviembre|actualizados a noviembre/i);
        assert.notEqual(precio.fechaLista, '2026-11-08');
      }
    }
    const counts = coverageCounts();
    assert.equal(counts.integrada + counts.historica + counts.retiro + counts.pendiente, 66);
    assert.equal(counts.retiro, 2);
    assert.ok(counts.pendiente >= 3);
    assert.ok(counts.historica >= 8);
  });

  it('acota los precios a la versión exacta y deja históricos como históricos', () => {
    assert.match(byId('haval-h6-2025').precio, /39\.900/);
    assert.match(byId('haval-h6gt-2025').precio, /44\.400/);
    assert.match(byId('haval-h6gt-2025').precio, /41\.990/);
    assert.match(byId('ora-3-2025').precio, /31\.000/);
    assert.match(byId('ora-3-2025').precio, /29\.900/);
    assert.match(byId('greatwall-poer-luxury-2025').precio, /41\.990/);
    assert.match(byId('greatwall-poer-elite-2025').precio, /28\.730/);
    assert.match(byId('greatwall-poer-elite-2025').precio, /32\.697/);
    assert.match(byId('haval-jolion-pro-hev-2025').precio, /32\.990/);
    assert.match(byId('haval-jolion-pro-hev-2025').precio, /30\.990/);

    assert.match(getSheet('jac-s2-2025')?.public.precio || '', /1\/5\/2026/);
    assert.match(getSheet('jac-s2-2025')?.public.precio || '', /20\.900/);
    assert.equal(byId('jac-s2-2025').precio, '');
    assert.match(getSheet('jac-x200-2025')?.public.precio || '', /24\.700/);
    assert.doesNotMatch(getSheet('jac-x200-2025')?.public.precio || '', /31\.900/);
    assert.equal(byId('jac-x200-2025').precio, '');
    assert.match(getSheet('byd-dolphin-mini-2025')?.public.precio || '', /8\/10\/2025/);
    assert.match(getSheet('byd-yuan-pro-2025')?.public.precio || '', /29\.990/);
    assert.match(getSheet('byd-song-pro-dmi-2025')?.public.precio || '', /36\.990/);
    assert.equal(byId('byd-dolphin-mini-2025').precio, '');
    assert.equal(byId('byd-yuan-pro-2025').precio, '');
    assert.equal(byId('byd-song-pro-dmi-2025').precio, '');
    assert.doesNotMatch(ficha(byId('byd-song-pro-dmi-2025')), /197/);
    assert.equal(getSheet('baic-x35-2025')?.public.precio.startsWith('Consultar precio'), true);
    assert.equal(byId('baic-x35-2025').precio, '');
    assert.doesNotMatch(ficha(byId('baic-x55-ii-2025')), /188 HP/);
    assert.match(getSheet('dfsk-c35-2025')?.conflictos.join(' ') || '', /1\.435/);
    assert.equal(getSheet('haval-h6gt-2025')?.secciones.some((section) => section.id === 'dimensiones'), false);
    assert.equal(byId('greatwall-wingle-7-2025').fichaCobertura, 'pendiente');
    assert.equal(byId('foton-view-cs2-2025').fichaCobertura, 'pendiente');
    assert.doesNotMatch(ficha(byId('dfsk-glory-500-2025')), /ESP/);
    assert.equal(isCombustion(byId('foton-v9-2025')), false);
    assert.equal(isElectrified(byId('foton-v9-2025')), false);
    assert.equal(isCombustion(byId('greatwall-wingle-7-2025')), false);
    assert.equal(resolveEfficiency(byId('byd-dolphin-mini-2025')).batteryKwh, undefined);
    assert.equal(resolveEfficiency(byId('byd-song-pro-dmi-2025')).batteryKwh, undefined);
  });

  it('el schema no ofrece precios y la ficha no renderiza bloques vacíos', () => {
    for (const model of getAllModels()) {
      const json = JSON.stringify(vehicleJsonLd(model, modelPath(model)));
      assert.equal(json.includes('Offer'), false);
      assert.equal(json.includes('"price"'), false);
    }
    const eu5Json = JSON.stringify(vehicleJsonLd(byId('baic-eu5-2025'), '/marcas/baic/eu5'));
    assert.doesNotMatch(eu5Json, /60 kWh/);
    const oraJson = JSON.stringify(vehicleJsonLd(byId('ora-3-2025'), '/marcas/ora/ora-3-good-cat'));
    assert.doesNotMatch(oraJson, /47,8|143 HP/);
    const poerJson = JSON.stringify(
      vehicleJsonLd(byId('greatwall-poer-luxury-2025'), '/marcas/great-wall/poer-luxury')
    );
    assert.doesNotMatch(poerJson, /188 HP/);
    const eu5 = byId('baic-eu5-2025');
    const html = renderToStaticMarkup(
      createElement(TechnicalSheet, { model: eu5, sheet: getSheet(eu5.id)! })
    );
    assert.match(html, /49,6 kWh/);
    assert.doesNotMatch(html, /2026-11-08/);
    assert.doesNotMatch(html, /Se retira/);
    assert.doesNotMatch(html, /60 kWh/);
    assert.equal((html.match(/<h3/g) || []).length > 0, true);

    const v9 = byId('foton-v9-2025');
    const v9html = renderToStaticMarkup(
      createElement(TechnicalSheet, { model: v9, sheet: getSheet(v9.id)! })
    );
    assert.equal(v9html, '');
    assert.doesNotMatch(v9html, /Tunland|150 HP|15 pasajeros/);

    const wonder = byId('foton-wonder-cd-2025');
    const wonderHtml = renderToStaticMarkup(
      createElement(TechnicalSheet, { model: wonder, sheet: getSheet(wonder.id)! })
    );
    assert.match(wonderHtml, /120 HP/);
    assert.match(wonderHtml, /grid-cols-1/);
  });

  it('omite el año-modelo estructurado si la ficha no lo acredita', () => {
    assert.equal(
      getAllSheets().some((sheet) => Boolean(sheet.anioModelo)),
      false
    );
    const tiggo8 = byId('chery-tiggo-8-pro-2023');
    assert.equal(tiggo8.año, '2023');
    assert.equal(vehicleJsonLd(tiggo8, modelPath(tiggo8)).vehicleModelDate, undefined);
    assert.match(getSheet(tiggo8.id)?.public.anioNota || '', /MY25/);
    assert.match(getSheet(tiggo8.id)?.public.anioNota || '', /no confirma la etiqueta 2023/);
    assert.equal(tiggo8.anioNota, undefined);

    for (const id of [
      'geely-emgrand-gs-2025',
      'geely-emgrand-x7-sport-2025',
      'jac-t8-2024',
      'changan-md201-cargo-van-2025',
      'lifan-x70-2025',
      'lifan-myway-2025',
      'lifan-mamut-2025',
      'foton-gratour-t3-cs-2025',
      'faw-t33-2025',
      'dongfeng-van-312-2025',
      'haval-h6-2025',
      'foton-v9-2025',
      'mg-4-2025',
    ]) {
      const model = byId(id);
      assert.equal(accreditedVehicleModelDate(model), undefined, id);
      assert.equal(vehicleJsonLd(model, modelPath(model)).vehicleModelDate, undefined, id);
    }

    for (const model of getAllModels()) {
      assert.equal(vehicleJsonLd(model, modelPath(model)).vehicleModelDate, undefined, model.id);
    }
  });

  it('no publica la tracción BYD como si fuera la caja', () => {
    for (const id of ['byd-dolphin-mini-2025', 'byd-song-pro-dmi-2025', 'byd-yuan-pro-2025']) {
      const model = byId(id);
      assert.equal(getSheet(id)?.public.transmision, 'Sin confirmar');
      assert.equal(model.transmision, '');
      assert.equal(vehicleJsonLd(model, modelPath(model)).vehicleTransmission, undefined);
      const titles = (getSheet(id)?.secciones || []).map((section) => section.titulo);
      assert.equal(titles.includes('Transmisión'), false);
    }

    assert.equal(getSheet('byd-dolphin-mini-2025')?.public.especificaciones.traccion, 'Por especificar');
    assert.equal(byId('byd-dolphin-mini-2025').especificaciones.traccion, '');
    const dolphinFacts = (getSheet('byd-dolphin-mini-2025')?.secciones || []).flatMap(
      (section) => section.hechos
    );
    assert.equal(
      dolphinFacts.some((fact) => /delantera/i.test(`${fact.etiqueta} ${fact.valor}`)),
      false
    );

    assert.equal(byId('byd-song-pro-dmi-2025').especificaciones.traccion, 'Delantera');
    assert.equal(byId('byd-yuan-pro-2025').especificaciones.traccion, 'Delantera');
    const song = getSheet('byd-song-pro-dmi-2025');
    assert.equal(
      song?.secciones.some(
        (section) =>
          section.titulo === 'Tracción' &&
          section.hechos.some((fact) => fact.valor === 'Delantera')
      ),
      true
    );
    assert.equal(
      (getSheet('byd-yuan-pro-2025')?.secciones || [])
        .flatMap((section) => section.hechos)
        .some((fact) => fact.etiqueta === 'Tracción' && fact.valor === 'Delantera'),
      true
    );
  });

  it('no muestra notas internas ni completa un dato incierto', () => {
    const banned = [
      /ficha hist/i,
      /fuente hist/i,
      /identidad sin resolver/i,
      /sin confirmar/i,
      /por especificar/i,
      /pendiente de confirmar/i,
      /se retir/i,
      /consulta del relevamiento/i,
      /año en catálogo/i,
      /relevamiento/i,
      /vigencia de noviembre/i,
      /no es una vigencia/i,
      /2026-11-08/,
      /datos que sí cubre/i,
      /en silencio/i,
      /conflictos sin cerrar/i,
      /certificación del año/i,
      /año que muestra el catálogo/i,
      /figuraba antes/i,
      /que figuraba/i,
      /no se afirma/i,
      /no se puede leer/i,
      /unidad utilizable/i,
      /no tiene una unidad/i,
      /torque del pdf/i,
      /potencia de la tabla/i,
      /el extracto/i,
      /descripción interna/i,
      /unidad del artículo/i,
      /matriz del documento/i,
      /^es,/im,
      /no es el naftero/i,
      /no es la versión cvt que/i,
      /\bruta\b/i,
      /código interno/i,
      /sin una sola cifra/i,
      /sin una sola potencia/i,
      /sin cifra única/i,
      /informados por separado/i,
      /por separado/i,
    ];

    for (const model of getAllModels()) {
      const sheet = getSheet(model.id);
      assert.ok(sheet, model.id);
      const html = renderToStaticMarkup(
        createElement(TechnicalSheet, { model, sheet })
      );
      const card = renderToStaticMarkup(createElement(ModelCard, { model }));
      const json = JSON.stringify(vehicleJsonLd(model, modelPath(model)));
      const surface = [html, card, json, publicSurfaceText(model, sheet)].join('\n');
      for (const pattern of banned) {
        assert.doesNotMatch(surface, pattern, `${model.id} ${pattern}`);
      }
      if (model.descripcion) {
        assert.doesNotMatch(model.descripcion, /^Es,/);
        assert.doesNotMatch(
          model.descripcion,
          /pdf|extracto|documento|relevamiento|figuraba|certificación|unidad utilizable|no se afirma|no se puede leer|por separado|sin una sola|sin cifra/i,
          model.id
        );
      }
    }

    const gs = byId('geely-emgrand-gs-2025');
    const gsHtml = renderToStaticMarkup(
      createElement(TechnicalSheet, { model: gs, sheet: getSheet(gs.id)! })
    );
    const gsCard = renderToStaticMarkup(createElement(ModelCard, { model: gs }));
    assert.match(gsHtml, /2 airbags y sin ESP/);
    assert.match(gsHtml, /6 airbags, ESP/);
    assert.doesNotMatch(`${gsHtml} ${gsCard}`, /El ESP no corresponde/);

    const chery = publicPrices(getSheet('chery-tiggo-2-pro-2025'));
    assert.ok(chery.some((price) => price.note === 'Lista del 6 de octubre de 2026'));
    assert.equal(publicPrices(getSheet('byd-dolphin-mini-2025')).length, 0);
    assert.equal(publicPrices(getSheet('jac-s2-2025')).length, 0);
    assert.equal(publicPrices(getSheet('mg-zs-2025'))?.length ?? 0, 0);

    const v9 = byId('foton-v9-2025');
    const v9Json = JSON.stringify(vehicleJsonLd(v9, modelPath(v9)));
    assert.doesNotMatch(v9Json, /Tunland|identidad|150 HP/);
    assert.equal(v9Json.includes('bodyType'), false);
    assert.equal(
      byId('jac-s2-2025').descripcion,
      'SUV 1.5 con versión Intelligent manual y Luxury CVT.'
    );
    assert.equal(byId('jac-s2-2025').especificaciones.potencia, '');
    assert.equal(
      byId('baic-x55-ii-2025').descripcion,
      'SUV 1.5 turbo con DCT de 7 marchas y tracción delantera.'
    );
    assert.equal(byId('baic-x55-ii-2025').especificaciones.potencia, '');
    assert.equal(
      byId('byd-song-pro-dmi-2025').descripcion,
      'SUV híbrido enchufable. Motor naftero de 78 kW y motor eléctrico de 145 kW. GL y GS tienen batería y asistencias distintas.'
    );
    assert.equal(publicTransmission(byId('byd-dolphin-mini-2025')), undefined);
    assert.equal(publicTransmission(byId('baic-bj40-2025')), '2WD/4WD seleccionable');
  });
});
