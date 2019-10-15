import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
// import { HomeModule } from '@app/home/home.module';
import { LoginModule } from '@app/login/login.module';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
// import { OverviewModule } from '@app/bloomberg/overview/overview.module';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { BloombergModule } from '@app/bloomberg/bloomberg.module';
import { EditingReportsModule } from '@app/bloomberg-auth/bloomberg-auth.module';
import { PipesModule } from '@app/pipes/pipes.module';
import { ReportsModule } from '@app/reports/reports.module';
import { ExcelService } from '@app/services/excel.service';
import { OdixModule } from '@app/odix/odix.module';
import { TippyModule } from 'ng-tippy';
import { TvModule } from '@app/tv/tv.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    ReportsModule,
   // HomeModule,
    LoginModule,
    BloombergModule,
    EditingReportsModule,
    TvModule,
    AppRoutingModule,
  //  OverviewModule,
    OdixModule,
    MalihuScrollbarModule.forRoot(),
    PipesModule,
    TippyModule
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


