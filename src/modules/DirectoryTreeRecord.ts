import { DirectoryTree } from 'directory-tree';
import { Record } from 'immutable';

const defaultValues: DirectoryTree = {
    path: "",
    name: "",
    size: 0,
    type: "directory",
    children: [],
    extension: "",
};

export class DirectoryTreeRecord extends Record(defaultValues) implements DirectoryTree {
    constructor(params?: DirectoryTree) {
        if (params == null) {
            params = Object.assign({}, defaultValues);
        }

        super(params);
    }

    public with(values: Partial<DirectoryTree>): DirectoryTreeRecord {
        return new DirectoryTreeRecord(Object.assign(this.toJS(), values));
    }

    public toTree(): any {

    }
}