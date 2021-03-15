import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

export interface MetaConfig {
  title: string;
  description: string;
  image: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private site_name: string

  constructor(
    private _meta: Meta,
    private _title: Title,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.site_name = environment.siteName;
  }

  /**
   * Actualiza nombre de la página en Browser
   * 
   * @param  {string} title Title tag Page
   * @memberof MetaService
   */
  updateTitle(title: string) {
    this._title.setTitle(`${title} | ${this.site_name}`);
  }

  /**
   * Reset Title tag
   * 
   * @memberof MetaService
   */
  resetTitle() {
    this._title.setTitle(this.site_name);
  }

  /**
   * Actualiza og slug
   * 
   * @param {string} slug link to facebook
   * @memberof MetaService
   */
  updateOgUrl(slug: string) {
    this._meta.updateTag({ name: 'og:url', content: slug })
  }

  /**
   * Actualiza la descripción de la página
   * 
   * @param {string} desc Description page
   * @memberof MetaService
   */
  updateDescription(desc: string) {
    this._meta.updateTag({ name: 'description', content: desc })
  }
  /*------------------------------------------------------------------*/
  // Actualiza toda las tag de Meta
  /*------------------------------------------------------------------*/

  /**
   * 
   * @param {MetaConfig} config - The shape is the same as SpecialType above
   * @memberof MetaService
   */
  generateTags(config: MetaConfig): void {
    //*------------------------------------------------------------------*/
    // * Twitter Meta
    //*------------------------------------------------------------------*/
    this._meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this._meta.updateTag({ name: 'twitter:site', content: '@MiTwitter' });
    this._meta.updateTag({ name: 'twitter:_title', content: config.title });
    this._meta.updateTag({ name: 'twitter:description', content: config.description });
    this._meta.updateTag({ name: 'twitter:image', content: config.image });
    //*------------------------------------------------------------------*/
    // * Facebook and more Meta
    //*------------------------------------------------------------------*/
    this._meta.updateTag({ property: 'og:title', content: config.title });
    this._meta.updateTag({ property: 'og:type', content: 'article' });

    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this._meta.updateTag({ property: 'og:url', content: window.location.href });

    }

    this._meta.updateTag({ property: 'og:image', content: config.image });
    this._meta.updateTag({ property: 'og:description', content: config.description });
    this._meta.updateTag({ property: 'og:site_name', content: 'My Website Name' });
  }
}
