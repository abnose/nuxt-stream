<template>
  <div class="w-full h-screen p-5 flex items-center justify-center mt-[-3em]">
    <CustomCard
      :header="'Change Password'"
      :icon="'pi pi-lock'"
      width="33px"
      style="width: 25%"
    >
      <div class="flex justify-center z-10 mt-[-2em] p-7">
        <Form
          :initialValues="initialValues"
          :resolver="resolver"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full"
        >
          <!-- Current Password -->
          <FormField
            v-slot="$field"
            name="currentPassword"
            class="flex flex-col gap-1 w-63"
          >
            <Password
              v-bind="$field"
              placeholder="Current Password"
              toggleMask
              :feedback="false"
              class="w-full"
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <!-- New Password -->
          <FormField
            v-slot="$field"
            name="newPassword"
            class="flex flex-col gap-1 w-63"
          >
            <Password v-bind="$field" placeholder="New Password" toggleMask />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <!-- Confirm Password -->
          <FormField
            v-slot="$field"
            name="confirmPassword"
            class="flex flex-col gap-1 w-63"
          >
            <Password
              v-bind="$field"
              placeholder="Confirm New Password"
              toggleMask
            />
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ $field.error?.message }}
            </Message>
          </FormField>

          <Button type="submit" label="Change Password" />
        </Form>
      </div>
    </CustomCard>
  </div>
</template>

<script setup>
import CustomCard from "~/components/CustomCard.vue";
import { reactive } from "vue";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useUserStore } from "~/stores/user";
// import { message } from "~/composables/useMessage";

const user = useUserStore();
const toast = useToast();

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const initialValues = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const resolver = zodResolver(schema);

const onFormSubmit = async ({ valid, values }) => {
  if (!valid) return;

  try {
    const res = await $fetch("/profile/changePassword", {
      method: "POST",
      body: values,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    message(toast, "Success", res.message || "Password changed successfully.");
  } catch (err) {
    if (err?.data?.message) {
      message(toast, "Error", err.data.message);
    } else {
      message(toast, "Error", "Something went wrong.");
    }
  }
};
</script>
