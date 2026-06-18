import styled from "styled-components"

export const MessageContainer = styled.div`
  width: 100%;

  margin-bottom: 14px;

  display: flex;
  flex-direction: ${(props) =>
    props.senderType === "bot" ? "row" : "row-reverse"};
  align-items: ${(props) =>
    props.senderType === "bot" ? "flex-start" : "flex-end"};
  gap: 10px;
`
export const ChatIcon = styled.div`
  width: 34px;
  height: 34px;

  background: ${(props) =>
    props.senderType === "bot"
      ? "linear-gradient(135deg, #7c3aed, #9333ea)"
      : "#2563eb"};

  color: #ffffff;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  flex-shrink: 0;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

  font-size: 15px;
`

export const MessageBox = styled.div`
  max-width: ${(props) => (props.senderType === "bot" ? "90%" : "75%")};

  background: ${(props) =>
    props.senderType === "user"
      ? "linear-gradient(135deg, #2563eb, #3b82f6)"
      : "#ffffff"};

  color: ${(props) => (props.senderType === "bot" ? "#1e293b" : "#ffffff")};

  padding: 10px 14px;
  border-radius: 16px;
  overflow-wrap: break-word;

  border-bottom-right-radius: ${(props) =>
    props.senderType === "user" ? "6px" : "18px"};

  border-bottom-left-radius: ${(props) =>
    props.senderType === "bot" ? "6px" : "18px"};

  box-sizing: border-box;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`
export const Message = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;

  white-space: pre-line;

  margin: 0;

  border: ${(props) =>
    props.senderType === "bot" ? "1px solid #e2e8f0" : "none"};
`
export const ProductsContainer = styled.div`
  margin-top: 14px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
