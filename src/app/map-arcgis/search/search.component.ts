import { Component, OnInit } from "@angular/core";

import { loadModules } from "esri-loader";
import { MapStateService } from "../../@core/data/mapstate.service";
import { SearchService } from "../../@core/data/search.service";

import { NbSearchService } from "@nebular/theme";

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

@Component({
  selector: "map-search",
  styleUrls: ["./search.component.scss"],
  templateUrl: "./search.component.html"
})
export class MapSearchComponent implements OnInit {
  _searchInput: string;

  // _searchSources = [
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/q_massa_gedungpemda/FeatureServer/0',
  // 	'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/cagarbudaya/MapServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan_verifikator/FeatureServer/',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/js_subblock_dashboard/FeatureServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dsda/DSDA_peta_Rawan_Banjir/FeatureServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/q_kawasan_gedung_pemda/FeatureServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/persil_pbb_gabungan_jakarta_dashboard/FeatureServer/0',
  // 	'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/1',
  // 	'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/0',
  // 	'https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/model_gab_rth/FeatureServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/peta_batas_rw_vs_statistik/MapServer/0',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/dashboard/peta_batas_rw_vs_statistik/MapServer/1',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/sippt/SIPPT/FeatureServer/2',
  // 	'https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/peta_ops_utm/MapServer'
  // ];

  _searchResults: any;

  res_petabangunan1: any;
  res_petabangunan2: any;
  res_batassubblok: any;
  res_jalanjakarta: any;
  res_stasiunKA: any;
  res_kawasanrawanbanjir: any;
  res_panduanrancang: any;
  res_noPBB: any;
  res_pusatmall: any;
  res_cagarbudaya: any;
  res_pasar: any;
  res_ruanghijau: any;
  res_bangunganasetpemda: any;
  res_lahanasetpemda: any;

