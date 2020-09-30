import Note from "./note";
import { Record } from "immutable";
import moment from "moment";
import { StringUtils } from "andculturecode-javascript-core";
import uuid from "../utils/uuid";

const defaultValues: Note = {
  id: "",
  lastUpdated: "",
  title: "",
  content: "",
};

export default class NoteRecord extends Record(defaultValues) implements Note {
  constructor(params?: Partial<Note>) {
    if (params == null) {
      params = { ...defaultValues };
    }

    params = Object.assign({}, defaultValues, params);

    super(params);
  }

  public with(values: Partial<Note>): NoteRecord {
    return new NoteRecord(Object.assign(this.toJS(), values));
  }

  public isPersisted(): boolean {
    return StringUtils.hasValue(this.id);
  }

  public formatLastUpdatedText(): string {
    let date = moment(this.lastUpdated);
    if (!date.isValid()) {
      date = moment();
    }

    return `Last updated ${date.format("L")}`;
  }

  public withGeneratedId(): NoteRecord {
    if (StringUtils.hasValue(this.id)) {
      return this.with({});
    }

    return this.with({ id: uuid() });
  }
}
