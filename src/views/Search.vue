<template>
    <v-container fluid>
        <h1 class="text-center mb-6" style="font-size: 50px;">
            😷 Pencarian statistik data COVID-19
        </h1>
        <v-form class="text-center">
            <v-text-field v-model="country" label="Negara / Country (Contoh: Indonesia)" clearable solo></v-text-field>
            <v-btn class="mx-2" fab dark large color="blue" :loading="loading" @click="searchClick()">
                <v-icon dark>
                    mdi-text-search
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark large color="teal" :loading="loading1" @click="showTables()">
                <v-icon dark>
                    mdi-file-table
                </v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark large color="red" @click="deleteData()">
                <v-icon dark>
                    mdi-trash-can-outline
                </v-icon>
            </v-btn>
            <v-btn @click="openedModel = !openedModel" v-if="showingTable" color="aqua" large fab dark>
                <v-icon dark>
                    mdi-information
                </v-icon>
            </v-btn>
        </v-form>

        <v-alert v-if="message.t" border="right" colored-border :type="message.t" elavation="1">
            {{ message.v }}
        </v-alert>
        <v-simple-table v-if="showingTable">
            <thead>
                <tr>
                    <th class="text-left">
                        #
                    </th>
                    <th class="text-left">
                        Meta
                    </th>
                    <th class="text-left">
                        Jumlah
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>🔖 Kasus</td>
                    <td>{{ jsonResult.cases.toLocaleString() }}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>☠️ Kematian</td>
                    <td>{{ jsonResult.deaths.toLocaleString() }}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>😁 Kesembuhan</td>
                    <td>{{ jsonResult.recovered.toLocaleString() }}</td>
                </tr>
            </tbody>
        </v-simple-table>

        <v-bottom-sheet v-model="openedModel" v-if="openedModel">
            <v-sheet class="text-center">
                <v-btn class="mt-6" text color="red" @click="openedModel = !openedModel">
                    <v-icon dark>
                        mdi-close
                    </v-icon>
                </v-btn>

                <div class="py-3">
                    <h1>
                        📆 Kasus hari ini di <b>{{ jsonResult.country }}</b>
                    </h1>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    #
                                </th>
                                <th class="text-left">
                                    Meta
                                </th>
                                <th class="text-left">
                                    Jumlah
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>📈 Kasus</td>
                                <td>{{ jsonResult.todayCases.toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>☠️ Kematian</td>
                                <td>{{ jsonResult.todayDeaths.toLocaleString() }}</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>😷 Kesembuhan</td>
                                <td>{{ jsonResult.todayRecovered.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </v-container>
</template>
<script>
import axios from "axios";
import setAsDefault from "../utils/setDefault";

export default {
    name: "search",
    data: () => ({
        loading: false,
        loading1: false,
        fetched: false,
        country: "",
        jsonResult: {},
        showingTable: false,
        message: {},
        openedModel: false
    }),
    methods: {
        searchClick() {
            this.loading = true;
            const negara = this.country;
            if (!negara || negara.length < 5) {
                this.loading = false;
                this.message = {
                    v: "🙅‍♂️ Nama negara harus lebih dari 5",
                    t: "error"
                }
            }
            else {
                axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(negara)}`).then((response) => {
                    if (this.message) delete this.jsonResult.message;
                    const json = response.data;
                    this.jsonResult = json;
                    this.fetched = true;
                    this.loading = false;
                    this.message = {
                        v: "🙋‍♂️ Sukses mendapatkan data, silahkan klik tombol yang berwarna hijau untuk menampilkan hasil",
                        t: "success"
                    }
                }).catch((e) => {
                    console.debug(e);
                    this.loading = false;
                    if (e.response.status != 404) this.message = {
                        v: "☹️ Ada kesalahan yang terjadi, coba lagi!",
                        t: "error"
                    }
                    else this.message = {
                        v: "😬 Negara yang kamu cari tidak ada!",
                        t: "error"
                    }
                });
            }
        },

        showTables() {
            this.loading1 = true;
            setTimeout(() => {
                this.loading1 = false;
                if (!this.fetched || !this.jsonResult.updated) this.message = {
                    v: "🤖 Klik cari terlebih dahulu sebelum membuat tabel!",
                    t: "error"
                }
                else {
                    this.showingTable = !this.showingTable;
                    this.message = {
                        t: "success",
                        v: `✍️ Sukses ${this.showingTable ? "menampilkan" : "menyembunyikan"} tabel negara ${this.jsonResult.country}`
                    }
                }
            }, 1000);
        },

        deleteData() {
            const vals = Object.keys(this.$data);
            vals.forEach(d => {
                this.$data[d] = setAsDefault(this.$data[d]);
            });
            this.message = {
                v: "♻️ Sukses me-reset semua data",
                t: "success"
            }
        }
    }
}
</script>