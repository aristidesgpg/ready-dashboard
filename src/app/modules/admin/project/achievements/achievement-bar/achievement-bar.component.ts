import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { RewardType } from 'app/modules/admin/project/achievements/achievements.type';

@Component({
  selector: 'achievement-bar',
  templateUrl: './achievement-bar.component.html',
  styleUrls: ['./achievement-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AchievementBarComponent implements OnInit {
  @Input() reward: RewardType;
  @Input() initValue: number;
  @Input() border: boolean;
  currentValue: number;
  goal: {nextStep: number, stepPercents: number};

  ngOnInit(): void {
    this.currentValue = this.countPercents(this.initValue, this.reward.total);
    this.goal = this.calculateNextStep();
  }

  countPercents(init: number, total: number): number {
    return init * 100 / total;
  }

  calculateNextStep(): {nextStep: number, stepPercents: number} {
    let nextStep = this.reward?.steps.find(value => value > this.initValue) || this.reward.total || 0;

    return {
      nextStep,
      stepPercents: this.countPercents(nextStep, this.reward.total) || 0
    };
  }

  offsetStyles(): string {
    if (this.goal.nextStep === this.reward.total) {
      return 'display: none';
    }

    return this.goal.stepPercents ? `left: ${this.goal.stepPercents}%` : 'display: none';
  }

  progressBarColor() {
    let className = this.initValue === this.reward.total ? 'completed' : 'ongoing';

    return {
      [className] : true
    }
  }

  isCompleted(): boolean {
    return this.initValue === this.reward.total;
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
