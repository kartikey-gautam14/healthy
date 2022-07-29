import Peer from 'peerjs';
import React, { useEffect, useRef } from 'react';
const Chat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  useEffect(() => {
    const peer = new Peer();
    peer.on('open', (id) => {
      console.log('Connected with Id: ' + id);
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia(
        { video: true, audio: true },
        (stream) => {
          const local_stream = stream;
          setLocalStream(local_stream);
          let call = peer.call('abhishek', stream);
          call.on('stream', (stream) => {
            setRemoteStream(stream);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }, []);
  const setLocalStream = (stream) => {
    localVideoRef.current.srcObject = stream;
    localVideoRef.current.play();
  };
  const setRemoteStream = (stream) => {
    remoteVideoRef.current.srcObject = stream;
    remoteVideoRef.current.play();
  };
  return (
    <div>
      <div className='mr-auto'>
        <video ref={localVideoRef} />
      </div>
      <div className='ml-auto'>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
};

export default Chat;
