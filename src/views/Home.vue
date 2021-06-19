<template>
  <v-container>
     <h1 class="text-center mb-6" style="font-size: 50px;">
            😷 Latihan Vue - Data statistik COVID-19
      </h1>
      <h1 class="font-weight-bold basil--text">
        <a style="color: blue;">#</a> Pertanyaan umum
      </h1>

      <!-- Faqs -->
      <v-expansion-panels>
        <v-expansion-panel v-for="(faq, i) in faqs" :key="i">
          <v-expansion-panel-header>
            {{ faq.q }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ faq.a }}<br /><br />Referensi: <code>{{ faq.source ? faq.source : "-" }}</code>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </v-container>
</template>

<script>
import faqs from "../faqs.json";
export default {
  name: 'Home',
  data: () => ({
    faqs
  })
}
</script>
