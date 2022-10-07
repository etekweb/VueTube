<template>
  <div class="mainContainer pt-1">
    <!--   Language Picker   -->
    <v-card
      flat
      class="pb-5 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>{{ lang.language }}</v-card-title>
      <v-card-text>
        <language />
      </v-card-text>
    </v-card>

    <!--   SponsorBlock/RYD Options   -->
    <v-card flat class="pb-5 background" :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ borderRadius: `${roundTweak / 2}rem` }">
      <v-card-title>{{ lang.features }}</v-card-title>
      <div class="toggles">
        <div class="toggle-wrap">
          {{ langEvents.enableryd }}:
          <v-switch v-model="ryd" class="toggle" color="primary" />
        </div>
        <div class="toggle-wrap">
          {{ langEvents.enablespb }}:
          <v-switch v-model="sponsorBlock" class="toggle" color="primary" />
        </div>
      </div>
    </v-card>

    <!--   Backup   -->
    <v-card
      flat
      class="pb-5 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>{{ lang.backup }}</v-card-title>
      <v-card-text>
        <p>{{ lang.backupinfo }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded depressed class="background--text ml-2" color="primary" @click="registryBackup">{{ lang.backup }}</v-btn>
        <v-btn rounded @click="registryRestore">{{ lang.restore }}</v-btn>
      </v-card-actions>
    </v-card>


  </div>
</template>

<script>
import language from "~/components/Settings/language.vue";
export default {
  components: {
    language,
  },
  data() {
    return {
      lang: {},
      langEvents: {},
    };
  },
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
    ryd: {
      get() {
        return this.$store.state.settings.ryd;
      },
      set(newVal) {
        this.$store.commit("settings/setRYD", newVal);
      },
    },
    sponsorBlock: {
      get() {
        return this.$store.state.settings.sponsorBlock;
      },
      set(newVal) {
        this.$store.commit("settings/setSponsorBlock", newVal);
      },
    },
  },
  mounted() {
    const lang = this.$lang();
    this.lang = lang.mods.general;
    this.langEvents = lang.events;
  },
  methods: {
    download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    },

    getRegistry() {
      let keys = [];
      const localStorageKeys = Object.keys(localStorage);
      for (const i in localStorageKeys) {
        const key = localStorageKeys[i];
        const keyValue = localStorage.getItem(key);
        keys.push({ key: key, value: keyValue });
      }
      return keys;
    },

    registryBackup() {
      const file = JSON.stringify({
        scheme: "VueTube Backup",
        version: process.env.version,
        channel: process.env.channel,
        date: Date.now(),
        registry: this.getRegistry()
      });
      this.download("vuetube-backup.json",file);
    },
    registryRestore() {

    }
  }
};
</script>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}

.toggles {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
}
.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.toggle {
  margin-top: 10px;
}
</style>
