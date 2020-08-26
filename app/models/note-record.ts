import Note from "./note";
import { Record } from "immutable";
import uuid from "uuid";

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
      params.id == uuid.v4();
    }

    super(params);
  }

  public with(values: Partial<Note>): NoteRecord {
    return new NoteRecord(Object.assign(this.toJS(), values));
  }
}
