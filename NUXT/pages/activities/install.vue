<template>
  <div>
    <center ref="stage0" class="container">
      <v-img
        src="/icon.svg"
        width="10rem"
        height="10rem"
        :class="$vuetify.theme.dark ? '' : 'invert'"
      />
      <h1>{{ lang.welcome }}</h1>
      <p>{{ lang.tagline }}</p>
    </center>

    <center ref="stage1" class="container hidden">
      <h1>{{ lang.langsetup }}</h1>
      <language style="width: 80%" />
    </center>

    <!--
    <center class="container hidden" ref="stage2">
      <v-autocomplete
      label="API"
      :items="apis"
      style="border-top-right-radius: 1rem !important; border-top-left-radius: 1rem !important; box-shadow: none !important"
      solo
      filled
      class="mx-8"
      ></v-autocomplete>
    </center>
-->

    <center ref="stage2" class="container hidden" style="width: 76%">
      <h1>{{ lang.featuresetup }}</h1>
      <!-- <v-checkbox v-model="ryd" disabled :label="lang.enableryd" />
      <v-checkbox v-model="sponsorBlock" disabled :label="lang.enablespb" /> -->
      <v-switch v-model="ryd" :label="lang.enableryd" color="primary" />
      <v-switch
        v-model="sponsorBlock"
        :label="lang.enablespb"
        color="primary"
      />
    </center>
    <center ref="stage3" class="container hidden">
      <h1>{{ lang.thanks }}</h1>
      <h3>{{ lang.enjoy }}</h3>
    </center>

    <v-btn class="rounded-xl primary nextButton" @click="next()"
      >{{ lang.next }}
      <v-icon style="margin-left: 0.5em">mdi-arrow-right</v-icon></v-btn
    >
  </div>
</template>

<script>
import language from "~/components/Settings/language.vue";
export default {
  components: {
    language,
  },
  layout: "empty",
  data() {
    return {
      lang: {},
      stage: 0,
      apis: ["youtube.com", "twitch.tv", "odysee.com"],
    };
  },
  computed: {
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
    this.lang = this.$lang("events");
  },
  methods: {
    next() {
      this.$refs["stage" + this.stage].style.display = "none";
      this.stage++;

      if (!this.$refs["stage" + this.stage]) {
        localStorage.setItem("lastRunVersion", process.env.version);
        localStorage.setItem("firstTimeSetupComplete", true);
        this.$router.replace("/");
      }

      this.$refs["stage" + this.stage].style.display = "block";
    },
  },
};
</script>

<style scoped>
.nextButton {
  position: absolute;
  bottom: 1em;
  right: 2em;
}

.hidden {
  display: none;
}

.fullWidth {
  width: 100%;
}

.container {
  width: 100%;
}
</style>
