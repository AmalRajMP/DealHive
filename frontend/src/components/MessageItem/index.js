import { BsRobot } from "react-icons/bs"
import { FaUser } from "react-icons/fa"

import {
  MessageContainer,
  ChatIcon,
  MessageBox,
  Message,
} from "./styledComponents"

const MessageItem = ({ messageDetails }) => {
  const { sender, text } = messageDetails

  return (
    <MessageContainer senderType={sender}>
      <ChatIcon senderType={sender}>
        {sender === "user" ? <FaUser /> : <BsRobot />}
      </ChatIcon>
      <MessageBox senderType={sender}>
        <Message>{text}</Message>
      </MessageBox>
    </MessageContainer>
  )
}

export default MessageItem
