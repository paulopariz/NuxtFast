<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="flex gap-2 items-end mb-5">
      <h1 class="text-black tracking-wide text-3xl font-bold">Entrar na conta</h1>
      <div class="font-extrabold bg-emerald-600 rounded-full h-2 w-2 -mt-2"></div>
    </div>

    <form @submit.prevent="pressed" class="flex flex-col gap-7">
      <input
        type="text"
        name="Email"
        placeholder="Email"
        v-model="email"
        class="border border-gray-950 p-3"
      />
      <input
        type="password"
        name="Senha"
        placeholder="Senha"
        v-model="password"
        class="border border-gray-950 p-3"
      />

      <button type="submit" class="px-5 py-3 bg-emerald-600 text-white">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    pressed() {
      alert("form submitted");
    },
  },
};
</script>

<style></style>
