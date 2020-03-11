import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import jQuery from 'jquery';
import { Subscription } from 'rxjs';
import { KBArticles } from '../../Models/kbarticles';
import { KbarticlesService } from './../../services/appservices/kbarticles.service';
import { DdlCatogoryName } from '../../Models/ddlcategory';
import { Base64EncodeDecode } from '../../shared/base64-encode-decode';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.scss']
})

export class EditarticleComponent implements OnInit, OnDestroy {
  text: string;
  editForm: FormGroup;
  displayArticle: KBArticles;
  id: number;
  catname: string;
  catid: number;
  arr: DdlCatogoryName[] = [];
  public queryparams: any;
  private _subscriptions = new Subscription();

  quillEditorRef;
  maxUploadFileSize = 1000000;
  files: FileList[];
  imagePath = '';


  constructor(
    private base64EncodeDecode: Base64EncodeDecode,
    private messageService: MessageService,
    private _data: KbarticlesService,
    private fb: FormBuilder,
    private _act: ActivatedRoute,
    private _router: Router,
  ) {
    this._subscriptions.add(
      this._router.routerState.root.queryParams.subscribe(
        (params: Params) => {
          this.queryparams = params['ArticleId'];
          this.files = [];
          this.imagePath = '';
        }
      )
    );
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      ArticleName: new FormControl(null),
      CategoryId: new FormControl(null),
      Content: new FormControl(null)
    });
    this.getArticleForEdit();
  }

  getArticleForEdit() {
    this.messageService.add({
      severity: 'success',
      detail: 'Processing...'
    });
    this.id = this.queryparams;
    console.log(this.id);
    this._subscriptions.add(this._data.getKbArticleById(this.id).subscribe(
      (x: KBArticles) => {
        this.displayArticle = x;
        this.catid = this.displayArticle.categoryId;
        console.log(this.displayArticle);
        this.editForm.patchValue({
          ArticleName: this.displayArticle.articleName,
          ArticleId: this.displayArticle.articleId,
          CategoryId: this.displayArticle.categoryId,
          CategoryName: this.displayArticle.categoryName,
          previewcontent: this.displayArticle.previewContent,
          Content: this.displayArticle.content
        });
      }, error => {
        this.messageService.add({ severity: 'error', detail: 'server not responding' });
      }


    ));
    this._subscriptions.add(this._data.getCategory().subscribe(
      (data: DdlCatogoryName[]) => {
        this.arr = data;
      }
    ));
    console.log(this.catid);
    // this.editForm = this.fb.group({
    //   ArticleName: new FormControl(null),
    //   ArticleId: new FormControl(null),
    //   CategoryName: new FormControl(null),
    //   CategoryId: new FormControl(this.catid),
    //   Content: new FormControl(null),
    //   previewcontent: new FormControl(null)
    // });
  }

  onEditArticle() {
    if (this.editForm.value.Content === null) {
      const validationMessage = 'Editor is empty';
      this.messageService.add({
        severity: 'error',
        summary: 'Error Message',
        detail: validationMessage
      });
    } else {
      const req = {
        ArticleName: this.editForm.value.ArticleName,
        ArticleId: this.editForm.value.ArticleId,
        CategoryId: this.editForm.value.CategoryId,
        CategoryName: this.editForm.value.CategoryName,
        Content: this.editForm.value.Content,
        previewcontent: this.editForm.value.previewcontent,
        CreatedBy: this.editForm.value.CreatedBy,
        CreatedByName: this.editForm.value.CreatedByName,
        CreatedDate: this.editForm.value.CreatedDate,
        ModifiedBy: this.editForm.value.ModifiedBy,
        ModifiedByName: this.editForm.value.ModifiedByName,
        ModifiedDate: this.editForm.value.ModifiedDate
      };

      /// needed

      const firstimg = jQuery(this.editForm.value.Content).find('img:first').attr('src');
      console.log(firstimg);


      this._data.updateArticle(req).then(
        res => {
          if (res) {
            const successMessage = 'Updated  Successfuly';
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: successMessage
            });

            setTimeout(() => {
              this._router.navigate(['/user-profile']);
            }, 1000);
          }
        },
        error => {
        }
      );
    }

  }

  onClickClose() {
    this.messageService.add({
      severity: 'error',
      detail: 'Prcossing'
    });
    this._router.navigate(['/user-profile']);
  }


  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = (image, callback) => {
    const input = <HTMLInputElement>document.getElementById('fileInputField');
    document.getElementById('fileInputField').onchange = () => {
      let file: File;
      file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        if (file.size > this.maxUploadFileSize) {
          // alert('Image needs to be less than 1MB');
          this.messageService.add({ severity: 'info', summary: 'info', detail: 'Image needs to be less than 1MB' });
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            const range = this.quillEditorRef.getSelection();
            const img = '<img src="' + reader.result + '" />';
            this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
          };
          reader.readAsDataURL(file);
          this.basicUpload(file);
        }
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: 'You could only upload images.'
        });
      }
    };

    input.click();
  }

  basicUpload(file: File) {
    const formData = new FormData();
    formData.append('name', file, file.name);
    console.log('data', formData);
    this._subscriptions.add(this._data.getUploadImageName(formData).subscribe(
      (res: any) => {
        // let path = res;
      }, error => {
        this.messageService.add({ severity: 'error', detail: 'server not responding' });
      }
    ));
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
