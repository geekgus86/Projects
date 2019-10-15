import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'cell-button',
    template: `<span><button id="button{{id}}" style="height:25px;width:80px; " (click)="invokeParentMethod()" class="btn btn-info btnH">  {{textBtn}}  </button></span>`,
    styles: [
        `.btn {
            line-height: 0.5

        }`
    ]
})
export class cellButton implements ICellRendererAngularComp {
    public params: any;
    id:any;
    textBtn:string="Delete";

    agInit(params: any): void {
        this.params = params;
        this.id = this.params.rowIndex;
    }

    public invokeParentMethod() {
        this.params.context.componentParent.btnAction(this.params.node )
    }

    refresh(): boolean {
        return false;
    }
}