  constructor(
    private mapStateService: MapStateService,
    private searchService: SearchService,
    private nbSearchService: NbSearchService
  ) {
    this.nbSearchService.onSearchSubmit().subscribe(searchInput => {
      this._searchInput = searchInput.term;

      // let params = new HttpParams()
      // 			.set('f', 'json')
      // 			.set('where', '1=1')
      // 			.set('outFields', '*')
      // 			.set('outSr', '4326')
      // 			.set('returnCountOnly', 'false')
      // 			.set('returnGeometry', 'true');

      let srcSearch = {
        petabangunan1: {
          featureLayer: {
            url:
              "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan_verifikator/FeatureServer/0/query?"
          },
          searchFields: ["NAMA_BANGUNAN", "LOKASI"],
          displayField: "NAMA_BANGUNAN",
          exactMatch: false,
          outFields: ["*"],
          name: "Peta Bangunan",
          placeholder: "Cari peta bangunan",
          suggestionTemplate: "{NAMA_BANGUNAN} di {LOKASI}"
        },
        petabangunan2: {
          featureLayer: {
            url:
              "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan/FeatureServer/0/query?"
          },
          searchFields: [
            "LOKASI",
            "NAMA_BANGUNAN",
            "PENGELOLA_NAMA",
            "EMAIL",
            "KETERANGAN"
          ],
          displayField: "NAMA_BANGUNAN",
          exactMatch: false,
          outFields: ["*"],
          name: "Peta Bangunan",
          placeholder: "Cari peta bangunan",
          suggestionTemplate: "{NAMA_BANGUNAN} di {LOKASI}"
        },
        batassubblok: {
          featureLayer: {
            url:
              "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/batas_ops/MapServer/0/query?"
          },
          searchFields: ["ID_SUBBLOCK_NEW"],
          displayField: "ID_SUBBLOCK_NEW",
          exactMatch: false,
          outFields: ["*"],
          name: "Batas Subblock Zonasi",
          placeholder: "Cari batas sublock zonasi"
        },
        jalanjakarta: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/12/query?"
          },
          searchFields: ["NAMA_JALAN", "KETERANGAN"],
          displayField: "NAMA_JALAN",
          exactMatch: false,
          outFields: ["*"],
          name: "Jalan Jakarta",
          placeholder: "Cari jalan Jakarta",
          suggestionTemplate: "{NAMA_JALAN} ({KETERANGAN})"
        },
        stasiunKA: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/3/query?"
          },
          searchFields: ["NAMA_STASIUN"],
          displayField: "NAMA_STASIUN",
          exactMatch: false,
          outFields: ["*"],
          name: "Stasiun Kereta Api",
          placeholder: "Cari stasiun kereta api"
        },
        kawasanrawanbanjir: {
          featureLayer: {
            url:
              "https://tataruang.jakarta.go.id/server/rest/services/dsda/DSDA_peta_Rawan_Banjir/FeatureServer/0/query?"
          },
          searchFields: ["NAMA_LOKAS"],
          displayField: "NAMA_LOKAS",
          exactMatch: false,
          outFields: ["*"],
          name: "Kawasan Rawan Banjir",
          placeholder: "Cari kawasan rawan banjir"
        },
        panduanrancang: {
          featureLayer: {
            url:
              "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/UDGL/MapServer/0/query?"
          },
          searchFields: ["NAMA_UDGL"],
          displayField: "NAMA_UDGL",
          exactMatch: false,
          outFields: ["*"],
          name: "Panduan Rancang Bangun Kota",
          placeholder: "Cari panduan rancang bangun kota"
        },
        noPBB: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/BPRD/q_bprd_master_pbb_pusat_edit/FeatureServer/0/query?"
          },
          searchFields: ["D_NOP", "D_NOP_2"],
          displayField: "D_NOP",
          exactMatch: false,
          outFields: ["*"],
          name: "PBB - Nomor Objek Pajak",
          placeholder: "Cari nomor objek pajak (PBB)"
        },
        pusatmall: {
          featureLayer: {
            url:
              "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/0/query?"
          },
          searchFields: ["NAME", "ADDRESS"],
          displayField: "NAME",
          exactMatch: false,
          outFields: ["*"],
          name: "Pusat Perbelanjaan",
          placeholder: "Cari pusat perbelanjaan",
          suggestionTemplate: "{NAME} di {ADDRESS}"
        },
        cagarbudaya: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/cagarbudaya/MapServer/0/query?"
          },
          searchFields: [
            "NAME",
            "ALAMAT___L",
            "JENIS_CAGA",
            "SK_KETETAP",
            "KETERANGAN"
          ],
          displayField: "NAME",
          exactMatch: false,
          outFields: ["*"],
          name: "Cagar Budaya",
          placeholder: "Cari cagar budaya",
          suggestionTemplate: "{NAME}, jenis: {JENIS_CAGA}"
        },
        pasar: {
          featureLayer: {
            url:
              "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/1/query?"
          },
          searchFields: [
            "NAMA_PASAR",
            "ALAMAT",
            "KLASIFIKASI",
            "KOTA",
            "KEPALA_PASAR",
            "NO_TELP",
            "JENIS_JUALAN",
            "TELEPON_KANTOR"
          ],
          displayField: "NAMA_PASAR",
          exactMatch: false,
          outFields: ["*"],
          name: "Pasar Tradisional (PD Pasar Jaya)",
          placeholder: "Cari pasar tradisional",
          suggestionTemplate: "{NAMA_PASAR}, klasifikasi: {KLASIFIKASI}"
        },
        ruanghijau: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/model_gab_rth/FeatureServer/0/query?"
          },
          searchFields: [
            "NAMA",
            "KETERANGAN",
            "JENIS_OBJECT",
            "PEMBANGUNAN_RTH",
            "NO_SERTIFIKAT",
            "KATEGORI_ASET",
            "PENGELOLA",
            "KET_KONDISI_EXISTING",
            "ALAMAT",
            "FUNGSI_LAHAN",
            "KIB_KODE_BARANG",
            "KIB_NO_REGISTER"
          ],
          displayField: "NAMA",
          exactMatch: false,
          outFields: ["*"],
          name: "Ruang Terbuka Hijau Aset Pemda DKI Jakarta",
          placeholder: "cari RTH pemda Jakarta"
        },
        bangunganasetpemda: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/0/query?"
          },
          searchFields: [
            "PEMANFAATAN",
            "KETPEMANFAATAN",
            "MASSABANGUNAN",
            "NAMA_BANGUNAN",
            "PEMEGANG_KIBC",
            "PEMANFAATAN_GEDUNG",
            "ALAMAT"
          ],
          displayField: "MASSABANGUNAN",
          exactMatch: false,
          outFields: ["*"],
          name: "Bangunan Aset Pemda DKI Jakarta",
          placeholder: "Cari bangunan aset pemda Jakarta"
        },
        lahanasetpemda: {
          featureLayer: {
            url:
              "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/1/query?"
          },
          searchFields: [
            "NAMA_BANGUNAN",
            "PEMEGANG_KIBC",
            "PEMANFAATAN_GEDUNG",
            "ALAMAT",
            "KETERANGAN"
          ],
          displayField: "Nama Bangunan / Nama Kawasan",
          exactMatch: false,
          outFields: ["*"],
          name: "Lahan Aset Pemda DKI Jakarta",
          placeholder: "cari lahan aset pemda Jakarta",
          maxResults: 10,
          maxSuggestions: 6
        },
        //tambahan GEOCODE
        geocode: {
          url:
            "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"
        }
      };

      this.searchService
        .searchItem(srcSearch.petabangunan1.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features"];
          console.log("data", data["features"]);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_T.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_t.test(item.attributes.LOKASI) ||
              inputRegex_T.test(item.attributes.LOKASI)
            );
          });
          console.log("resCurrent", resCurrent);
          this.res_petabangunan1 = resCurrent;

          console.log("this.res_petabangunan1", this.res_petabangunan1);
        });

      this.searchService
        .searchItem(srcSearch.petabangunan2.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_T.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_t.test(item.attributes.LOKASI) ||
              inputRegex_T.test(item.attributes.LOKASI) ||
              inputRegex_t.test(item.attributes.PENGELOLA_NAMA) ||
              inputRegex_T.test(item.attributes.PENGELOLA_NAMA) ||
              inputRegex_t.test(item.attributes.EMAIL) ||
              inputRegex_T.test(item.attributes.EMAIL) ||
              inputRegex_t.test(item.attributes.KETERANGAN) ||
              inputRegex_T.test(item.attributes.KETERANGAN)
            );
          });
          this.res_petabangunan2 = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.batassubblok.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.ID_SUBBLOCK_NEW) ||
              inputRegex_T.test(item.attributes.ID_SUBBLOCK_NEW)
            );
          });
          this.res_batassubblok = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.jalanjakarta.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_JALAN) ||
              inputRegex_T.test(item.attributes.NAMA_JALAN) ||
              inputRegex_t.test(item.attributes.KETERANGAN) ||
              inputRegex_T.test(item.attributes.KETERANGAN)
            );
          });
          this.res_jalanjakarta = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.stasiunKA.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_STASIUN) ||
              inputRegex_T.test(item.attributes.NAMA_STASIUN)
            );
          });
          this.res_stasiunKA = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.kawasanrawanbanjir.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_LOKAS) ||
              inputRegex_T.test(item.attributes.NAMA_LOKAS)
            );
          });
          this.res_kawasanrawanbanjir = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.panduanrancang.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_UDGL) ||
              inputRegex_T.test(item.attributes.NAMA_UDGL)
            );
          });
          this.res_panduanrancang = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.noPBB.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.D_NOP) ||
              inputRegex_T.test(item.attributes.D_NOP) ||
              inputRegex_t.test(item.attributes.D_NOP_2) ||
              inputRegex_T.test(item.attributes.D_NOP_2)
            );
          });
          this.res_noPBB = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.pusatmall.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAME) ||
              inputRegex_T.test(item.attributes.NAME) ||
              inputRegex_t.test(item.attributes.ADDRESS) ||
              inputRegex_T.test(item.attributes.ADDRESS)
            );
          });
          this.res_pusatmall = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.cagarbudaya.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAME) ||
              inputRegex_T.test(item.attributes.NAME) ||
              inputRegex_t.test(item.attributes.ALAMAT___L) ||
              inputRegex_T.test(item.attributes.ALAMAT___L) ||
              inputRegex_t.test(item.attributes.JENIS_CAGA) ||
              inputRegex_T.test(item.attributes.JENIS_CAGA) ||
              inputRegex_t.test(item.attributes.SK_KETETAP) ||
              inputRegex_T.test(item.attributes.SK_KETETAP) ||
              inputRegex_t.test(item.attributes.KETERANGAN) ||
              inputRegex_T.test(item.attributes.KETERANGAN)
            );
          });
          this.res_cagarbudaya = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.pasar.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_PASAR) ||
              inputRegex_T.test(item.attributes.NAMA_PASAR) ||
              inputRegex_t.test(item.attributes.ALAMAT) ||
              inputRegex_T.test(item.attributes.ALAMAT) ||
              inputRegex_t.test(item.attributes.KLASIFIKASI) ||
              inputRegex_T.test(item.attributes.KLASIFIKASI) ||
              inputRegex_t.test(item.attributes.KEPALA_PASAR) ||
              inputRegex_T.test(item.attributes.KEPALA_PASAR) ||
              inputRegex_t.test(item.attributes.NO_TELP) ||
              inputRegex_T.test(item.attributes.NO_TELP) ||
              inputRegex_t.test(item.attributes.JENIS_JUALAN) ||
              inputRegex_T.test(item.attributes.JENIS_JUALAN) ||
              inputRegex_t.test(item.attributes.TELEPON_KANTOR) ||
              inputRegex_T.test(item.attributes.TELEPON_KANTOR)
            );
          });
          this.res_pasar = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.ruanghijau.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA) ||
              inputRegex_T.test(item.attributes.NAMA) ||
              inputRegex_t.test(item.attributes.KETERANGAN) ||
              inputRegex_T.test(item.attributes.KETERANGAN) ||
              inputRegex_t.test(item.attributes.JENIS_OBJECT) ||
              inputRegex_T.test(item.attributes.JENIS_OBJECT) ||
              inputRegex_t.test(item.attributes.PEMBANGUNAN_RTH) ||
              inputRegex_T.test(item.attributes.PEMBANGUNAN_RTH) ||
              inputRegex_t.test(item.attributes.NO_SERTIFIKAT) ||
              inputRegex_T.test(item.attributes.NO_SERTIFIKAT) ||
              inputRegex_t.test(item.attributes.KATEGORI_ASET) ||
              inputRegex_T.test(item.attributes.KATEGORI_ASET) ||
              inputRegex_t.test(item.attributes.PENGELOLA) ||
              inputRegex_T.test(item.attributes.PENGELOLA) ||
              inputRegex_t.test(item.attributes.KET_KONDISI_EXISTING) ||
              inputRegex_T.test(item.attributes.KET_KONDISI_EXISTING) ||
              inputRegex_t.test(item.attributes.ALAMAT) ||
              inputRegex_T.test(item.attributes.ALAMAT) ||
              inputRegex_t.test(item.attributes.FUNGSI_LAHAN) ||
              inputRegex_T.test(item.attributes.FUNGSI_LAHAN) ||
              inputRegex_t.test(item.attributes.KIB_KODE_BARANG) ||
              inputRegex_T.test(item.attributes.KIB_KODE_BARANG) ||
              inputRegex_t.test(item.attributes.KIB_NO_REGISTER) ||
              inputRegex_T.test(item.attributes.KIB_NO_REGISTER)
            );
          });
          this.res_ruanghijau = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.bangunganasetpemda.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.PEMANFAATAN) ||
              inputRegex_T.test(item.attributes.PEMANFAATAN) ||
              inputRegex_t.test(item.attributes.KETPEMANFAATAN) ||
              inputRegex_T.test(item.attributes.KETPEMANFAATAN) ||
              inputRegex_t.test(item.attributes.MASSABANGUNAN) ||
              inputRegex_T.test(item.attributes.MASSABANGUNAN) ||
              inputRegex_t.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_T.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_t.test(item.attributes.PEMEGANG_KIBC) ||
              inputRegex_T.test(item.attributes.PEMEGANG_KIBC) ||
              inputRegex_t.test(item.attributes.PEMANFAATAN_GEDUNG) ||
              inputRegex_T.test(item.attributes.PEMANFAATAN_GEDUNG) ||
              inputRegex_t.test(item.attributes.ALAMAT) ||
              inputRegex_T.test(item.attributes.ALAMAT)
            );
          });
          this.res_bangunganasetpemda = resCurrent;
        });

      this.searchService
        .searchItem(srcSearch.lahanasetpemda.featureLayer.url)
        .subscribe((data: any) => {
          function titleCase(str) {
            str = str.toLowerCase().split(" ");
            for (var i = 0; i < str.length; i++) {
              str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }
            return str.join(" ");
          }
          let input_T = titleCase(searchInput.term);
          let inputRegex_t = new RegExp(searchInput.term);
          let inputRegex_T = new RegExp(input_T);
          // console.log("this._searchResults", data);
          // let results = data["features ;
          // console.log("results", results);
          let resCurrent: any;
          resCurrent = data["features"].filter(item => {
            return (
              inputRegex_t.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_T.test(item.attributes.NAMA_BANGUNAN) ||
              inputRegex_t.test(item.attributes.PEMEGANG_KIBC) ||
              inputRegex_T.test(item.attributes.PEMEGANG_KIBC) ||
              inputRegex_t.test(item.attributes.PEMANFAATAN_GEDUNG) ||
              inputRegex_T.test(item.attributes.PEMANFAATAN_GEDUNG) ||
              inputRegex_t.test(item.attributes.ALAMAT) ||
              inputRegex_T.test(item.attributes.ALAMAT) ||
              inputRegex_t.test(item.attributes.KETERANGAN) ||
              inputRegex_T.test(item.attributes.KETERANGAN)
            );
          });
          this.res_lahanasetpemda = resCurrent;
          console.log("this.res_lahanasetpemda", this.res_lahanasetpemda);
        });

      //tambahan GEOCODE
      this.searchService
        .searchItem(srcSearch.geocode.url)
        .subscribe((data: any) => {
          console.log(data);
        });
    });
  }

  ngOnInit() {
    // this.initWidget_Search();
  }

  async initWidget_Search() {
    try {
      const [EsriWidgetSearch, EsriPopupTemplate] = await loadModules([
        "esri/widgets/Search",
        "esri/PopupTemplate"
      ]);

      // Import MapView
      this.mapStateService.listen_esriMapView().subscribe((mapView: any) => {
        let search = new EsriWidgetSearch({
          view: mapView,
          container: "search",
          allPlaceholder: "Cari Lokasi, Bangunan, Kawasan, dll",
          includeDefaultSources: false,
          suggestionDelay: 0,
          maxSuggestions: 100,
          minSuggestCharacters: 0,
          suggestionsEnabled: true,
          sources: [
            {
              featureLayer: {
                url:
                  "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan_verifikator/FeatureServer/0"
              },
              searchFields: ["NAMA_BANGUNAN", "LOKASI"],
              displayField: "NAMA_BANGUNAN",
              exactMatch: false,
              outFields: ["*"],
              name: "Peta Bangunan",
              placeholder: "Cari peta bangunan",
              suggestionTemplate: "{NAMA_BANGUNAN} di {LOKASI}"
            },
            {
              featureLayer: {
                url:
                  "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan/FeatureServer/0"
              },
              searchFields: [
                "LOKASI",
                "NAMA_BANGUNAN",
                "PENGELOLA_NAMA",
                "EMAIL",
                "KETERANGAN"
              ],
              displayField: "NAMA_BANGUNAN",
              exactMatch: false,
              outFields: ["*"],
              name: "Peta Bangunan",
              placeholder: "Cari peta bangunan",
              suggestionTemplate: "{NAMA_BANGUNAN} di {LOKASI}"
            },
            {
              featureLayer: {
                url:
                  "https://tataruang.jakarta.go.id/server/rest/services/peta_dasar/batas_ops/MapServer/0"
              },
              searchFields: ["ID_SUBBLOCK_NEW"],
              displayField: "ID_SUBBLOCK_NEW",
              exactMatch: false,
              outFields: ["*"],
              name: "Batas Subblock Zonasi",
              placeholder: "Cari batas sublock zonasi"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/12"
              },
              searchFields: ["NAMA_JALAN", "KETERANGAN"],
              displayField: "NAMA_JALAN",
              exactMatch: false,
              outFields: ["*"],
              name: "Jalan Jakarta",
              placeholder: "Cari jalan Jakarta",
              suggestionTemplate: "{NAMA_JALAN} ({KETERANGAN})"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/Peta_Struktur_2018/MapServer/3"
              },
              searchFields: ["NAMA_STASIUN"],
              displayField: "NAMA_STASIUN",
              exactMatch: false,
              outFields: ["*"],
              name: "Stasiun Kereta Api",
              placeholder: "Cari stasiun kereta api"
            },
            {
              featureLayer: {
                url:
                  "https://tataruang.jakarta.go.id/server/rest/services/dsda/DSDA_peta_Rawan_Banjir/FeatureServer/0"
              },
              searchFields: ["NAMA_LOKAS"],
              displayField: "NAMA_LOKAS",
              exactMatch: false,
              outFields: ["*"],
              name: "Kawasan Rawan Banjir",
              placeholder: "Cari kawasan rawan banjir"
            },
            {
              featureLayer: {
                url:
                  "https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/UDGL/MapServer/0"
              },
              searchFields: ["NAMA_UDGL"],
              displayField: "NAMA_UDGL",
              exactMatch: false,
              outFields: ["*"],
              name: "Panduan Rancang Bangun Kota",
              placeholder: "Cari panduan rancang bangun kota"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/BPRD/q_bprd_master_pbb_pusat_edit/FeatureServer/0"
              },
              searchFields: ["D_NOP", "D_NOP_2"],
              displayField: "D_NOP",
              exactMatch: false,
              outFields: ["*"],
              name: "PBB - Nomor Objek Pajak",
              placeholder: "Cari nomor objek pajak (PBB)"
            },
            {
              featureLayer: {
                url:
                  "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/0"
              },
              searchFields: ["NAME", "ADDRESS"],
              displayField: "NAME",
              exactMatch: false,
              outFields: ["*"],
              name: "Pusat Perbelanjaan",
              placeholder: "Cari pusat perbelanjaan",
              suggestionTemplate: "{NAME} di {ADDRESS}"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/cagarbudaya/MapServer/0"
              },
              searchFields: [
                "NAME",
                "ALAMAT___L",
                "JENIS_CAGA",
                "SK_KETETAP",
                "KETERANGAN"
              ],
              displayField: "NAME",
              exactMatch: false,
              outFields: ["*"],
              name: "Cagar Budaya",
              placeholder: "Cari cagar budaya",
              suggestionTemplate: "{NAME}, jenis: {JENIS_CAGA}"
            },
            {
              featureLayer: {
                url:
                  "https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/1"
              },
              searchFields: [
                "NAMA_PASAR",
                "ALAMAT",
                "KLASIFIKASI",
                "KOTA",
                "KEPALA_PASAR",
                "NO_TELP",
                "JENIS_JUALAN",
                "TELEPON_KANTOR"
              ],
              displayField: "NAMA_PASAR",
              exactMatch: false,
              outFields: ["*"],
              name: "Pasar Tradisional (PD Pasar Jaya)",
              placeholder: "Cari pasar tradisional",
              suggestionTemplate: "{NAMA_PASAR}, klasifikasi: {KLASIFIKASI}"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/model_gab_rth/FeatureServer/0"
              },
              searchFields: [
                "NAMA",
                "KETERANGAN",
                "JENIS_OBJECT",
                "PEMBANGUNAN_RTH",
                "NO_SERTIFIKAT",
                "KATEGORI_ASET",
                "PENGELOLA",
                "KET_KONDISI_EXISTING",
                "ALAMAT",
                "FUNGSI_LAHAN",
                "KIB_KODE_BARANG",
                "KIB_NO_REGISTER"
              ],
              displayField: "NAMA",
              exactMatch: false,
              outFields: ["*"],
              name: "Ruang Terbuka Hijau Aset Pemda DKI Jakarta",
              placeholder: "cari RTH pemda Jakarta"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/0"
              },
              searchFields: [
                "PEMANFAATAN",
                "KETPEMANFAATAN",
                "MASSABANGUNAN",
                "NAMA_BANGUNAN",
                "PEMEGANG_KIBC",
                "PEMANFAATAN_GEDUNG",
                "ALAMAT"
              ],
              displayField: "MASSABANGUNAN",
              exactMatch: false,
              outFields: ["*"],
              name: "Bangunan Aset Pemda DKI Jakarta",
              placeholder: "Cari bangunan aset pemda Jakarta"
            },
            {
              featureLayer: {
                url:
                  "http://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/TM_Aset_BGP/FeatureServer/1"
              },
              searchFields: [
                "NAMA_BANGUNAN",
                "PEMEGANG_KIBC",
                "PEMANFAATAN_GEDUNG",
                "ALAMAT",
                "KETERANGAN"
              ],
              displayField: "Nama Bangunan / Nama Kawasan",
              exactMatch: false,
              outFields: ["*"],
              name: "Lahan Aset Pemda DKI Jakarta",
              placeholder: "cari lahan aset pemda Jakarta",
              maxResults: 10,
              maxSuggestions: 6
            }
            // {
            //   locator: new EsriTaskLocator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
            //   singleLineFieldName: "SingleLine",
            //   name: "ArcGIS World Geocoding Service",
            //   localSearchOptions: {
            //     minScale: 300000,
            //     distance: 50000
            //   },
            //   countryCode: "ID",
            //   placeholder: "Find address or place",
            //   maxResults: 3,
            //   maxSuggestions: 6,
            //   suggestionsEnabled: false,
            //   minSuggestCharacters: 0
            // }
          ]
        });
      });
    } catch (error) {
      console.log("Search Widget failed to load, error : " + error);
    }
  }
}

