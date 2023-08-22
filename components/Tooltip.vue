<template>
  <div class="relative flex flex-col group cursor-help">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#2e5fd1"
      viewBox="0 0 256 256"
    >
      <path
        d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
      ></path>
    </svg>
    <div
      class="absolute bottom-0 flex-col items-start hidden mb-6 group-hover:flex"
    >
      <span
        class="relative z-10 p-2.5 text-xs text-center rounded-md leading-none text-N-light whitespace-no-wrap bg-black shadow-lg w-[350px]"
        >{{ text }}</span
      >
      <div class="w-3 h-3 -mt-2.5 rotate-45 ml-1.5 bg-black"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["text"],
};
</script>
