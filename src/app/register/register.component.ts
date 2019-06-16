import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { selects } from '../data/selects';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CrudService } from '../shared/services/crud.service';
import { ActivitySelectorComponent } from '../shared/components/activity-selector/activity-selector.component';
import { countries } from '../data/countries';
import { brazilianStates } from '../data/brazilian-states';
import { ValidateCpf } from '../shared/validators/cpf.validator';
import { ValidateCnpj } from '../shared/validators/cnpj.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public companyForm: FormGroup = this._formBuilder.group({
        profile_id: [''],
        cnpj_number: ['', ValidateCnpj],
        business_name: [''],
        trending_name: [''],
        foundation_year: [''],
        employees_quantity: [''],
        legal_person: [''],

        // Seller
        company_size: [''],

        // Buyer
        language: [''],
    });
    public contactForm: FormGroup = this._formBuilder.group({
        postal_code: [''],
        address: [''],
        number: [''],
        district: [''],
        city: [''],
        state: [''],
        phone: this._formBuilder.group({
            phone_type_id: ['', Validators.required],
            ddd: ['', Validators.required],
            number: ['', Validators.required],
        }),
        phones: [[]],
        social_media: this._formBuilder.group({
            digital_data_type: [''],
            url: [''],
        }),
        social_medias: [[]],
        company_email: [''],
        company_site: [''],
    });
    public representativeForm: FormGroup = this._formBuilder.group({
        treatment: [''],
        cpf_number: ['', ValidateCpf],
        name: [''],
        position: [''],
        email: [''],
        phone: this._formBuilder.group({
            phone_type_id: ['', Validators.required],
            ddd: ['', Validators.required],
            number: ['', Validators.required],
        }),
        phones: [[]],
        participants: [[]],

        // Seller
        birthday: [''],
        schooling: [''],
        postal_code: [''],
        address: [''],
        city: [''],
        state: [''],
    });
    public activityForm: FormGroup = this._formBuilder.group({
        group_id: [''],
        subgroup_id: ['', Validators.required],
        product_id: [[], Validators.required],
        other_activity: [''],
    });
    public interestForm: FormGroup = this._formBuilder.group({
        company_interests: [''],
        local_billing: [''],
        partner_profile: [''],
        sales_capacity: [''],
        local_revenue: this._formBuilder.group({
            profit: [''],
            origin_name: [''],
            origin_type: ['local'], // Fixed
        }),
        local_revenues: [[]],
        abroad_revenue: this._formBuilder.group({
            profit: [''],
            origin_name: [''],
            origin_type: ['abroad'], // Fixed
        }),
        abroad_revenues: [[]],
    });
    public loading = false;
    public tabIndex: number = 0;
    public selects = selects[0];
    public countries = countries;
    public states = brazilianStates;
    public groups = [];
    public subgroups = [];
    public products = [];
    public masks = {
        date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
        phone_number: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        zip: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
        phone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,],
        cell_phone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    };

    constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _snackbar: MatSnackBar, private _crud: CrudService, private _dialog: MatDialog, private _router: Router) {
        this.companyForm.get('profile_id').setValue(_route.snapshot.data.id);
    }

    ngOnInit() {
        this._crud
            .get('groups')
            .then((res: any) => this.groups = res);

        this._crud
            .get('subgroups')
            .then((res: any) => this.subgroups = res);

        this._crud
            .get('products')
            .then((res: any) => this.products = res);
    }

    public selectActivity({ name, id }) {
        const dialog = this._dialog.open(ActivitySelectorComponent, {
            width: '871px',
            height: '509px',
            data: {
                selected: name,
                profile_id: this.companyForm.get('profile_id').value,
                subgroups: this.companyForm.get('profile_id').value === 1 ? this.subgroups.filter(subgroup => subgroup.group_id == id) : this.subgroups,
                products: this.companyForm.get('profile_id').value === 2 ? this.products.filter(product => product.subgroup_id == id) : this.products,
            }
        });

        dialog.beforeClosed().subscribe(res => {
            if (res)
                this.activityForm.patchValue({ ...res, subgroup_id: res.subgroup_id ? res.subgroup_id : this.activityForm.get('subgroup_id').value });
            else
                this.activityForm.reset();
        });
    }

    public getCNPJ() {
        if (this.companyForm.get('cnpj_number').value && this.companyForm.get('cnpj_number').value.replace(/\D+/g, '').length === 14) {
            this.loading = true;

            this._crud.get(`cnpj?cnpj=${this.companyForm.get('cnpj_number').value.replace(/\D+/g, '')}`).then((res: any) => {
                if (res.status === 'ERROR')
                    this._snackbar.open(res.message, '', { duration: 2000, panelClass: 'error' });
                else
                    this.companyForm.patchValue({
                        business_name: res.nome,
                        trending_name: res.fantasia,
                        foundation_year: res.abertura,
                    });

                this.loading = false;
            }, rej => {
                this.loading = false;

                this._snackbar.open('CNPJ inválido ou não encontrado', '', { duration: 2000, panelClass: 'error' });
            });
        }
    }

    public getCEP(contact?) {
        if (this.contactForm.get('postal_code').value && this.contactForm.get('postal_code').value.replace(/\D+/g, '').length === 8) {
            this.loading = true;

            this._crud.get(`cep?cep=${this.contactForm.get('postal_code').value.replace(/\D+/g, '')}`).then((res: any) => {
                if (res.resultado == 0)
                    this._snackbar.open('CEP inválido ou não encontrado', '', { duration: 2000, panelClass: 'error' });
                else if (contact)
                    this.contactForm.patchValue({
                        address: res.tipo_logradouro + ' ' + res.logradouro,
                        district: res.bairro,
                        state: res.uf,
                        city: res.cidade,
                    });
                else
                    this.representativeForm.patchValue({
                        address: res.tipo_logradouro + ' ' + res.logradouro,
                        state: res.uf,
                        city: res.cidade,
                    });

                this.loading = false;
            }, rej => {
                this.loading = false;

                this._snackbar.open('CEP inválido ou não encontrado', '', { duration: 2000, panelClass: 'error' });
            });
        }
    }

    public onFinish() {
        this.loading = true;

        this._crud.post('participant/register', {
            participant: { ...this.companyForm.value, ...this.contactForm.value, ...this.interestForm.value },
            representative: JSON.parse(JSON.stringify(this.representativeForm.value)),
            activity: JSON.parse(JSON.stringify(this.activityForm.value)),
            isRepresentativeValid: this.representativeForm.valid && this.representativeForm.get('phones').value.length !== 0
        })
            .then((res: any) => {
                this.loading = false;
                this._snackbar.open(res.message, '', { duration: 10000, panelClass: 'success' });
                this._router.navigate(['']);
            }, (rej: any) => {
                this._snackbar.open(rej.message, '', { duration: 5000, panelClass: 'error' });
                this.loading = false;
            });
    }

    public removeRevenue = (index, type) => this.interestForm.get(type).value.splice(index, 1);

    public isTotalValueValid(extraValue) {
        let totalValue = this.interestForm.get('local_revenues').value.reduce((acc, x) => acc = acc + x.profit, 0);
        totalValue += this.interestForm.get('abroad_revenues').value.reduce((acc, x) => acc = acc + x.profit, 0);
        if ((totalValue + extraValue) > 100) {
            this._snackbar.open('O valor total do faturamento não pode ser acima de 100%', '', { duration: 2000, panelClass: 'error' });
            return true;
        }
        else return false;
    }

    public addNewAbroadRevenue() {
        if (this.isTotalValueValid(this.interestForm.get('abroad_revenue').get('profit').value)) return;
        this.interestForm.get('abroad_revenues').value.push(this.interestForm.get('abroad_revenue').value);
        this.interestForm.get('abroad_revenue').reset();
        this._snackbar.open('Faturamento adicionado com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public addNewLocalRevenue() {
        if (this.isTotalValueValid(this.interestForm.get('local_revenue').get('profit').value)) return;
        this.interestForm.get('local_revenues').value.push(this.interestForm.get('local_revenue').value);
        this.interestForm.get('local_revenue').reset();
        this._snackbar.open('Faturamento adicionado com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public addNewParticipant() {
        this.representativeForm.get('participants').value.push(JSON.parse(JSON.stringify(this.representativeForm.value)));
        Object.keys(this.representativeForm.value).forEach(prop => prop !== 'participants' && prop !== 'phones' ? this.representativeForm.get(prop).reset() : '');
        this.representativeForm.get('phones').setValue([]);
        this._snackbar.open('Participante adicionado com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public saveNewPhoneContact() {
        this.contactForm.get('phones').value.push(this.contactForm.get('phone').value);
        this.contactForm.get('phone').reset();
        this.contactForm.get('phone').get('phone_type_id').setValidators(null);
        this.contactForm.get('phone').get('ddd').setValidators(null);
        this.contactForm.get('phone').get('number').setValidators(null);
        this.contactForm.get('phone').updateValueAndValidity();
        this._snackbar.open('Telefone adicionado com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public saveNewSocialMedia() {
        this.contactForm.get('social_medias').value.push(this.contactForm.get('social_media').value);
        this.contactForm.get('social_media').reset();
        this._snackbar.open('Mídia social adicionada com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public saveNewPhoneRepresentative() {
        this.representativeForm.get('phones').value.push(this.representativeForm.get('phone').value);
        this.representativeForm.get('phone').reset();
        this.representativeForm.get('phone').get('phone_type_id').setValidators(null);
        this.representativeForm.get('phone').get('ddd').setValidators(null);
        this.representativeForm.get('phone').get('number').setValidators(null);
        this.representativeForm.get('phone').updateValueAndValidity();
        this._snackbar.open('Telefone adicionado com sucesso!', '', { duration: 2000, panelClass: 'success' });
    }

    public preventNumberInput(e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode > 47 && keyCode < 58 || keyCode > 95 && keyCode < 107)
            e.preventDefault();
    }

    public isCNPJValid() {
        return this.companyForm.get('cnpj_number').errors && !this.companyForm.get('cnpj_number').errors.validCnpj && this.companyForm.get('cnpj_number').value && this.companyForm.get('cnpj_number').value.replace(/\D+/g, '').length === 14;
    }

}
