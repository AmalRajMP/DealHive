import {
  FeatureCard,
  FeatureImage,
  FeatureIcon,
  FeatureInfo,
  FeatureInfoTitle,
  FeatureInfoSubTitle,
} from './styledComponents'

const FeatureItem = (props) => {
  const { featureDetails } = props
  const { mobileIcon, desktopIcon, title, description } = featureDetails

  return (
    <li>
      <FeatureCard>
        <FeatureImage src={desktopIcon} alt={title} />
        <FeatureIcon>{mobileIcon}</FeatureIcon>
        <FeatureInfo>
          <FeatureInfoTitle>{title}</FeatureInfoTitle>
          <FeatureInfoSubTitle>{description}</FeatureInfoSubTitle>
        </FeatureInfo>
      </FeatureCard>
    </li>
  )
}

export default FeatureItem
