import { useState, useEffect } from "react"

import { v4 as uuidv4 } from "uuid"

import MessageItem from "../MessageItem"

import BASE_URL from "../../config/api"

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
  QuickActionsContainer,
  QuickActionButton,
  UserInputContainer,
  UserInputBox,
  SendButton,
} from "./styledComponents"

const quickActions = [
  "🔥 Trending Products",
  "💡 Get Recommendations",
  "⚖️ Compare Products",
  "🔍 Find a Product",
]

const Chatbot = ({ setIsChatEnabled }) => {
  const [userQuery, setUserQuery] = useState("")
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: `👋 Hi! I'm Nova, 
        your AI shopping assistant.
        What product are you looking for today?`,
      sender: "bot",
    },
  ])

  const onSubmitQuery = async (event) => {
    event.preventDefault()

    if (userQuery.trim() === "") return

    const query = {
      id: uuidv4(),
      text: userQuery,
      sender: "user",
    }

    setMessages((prev) => [...prev, query])
    setUserQuery("")

    try {
      const url = `${BASE_URL}/api/chat`
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuery,
        }),
      }

      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const botResponse = {
          id: uuidv4(),
          ...data,
        }
        setMessages((prev) => [...prev, botResponse])
      }
    } catch (e) {
      console.log(e)
    }
  }

  const hasUserStartedChat = messages.some(
    (message) => message.sender === "user",
  )

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
        <CloseButton type="button" onClick={() => setIsChatEnabled(false)}>
          <IoClose />
        </CloseButton>
      </Header>

      <MessagesContainer>
        {messages.map((eachMessage) => (
          <li key={eachMessage.id}>
            <MessageItem messageDetails={eachMessage} />
          </li>
        ))}
      </MessagesContainer>

      {!hasUserStartedChat && (
        <QuickActionsContainer>
          {quickActions.map((action) => (
            <QuickActionButton key={action}>{action}</QuickActionButton>
          ))}
        </QuickActionsContainer>
      )}

      <UserInputContainer as="form" onSubmit={onSubmitQuery}>
        <UserInputBox
          type="text"
          value={userQuery}
          placeholder="Ask Nova about products..."
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <SendButton type="submit">
          <IoSend />
        </SendButton>
      </UserInputContainer>
    </ChatbotContainer>
  )
}

export default Chatbot
