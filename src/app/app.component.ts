import { Component } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TodosStore } from './todo.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ContentComponent],
  providers: [TodosStore],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ng-todo-list';
}
