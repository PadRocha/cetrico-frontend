import { TitleCasePipe, ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from '@shared/models/comment';
import { IPost } from '@shared/models/post';
import { UserService } from 'app/auth/services/user/user.service';
import { ArrivalsService } from 'app/blog/services/arrivals/arrivals.service';
import { ExchangeService } from 'app/blog/services/exchange/exchange.service';
import { MetaService } from 'app/blog/services/meta/meta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: { class: 'col-lg-8' },
})
export class PostComponent implements OnInit {
  private titlePost: string;
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
  @ViewChild('commentsSpace') commentsSpace!: ElementRef<HTMLDivElement>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _meta: MetaService,
    private _scroller: ViewportScroller,
    private _arrival: ArrivalsService,
    private _exchange: ExchangeService,
    public _user: UserService,
    private _titlecase: TitleCasePipe,
  ) {
    this.titlePost = '';
    this.previous = null;
    this.commentsPage = 1;
    this.commentsLoaded = false;
    this.bookmarkToogle = false;
    this.commentPaginate = {
      totalDocs: null,
      hasNextPage: false,
    }
    this.comments = new Array<IComment>();
  }

  ngOnInit(): void {
    this.paramsMap();
  }

  @HostListener('window:scroll', ['$event']) onScroll($event: Event): void {
    const { scrollTop, clientHeight } = ($event.target as HTMLDocument).documentElement;
    const elementOffsetTop = this.commentsSpace.nativeElement.offsetTop - clientHeight;
    if (this.post?._id && (scrollTop >= elementOffsetTop) && !this.commentsLoaded) {
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
      this.getPostPrevious();
      this.getPostNext();
      this.commentsLoaded = false;
      this.commentsPage = 1;
      this.comments = new Array<IComment>();

      if (this._user.logged())
        this._arrival.getBookmark(this.post._id, this._user.getId()).subscribe(({ data }) => {
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
    this._arrival.getPostPrevious(this.post._id).subscribe(({ data }) => {
      this.previous = data;
    });
  }

  private getPostNext(): void {
    this._arrival.getPostNext(this.post._id).subscribe(({ data }) => {
      this.next = data;
    });
  }

  private listComment(): void {
    this._arrival.listCommentPost(this.post._id, this.commentsPage)
      .subscribe(({ data, totalDocs, hasNextPage }) => {
        this.comments = this.comments.concat(data);
        this.commentPaginate = {
          totalDocs: totalDocs,
          hasNextPage: hasNextPage,
        }
      }, () => this.commentsLoaded = false);
  }

  toogleBookmark(): void {
    this._exchange.updateBookmark(this.post._id, this._user.getId(), this.bookmarkToogle)
      .subscribe(res => this.bookmarkToogle = !this.bookmarkToogle, err => { })
  }

  accessToEdit(): boolean {
    return (this._user.isEqualTo(this.post?.user._id) && this._user.hasRole('EDIT')) || this._user.hasRole(['GRANT', 'ADMIN']);
  }

  addComment(): void {
    ++this.commentsPage;
    this.listComment();
  }

  onCommentSubmit(data: IComment): void {
    ++this.commentPaginate.totalDocs;
    this.comments.unshift(data);
    this._scroller.scrollToPosition([0, this.commentsSpace.nativeElement.offsetTop - 25]);
  }
}
