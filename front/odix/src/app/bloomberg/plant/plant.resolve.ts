import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlantService } from '@app/bloomberg/plant/plant.service';


@Injectable()
export class PlantResolver implements Resolve<any> {
    shift:string ="1"; 

    constructor(private service: PlantService) {

    }
    
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        this.service.getShifts(1,"" , route.params['plantName'])
        .subscribe(res => {
            var  maxId = res.SHIFTS.reduce(function(max:any, x:any) { return (x.id > max) ? x.id : max; }, 0); //Get Maximum Id
            this.shift = maxId;
            // console.log("maximum "+this.shift);
        //  console.log("res.SHIFTS: ");
        //  console.log(res.SHIFTS);
        });
        return this.service.getPlant("", this.shift, route.params['plantName']); 
    }

}
