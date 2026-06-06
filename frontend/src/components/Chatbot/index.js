import { useState, useEffect } from "react"

import { IoSend, IoClose } from "react-icons/io5"
import { BsRobot } from "react-icons/bs"

import {
  ChatbotContainer,
  Header,
  BotInfo,
  TitleRow,
  BotIcon,
  BotName,
  BotStatus,
  CloseButton,
  MessagesContainer,
  UserInputContainer,
  UserInputBox,
  SendButton,
} from "./styledComponents"

const Chatbot = () => {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([])

  return (
    <ChatbotContainer>
      <Header>
        <BotInfo>
          <TitleRow>
            <BotIcon>
              <BsRobot />
            </BotIcon>

            <BotName>Nova</BotName>
          </TitleRow>

          <BotStatus>AI Shopping Assistant</BotStatus>
        </BotInfo>
        <CloseButton type="button">
          <IoClose />
        </CloseButton>
      </Header>

      <MessagesContainer></MessagesContainer>
      <UserInputContainer as="form">
        <UserInputBox placeholder="Ask Nova about products..." />
        <SendButton type="submit">
          <IoSend />
        </SendButton>
      </UserInputContainer>
    </ChatbotContainer>
  )
}

export default Chatbot
