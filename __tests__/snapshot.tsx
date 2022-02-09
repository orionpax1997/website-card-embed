import { render } from '@testing-library/react';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import { AnalysisFactory } from '@/utils/analysis';

describe('snapshot', () => {
  it('build WebsiteCardIntroduction', async () => {
    const analysisData = {
      url: 'https://humble-blog.vercel.app/',
      title: '向之礼的个人博客',
      description: '一个打工人的个人博客小站',
      image: 'https://images.weserv.nl/?url=https://humble-blog.vercel.app/images/avatar.jpg',
      favicon:
        'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://humble-blog.vercel.app/&size=16',
    };
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('analysis https://zhuanlan.zhihu.com/p/59838643', async () => {
    const analysisData = (await AnalysisFactory.create('https://zhuanlan.zhihu.com/p/59838643')).analysis();
    expect(analysisData).toMatchSnapshot({ image: expect.any(String) });
  });

  it('analysis https://www.cnblogs.com/yichong/p/9234265.html', async () => {
    const analysisData = (await AnalysisFactory.create('https://www.cnblogs.com/yichong/p/9234265.html')).analysis();
    expect(analysisData).toMatchSnapshot();
  });

  it('analysis https://blog.csdn.net/design_Lu/article/details/94870265', async () => {
    const analysisData = (
      await AnalysisFactory.create('https://blog.csdn.net/design_Lu/article/details/94870265')
    ).analysis();
    expect(analysisData).toMatchSnapshot();
  });

  it('analysis https://segmentfault.com/a/1190000020387433', async () => {
    const analysisData = (await AnalysisFactory.create('https://segmentfault.com/a/1190000020387433')).analysis();
    expect(analysisData).toMatchSnapshot({ image: expect.any(String) });
  });

  it('analysis https://www.jianshu.com/p/eec5e34ff0c2', async () => {
    const analysisData = (await AnalysisFactory.create('https://www.jianshu.com/p/eec5e34ff0c2')).analysis();
    expect(analysisData).toMatchSnapshot();
  });

  it('analysis https://blog.51cto.com/u_15349616/3717558', async () => {
    const analysisData = (await AnalysisFactory.create('https://blog.51cto.com/u_15349616/3717558')).analysis();
    expect(analysisData).toMatchSnapshot();
  });

  it('analysis https://juejin.cn/post/6844904009887645709', async () => {
    const analysisData = (await AnalysisFactory.create('https://juejin.cn/post/6844904009887645709')).analysis();
    expect(analysisData).toMatchSnapshot();
  });
});
