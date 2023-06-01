import { SSTConfig } from "sst";
import { YoutubeSharingStack } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sharing-youtube-app",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(YoutubeSharingStack);
  }
} satisfies SSTConfig;
