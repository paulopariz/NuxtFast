export default ({ app }) => {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
  }

  if (darkModeMediaQuery.matches) {
    toggleDarkMode();
  }

  darkModeMediaQuery.addListener(toggleDarkMode);

  app.router.afterEach(() => {
    if (darkModeMediaQuery.matches) {
      toggleDarkMode();
    }
  });
};
