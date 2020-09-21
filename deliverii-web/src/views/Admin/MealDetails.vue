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
                name="price"
                :rules="{ required: true, regex: /^\d*\.?\d*$/ }"
              >
                <v-text-field
                  v-model="price"
                  label="Price"
                  :error-messages="errors"
                ></v-text-field>
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
    </template>
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
import { mapActions } from "vuex";
import ErrorPage from "@/components/ErrorPage";
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

extend("regex", {
  ...regex,
  message: "Must be a valid number"
});

export default {
  name: "AdminMealPage",
  components: {
    ValidationProvider,
    ValidationObserver,
    ErrorPage,
    LoadingPage
  },
  props: {
    restaurantID: {
      type: String,
      required: true
    },
    mealID: {
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
    isLoading: true,
    meal: false,
    processing: false
  }),
  computed: {
    errorState() {
      return !this.isLoading && !this.meal;
    }
  },
  methods: {
    ...mapActions("meal", ["fetchMeal", "updateMeal"]),
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
    }
  },
  async mounted() {
    const meal = await this.fetchMeal({
      restaurant: this.restaurantID,
      meal: this.mealID
    });
    if (meal) {
      this.name = meal.name;
      this.description = meal.description;
      this.imageURL = meal.image;
      this.price = meal.price;
      this.meal = meal;
    }
    this.isLoading = false;
  }
};
</script>
