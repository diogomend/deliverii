<template>
  <v-container transition="slide-y-reverse-transition">
    <loading-page v-if="isLoading"></loading-page>
    <error-page v-else-if="errorState"></error-page>
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
                    >Update</v-btn
                  >
                </v-flex>
              </v-layout>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
      <v-layout
        class="mt-10 mx-5"
        row="row"
        align-center="align-center"
        justify-end="justify-end"
      >
        <v-flex class="text-right" xs6="xs6">
          <v-btn
            class="ma-0 text-none"
            type="submit"
            color="error"
            :disabled="processing"
            @click="showDeleteDialog"
            >Delete Restaurant</v-btn
          >
        </v-flex>
      </v-layout>
    </template>
    <confirm-dialog
      :open="openModal"
      @close="openModal = false"
      @confirm="confirmDelete"
    >
      <div slot="title">Wish to delete Restaurant?</div>
      <div slot="description">
        This action could not be reversed and will lose access to Orders made
      </div>
    </confirm-dialog>
  </v-container>
</template>

<script>
import { required, email, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

import { FOOD_TYPES } from "@/config/config";
import { mapActions } from "vuex";
import ErrorPage from "@/components/ErrorPage";
import LoadingPage from "@/components/LoadingPage";
import ConfirmDialog from "@/components/helpers/ConfirmDialog";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});

extend("regex", {
  ...regex,
  message: "Must be a valid number"
});

export default {
  name: "AdminRestaurantEdit",
  components: {
    ValidationProvider,
    ValidationObserver,
    ErrorPage,
    LoadingPage,
    ConfirmDialog
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    name: "",
    description: "",
    imageURL: "",
    price: 0,
    errorMsg: "",
    foodTypes: "",
    isLoading: true,
    restaurant: false,
    processing: false,
    items: FOOD_TYPES,
    openModal: false
  }),
  computed: {
    errorState() {
      return !this.isLoading && !this.restaurant;
    }
  },
  methods: {
    ...mapActions("restaurant", ["fetchRestaurantInfo", "deleteRestaurant"]),
    handleSubmit() {
      this.errorMsg = "";
      this.processing = true;
      this.$refs.observer
        .validate()
        .then(valid => {
          if (valid) {
            this.tryUpdate();
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
    async tryUpdate() {
      await this.updateMeal({
        restaurant: this.restaurantID,
        mealID: this.mealID,
        mealObj: {
          name: this.name,
          description: this.description,
          price: this.price.toString()
        }
      });
    },
    showDeleteDialog() {
      this.openModal = true;
    },
    async confirmDelete() {
      const result = await this.deleteRestaurant(this.id);
      if (result) {
        this.$router.push("/admin/restaurants");
      }
    }
  },
  async mounted() {
    const restaurant = await this.fetchRestaurantInfo(this.id);
    if (restaurant) {
      this.name = restaurant.name;
      this.description = restaurant.description;
      this.foodType = restaurant.foodType;
      this.restaurant = restaurant;
    }
    this.isLoading = false;
  }
};
</script>
