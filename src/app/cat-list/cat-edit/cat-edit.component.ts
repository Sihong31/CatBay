import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CatsService } from '../cats.service';
import { Cat } from '../cat.model';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.scss']
})
export class CatEditComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  catId: string;
  cat: Cat;
  editMode = false;

  constructor(private route: ActivatedRoute, private catsService: CatsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      age: new FormControl(null, {validators: [Validators.required]}),
      weight: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]}),
      imagePath: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('catId')) {
          this.editMode = true;
          this.catId = paramMap.get('catId');
          this.isLoading = true;
          this.catsService.getCat(this.catId)
            .subscribe(catData => {
              const retrievedCat = catData.cat;
              this.isLoading = false;
              this.cat = {
                _id: retrievedCat._id,
                name: retrievedCat.name,
                description: retrievedCat.description,
                age: retrievedCat.age,
                weight: retrievedCat.weight,
                price: retrievedCat.price,
                imagePath: retrievedCat.imagePath
              };
              this.form.setValue({
                name: this.cat.name,
                description: this.cat.description,
                age: this.cat.age,
                weight: this.cat.weight,
                price: this.cat.price,
                imagePath: this.cat.imagePath
              });
            });
        } else {
          this.editMode = false;
          this.catId = null;
        }
      }
    );
  }

  onSaveCat() {
    if (this.form.invalid) {
      return;
    }
    if (!this.editMode) {
      this.cat = this.form.value;
      this.catsService.createCat(this.cat);
      this.form.reset();
    } else {
      this.cat = this.form.value;
      this.catsService.updateCat(this.catId, this.cat);
    }
  }

  onClear() {
    this.form.reset();
  }

}
