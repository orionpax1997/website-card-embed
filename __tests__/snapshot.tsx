import { render } from '@testing-library/react';
import WebsiteCardIntroduction from '@/components/website-card-introduction';
import WebsiteCardIntroductionMobile from '@/components/website-card-introduction-mobile';
import WebsiteCardIntroductionLoading from '@/components/website-card-introduction-loading';
import WebsiteCardIntroductionError from '@/components/website-card-introduction-error';

describe('snapshot', () => {
  it('build WebsiteCardIntroduction', () => {
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

  it('build WebsiteCardIntroductionMobile', () => {
    const analysisData = {
      url: 'https://humble-blog.vercel.app/',
      title: '向之礼的个人博客',
      description: '一个打工人的个人博客小站',
      image: 'https://images.weserv.nl/?url=https://humble-blog.vercel.app/images/avatar.jpg',
      favicon:
        'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://humble-blog.vercel.app/&size=16',
    };
    const { container } = render(<WebsiteCardIntroductionMobile {...analysisData} />);
    expect(container).toMatchSnapshot();
  });

  it('build WebsiteCardIntroductionLoading', () => {
    const { container } = render(<WebsiteCardIntroductionLoading hasImage={true} />);
    expect(container).toMatchSnapshot();
  });

  it('build WebsiteCardIntroductionError', () => {
    const { container } = render(<WebsiteCardIntroductionError url="https://humble-blog.vercel.app/" />);
    expect(container).toMatchSnapshot();
  });
});
