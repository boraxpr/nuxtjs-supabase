<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2>Sign Up</h2>
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
      </form>
    </div>
  </div>
</template>

<script setup>
const signUp = useSupabaseClient()
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSignup = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match');
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
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #2e2e2e, #1c1c1c);
}

.signup-form {
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