// let __searchSource = [
// 	{
// 		name: 'Bangunan Gedung Pemda',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/q_massa_gedungpemda/FeatureServer/0/query?',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Cagar Budaya',
// 		outFields: [],
// 		url: 'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/cagarbudaya/MapServer/0/query?',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Informasi Bangunan',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/DCKTRP/dkctrp_pendataan_bangunan_verifikator/FeatureServer/0/query?',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Informasi Rencana Kota',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/js_subblock_dashboard/FeatureServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Kawasan Rawan Banjir',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dsda/DSDA_peta_Rawan_Banjir/FeatureServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Lahan Gedung Pemuda',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/q_kawasan_gedung_pemda/FeatureServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'PBB',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/persil_pbb_gabungan_jakarta_dashboard/FeatureServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Pasar Tradisional',
// 		outFields: [],
// 		url:
// 			'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/1',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Pusat Perbelanjaan',
// 		outFields: [],
// 		url:
// 			'https://jakartasatu.jakarta.go.id/server/rest/services/DCKTRP/pasardanperbelanjaan/FeatureServer/0/query?',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'Ruang Terbuka Hijau',
// 		outFields: [],
// 		url:
// 			'https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/model_gab_rth/FeatureServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'SD-0',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/peta_batas_rw_vs_statistik/MapServer/0',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'SD-1',
// 		outFields: [],
// 		url:
// 			'https://tataruang.jakarta.go.id/server/rest/services/dashboard/peta_batas_rw_vs_statistik/MapServer/1',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	},
// 	{
// 		name: 'SIPPT',
// 		outFields: [],
// 		url: 'https://tataruang.jakarta.go.id/server/rest/services/sippt/SIPPT/FeatureServer/2',
// 		params: new HttpParams()
// 			.set('f', 'json')
// 			.set('where', '1=1')
// 			.set('outFields', '*')
// 			.set('outSr', '4326')
// 			.set('returnCountOnly', 'false')
// 			.set('returnGeometry', 'true')
// 	}
// ];
