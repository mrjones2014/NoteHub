import { Record } from "immutable";
import GlobalState from "./global-state";
import NoteRecord from "./note-record";
import moment from "moment";
import { RecordUtils } from "andculturecode-javascript-core";

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

    // TODO remove this
    params.notes = [
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 1",
        content: "# Test",
      }),
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 2",
        content: "# Test 2",
      }),
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 3",
        content: "# Test 3\n\n## Subheading\n\n- this\n- is\n- a bulleted\n- list\n\n## Subheading 2\n\n### Sub-sub-section\n\n- this\n- is\n- a bulleted\n- list\n\n- this\n- is\n- a bulleted\n- list\n\n- this\n- is\n- a bulleted\n- list\n\n- this\n- is\n- a bulleted\n- list\n\n- this\n- is\n- a bulleted\n- list",
      }),
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 4",
        content: "# Test 4",
      }),
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 5",
        content: "# Test 6",
      }),
      new NoteRecord({
        lastUpdated: moment().format("L"),
        title: "Note 7",
        content: "# Test 7",
      }),
    ];

    params.notes = params.notes.map((n) =>
      RecordUtils.ensureRecord(n, NoteRecord)
    );

    super(params);
  }

  public with(values: Partial<GlobalState>): GlobalStateRecord {
    return new GlobalStateRecord(Object.assign(this.toJS(), values));
  }

  public refreshFromStorage(): GlobalStateRecord {
    // TODO actually implement this
    return new GlobalStateRecord(this.toJS());
  }

  public persistToStorage(): boolean {
    // TODO actually imlpement this
    return false;
  }
}
