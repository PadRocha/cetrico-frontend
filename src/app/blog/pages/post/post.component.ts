import { TitleCasePipe, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IComment } from '@shared/models/comment';
import { IPost } from '@shared/models/post';
import { UserService } from 'app/auth/services/user/user.service';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';
import { ExchangeService } from 'app/blog/services/exchange/exchange.service';
import { MetaService } from 'app/blog/services/meta/meta.service';
import { ShippingService } from 'app/blog/services/shipping/shipping.service';
import Swal from 'sweetalert2';

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
  bookmarkToogle: boolean;
  commentsPage: number;
  commentPaginate: {
    totalDocs: number;
    hasNextPage: boolean;
  };
  commentsLoaded: boolean;
  comments: IComment[];
  newComment: FormGroup;
  @ViewChild('commentsSpace') commentsSpace!: ElementRef<HTMLDivElement>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _meta: MetaService,
    private _scroller: ViewportScroller,
    private _arrival: ArrivalsService,
    private _shipping: ShippingService,
    private _exchange: ExchangeService,
    public _user: UserService,
    private _titlecase: TitleCasePipe,
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
    this.titlePost = '';
    this.idPost = '';
    this.previous = null;
    this.commentsPage = 1;
    this.commentsLoaded = false;
    this.bookmarkToogle = false;
    this.commentPaginate = {
      totalDocs: null,
      hasNextPage: false,
    }
    this.comments = new Array<IComment>();
    this.newComment = new FormGroup({
      nickname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      content: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.paramsMap();
  }

  @HostListener('window:scroll', ['$event']) onScroll($event: Event): void {
    const { scrollTop, clientHeight } = ($event.target as HTMLDocument).documentElement;
    const elementOffsetTop = this.commentsSpace.nativeElement.offsetTop - clientHeight;
    if ((scrollTop >= elementOffsetTop) && !this.commentsLoaded) {
      this.commentsLoaded = true;
      this.listComment();
    }
  }

  private paramsMap(): void {
    this._route.paramMap.subscribe(params => {
      this.titlePost = params.get('title');
      this.getPost();
    });
  }

  private getPost(): void {
    this._arrival.getPost(this.titlePost).subscribe(({ data }) => {
      this._meta.updateTitle(this._titlecase.transform(data.title));
      this._meta.updateDescription(data.desc);
      this._meta.generateTags({
        title: data.title,
        description: data.desc,
        image: data?.image?.url,
      });
      this.post = data;
      this.idPost = data._id;
      this.getPostPrevious();
      this.getPostNext();
      this.commentsLoaded = false;
      this.commentsPage = 1;
      this.comments = new Array<IComment>();

      if (this._user.logged())
        this._arrival.getBookmark(this.idPost, this._user.getId()).subscribe(({ data }) => {
          this.bookmarkToogle = data.toogle;
        }, () => Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'No se ha podido guardar',
          showClass: {
            popup: 'animate__animated animate__fadeInUp',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown',
          },
          showConfirmButton: false,
          timer: 2000,
        }));
    }, () => {
      this._router.navigate(['/blog/home']);
    })
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

  private listComment(): void {
    this._arrival.listCommentPost(this.idPost, this.commentsPage)
      .subscribe(({ data, totalDocs, hasNextPage }) => {
        this.comments = this.comments.concat(data);
        this.commentPaginate = {
          totalDocs: totalDocs,
          hasNextPage: hasNextPage,
        }
      }, () => this.commentsLoaded = false);
  }

  toogleBookmark(): void {
    this._exchange.updateBookmark(this.idPost, this._user.getId(), this.bookmarkToogle)
      .subscribe(res => this.bookmarkToogle = !this.bookmarkToogle, err => { })
  }

  accessToEdit() {
    return (this._user.isEqualTo(this.post?.user._id) && this._user.hasRole('EDIT')) || this._user.hasRole(['GRANT', 'ADMIN']);
  }

  addComment(): void {
    ++this.commentsPage;
    this.listComment();
  }

  onCommentSubmit(): void {
    if ((this._user.logged() && this.newComment.get('content').valid) || this.newComment.valid) {
      const commentData = !this._user.logged()
        ? {
          ...this.newComment.getRawValue(),
          post: this.idPost,
        }
        : {
          content: this.newComment.get('content').value,
          post: this.idPost,
          user: this._user.getId(),
        };
      this._shipping.sendComment(commentData).subscribe(({ data }) => {
        ++this.commentPaginate.totalDocs;
        this.comments.unshift(data);
        this._scroller.scrollToPosition([0, this.commentsSpace.nativeElement.offsetTop])
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
