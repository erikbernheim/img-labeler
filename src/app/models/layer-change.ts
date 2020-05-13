export class LayerChange {
    constructor(item: any, collection?: string){
        this.type = item.type;
        this.index = item.index;
        if(collection)
        this.collection = collection;
    }

    public type: string;
    public index: number;
    public collection: string;
}
