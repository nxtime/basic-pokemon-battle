import { Column } from "./utils/decorators/column";
import { generateUUID } from "./utils/generators";

type ModelDefault = "create" | "edit" | "getAll" | "select" | "errors";

type JoinWithSpace<T extends string, U extends string> = `${T} ${U}`;

type OmitModelDefault<T> = Omit<T, ModelDefault>;

type PossibleKeys<T> = T extends keyof OmitModelDefault<T>
  ? T
  : T extends `${infer U} ${infer V}`
  ? JoinWithSpace<U, PossibleKeys<V>>
  : never;

class Model {
  errors: string = "";
  constructor() { }

  @Column({ type: "string", required: true })
  id: string;

  get getAll() {
    return {
      id: this.id
    }
  }
  // type TSelectTemplate = `${keyof Partial<Omit<typeof this, ModelDefault>>}`;

  // select<K extends Omit<Model, ModelDefault>>(item: { [Key in keyof Omit<K, ModelDefault>]: any } | string) {
  select(item: { [Key in keyof Partial<OmitModelDefault<typeof this>>]: boolean } | PossibleKeys<typeof this>) {
    console.log("Got here: ", item);
    if (!item) return this.getAll;

    if (typeof item === "string") {
      const items = item.split(" ");

      if (items.length === 1) return {
        [item]: (this as { [key: string]: any })[item]
      };

      return items.map((item) => (this as { [key: string]: any })[item]);
    }

    return Object.keys(item).reduce((acc, key) => {
      (acc as any)[key] = (this as { [key: string]: any })[key];
      return acc;
    });
  }

  set create(item: { [key: string]: any }) {
    this.id = generateUUID();

    Object.keys(this.getAll).forEach((key) => {
      if (key === "id") return;
      (this as { [key: string]: any })[key] = item[key];
    });
  }

  edit(item: { [key: string]: any }) {
    Object.entries(item).forEach(([key, value]) => {
      if (!Object.hasOwnProperty.call(this, key)) return;
      (this as { [key: string]: any })[key] = value;
    });

    return this?.errors ?? `${Object.keys(item).join(", ") ?? "item"} was successfully updated`;
  }
}

export default Model;