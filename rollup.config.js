import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: ["src/index.js"],
  output: {
    file: "build/index.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve(),
    copy({
      "src/index.html": "build/index.html"
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development")
    })
  ]
};
