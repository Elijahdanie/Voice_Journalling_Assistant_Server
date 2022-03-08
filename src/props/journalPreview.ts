
export class JournalPreview {

    constructor(id:string, title:string, updated:Date) {
        this.id = id;
        this.title = title,
        this.updated = updated;
        this.url = `http://web-02.daniespace.tech/journal/${id}`
    }

    id:string
    title:string
    updated:Date
    url:string
}
