import ChatProductCard from "../ChatProductCard"

import { BsRobot } from "react-icons/bs"
import { FaUser } from "react-icons/fa"

import {
  MessageContainer,
  ChatIcon,
  MessageBox,
  Message,
  ProductsContainer,
} from "./styledComponents"

const MessageItem = ({ messageDetails }) => {
  const { sender, text, products } = messageDetails

  return (
    <MessageContainer senderType={sender}>
      <ChatIcon senderType={sender}>
        {sender === "user" ? <FaUser /> : <BsRobot />}
      </ChatIcon>
      <MessageBox senderType={sender}>
        <Message>{text}</Message>
        <ProductsContainer>
          {products?.map((product) => (
            <ChatProductCard key={product._id} product={product} />
          ))}
        </ProductsContainer>
      </MessageBox>
    </MessageContainer>
  )
}

export default MessageItem
