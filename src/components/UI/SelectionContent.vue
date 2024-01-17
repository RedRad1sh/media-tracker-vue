<template>
  <select v-model="selectedValue" @change="switchSelect($event)">
    <option value="-">-</option>
    <option v-for="cnttype in arraylist" :key="cnttype" :value="cnttype">
      {{ cnttype }}
    </option>
  </select>
</template>

<script>
import axios from "axios";
import { config } from "@/config/config.js";
import UserStorage from "@/service/user-storage-service";
import {
  filmStatuses,
  gameStatuses,
  bookStatuses,
} from "@/service/global-constants.js";

export default {
  props: {
    ObjectType: {
      type: String,
      required: true,
    },
    ObjectId: {
      type: String,
      required: true,
    },
    ObjectAction: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedValue: this.ObjectAction,
    };
  },
  computed: {
    arraylist() {
      if (this.ObjectType === "Movie") {
        return filmStatuses;
      } else if (this.ObjectType === "Game") {
        return gameStatuses;
      } else if (this.ObjectType === "Book") {
        return bookStatuses;
      } else {
        return [];
      }
    },
  },

  watch: {
    ObjectAction: {
      handler(newValue, oldValue) {
        this.selectedValue = this.ObjectAction;
      },
      immediate: true,
    },
  },

  methods: {
    switchSelect(event) {
      this.selectedValue = event.target.value;
      let backendUrl = `${config.backend.url}/lists`;
      const userId = UserStorage.getUser().id;

      const dataToSend = {
        user_id: userId,
        content_type: this.ObjectType,
        content_id: this.ObjectId,
        action: this.selectedValue,
      };

      if (dataToSend.action !== "-") {
        axios
          .put(backendUrl, dataToSend)
          .then((response) => {
            this.$emit("selectChanged");
            this.$notify({
              group: "nots",
              type: "success",
              title: "Успех",
              text: "Контент успешно добавлен в список",
            });
          })
          .catch((error) => {
            console.error("Ошибка при отправке данных:", error);
            this.$notify({
              group: "nots",
              type: "error",
              title: "Ошибка",
              text: "Не удалось добавить контент в список",
            });
          });
      } else {
        axios.delete(backendUrl + `/user/${userId}/content/${this.ObjectId}`);
        this.$emit("selectChanged");
        this.$notify({
          group: "nots",
          type: "success",
          title: "Успех",
          text: "Контент успешно удален из списка",
        });
      }
    },
  },
};
</script>

<style scoped>
select {
  position: relative;
  transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  border: 0;
  font-family: var(--dl-font-family);
  text-align: center;
  background: rgba(100, 100, 255, 0.3);
  color: white;
  font-size: 20px;
  padding: 5px;
  height: 35px;
}
</style>
