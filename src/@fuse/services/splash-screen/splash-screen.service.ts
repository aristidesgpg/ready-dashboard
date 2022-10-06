import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Injectable()
export class FuseSplashScreenService
{
    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _router: Router
    )
    {
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                /**
                 * Not being hidden in here to avoid conflict with first login.
                 *
                 * Since the AuthService check for both use cases
                 * (authenticated or not authenticated), the control to hide
                 * the splash screen is better done there.
                 *
                 * If it's done here, it will display the login screen while
                 * the AuthService is still working, bad ux.
                 */
                // this.hide();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void
    {
        this._document.body.classList.remove('fuse-splash-screen-hidden');
    }

    /**
     * Hide the splash screen
     */
    hide(): void
    {
        this._document.body.classList.add('fuse-splash-screen-hidden');
    }
}
