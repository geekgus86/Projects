import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { OverviewComponent } from '@app/bloomberg/overview/overview.component';




export class CustomRouteReusableStrategy implements RouteReuseStrategy {

    handlers: {[key: string]: DetachedRouteHandle} = {};
  
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return false;
    }
  
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      this.handlers[route.routeConfig.path] = null;
    }
  
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }
  
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      if (!route.routeConfig) {
        return null;
      }
      return this.handlers[route.routeConfig.path];
    }
  
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
     /**
       * cuando se quiera agregar reuso de ruta solo habra que agregar:
       * && (curr.component !== componenteAReutilizar)
       * ejemplo:
       *  && (curr.component !== OverviewComponent)
       *       * 
       * esa es la logica
       * */ 
      return (curr.component === future.component) && (curr.component !== OverviewComponent); 

    }
  }
  