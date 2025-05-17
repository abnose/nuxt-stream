<template>
  <div class="w-full h-screen p-5 flex items-center justify-center mt-[-3em]">
    <CustomCard :header="'Channel Settings'" :icon="'pi pi-user'" width="auto">
      <div class="flex justify-center z-10 mt-[-2em] p-7">
        <Form
          :initialValues="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full sm:w-120"
        >
          <!-- Username -->
          <FormField
            v-slot="$field"
            name="username"
            class="flex flex-col gap-1"
          >
            <InputText v-bind="$field" placeholder="Username" />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <!-- Title -->
          <FormField v-slot="$field" name="title" class="flex flex-col gap-1">
            <InputText v-bind="$field" placeholder="Title" />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <!-- Description -->
          <FormField
            v-slot="$field"
            name="description"
            class="flex flex-col gap-1"
          >
            <Textarea v-bind="$field" placeholder="Description" />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <!-- Image -->
          <FormField
            v-slot="$field"
            name="image"
            class="flex w-full flex-col gap-1"
          >
            <div class="flex justify-between w-full items-center gap-6">
              <FileUpload
                mode="basic"
                @select="onFileSelect"
                customUpload
                auto
                accept="image/*"
                :maxFileSize="1000000"
                chooseLabel="Upload Image"
                class="p-button-outlined w-full"
              />
              <div v-if="!src" class="flex items-center justify-center">
                <i class="pi pi-image text-3xl text-gray-400"></i>
              </div>

              <div v-else class="flex gap-5">
                <div
                  @click="
                    () => {
                      initialValues.image = null;
                      src = null;
                    }
                  "
                  class="flex items-center justify-center"
                >
                  <i class="pi pi-times text-3xl text-red-400"></i>
                </div>

                <img
                  v-if="src"
                  :src="src"
                  alt="Image Preview"
                  class="shadow-md rounded-full w-10 h-10"
                  style="filter: grayscale(100%)"
                />
              </div>
            </div>
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <Button type="submit" severity="secondary" label="Edit" />
        </Form>
      </div>
    </CustomCard>
  </div>
</template>
<script setup>
import CustomCard from "~/components/CustomCard.vue";
import { reactive, ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "~/stores/user";
const user = useUserStore();

const toast = useToast();
const src = ref(null);

// 🔧 Define full form schema
const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  image: z.any().refine((file) => file instanceof File || file === null, {
    message: "Image is required.",
  }),
});

// 🌱 Initial values for form
const initialValues = reactive({
  username: "",
  title: "",
  description: "",
  image: null,
});

// 📦 Form resolver
const resolver = zodResolver(schema);

// 📷 File upload logic
function onFileSelect(event) {
  const file = event.files[0];
  if (file) {
    initialValues.image = file; // Save to form state

    const reader = new FileReader();
    reader.onload = (e) => {
      src.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const onFormSubmit = async ({ valid, values }) => {
  if (!valid) return;

  const formData = new FormData();
  formData.append("username", values.username);
  formData.append("title", values.title);
  formData.append("description", values.description);
  console.log(values);
  if (initialValues.image instanceof File) {
    formData.append("image", initialValues.image);
  }

  console.log(initialValues.image);

  try {
    const res = await $fetch("/channel/channelsettings", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    message(toast, "Success", "Channel Edited Successfully.");
    console.log(res);
    user.setUser(res.user);
  } catch (err) {
    console.log(err);
    if (err?.data?.data?.fieldErrors) {
      // Zod error format
      const fieldErrors = err.data.data.fieldErrors;
      Object.values(fieldErrors).forEach((messages) => {
        if (Array.isArray(messages) && messages.length > 0) {
          message(toast, "Error", messages[0]);
        }
      });
    } else if (err?.data?.message) {
      // Custom error message from backend
      message(toast, "Error", err.data.message);
    } else {
      // Fallback error
      message(
        toast,
        "Error",
        "Something went wrong while submitting the form."
      );
      console.error("Submission error:", err);
    }
  }
};

onMounted(async () => {
  const isValid = await useCheckAuth();
  if (!isValid) return;
});
</script>
