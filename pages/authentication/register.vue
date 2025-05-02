<template>
  <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-sm border border-solid border-gray-300 sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto flex items-center justify-center flex-col">
          <div>
            <h1 class="text-2xl mb-5 flex-col flex items-center gap-2">
              <i class="pi pi-user text-sky-500" style="font-size: 3rem"></i>
              <NuxtLink class="text-gray-500 text-sm" to="/authentication/login"
                >Already have an account?
                <span class="text-sky-500"> Sign Up </span>
              </NuxtLink>
            </h1>
          </div>
          <form @submit.prevent="submitForm">
            <div class="text-base w-[20em] grid gap-3">
              <FloatLabel variant="on">
                <InputText
                  id="username"
                  class="w-full"
                  v-model="form.username"
                  :invalid="!!errors.username"
                />
                <label for="username">Username</label>
              </FloatLabel>
              <small v-if="errors.username" class="text-red-400 text-sm ml-2">
                {{ errors.username }}
              </small>
              <FloatLabel variant="on">
                <InputText
                  id="email"
                  class="w-full"
                  v-model="form.email"
                  :invalid="!!errors.email"
                />
                <label for="email">Email</label>
              </FloatLabel>
              <small v-if="errors.email" class="text-red-400 text-sm ml-2">
                {{ errors.email }}
              </small>
              <FloatLabel variant="on">
                <InputText
                  id="password"
                  type="password"
                  class="w-full"
                  :invalid="!!errors.password"
                  v-model="form.password"
                />
                <label for="password">Password</label>
              </FloatLabel>
              <small v-if="errors.password" class="text-red-400 text-sm ml-2">
                {{ errors.password }}
              </small>

              <Button type="submit" :loading="loading" class=""> login </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
import { message } from "~/utils/message";
import { RegisterSchema } from "~/validation/userValidation";
import { useUserStore } from "~/stores/user";
const user = useUserStore();
const loading = ref(false);
const form = ref({
  username: "",
  email: null,
  password: "",
});

const isSubmited = ref(false);

const errors = ref<Record<string, string>>({});

watch(
  () => [form.value.username, form.value.password, form.value.email],
  () => {
    if (!isSubmited.value) return;
    const { status, errors: validationErrors } = validateForm();
    errors.value = validationErrors;
  }
);

function validateForm() {
  const result = RegisterSchema.safeParse(form.value);

  if (!result.success) {
    const errorMap: Record<string, string> = {};
    result.error.errors.forEach((e) => {
      if (e.path[0]) {
        errorMap[e.path[0]] = e.message;
      }
    });
    return {
      status: false,
      errors: errorMap,
    };
  }

  return {
    status: true,
    errors: {},
  };
}

async function submitForm() {
  const { status, errors: validationErrors } = validateForm();
  errors.value = validationErrors;
  isSubmited.value = true;
  if (!status) {
    return;
  }
  try {
    const response: any = await $fetch("/auth/register", {
      server: false,
      method: "POST",
      body: { ...form.value },
    });

    if (response.statusCode != 200) return;

    message(toast, "Success", response.message);

    user.setUser(response.data);
  } catch (err: any) {
    if (err.data.data?.fieldErrors) {
      Object.values(err.data.data?.fieldErrors).forEach((element) => {
        console.log(element);
        message(toast, "Error", element[0]);
      });
    } else {
      message(toast, "Error", err.statusMessage);
    }
  }
}
</script>
