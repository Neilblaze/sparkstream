import { Flex, IconButton, Button, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineWifi,
  AiOutlineClose,
} from "react-icons/ai";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicMuteFill,
  BsFillMicFill,
  BsRecordCircle,
  BsFullscreen,
} from "react-icons/bs";
import { GrMore } from "react-icons/gr";
import { MdOutlineScreenShare } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
type VideoBottomProp = {
  cameraCloseIcon: boolean;
  micCloseIcon: boolean;
  handleStopCamera: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleStopMic: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const VideoBottom = ({
  cameraCloseIcon,
  micCloseIcon,
  handleStopCamera,
  handleStopMic,
}: VideoBottomProp) => {
  const randomNum = () => {
    const x = Math.floor(Math.random() * (100 - 1) + 1);
    return x;
  };
  const number = useMemo(() => randomNum(), []);
  const navigate = useNavigate();

  const [isRec, setIsRec] = useState<boolean | null>(null);

  async function startRecording() {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" }
    });
    recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = (e) => {
      const completeBlob = new Blob(chunks, { type: chunks[0].type });
      const url = URL.createObjectURL(completeBlob);
      video.setAttribute("src", url);
      download.setAttribute("href", url);
      download.download = "RecordedVideo.webm";
      download.classList.remove("hidden");
    };

    recorder.start();
  }

  function clickHanler() {

    if (isRec === null) {
      setIsRec(true);
      startRecording();
    } else if (isRec === true) {
      setIsRec(false);
      recorder.stop();
      stream.getVideoTracks()[0].stop();

    } else {
      console.log("WAS FALSE");

    }


  }

  return (
    <>
      <Flex width="100%" alignItems="center" bg="transparent">
        <Flex flex="1" alignItems="center">
          <IconButton
            colorScheme="blackAlpha"
            borderRadius="50%"
            aria-label="Search database"
            icon={<AiOutlineArrowLeft color="white" />}
            mr={3}
          />
          <Text color="black" fontWeight="bold">
            Hackathon Discussion 101
          </Text>
        </Flex>
        <Flex
          bg="#1E2128"
          borderRadius="53px"
          flex="1"
          p="4"
          alignItems="center"
        >
          <IconButton
            bg="transparent"
            aria-label="Search database"
            _hover={{
              backgroundColor: "transparent",
            }}
            _focus={{
              backgroundColor: "transparent",
            }}
            icon={<AiOutlineWifi color="white" />}
            mr={3}
          />
          <Flex
            flexDirection="column"
            color="whiteAlpha.900"
            fontSize="sm"
            mr={3}
          >
            <Text>You are in Neel's Room</Text>
            <Text>Connect to Room {number}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-evenly">
            <IconButton
              aria-label="Search database"
              bg="whiteAlpha.900"
              icon={
                !cameraCloseIcon ? (
                  <BsFillCameraVideoFill />
                ) : (
                  <BsFillCameraVideoOffFill color="red" />
                )
              }
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}
              borderRadius="50%"
              onClick={(e) => handleStopCamera(e)}
              mr={1}
            />
            <IconButton
              aria-label="test"
              bg="whiteAlpha.900"
              icon={
                micCloseIcon ? (
                  <BsFillMicMuteFill style={{ color: "red" }} />
                ) : (
                  <BsFillMicFill />
                )
              }
              w={10}
              h={10}
              mr={1}
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}
              borderRadius="50%"
              onClick={(e) => handleStopMic(e)}
            />
            <IconButton
              aria-label="Search database"
              bg="whiteAlpha.900"
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}
              icon={<MdOutlineScreenShare />}
              w={10}
              h={10}
              mr={1}
              borderRadius="50%"
            />
            <IconButton
              aria-label="Search database"
              bg="whiteAlpha.900"
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}
              icon={<GrMore />}
              w={10}
              h={10}
              mr={4}
              borderRadius="50%"
            />
            <IconButton
              aria-label="Search database"
              colorScheme="red"
              icon={<AiOutlineClose />}
              w={10}
              h={10}
              borderRadius="50%"
              onClick={() => navigate("/home")}
            />
          </Flex>
        </Flex>
        <Flex flex="1" alignItems="center" justifyContent="flex-end">
          <Flex mr={8} alignItems="center">
            <IconButton
              aria-label="Search database"
              bg="whiteAlpha.900"
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}
              icon={<BsRecordCircle style={{ color: "red" }} />}
              w={10}
              h={10}
              mr={3}
              borderRadius="17px"
              onClick={() => clickHanler()}
            // RECORDING STARTS
            />
            <Button width="10px" mr={3} bg="#249782" color="white">
              CC
            </Button>
            <IconButton
              aria-label="Search database"
              bg="whiteAlpha.900"
              _hover={{
                background: "whiteAlpha.500",
                color: "white.500",
              }}

              icon={<BsFullscreen />}
              w={10}
              h={10}
              mr={3}
              borderRadius="17px"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default VideoBottom;
