import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        chooseuser: resolve(__dirname, "src/pages/choose-user-page.html"),
        assigner: resolve(__dirname, "src/pages/Assigner.html"),
        Assignee: resolve(__dirname, "src/pages/Assignee.html"),
        User: resolve(__dirname, "src/pages/User.html"),
      },
    },
  },
});
