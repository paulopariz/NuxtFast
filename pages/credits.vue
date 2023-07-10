<template>
  <div>
    <h1>{{ user.login }}</h1>
  </div>
</template>
<script>
export default {
  name: "Credits",
  data() {
    return {
      user: [],
    };
  },

  async fetch() {
    const urlGit = "https://api.github.com/users/paulopariz";
    const user = await fetch(urlGit).then((response) => response.json());
    this.user = user;
    console.log(this.user);
  },
};
</script>
