import { TitleCasePipe, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IComment } from '@shared/models/comment';
import { IPost } from '@shared/models/post';
import { IUser } from 'app/auth/models/user';
import { AuthService } from 'app/auth/services/auth.service';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';
import { ExchangeService } from 'app/blog/services/exchange/exchange.service';
import { MetaService } from 'app/blog/services/meta/meta.service';
import { ShippingService } from 'app/blog/services/shipping/shipping.service';
import { forkJoin } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
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
  user: {
    identifier: string;
    nickname: string;
    roles: string[];
  };
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
    private _auth: AuthService,
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
    this.commentsPage = 1;
    this.commentsLoaded = false;
    this.user = {
      identifier: null,
      nickname: null,
      roles: new Array<string>(),
    }
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
      this.getAssets();
    });
  }

  private dataManagment({ data }: { data: IPost }): void {
    this._meta.updateTitle(this._titlecase.transform(data.title) || '');
    this._meta.updateDescription(data.desc);
    this._meta.generateTags({
      title: data.title,
      description: data.desc,
      image: data.image.url,
    });
    this.post = data;
    this.idPost = data._id;
    this.getPostPrevious();
    this.getPostNext();
  }

  private getAssets(): void {
    if (!this._auth.loggedIn()) {
      this._arrival.getPost(this.titlePost)
        .subscribe(res => this.dataManagment(res), () => this._router.navigate(['/blog/home']));
    } else {
      const post = this._arrival.getPost(this.titlePost).pipe(take(1));
      const user = this._auth.getUser().pipe(take(1));
      forkJoin({ post, user }).subscribe(({ post, user }) => {
        this.dataManagment(post);
        this.user = user;
        this._arrival.getBookmark(this.idPost, this.user.identifier).subscribe(({ data }) => {
          this.bookmarkToogle = data.toogle;
        }, () => { });
      }, () => {
        this._router.navigate(['/blog/home'])
      });
    }
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
    this._arrival.listCommentPost(this.idPost, this.commentsPage).subscribe(res => {
      this.comments = this.comments.concat(res.data);
      this.commentPaginate = {
        totalDocs: res.totalDocs,
        hasNextPage: res.hasNextPage,
      }
    }, () => this.commentsLoaded = false);
  }

  toogleBookmark(): void {
    this._exchange.updateBookmark(this.idPost, this.user.identifier, this.bookmarkToogle)
      .subscribe(res => this.bookmarkToogle = !this.bookmarkToogle, err => { })
  }

  addComment(): void {
    ++this.commentsPage;
    this.listComment();
  }

  onCommentSubmit(): void {
    if ((this._auth.loggedIn() && this.newComment.get('content').valid) || this.newComment.valid) {
      let commentData = !this.user.identifier
        ? {
          ...this.newComment.getRawValue(),
          post: this.idPost,
        }
        : {
          content: this.newComment.get('content').value,
          post: this.idPost,
          user: this.user.identifier,
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
