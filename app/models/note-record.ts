import Note from "./note";
import { Record } from "immutable";

const defaultValues: Note = {
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
}
