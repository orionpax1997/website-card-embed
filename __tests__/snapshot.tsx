import { render } from '@testing-library/react';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import { AnalysisFactory } from '@/utils/analysis';

describe('analysis snapshot', () => {
  it('analysis https://zhuanlan.zhihu.com/p/59838643', async () => {
    const analysisData = (await AnalysisFactory.create('https://zhuanlan.zhihu.com/p/59838643')).analysis();
    expect(analysisData).toMatchSnapshot({ image: expect.any(String) });
  });

  it('analysis https://www.cnblogs.com/yichong/p/9234265.html', async () => {
    const analysisData = (await AnalysisFactory.create('https://www.cnblogs.com/yichong/p/9234265.html')).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('analysis https://blog.csdn.net/design_Lu/article/details/94870265', async () => {
    const analysisData = (
      await AnalysisFactory.create('https://blog.csdn.net/design_Lu/article/details/94870265')
    ).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('analysis https://segmentfault.com/a/1190000020387433', async () => {
    const analysisData = (await AnalysisFactory.create('https://segmentfault.com/a/1190000020387433')).analysis();
    expect(analysisData).toMatchSnapshot({ image: expect.any(String) });
  });

  it('analysis https://www.jianshu.com/p/eec5e34ff0c2', async () => {
    const analysisData = (await AnalysisFactory.create('https://www.jianshu.com/p/eec5e34ff0c2')).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('analysis https://stackoverflow.com/questions/43431550/async-await-class-constructor/43433773', async () => {
    const analysisData = (
      await AnalysisFactory.create(
        'https://stackoverflow.com/questions/43431550/async-await-class-constructor/43433773'
      )
    ).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot('stackoverflow');
  });

  it('analysis https://blog.51cto.com/u_15349616/3717558', async () => {
    const analysisData = (await AnalysisFactory.create('https://blog.51cto.com/u_15349616/3717558')).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('analysis https://juejin.cn/post/6844904009887645709', async () => {
    const analysisData = (await AnalysisFactory.create('https://juejin.cn/post/6844904009887645709')).analysis();
    const { container } = render(<WebsiteCardIntroduction {...analysisData} />);
    expect(container).toMatchSnapshot();
  });
});
