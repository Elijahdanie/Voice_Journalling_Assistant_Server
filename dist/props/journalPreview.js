"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPreview = void 0;
class JournalPreview {
    constructor(id, title, updated) {
        this.id = id;
        this.title = title,
            this.updated = updated;
        this.url = `http://web-02.daniespace.tech/journal/${id}`;
    }
}
exports.JournalPreview = JournalPreview;
