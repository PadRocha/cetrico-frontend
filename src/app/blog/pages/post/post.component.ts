import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IPost } from '@shared/models/post';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: { 'class': 'col-lg-8' },
})
export class PostComponent implements OnInit {
  private titlePost: string;
  private idPost: string;
  editorConfig: AngularEditorConfig;
  post: IPost;
  previous: IPost | null;
  next: IPost | null;

  constructor(
    private _route: ActivatedRoute,
    // private _scroller: ViewportScroller,
    private _arrival: ArrivalsService,
  ) {
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      minHeight: '200px',
      height: '250px',
      maxHeight: '500px',
      width: 'auto',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      // placeholder: 'Enter text here...',
      defaultParagraphSeparator: 'p',
      // defaultFontName: '',
      // defaultFontSize: '',
      // fonts: [
      //   { class: 'arial', name: 'Arial' },
      //   { class: 'times-new-roman', name: 'Times New Roman' },
      //   { class: 'calibri', name: 'Calibri' },
      //   { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      // ],
      // customClasses: [
      //   {
      //     name: 'lead',
      //     class: 'lead',
      //     tag: 'p',
      //   },
      //   {
      //     name: 'centery',
      //     class: 'textCentery',
      //     // tag: 'span',
      //   },
      //   {
      //     name: 'code',
      //     class: '',
      //     tag: 'pre',
      //   },
      //   {
      //     name: 'quote',
      //     class: 'quote',
      //     tag: 'blockquote'
      //   },
      //   {
      //     name: 'signature',
      //     class: 'blockquote-footer',
      //     tag: 'footer',
      //   },
      //   // {
      //   //   name: 'redText',
      //   //   class: 'redText'
      //   // },
      //   // {
      //   //   name: 'titleText',
      //   //   class: 'titleText',
      //   //   tag: 'h1',
      //   // },
      // ],
      // uploadUrl: 'v1/image',
      // uploadWithCredentials: false,
      sanitize: false,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        [
          // 'undo', // ? Deshacer
          // 'redo', // ? Rehacer
          // 'bold', // ? Negrita
          // 'italic', // ? Cursiva
          // 'underline', // ? Subrayado
          // 'strikeThrough', // ? Tachado
          'subscript', // ?  // ? Subíndice
          'superscript', // ? Superíndice
          'justifyLeft', // ? Alinear a la izquierda
          'justifyCenter', // ? Centrar
          'justifyRight', // ? Alinear a la derecha
          'justifyFull', // ? Justificar
          'indent', // ? Aumentar sangría
          'outdent', // ? Disminuir sangría
          // 'insertUnorderedList', // ? Viñetas
          // 'insertOrderedList', // ? Numeración
          'heading', // ? Título
          'fontName' // ? Fuente
        ],
        [
          'fontSize', // ? Tamaño de fuente
          'textColor', // ? Color de fuente
          'backgroundColor', // ? Color de resaltado
          'customClasses', // ? Clases personalizadas
          // 'link', // ? 
          // 'unlink', // ? 
          'insertImage', // ? Insertar imagen
          'insertVideo', // ? 
          'insertHorizontalRule', // ? Línea Horizontal
          'removeFormat', // ? 
          'toggleEditorMode' // ? Modo edición
        ]
      ]
    };
    this.titlePost = '';
    this.idPost = '';
    this.previous = null;
  }

  ngOnInit(): void {
    this.paramsMap();
  }

  private paramsMap(): void {
    this._route.paramMap.subscribe(params => {
      this.titlePost = params.get('title');
      this.getPost();
    });
  }

  private getPost(): void {
    this._arrival.getPost(this.titlePost).subscribe(({ data }) => {
      this.post = data;
      this.idPost = data._id
      this.getPostPrevious();
      this.getPostNext();
    });
  }

  private getPostPrevious(): void {
    this._arrival.getPostPrevious(this.idPost).subscribe(({ data }) => {
      this.previous = data;
    });
  }

  private getPostNext(): void {
    this._arrival.getPostNext(this.idPost).subscribe(({ data }) => {
      this.next = data;
    });
  }
}
