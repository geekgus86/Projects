import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'links',
    template: `<div  style="display: flex; align-items: center;">  <p (click)="invokeParentMethod()"  >{{Code}}</p>  </div>`,
     
    styles: [
        `.btn {
            line-height: 0.5

        }`
    ]
})
export class PText implements ICellRendererAngularComp {
    public params: any;
    Code:any;
    textBtn:string="Delete";

    agInit(params: any): void {
        this.params = params;
        this.Code = this.params.value;
    }

    public invokeParentMethod() {
        this.params.context.componentParent.btnActionRowGrid(this.params.node )
    }

    refresh(): boolean {
        return false;
    }
}