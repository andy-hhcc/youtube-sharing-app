import { SSTConfig } from "sst";
import { YoutubeSharingStack } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "youtube-sharing-app",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(YoutubeSharingStack);
  }
} satisfies SSTConfig;
