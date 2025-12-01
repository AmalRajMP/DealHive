import {
  FeatureCard,
  FeatureIcon,
  FeatureInfo,
  FeatureInfoTitle,
  FeatureInfoSubTitle,
} from './styledComponents'

const FeatureItem = (props) => {
  const { featureDetails } = props
  const { icon, title, description } = featureDetails
  return (
    <li>
      <FeatureCard>
        <FeatureIcon>{icon}</FeatureIcon>
        <FeatureInfo>
          <FeatureInfoTitle>{title}</FeatureInfoTitle>
          <FeatureInfoSubTitle>{description}</FeatureInfoSubTitle>
        </FeatureInfo>
      </FeatureCard>
    </li>
  )
}

export default FeatureItem
