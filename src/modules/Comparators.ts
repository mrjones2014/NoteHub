import { DirectoryTree } from 'directory-tree';

export class Comparators {
    public static DirectoryTree(a: DirectoryTree, b: DirectoryTree) {
        if (a.type === 'directory') {
            if (b.type === 'directory') {
                return a.name.localeCompare(b.name);
            }

            return -1;
        }

        if (b.type === 'directory') {
            return -1;
        }
    }
}
