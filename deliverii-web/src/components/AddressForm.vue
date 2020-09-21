<template>
  <v-container transition="slide-y-reverse-transition">
    <template>
      <v-card-text>
        <ValidationObserver ref="observer">
          <form @submit.prevent="handleSubmit">
            <ValidationProvider
              v-slot="{ errors }"
              name="Address"
              rules="required"
            >
              <v-text-field
                :error-messages="errors"
                label="Address"
                v-model="addr1"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Address 2">
              <v-text-field
                v-model="addr2"
                label="Address 2"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="City"
              :rules="{ required: true }"
            >
              <v-text-field
                v-model="city"
                label="City"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Postcode"
              :rules="{ required: true }"
            >
              <v-text-field
                v-model="postCode"
                label="Postcode"
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
                  >Confirm Order</v-btn
                >
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-card-text>
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
  name: "AddressForm",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    addr1: "",
    addr2: "",
    city: "",
    postCode: "",
    errorMsg: "",
    processing: false
  }),
  methods: {
    ...mapActions("order", ["addAddress"]),
    handleSubmit() {
      this.errorMsg = "";
      this.processing = true;
      this.$refs.observer
        .validate()
        .then(valid => {
          if (valid) {
            this.addAddress({
              addr1: this.addr1,
              addr2: this.addr2,
              city: this.city,
              postCode: this.postCode
            });

            this.$emit("confirm");
          }
        })
        .finally(() => {
          this.processing = false;
        });
    }
  }
};
</script>
