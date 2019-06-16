import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormControl, Validators, ValidatorFn } from '@angular/forms';

interface Data {
    selected: String;
    subgroups: Array<any>;
    products: Array<any>;
    profile_id: Number;
}

@Component({
    selector: 'app-activity-selector',
    templateUrl: './activity-selector.component.html',
    styleUrls: ['./activity-selector.component.css']
})
export class ActivitySelectorComponent implements OnInit {
    public activityForm: FormGroup = new FormGroup({
        subgroup_id: new FormControl(null),
        product_id: new FormArray([], minSelectedCheckboxes()),
        other_activity: new FormControl(null),
    });
    public state = this.data['profile_id'] === 2 ? 1 : 0;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Data, public dialogRef: MatDialogRef<ActivitySelectorComponent>) { }

    ngOnInit() {
        if (this.state)
            this.data['products'].forEach(x => (this.activityForm.controls.product_id as FormArray).push(new FormControl(false)));
    }

    public nextStep() {
        this.data['products'] = this.data['products'].filter(product => this.activityForm.get('subgroup_id').value == product.subgroup_id);
        this.data['products'].forEach(x => (this.activityForm.controls.product_id as FormArray).push(new FormControl(false)));
        this.state = 1;
    }

    public scrollDown() {
        setTimeout(() => {
            let aux = this.data['products'].filter((_, i) => this.activityForm.get('product_id').value[i]);
            if (aux.find(x => x.name === 'Outros. Quais?'))
                document.getElementById('other-activity').focus();
        });
    }

    public getFinalValue() {
        return { ...this.activityForm.value, product_id: this.data['products'].filter((_, i) => this.activityForm.get('product_id').value[i]).map(x => x.id) }
    }

    public isOtherFieldChecked() {
        let aux = this.data['products'].filter((_, i) => this.activityForm.get('product_id').value[i]);
        return aux.find(x => x.name === 'Outros. Quais?');
    }

}

function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
        const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected >= min ? null : { required: true };
    };

    return validator;
}
