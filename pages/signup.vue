<template>

  <div class="signup-container">
    
    <div class="signup-form">
      <form @submit.prevent="handleSignup">
        <div class="input-group">
          
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        
        <button type="submit">Sign Up</button>
        <Message
    v-if="emailWarning"
    severity="warn"
    @close="() => (emailWarning = false)"
    >{{ emailWarningMsg }}</Message
  >
  <Message
    v-if="passwordWarning"
    severity="warn"
    @close="() => (passwordWarning = false)"
    >{{ passwordWarningMsg }}</Message
  >
  <Message
    v-if="passwordMismatch"
    severity="warn"
    @close="() => (passwordMismatch = false)"
  >Passwords do not match.</Message>
      </form>
    </div>
  </div>
</template>

<script setup>
const signUp = useSupabaseClient()
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false);
const loading = ref(false);
const emailWarning = ref(false);
const emailWarningMsg = ref(
  "The email address you entered is not in a valid format. Please check and try again."
);
const passwordWarning = ref(false);
const passwordWarningMsg = ref(
  "The password you entered is not in a valid format. Please check and try again."
);
useHead({
  title: "Signup",
});
const handleSignup = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      passwordMismatch.value = true;
      throw new Error('Passwords do not match');
    }
    if (!isEmailValid(email.value)) {
    emailWarning.value = true;
    loading.value = false;
    throw new Error('Email is not valid');
    }
    if (!isPasswordComplexityValid(password.value)) {
    passwordWarning.value = true;
    loading.value = false;
    throw new Error('Password is not valid');
    }
    // Sign up the user using Supabase authentication
    const { user, error } = await signUp.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) {
      throw error;
    }

    // Handle the signup success
    console.log('Signup successful:', user);
  } catch (error) {
    // Handle errors (e.g., display an error message)
    console.error('Signup failed:', error.message);
  }
};
</script>

<style scoped>


.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
