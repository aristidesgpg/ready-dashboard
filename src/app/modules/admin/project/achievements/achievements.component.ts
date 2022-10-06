import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { AchievementsService } from 'app/modules/admin/project/achievements/achievements.service';
import { Progress, RewardType } from 'app/modules/admin/project/achievements/achievements.type';


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html'
})
export class AchievementsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  progress: Progress;
  rewards: RewardType[];

  /**
   * Constructor
   */
  constructor (
    private _navigationService: FuseNavigationService,
    private _route: ActivatedRoute,
    public authService: AuthService,
    private _achievementsService: AchievementsService
  ) {
    _route.params.subscribe(params => {
      let id = params['id'];
      _navigationService.projectId = id;
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._achievementsService.getProgress()
      .pipe(
          takeUntil(this._unsubscribeAll)
      )
      .subscribe(progress => {
        this.progress = progress;
      });

      this._achievementsService.getRewardsCategories()
      .pipe(
          takeUntil(this._unsubscribeAll)
      )
      .subscribe(rewards => {
        this.rewards = rewards;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
