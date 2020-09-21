<template>
  <v-container transition="slide-y-reverse-transition">
    <template>
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
  name: "AdminCreateMeal",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    restaurantID: {
      type: String,
      required: true
    }
  },
  data: () => ({
    name: "",
    description: "",
    imageURL: "",
    price: "",
    errorMsg: "",
    isLoading: false,
    meal: false,
    processing: false
  }),
  computed: {
    errorState() {
      return !this.isLoading && !this.meal;
    }
  },
  methods: {
    ...mapActions("meal", ["createMeal"]),
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
      const ret = await this.createMeal({
        restaurant: this.restaurantID,
        mealObj: {
          name: this.name,
          description: this.description,
          price: this.price.toString()
        }
      });

      if (ret) {
        return this.$router.push(`/admin/restaurants/${this.restaurantID}`);
      }
    }
  }
};
</script>
