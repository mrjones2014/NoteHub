import { Record } from "immutable";
import GlobalState from "./global-state";
import NoteRecord from "./note-record";
import { RecordUtils, StringUtils } from "andculturecode-javascript-core";
import SortNotesAlphabetically from "../utils/sort-comparators/sort-notes-alphabetically";
import SyncStorage from "sync-storage";

const STORAGE_KEY = "_NOTEHUB_GLOBAL_STATE_STORAGE_KEY_";

const defaultValues: GlobalState = {
  notes: [],
};

export default class GlobalStateRecord
  extends Record(defaultValues)
  implements GlobalState {
  constructor(params?: Partial<GlobalState>) {
    if (params == null) {
      params = { ...defaultValues };
    }

    params = Object.assign({}, defaultValues, params);

    if (params.notes == null) {
      params.notes = [];
    }

    params.notes = params.notes.sort(SortNotesAlphabetically);

    params.notes = params.notes.map((n) =>
      RecordUtils.ensureRecord(n, NoteRecord)
    );

    super(params);
  }

  public with(values: Partial<GlobalState>): GlobalStateRecord {
    return new GlobalStateRecord(Object.assign(this.toJS(), values));
  }

  public getNotesWithBlankFirstValue(): Array<NoteRecord> {
    return [new NoteRecord(), ...this.notes];
  }

  public addNewNote(note: NoteRecord): GlobalStateRecord {
    return this.with({ notes: [note, ...this.notes] });
  }

  public refreshFromStorage(): GlobalStateRecord {
    const storageString = SyncStorage.get(STORAGE_KEY);
    if (StringUtils.hasValue(storageString)) {
      return new GlobalStateRecord(JSON.parse(storageString));
    }

    return new GlobalStateRecord();
  }

  public persistToStorage(): boolean {
    const serialized = this.toJS();
    serialized.notes = serialized.notes.map((n: NoteRecord) => Record.isRecord(n) ? n.toJS() : n);
    serialized.notes = serialized.notes.filter((n: any) => StringUtils.hasValue(n.id));
    const storageString = JSON.stringify(serialized);
    SyncStorage.set(STORAGE_KEY, storageString);
    return true;
  }
}
