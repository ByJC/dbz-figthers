import { Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { BattlesComponent } from '../battles/battles.component';

export const CONTENT_ROUTES: Routes = [
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: '',
                component: BattlesComponent,
                outlet: 'content'
            }
        ]
    }
];
