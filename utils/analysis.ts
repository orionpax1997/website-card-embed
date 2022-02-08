import http from 'http';
import https from 'https';
import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';

export class AnalysisFactory {
  static async create(url: string): Promise<Analysis> {
    if (url.indexOf('juejin') !== -1) return await new JueJinAnalysisImpl(url).init();
    return await new AnalysisImpl(url).init();
  }
}

export abstract class Analysis {
  private readonly _url: string;
  protected _html!: string;
  private $!: CheerioAPI;

  constructor(url: string) {
    this._url = url;
  }

  async init(): Promise<Analysis> {
    this._html = await curl(this._url);
    this.$ = cheerio.load(this._html);
    return this;
  }

  analysis(): AnalysisData {
    return {
      url: this.url,
      title: this.title,
      description: this.description,
      image: this.image,
      favicon: this.favicon,
    };
  }

  get url(): string {
    return this._url;
  }

  get title(): string {
    if (this.$('h1[class*=title]').length === 1) return this.$('h1[class*=title]').text().trim();
    if (this.$('h1[class*=Title]').length === 1) return this.$('h1[class*=Title]').text().trim();
    if (this.$('.title').length === 1) return this.$('.title').text().trim();
    if (this.$('h1>a').length === 1) return this.$('h1>a').text().trim();
    if (this.$('header h1').length === 1) return this.$('header h1').text().trim();
    if (this.$('h1').length === 1) return this.$('h1').text().trim();
    return this.$('title').text().trim();
  }

  get description(): string | undefined {
    if (this.$('meta[property=og:description]').length === 1)
      return this.$('meta[property=og:description]').attr('content');
    return this.$('meta[name=description]').attr('content');
  }

  get image(): string | undefined {
    let img;
    if (this.$('meta[name=og:image]').length === 1) {
      img = this.$('meta[name=og:image]').attr('content');
    } else if (this.$('div[class*=content] p img').length > 0) {
      img = this.$('div[class*=content] p img').first().attr('src');
    } else if (this.$('div[class*=Content] p img').length > 0) {
      img = this.$('div[class*=content] p img').first().attr('src');
    } else {
      img = this.$('meta[property=og:image]').attr('content');
    }
    return img ? `https://images.weserv.nl/?url=${img}` : undefined;
  }

  get favicon(): string {
    return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${this._url}&size=16`;
  }
}

class AnalysisImpl extends Analysis {}

class JueJinAnalysisImpl extends Analysis {
  private readonly titleRegExp: RegExp = /(?<=headline":")[^"]*/;

  get title(): string {
    const match = this.titleRegExp.exec(this._html);
    if (match) return match[0];
    return '';
  }
}

export type AnalysisData = {
  readonly url: string;
  readonly title: string;
  readonly description: string | undefined;
  readonly image: string | undefined;
  readonly favicon: string;
};

async function curl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    (url.startsWith('https') ? https : http)
      .get(url, res => {
        let data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', error => {
        reject(error);
      });
  });
}
