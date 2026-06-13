import styled from "styled-components"

export const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 90vw;
  max-width: 340px;

  height: 70vh;
  min-height: 450px;

  display: flex;
  flex-direction: column;

  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    max-width: 390px;
    height: 80vh;
    min-height: 550px;
  }
`

export const Header = styled.div`
  height: 80px;
  padding: 0 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #2563eb, #3b82f6);

  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const BotInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const BotIcon = styled.div`
  font-size: 22px;
  color: #ffffff;
  margin-top: 2px;
`

export const BotName = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`

export const BotStatus = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  opacity: 0.9;
  margin-top: 4px;
`

export const MessagesContainer = styled.ul`
  list-style-type: none;

  flex-grow: 1;
  padding: 18px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
`
export const QuickActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  max-width: 320px;

  padding: 10px;
`
export const QuickActionButton = styled.button`
  border: none;
  outline: none;
  background-color: #ffffff;
  color: #2563eb;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`

export const UserInputContainer = styled.div`
  height: 70px;
  width: 100%;

  box-sizing: border-box;

  display: flex;
  align-items: center;

  padding: 12px;
  gap: 8px;

  border-top: 1px solid #e2e8f0;
`
export const UserInputBox = styled.input`
  height: 44px;
  flex-grow: 1;
  box-sizing: border-box;

  border: 1px solid #dbe4f0;
  border-radius: 22px;
  padding: 0 16px;
  font-size: 14px;
`
export const SendButton = styled.button`
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #2563eb;
  border-radius: 50%;
  border: none;

  cursor: pointer;

  color: #ffffff;
  font-size: 18px;
`
export const CloseButton = styled.button`
  width: 44px;
  height: 44px;

  background: transparent;
  border: none;

  color: #ffffff;
  font-size: 20px;
  font-weight: 500;

  cursor: pointer;
`
