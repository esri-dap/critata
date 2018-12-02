import { Component, OnInit,  } from '@angular/core';

import { loadModules } from "esri-loader";
import { MapStateService } from "../../@core/data/mapstate.service";

@Component({
  selector: 'map-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})

export class MapSearchComponent implements OnInit {


  constructor(private mapStateService: MapStateService) {
    //
  }

  ngOnInit() {
    this.initWidget_Search();
  }

  async initWidget_Search() {
    try {
      const [
        EsriWidgetSearch,
        EsriPopupTemplate,
      ] = await loadModules([
        "esri/widgets/Search",
        "esri/PopupTemplate",
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
              placeholder: "Cari batas sublock zonasi",
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
              placeholder: "Cari stasiun kereta api",
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
              placeholder: "Cari kawasan rawan banjir",
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
              placeholder: "Cari panduan rancang bangun kota",
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
              placeholder: "Cari nomor objek pajak (PBB)",
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
              placeholder: "cari RTH pemda Jakarta",
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
              placeholder: "Cari bangunan aset pemda Jakarta",
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
              maxSuggestions: 6,
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
          ],
        });
      });
      
    } catch (error) {
      console.log("Search Widget failed to load, error : " + error);
    }
  }
   
}