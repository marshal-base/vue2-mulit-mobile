import home from './home'

const mutations = {
  setData: (state, obj) => {
    const page = obj.page
    const data = obj.data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        state[page][key] = data[key]
      }
    }
    window.sessionStorage.setItem('PersonalCenter', state.PersonalCenter)
  },
  resetProfileData: (state, page) => {
    const data = JSON.parse(window.tempStateProfile)
    state[page] = data[page] || {}
  }
}

export default Object.assign(mutations, home)
