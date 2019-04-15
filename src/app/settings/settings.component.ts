import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    tabIndex: number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.tabIndex = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        console.log(this.tabIndex);
    }

}
