import { ReactNode } from "react";
import "./style.scss";

interface InnerBannerProps {
  innerPageTitlePrimary: string;
  innerPageTitleSecondary: ReactNode;
  innerPageDescription: string;
  innerBgDesk?: string;
  innerBgMobi?: string;
}

const InnerBanner: React.FC<InnerBannerProps> = ({
  innerPageTitlePrimary,
  innerPageTitleSecondary,
  innerPageDescription,
  innerBgDesk,
  innerBgMobi,
}) => {
  return (
    <section className="inner-banner position-relative"  >
      <div className="full-wrap">
        <div className="inner-banner-image">
          <picture>
            {innerBgDesk && (
              <source srcSet={innerBgDesk} media="(min-width: 992px)" />
            )}
            {innerBgMobi && (
              <source srcSet={innerBgMobi} media="(max-width: 991px)" />
            )}
            {innerBgMobi ? (
              <img
                src={innerBgMobi}
                className="d-block w-100"
                alt={`${innerPageTitlePrimary} ${innerPageTitleSecondary}`}
              />
            ) : (
              <img
                src="/images/faculity-lan.png"
                className="d-block w-100"
                alt="Default Banner"
              />
            )}
          </picture>
        </div>
        <div className="inner-banner-content">
          <h1>
            {innerPageTitlePrimary}{" "}
            <span className="highlighted-text">{innerPageTitleSecondary}</span>
          </h1>
          <div>{innerPageDescription}</div>
        </div>
      </div>
    </section>
  );
};

export default InnerBanner;
