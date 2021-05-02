import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IComment } from '@shared/models/comment';
import { UserService } from 'app/auth/services/user/user.service';
import { ShippingService } from 'app/blog/services/shipping/shipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  host: { class: 'mt-5 d-block' },
})
export class CommentComponent implements OnInit {
  editorConfig: AngularEditorConfig;
  newComment: FormGroup;
  @Input() post;
  @Output() onCommentSended: EventEmitter<IComment>;

  constructor(
    public _user: UserService,
    private _shipping: ShippingService,
  ) {
    this.post = '';
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
      placeholder: 'Comenta ...',
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
    this.newComment = new FormGroup({
      nickname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
    });
    this.onCommentSended = new EventEmitter<IComment>();
  }

  ngOnInit(): void {
  }

  onCommentSubmit(): void {
    if ((this._user.logged && this.newComment.get('content').valid) || this.newComment.valid) {
      const commentData = !this._user.logged
        ? {
          ...this.newComment.getRawValue(),
          post: this.post,
        }
        : {
          content: this.newComment.get('content').value,
          post: this.post,
          user: this._user.getId,
        };

      this._shipping.sendComment(commentData).subscribe(({ data }) => {
        this.onCommentSended.emit(data);
      }, () => Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'El comentario no se ha enviado',
        text: 'Provablemente uses un Nick ya registrado o has sido bloqueado',
        showClass: {
          popup: 'animate__animated animate__fadeInUp',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown',
        },
        showConfirmButton: false,
        timer: 2000,
      }));
      this.newComment.reset();
    }
  }
}
