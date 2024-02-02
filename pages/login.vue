<script setup>
import Divider from "primevue/divider";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref(""); // Add a separate variable for the password
const loading = ref(false);
const emailWarning = ref(false);
const emailWarningMsg = ref(
  "The email address you entered is not in a valid format. Please check and try again."
);
useHead({
  title: "Login",
});

const signInWithPassword = async () => {
  loading.value = true;
  if (!isEmailValid(email.value)) {
    emailWarning.value = true;
    loading.value = false;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value, // Use the email variable
    password: password.value, // Use the password variable
  });

  if (error) {
    console.log(error);
    loading.value = false;
  }

  // // Redirect if authenticated
  if (useSupabaseUser().value) {
    return navigateTo({ path: "/confirm" });
  }
};

const handleMessageClose = () => {
  emailWarning.value = false;
};

definePageMeta({
  layout: "loginlayout",
});

const signInWithOAuth = async (provider) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: 'http://localhost:3000/confirm', // Use absolute URL
      },
    });

    if (error) {
      console.error(`Error signing in with ${provider}:`, error.message);
    }
  } catch (error) {
    console.error('Error during OAuth sign-in:', error.message);
  }
};
</script>

<template>
  <h1 class="mt-10 text-center font-semibold">Log in to your account</h1>
  <div class="mt-6 space-y-5">
    <h5 class="text-muted-foreground text-lg text-[#4B4B4B] font-semibold">
      Log in with your email:
    </h5>
    <div class="w-full">
      <span class="p-input-icon-left w-full flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="38"
          viewBox="0 0 37 38"
          fill="none"
          class="svg-login ml-4"
        >
          <g clip-path="url(#clip0_333_370)">
            <path
              d="M0 9.51831C0 8.29168 0.487275 7.1153 1.35463 6.24794C2.22199 5.38059 3.39837 4.89331 4.625 4.89331H32.375C33.6016 4.89331 34.778 5.38059 35.6454 6.24794C36.5127 7.1153 37 8.29168 37 9.51831V28.0183C37 29.2449 36.5127 30.4213 35.6454 31.2887C34.778 32.156 33.6016 32.6433 32.375 32.6433H4.625C3.39837 32.6433 2.22199 32.156 1.35463 31.2887C0.487275 30.4213 0 29.2449 0 28.0183V9.51831ZM4.625 7.20581C4.01169 7.20581 3.42349 7.44945 2.98982 7.88313C2.55614 8.3168 2.3125 8.905 2.3125 9.51831V10.0201L18.5 19.7326L34.6875 10.0201V9.51831C34.6875 8.905 34.4439 8.3168 34.0102 7.88313C33.5765 7.44945 32.9883 7.20581 32.375 7.20581H4.625ZM34.6875 12.7165L23.8002 19.2493L34.6875 25.9486V12.7165ZM34.6089 28.6172L21.5664 20.5906L18.5 22.429L15.4336 20.5906L2.39113 28.6149C2.52253 29.107 2.81273 29.542 3.21666 29.8522C3.6206 30.1625 4.11566 30.3307 4.625 30.3308H32.375C32.884 30.3309 33.3789 30.163 33.7828 29.8532C34.1867 29.5433 34.477 29.1089 34.6089 28.6172ZM2.3125 25.9486L13.1998 19.2493L2.3125 12.7165V25.9486Z"
              fill="#AEAEAE"
            />
          </g>
          <defs>
            <clipPath id="clip0_333_370">
              <rect
                width="37"
                height="37"
                fill="white"
                transform="translate(0 0.268311)"
              />
            </clipPath>
          </defs>
        </svg>
        <InputText
          id="email"
          v-model="email"
          aria-describedby="email-help"
          class="border w-full border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none pl-20"
          required
          size="large"
          placeholder="Email"
        />
      </span>
      <div class="flex flex-col items-center">
        <Message
          v-if="emailWarning"
          severity="warn"
          @close="() => (emailWarning = false)"
          >{{ emailWarningMsg }}</Message
        >
      </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="w-full">
        <span class="p-input-icon-left w-full flex items-center">
          <img
            src="/assets/img/padlock.png"
            class="absolute left-2 ml-4 mb-2"
          />
          <InputText
            id="password"
            v-model="password"
            aria-describedby="password-help"
            class="border w-full border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none pl-20"
            type="password"
            size="large"
            required
            placeholder="Password"
          />
        </span>
      </div>
    </div>

    <div class="flex gap-6 items-center justify-center">
      <div class="w-28 h-[1px] border-b-2"></div>
      <p class="text-lg font-semibold">or continue with</p>
      <div class="w-28 h-[1px] border-b-2"></div>
    </div>
    <div class="flex gap-4 justify-center">
      <Button
          @click="() => signInWithOAuth('google')"
          :disabled="loading"
          class="w-36 h-14 justify-center items-center flex gap-2 bg-white text-gray-500 font-semibold border-gray-300 text-lg"
        >
          <img src="/assets/img/googleLogo.png" />
          Google
        </Button>
      <Button
        @click="() => signInWithOAuth('facebook')"
        :disabled="loading"
        class="w-36 h-14 justify-center items-center flex gap-2 bg-white text-gray-500 font-semibold border-gray-300 text-lg"
        ><img src="/assets/img/facebookLogo.png" />
        Facebook
      </Button>
      <Button
        class="w-36 h-14 justify-center items-center flex gap-2 bg-white text-gray-500 font-semibold border-gray-300 text-lg"
        ><img src="/assets/img/lineLogo.png" />
        Line
      </Button>
    </div>
  </div>
  <div class="flex justify-between mt-6">
    <div class="flex items-center gap-2">
      <Checkbox :binary="true" />
      <p class="font-bold text-lg">Remember me</p>
    </div>
    <NuxtLink
      to="/resetpassword"
      rel="noopener"
      class="text-blue-600 visited:text-blue-600 text-lg font-semibold hover:underline"
    >
      Forgot Password ?</NuxtLink
    >
  </div>

  <Button
    @click="signInWithPassword"
    :disabled="loading.value"
    class="my-10 text-center rounded-2xl h-16 justify-center"
  >
    <div v-if="loading">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else class="text-lg font-bold">SIGN IN</div>
  </Button>
  <div class="flex justify-center gap-6">
    <p class="font-bold text-lg">Don't have an account?</p>
    <NuxtLink
      to="/signup"
      class="text-blue-600 visited:text-blue-600 text-lg font-semibold hover:underline"
      >Create an account</NuxtLink
    >
  </div>
</template>

<style>
.p-input-icon-left > svg {
  top: 25%;
}
</style>
