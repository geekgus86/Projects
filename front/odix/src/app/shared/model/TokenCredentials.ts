export class TokenCredentials {
    plantId: number;
    rolId: number;
    plantName: string;
    rolName: string;
    country: string;
    rolDescription: string;



   constructor(){
     this.plantId = 0;
     this.rolId = 0;
     this.plantName = '';
     this.rolName = '';
     this.country = '';
     this.rolDescription = '';
   }
}
