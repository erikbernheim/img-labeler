export class Layer {
    constructor(item: any){
        this.type = item.type;
        this.index = item.index;
        this.visibility = false;
        if(item.visibility === 'visible') {
            this.visibility = true;
        }
    }
    public type: string;
    public index: number;
    public visibility: boolean;
}
