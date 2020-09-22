<template>
  <v-container
    fill-height="fill-height"
    align-center="align-center"
    justify-center="justify-center"
    transition="slide-y-reverse-transition"
  >
    <v-card width="480px">
      <v-card-title class="justify-center">Create Account</v-card-title>
      <v-card-text>
        <ValidationObserver ref="observer">
          <form @submit.prevent="handleSubmit">
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="original"
              rules="required"
            >
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                :error-messages="errors"
                @click:append="show1 = !show1"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="password2"
              rules="required|password:@original"
            >
              <v-text-field
                v-model="password2"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                label="Confirm Password"
                :error-messages="errors"
                @click:append="show2 = !show2"
                ref="password"
              ></v-text-field>
            </ValidationProvider>
            <v-checkbox
              v-model="isManager"
              label="Restaurant Manager Account"
            ></v-checkbox>
            <v-layout
              class="mx-0"
              row="row"
              align-center="align-center"
              justify-end="justify-end"
            >
              <v-flex xs6="xs6">
                <v-btn
                  class="ma-0 text-none"
                  data-test="signup-link"
                  text="text"
                  color="primary"
                  :to="{ name: 'Login' }"
                  >Already have an account? Login</v-btn
                >
              </v-flex>
              <v-flex class="text-right" xs6="xs6">
                <v-btn
                  class="ma-0 text-none"
                  type="submit"
                  color="primary"
                  :disabled="processing"
                  >Register</v-btn
                >
              </v-flex>
            </v-layout>
            <transition transition="slide-y-reverse-transition">
              <v-alert v-show="errorMsg != ''" mt-5 type="error" class="mt-5">
                {{ errorMsg }}
              </v-alert>
            </transition>
          </form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
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

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match"
});

export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    password2: "",
    isManager: false,
    processing: false,
    show1: false,
    show2: false,
    errorMsg: ""
  }),

  methods: {
    ...mapActions("auth", ["register"]),
    handleSubmit() {
      this.errorMsg = "";
      this.processing = true;
      this.$refs.observer
        .validate()
        .then(valid => {
          if (valid) {
            this.tryRegister();
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
    async tryRegister() {
      const res = await this.register({
        name: this.name,
        email: this.email,
        password: this.password,
        isManager: this.isManager
      });

      if (res) {
        return this.$router.push("/login");
      }
    }
  }
};
</script>
