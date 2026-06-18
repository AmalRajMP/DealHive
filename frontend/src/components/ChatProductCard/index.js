import {
  Card,
  Thumbnail,
  Content,
  Title,
  Price,
  Rating,
} from "./styledComponents"

const ChatProductCard = ({ product }) => {
  const { thumbnail, title, discountPrice, rating } = product

  return (
    <Card>
      <Thumbnail src={thumbnail} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Price>₹{discountPrice}</Price>
        <Rating>⭐ {rating}</Rating>
      </Content>
    </Card>
  )
}

export default ChatProductCard
