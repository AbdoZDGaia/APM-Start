import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit, OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() rateClicked:EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnChanges() {
        this.starWidth = this.rating * 75 / 5;
    }

    onClick(): void {
        this.rateClicked.emit(`The rating ${this.rating} has been clicked`);
    }

    ngOnInit() { }
}