import { Base } from "./base";

export interface Video extends Base {
  id: string
  url: string
  createdBy: string
}
