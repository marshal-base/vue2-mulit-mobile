import home from './home';

const state = {
  home,
};

if (!window.tempStateProfile) {
  window.tempStateProfile = JSON.stringify(state);
}

export default state;
