<template>
  <div>
    <Header />
  </div>
</template>

<script>
export default {
  name: "Home",
  middleware: "auth",
};
</script>
