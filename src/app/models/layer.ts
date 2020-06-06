import { environment } from 'src/environments/environment';

export class Layer {
    constructor(item: any){
        this.type = item.type;
        this.index = item.index;
        this.visibility = false;
        if(item.visibility === 'visible') {
            this.visibility = true;
        }
        if (this.type === 'existingMask') {
            this.colors = []
        } else {
            this.colors = environment.colors.filter(elem => elem.color != this.type);
        }
    }
    public colors; // other possible color options
    public type: string;
    public index: number;
    public visibility: boolean;
    public update(index: number): void {
        this.type = this.colors[index].color;
        this.colors = environment.colors.filter(elem => elem.color != this.type);
    }
}
