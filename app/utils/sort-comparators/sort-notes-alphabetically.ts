import NoteRecord from "../../models/note-record";

export default function SortNotesAlphabetically(a: NoteRecord, b: NoteRecord) {
    if (a.title > b.title) { return -1; }
    if (a.title < b.title) { return 1; }
    return 0;
};
