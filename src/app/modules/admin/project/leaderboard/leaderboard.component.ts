import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, fromEvent, Subject, takeUntil} from 'rxjs';
import {FuseNavigationService} from "../../../../../@fuse/components/navigation";
import {AuthService} from "../../../../core/auth/auth.service";
import {LeaderboardService} from './leaderboard.service';
import {Leader, Leaderboard} from './leaderboard.type';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit, OnDestroy
{
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  leadersList: Leaderboard[];
  currentUser: Leader;
  currentList: 'Retention'|'DAU'|'ARPDAU' = 'Retention';
  isMobile: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _navigationService: FuseNavigationService,
    private _route: ActivatedRoute,
    public authService: AuthService,
    private _leaderboardService: LeaderboardService
  )
  {
    _route.params.subscribe(params => {
      let id = params['id'];
      _navigationService.projectId = id;
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this._leaderboardService.getAllLeaders()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((leaders) => {
                this.leadersList = leaders;
            });

        this._leaderboardService.getCurrentUser()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((leaders) => {
                this.currentUser = leaders;
            });

        // Subscribe to window resize event
        fromEvent(window, 'resize')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150)
            )
            .subscribe(() => {
                this.isMobileView();
            });

        this.isMobileView();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    isCurrentProfile(userId: string): boolean {
        return userId === 'current-user';
    }

    isMobileView(): void {
        this.isMobile = window.innerWidth > 1280 ? false : true;
    }

    selectList(list: 'Retention'|'DAU'|'ARPDAU'): void {
        this.currentList = list;
    }
}
