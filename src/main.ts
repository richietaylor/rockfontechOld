import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';

// import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppComponent)
  .catch(err => console.error(err));
