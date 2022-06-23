import Peer from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
const Chat = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, (stream) => {
        const local_stream = stream;
        setLocalStream(local_stream);
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          setRemoteStream(remoteStream);
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    getUserMedia({ video: true, audio: true }, (stream) => {
      const local_stream = stream;
      setLocalStream(local_stream);

      const call = peerInstance.current.call(remotePeerId, stream);

      call.on('stream', (remoteStream) => {
        setRemoteStream(remoteStream);
      });
    });
  };
  const setLocalStream = (stream) => {
    localVideoRef.current.srcObject = stream;
    localVideoRef.current.play();
  };
  const setRemoteStream = (stream) => {
    remoteVideoRef.current.srcObject = stream;
    remoteVideoRef.current.play();
  };
  return (
    <div className='Chat'>
      <h1>Current user id is {peerId}</h1>
      <input
        type='text'
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={localVideoRef} />
      </div>
      <div>
        <video ref={remoteVideoRef} />
      </div>
    </div>
  );
};

export default Chat;
