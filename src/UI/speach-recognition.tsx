import { useEffect, useState, FC } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { styled } from "styled-components";

const Component = styled.div`
  width: 700px;
  padding-bottom: 50px;
`;

const Button = styled.button`
  width: 700px;
  background-color: red;
  color: white;
  border: none;
  &:hover {
    opacity: 0.8;
    transition: 0.2s opacity;
  }
`;

const SimpleText = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  gap: 10px;
`;

const NumberedText = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  gap: 10px;
`;

const Title = styled.span`
  font-weight: 700;
`;

const TextYellow = styled.span`
  background-color: yellow;
`;

const TextGreen = styled.span`
  background-color: green;
  color: white;
`;

const TextDefault = styled.span`
  font-style: italic;
`;

const SpeachRecognition: FC = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [withNumber, setNumber] = useState<string[]>([]);

  const empty = "Разрешите микрофон в браузере и начинайте говорить";
  const textWithNumbers = withNumber.join(" ");

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100);
  };

  const addNumber = () => {
    if (!transcript.length) {
      return "";
    }

    const words = transcript.split(" ");
    const updatedNumberedText = [...withNumber];

    words.forEach((word: string, index: number) => {
      const existingWord = updatedNumberedText.find((item) =>
        item.startsWith(word)
      );

      if (existingWord) {
        const randomNumber = getRandomNumber();
        updatedNumberedText[index] = word + randomNumber;
      } else {
        updatedNumberedText.push(word);
      }
    });

    setNumber(updatedNumberedText);
  };

  useEffect(() => {
    addNumber();
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <Component>
      <Button
        onClick={() => {
          resetTranscript();
          setNumber([]);
        }}
      >
        Очистить
      </Button>
      <SimpleText>
        <Title>Просто текст:</Title>
        {textWithNumbers ? (
          <TextYellow>{transcript}</TextYellow>
        ) : (
          <TextDefault>{empty}</TextDefault>
        )}
      </SimpleText>
      <NumberedText>
        <Title>Текст с цифрами:</Title>
        {textWithNumbers ? (
          <TextGreen>{textWithNumbers}</TextGreen>
        ) : (
          <TextDefault>{empty}</TextDefault>
        )}
      </NumberedText>
    </Component>
  );
};

export default SpeachRecognition;
