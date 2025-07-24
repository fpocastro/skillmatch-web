import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import * as dotenv from "dotenv";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const isRsdoctorActive = process.env.RSDOCTOR === "true";

const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    isDev ? new ReactRefreshRspackPlugin() : null,
    new rspack.DefinePlugin({
      "process.env.COGNITO_USER_POOL_ID": JSON.stringify(
        process.env.COGNITO_USER_POOL_ID
      ),
      "process.env.COGNITO_CLIENT_ID": JSON.stringify(
        process.env.COGNITO_CLIENT_ID
      ),
      "process.env.COGNITO_REGION": JSON.stringify(process.env.COGNITO_REGION),
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
    }),
    isDev && isRsdoctorActive ? new RsdoctorRspackPlugin({}) : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
