import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import * as toastr from 'toastr';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  
  currentAction?: String;
  categoryForm!: FormGroup;
  pageTitle!: String;
  serverErrorMessages!: string[];
  submittingForm: Boolean = false;
  ArrayCategory: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }  

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();

  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if(this.currentAction == "new") {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  //PRIVATE METHODS

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value)

    this.categoryService.create(category)
      .subscribe(
        category => this.actionForSucces(category),
        error => this.actionForError(error)
      )
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value)

    this.categoryService.update(category)
      .subscribe(
        category => this.actionForSucces(category),
        error => this.actionForError(error)
      )
  }

  private setCurrentAction() {

    if(this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new"
    } else {
      this.currentAction = "edit"
    }
  }

  private buildCategoryForm() {

    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });

  }

  private loadCategory() {

    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")!))
      )
      .subscribe(
        (category) => {
          this.ArrayCategory = category;
          this.categoryForm.patchValue(category)
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

  private setPageTitle() {
    
    if(this.currentAction == 'new') {
      this.pageTitle = "Cadastro de Nova Categoria";
    } else {
      const categoryName = this.ArrayCategory.name || ""
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

  private actionForSucces(category: Category) {
    toastr.success("Solicitação processada com sucesso");

    this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.router.navigate(["categories", category.id, "edit"])
    )
  }

  private actionForError(error: { status: number; _body: string; }) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação");

    this.submittingForm = false;

    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"];
    }
  }
}
