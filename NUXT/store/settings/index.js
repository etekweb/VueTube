export const state = () => ({
  sponsorBlock: false,
  ryd: false,
});
export const mutations = {
  initSettings(state) {
    if (process.client) {
      console.log("init");
      if (localStorage.getItem("sponsorBlock")) {
        state.sponsorBlock = true;
      }
      if (localStorage.getItem("ryd")) {
        state.ryd = true;
      }
    }
  },
  setSponsorBlock(state, payload) {
    state.sponsorBlock = payload;
    localStorage.setItem("sponsorBlock", payload);
  },
  setRYD(state, payload) {
    state.ryd = payload;
    localStorage.setItem("ryd", payload);
  },
};
