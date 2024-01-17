import {addUserConnection, removeUserConnection} from "../../users";

export default {
  mounted () {
    addUserConnection(this.el.dataset.userUuid)
  },

  destroyed () {
    removeUserConnection(this.el.dataset.userUuid)
  }
}
