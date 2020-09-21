<template>
  <v-container transition="slide-y-reverse-transition">
    <loading-page v-if="isLoading"></loading-page>
    <template v-else>
      <v-card>
        <v-card-text>
          <ValidationObserver ref="observer">
            <form @submit.prevent="handleSubmit">
              <ValidationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required"
              >
                <v-text-field
                  :error-messages="errors"
                  label="Name"
                  v-model="name"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="description"
                rules="required"
              >
                <v-text-field
                  v-model="description"
                  label="Description"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="Food Type"
                :rules="{ required: true }"
              >
                <v-select
                  :items="items"
                  label="Food Type"
                  :error-messages="errors"
                  v-model="foodType"
                ></v-select>
              </ValidationProvider>
              <v-layout
                class="mx-0"
                row="row"
                align-center="align-center"
                justify-end="justify-end"
              >
                <v-flex class="text-right" xs6="xs6">
                  <v-btn
                    class="ma-0 text-none"
                    type="submit"
                    color="primary"
                    :disabled="processing"
                    >Create</v-btn
                  >
                </v-flex>
              </v-layout>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

import { FOOD_TYPES } from "@/config/config";
import { mapActions } from "vuex";
import LoadingPage from "@/components/LoadingPage";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});


export default {
  name: "AdminRestaurantEdit",
  components: {
    ValidationProvider,
    ValidationObserver,
    LoadingPage
  },
  data: () => ({
    name: "",
    description: "",
    imageURL: "",
    price: 0,
    errorMsg: "",
    foodType: "",
    isLoading: false,
    processing: false,
    items: FOOD_TYPES,
    openModal: false,
    testeError: "Erro"
  }),
  methods: {
    ...mapActions("restaurant", ["createRestaurant"]),
    handleSubmit() {
      this.errorMsg = "";
      this.processing = true;
      this.$refs.observer
        .validate()
        .then(valid => {
          if (valid) {
            this.tryCreate();
          }
        })
        .finally(() => {
          this.processing = false;
        });
    },
    clear() {
      this.password = "";
      this.email = "";
      this.$refs.observer.reset();
    },
    async tryCreate() {
      const ret = await this.createRestaurant({
        name: this.name,
        description: this.description,
        foodType: this.foodType
      });

      if (ret) {
        return this.$router.push("/admin/restaurants");
      }
    }
  }
};
</script>
