import Note from "./note";
import { Record } from "immutable";
import moment from "moment";

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

    if (params.id == null || params.id === "") {
      params.id == Math.random().toString();
    }

    console.log(params);

    super(params);
  }

  public with(values: Partial<Note>): NoteRecord {
    return new NoteRecord(Object.assign(this.toJS(), values));
  }

  public formatLastUpdatedText(): string {
    let date = moment(this.lastUpdated);
    if (!date.isValid()) {
      date = moment();
    }

    return `Last updated ${date.format("L")}`;
  }
}
