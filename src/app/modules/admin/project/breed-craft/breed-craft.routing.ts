// Angular
import { Route } from "@angular/router";

// Component
import { BreedCraftComponent } from "./view/breed-craft.component";
import { BreedItemComponent } from "./view/item/item.component";
import { BreedListComponent } from "./view/list/list.component";

export const breedCraftRoute: Route[] = [
    {
        path: '',
        component: BreedCraftComponent,
        children: [
            {
                path: '',
                component: BreedListComponent,
            },
            {
                path: ':id',
                component: BreedItemComponent,
            },
        ]
    },
];

export const breedCraftRouteComponents = [
    BreedCraftComponent,
    BreedListComponent,
    BreedItemComponent,
];
